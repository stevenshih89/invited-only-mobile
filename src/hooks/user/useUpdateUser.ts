import { useQueryClient } from "@tanstack/react-query";
import { Platform } from "react-native";
import storage from '@react-native-firebase/storage';
import { components } from "@invited-only/invited-only-api";
import { logErrorToSentry } from "helpers/logErrorsToSentry";
import { showToast, UseToastType } from "helpers/showToast";
import invitedOnlyBackendApi from "src/api/backend-api"
import { useAuthStore } from "src/store/authStore";


type User = components['schemas']['User'];

const uploadImage = async (imagePath: string | null | undefined, userId: string): Promise<string | null> => {

    if (!imagePath) return null;
    if (imagePath.startsWith('https://')) {
        return imagePath;
    }

    const uploadUri = Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath;
    const filename = `${userId}_${Date.now()}`;

    const storageRef = storage().ref(`images/${filename}`);
    try {
        await storageRef.putFile(uploadUri);
        const url = await storageRef.getDownloadURL();

        return url;
    } catch (e: any) {
        console.error('Error uploading image:', e);
        logErrorToSentry(e, {
            tags: { action: 'uploadImage' },
            extra: { userId, imagePath, filename, uploadUri },
            level: 'error',
        });
        showToast('error' as UseToastType, `Upload failed: ${e.message || 'Unknown error'}`, 'Upload Error');
        return null;
    }
};

const useUpdateUser = () => {
    const { userMetadata } = useAuthStore();
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending } = invitedOnlyBackendApi.useMutation('patch', '/users/{id}', {
        onSuccess: (user) => {
            console.log('User updated successfully', user);
        },
        onError: (error) => {
            console.log('Error updating user:', error);
        },
    });


    const update = async (user: Partial<User>) => {
        try {
            if (user.photos) {
                user.photos = await Promise.all(user.photos.map(async (photo: components['schemas']['UserPhoto']) => {
                    if (photo.image) {
                        const url = await uploadImage(photo.image, userMetadata.uid)
                        const newImage = { image: url, id: photo.id };
                        return newImage
                    }
                    return photo;
                }));
            }
            await updateUser({
                params: {
                    path: {
                        id: userMetadata.uid
                    }
                },
                body: {
                    ...user,
                }
            });
            queryClient.setQueriesData({ queryKey: ['get', '/users/{id}', { params: { path: { id: userMetadata.uid } } }] }, (old: components['schemas']['User']) => {
                return {
                    ...old,
                    ...user
                }
            });
        } catch (error) {
            console.log('Error updating user:', error);
        }
    }

    return { update, isPending };
}

export default useUpdateUser;
import { User } from "@sentry/react-native";
import invitedOnlyBackendApi from "src/api/backend-api"
import { useAuthStore } from "src/store/authStore";

const useUpdateUser = () => {
    const { setUserMetadata: setUser } = useAuthStore();
    const { mutate: updateUser, isPending } = invitedOnlyBackendApi.useMutation('patch', '/users/{id}', {
        onSuccess: (user) => {
            console.log('User updated successfully');
            setUser(user);
        },
        onError: (error) => {
            console.log('Error updating user:', error);
        },
    });

    const update = async (user: Partial<User>) => {
        try {
            await updateUser({
                params: {
                    path: {
                        id: user.uid
                    }
                },
                body: {
                    ...user,
                }
            });
        } catch (error) {
            console.log('Error updating user:', error);
        }
    }

    return { update, isPending };
}

export default useUpdateUser;
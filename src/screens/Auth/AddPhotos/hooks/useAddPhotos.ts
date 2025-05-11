import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { check, Permission, PERMISSIONS, PermissionStatus, request, RESULTS } from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { components } from '@invited-only/invited-only-api';
import { useAuthStore } from 'src/store/authStore';
import { showToast } from 'helpers/showToast';
import { isIos } from 'constants/common';
import { useAppNavigation } from 'hooks/useAppNavigation';

export const useAddPhotos = () => {
  const navigation = useAppNavigation();

  const [photos, setImages] = useState<{ image: null | string; id: number }[]>([
    {
      id: 0,
      image: null,
    },
    {
      id: 1,
      image: null,
    },
    {
      id: 2,
      image: null,
    },
    {
      id: 3,
      image: null,
    },
    {
      id: 4,
      image: null,
    },
    {
      id: 5,
      image: null,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { onBoarding, setOnBoarding } = useAuthStore();
  const makePermissionsRequest = async (permission: Permission): Promise<PermissionStatus> => {
    const result = await check(permission);
    switch (result) {
      case RESULTS.DENIED: {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.BLOCKED) {
          Alert.alert('Permission not granted');
        }
        return requestResult;
      }
      case RESULTS.BLOCKED:
        Alert.alert('Permission not granted');
        break;
    }

    return result;
  };

  const uploadImage = async (imagePath: string, userId: string | null) => {
    if (imagePath) {
      if (imagePath.includes('https://')) {
        return imagePath;
      } else {
        const uploadUri = Platform.OS === 'ios' ? imagePath : `file://${imagePath}`;
        const filename = `${userId}_${new Date().getTime()}`;
        const storageRef = storage().ref(`user_photos/${filename}`);
        try {
          await storageRef.putFile(uploadUri);
          const url = await storageRef.getDownloadURL();
          return url;
        } catch (e) {
          console.error('Error uploading image:', e);
          return null;
        }
      }
    }
  };

  const openLibrary = async (imageId: number): Promise<void> => {
    const photoLibraryPermission = await makePermissionsRequest(
      isIos ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    );

    if (photoLibraryPermission !== RESULTS.GRANTED && photoLibraryPermission !== RESULTS.LIMITED) {
      return;
    }

    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        multiple: false,
        mediaType: 'photo',
      });

      const newImages = photos.map(img => {
        if (img.id === imageId) {
          return { ...img, image: image.path };
        }
        return img;
      });
      setImages(newImages);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const deleteImage = (imageId: number): void => {
    const newImages = photos.map(img => {
      if (img.id === imageId) {
        return { ...img, image: null };
      }
      return img;
    });
    setImages(newImages);
  };

  function hasPhoto(array: { image: null | string; id: number }[]) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].image !== null) {
        return true;
      }
    }
    return false;
  }

  const handleNext = async () => {
    if (!hasPhoto(photos)) {
      return;
    }
    setIsLoading(true);
    let photosList: components['schemas']['UserPhoto'][] = [];
    try {
      for (const i of photos) {
        if (i?.image) {
          console.log('uploading image', i.image);
          const img = await uploadImage(i.image, onBoarding?.registrationDetails?.uid || '');
          console.log('img', img);
          photosList.push({ id: i?.id + 1, image: img });
        }
      }
      setOnBoarding({
        ...onBoarding,
        onboardingStep: '/enter-birthday',
        registrationDetails: {
          ...onBoarding.registrationDetails,
          photos: photosList,
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
    console.log('photosList', photosList);
    if (photosList.length) {
      navigation.navigate('/enter-birthday');
    } else {
      showToast('inviteMatch', '', 'Failed to upload photos');
    }
  };

  return {
    photos,
    isLoading,
    handleNext,
    deleteImage,
    openLibrary,
  };
};

import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useCameraPermission } from 'hooks/useCameraPermission';
import { useAuthStore } from 'src/store/authStore';
import { invitationCodePath, photoVerifiedPath } from 'constants/pathLocations';
import MaleExampleSelfie from 'assets/images/auth/example-selfie.png';
import FemaleExampleSelfie from 'assets/images/auth/female-selfie-example.png';
import { useWriteUnfinishedRegistration } from 'screens/Auth/hooks/useUnfinishedRegistration';

export const useVerifyStep = () => {
  const navigation = useAppNavigation();
  const [imageUri, setImageUri] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { requestCameraPermission } = useCameraPermission();
  const { onBoarding, setOnBoarding, userMetadata: user } = useAuthStore();
  const { writeUnfinishedRegistration } = useWriteUnfinishedRegistration();
  const selfieSource = onBoarding.registrationDetails?.gender === 'man' ? MaleExampleSelfie : FemaleExampleSelfie;

  const uploadImage = async (imagePath: string, userId: string | null) => {
    if (imagePath) {
      if (imagePath.includes('https://')) {
        return imagePath;
      } else {
        const uploadUri = Platform.OS === 'ios' ? imagePath : `file://${imagePath}`;
        const filename = `${userId}_${new Date().getTime()}`;
        const storageRef = storage().ref(`selfie_photos/${filename}`);
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

  const openCamera = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        return;
      }

      const image = await ImagePicker.openCamera({
        width: 600,
        height: 800,
        cropping: true,
        mediaType: 'photo',
        includeBase64: false,
        multiple: false,
        useFrontCamera: true,
        cropperCircleOverlay: true,
        showCropFrame: true,
        cropperTintColor: 'white',
        cropperStrokeColor: 'white',
        cropperStrokeWidth: 2,
        cropperActiveOpacity: 0.7,
      });

      setImageUri(image.path);
    } catch (error: any) {

      if (error.includes('cancelled')) {
        return;
      }
      console.error('Error accessing camera:', error);
      Alert.alert('Error', 'Failed to access camera. Please try again.');
    }
  };

  const handleSkip = () => {
    try {
      if (!user?.uid) {
        return;
      }
      setIsLoading(true);
      // @ts-ignore
      navigation.navigate(invitationCodePath, { cameFromSummary: true } as never);
    } catch (error) {
      console.error('Error skipped verify photo screen:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    try {
      if (!imageUri || !user?.uid) {
        return;
      }
      setIsLoading(true);
      const imageUser = await uploadImage(imageUri, user?.uid);

      setOnBoarding({
        ...onBoarding,
        registrationDetails: {
          ...onBoarding.registrationDetails,
          verificationPhoto: imageUser || undefined,
        },
      });
      writeUnfinishedRegistration({ ...onBoarding.registrationDetails, verificationPhoto: imageUser || undefined, uid: user.uid, phoneNumber: user.phoneNumber });

      navigation.navigate(photoVerifiedPath as never);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    imageUri,
    isLoading,
    handleNext,
    handleSkip,
    openCamera,
    setImageUri,
    selfieSource,
    gender: onBoarding.registrationDetails?.gender,
  };
};

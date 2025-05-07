import {useEffect, useContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {Alert, AppState, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import analytics from '@react-native-firebase/analytics';
import storage from '@react-native-firebase/storage';
import {AuthContext} from 'contexts/AuthContext';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {useCameraPermission} from 'hooks/useCameraPermission';
import {useAuthStore} from 'src/store/authStore';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {invitationCodePath, photoVerifiedPath} from 'constants/pathLocations';
import {isIos} from 'constants/common';
import MaleExampleSelfie from 'assets/images/auth/example-selfie.png';
import FemaleExampleSelfie from 'assets/images/auth/female-selfie-example.png';

export const useVerifyStep = () => {
  const navigation = useAppNavigation();
  const [imageUri, setImageUri] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {requestCameraPermission} = useCameraPermission();

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const name = onBoarding.find((item: {name: string}) => item?.name)?.name;
  const gender = onBoarding.find((item: {gender: string}) => item?.gender)?.gender;
  const email = onBoarding.find((item: any) => item.email)?.email;
  const accountType = onBoarding.find((item: any) => item.accountType)?.accountType;
  const date = onBoarding.find((item: any) => item.date)?.date;
  const photos = onBoarding.find((item: any) => item.photos)?.photos;
  const selfieSource = gender === 'man' ? MaleExampleSelfie : FemaleExampleSelfie;

  useEffect(() => {
    let subscription: any;

    const handleAppClose = async () => {
      const {userMetadata: user} = useAuthStore();
      if (!user?.uid) {
        return;
      }

      try {
        await firestore()
          .collection('unfinishedRegistrationUsers')
          .doc(user?.uid)
          .set({
            name,
            email,
            accountType,
            date,
            photos,
            gender,
            phoneNumber: user?.phoneNumber,
            createdAt: moment().format('YYYY-MM-DD'),
            screen: 'verify-first-step-selfie',
          });
        analytics().logEvent('verify_selfie_app_closed', {
          name,
          email,
          accountType,
          date,
          photos,
          gender,
          phoneNumber: user?.phoneNumber,
          createdAt: moment().format('YYYY-MM-DD'),
          screen: 'verify-first-step-selfie',
        });
      } catch (e) {
        console.error(e);
        logErrorToSentry(e);
      }
    };

    subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        handleAppClose();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
    if (isIos) {
      try {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
          return;
        }

        const image = await ImagePicker.openCamera({
          width: 300,
          height: 400,
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
      } catch (error) {
        console.error('Error accessing camera:', error);
        Alert.alert('Error', 'Failed to access camera. Please try again.');
      }
    }
  };

  const handleSkip = () => {
    const {userMetadata: user} = useAuthStore();
    try {
      if (!user?.uid) {
        return;
      }
      setIsLoading(true);

      analytics().logEvent('verify_selfie_submited', {
        userId: user?.uid,
        name: onBoarding.find((item: any) => item.name)?.name,
        screen: 'verify-first-step-selfie',
        action: 'selfie-submited',
      });
      // @ts-ignore
      navigation.navigate(invitationCodePath, {cameFromSummary: true} as never);
    } catch (error) {
      console.error('Error skipped verify photo screen:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    const {userMetadata: user} = useAuthStore();
    try {
      if (!imageUri || !user?.uid) {
        return;
      }
      setIsLoading(true);
      const imageUser = await uploadImage(imageUri, user?.uid);

      const onBoardingWithFacePhoto = onBoarding
        .filter((onboardItem: any) => !onboardItem.facePhoto)
        .concat({
          facePhoto: imageUser,
        });

      setOnBoarding(onBoardingWithFacePhoto);

      analytics().logEvent('verify_selfie_submited', {
        userId: user?.uid,
        name: onBoarding.find((item: any) => item.name)?.name,
        screen: 'verify-first-step-selfie',
        action: 'selfie-submited',
      });
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
    gender,
    email,
    accountType,
    date,
    photos,
    selfieSource,
    setImageUri,
  };
};

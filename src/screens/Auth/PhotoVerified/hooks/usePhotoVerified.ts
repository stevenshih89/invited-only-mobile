import {useCallback, useEffect, useContext} from 'react';

import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import {AppState} from 'react-native';
import {AuthContext} from 'contexts/AuthContext';
import {useFocusEffect, useAppNavigation} from 'hooks/useAppNavigation';
import {summaryInfoPath} from 'constants/pathLocations';
import {useAuthStore} from 'src/store/authStore';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';

export const usePhotoVerified = () => {
  const {onBoarding} = useContext(AuthContext);
  const navigation = useAppNavigation();

  useFocusEffect(
    useCallback(() => {
      let timer;
      timer = setTimeout(() => {
        navigation.navigate(summaryInfoPath as never);
      }, 3000);
      return () => clearTimeout(timer);
    }, []),
  );

  useEffect(() => {
    let subscription: any;
    const name = onBoarding.find((item: {name: string}) => item?.name)?.name;
    const gender = onBoarding.find((item: {gender: string}) => item?.gender)?.gender;
    const email = onBoarding.find((item: any) => item.email)?.email;
    const accountType = onBoarding.find((item: any) => item.accountType)?.accountType;
    const date = onBoarding.find((item: any) => item.date)?.date;
    const photos = onBoarding.find((item: any) => item.photos)?.photos;
    const facePhoto = onBoarding.find((item: any) => item.facePhoto)?.facePhoto;
    const {userMetadata: user} = useAuthStore();
    const handleAppClose = async () => {
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
            facePhoto,
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
          facePhoto,
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

  const flattenedPhotos = onBoarding.filter((item: {photos: []}) => item.photos)[0]?.photos;
  const imageUri = flattenedPhotos?.find((photo: {id: number}) => photo.id === 0)?.image;

  return {
    imageUri,
  };
};

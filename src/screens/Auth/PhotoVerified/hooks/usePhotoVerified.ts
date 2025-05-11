import { useCallback, useContext } from 'react';

import { useAppNavigation, useFocusEffect } from 'hooks/useAppNavigation';
import { summaryInfoPath } from 'constants/pathLocations';
import { useAuthStore } from 'src/store/authStore';

export const usePhotoVerified = () => {
  const { onBoarding } = useAuthStore();
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

  const imageUri = onBoarding.registrationDetails?.verificationPhoto;

  return {
    imageUri,
  };
};

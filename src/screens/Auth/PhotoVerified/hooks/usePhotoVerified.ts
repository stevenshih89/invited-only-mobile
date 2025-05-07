import {useCallback, useContext} from 'react';

import {AuthContext} from 'contexts/AuthContext';
import {useAppNavigation, useFocusEffect} from 'hooks/useAppNavigation';
import {summaryInfoPath} from 'constants/pathLocations';

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

  const flattenedPhotos = onBoarding.filter((item: {photos: []}) => item.photos)[0]?.photos;
  const imageUri = flattenedPhotos?.find((photo: {id: number}) => photo.id === 0)?.image;

  return {
    imageUri,
  };
};

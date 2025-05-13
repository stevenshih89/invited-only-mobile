import { FC, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { components } from '@invited-only/invited-only-api';
import * as S from './GuestPhotosList.style';

interface GuestPhotosListProps {
  photosList: components['schemas']['UserPhoto'][];
}

const GuestPhotosList: FC<GuestPhotosListProps> = ({ photosList }) => {
  const [failedPhotos, setFailedPhotos] = useState<Record<number, boolean>>({});
  const [loadingPhotos, setLoadingPhotos] = useState<Record<number, boolean>>({});

  const handlePhotoLoad = (index: number) => {
    setLoadingPhotos(prev => ({
      ...prev,
      [index]: false
    }));
  };

  const handlePhotoError = (index: number) => {
    setFailedPhotos(prev => ({
      ...prev,
      [index]: true
    }));
    setLoadingPhotos(prev => ({
      ...prev,
      [index]: false
    }));
  };

  // Initialize loading state for all photos
  const validPhotos = photosList?.slice(1).filter(item => !!item?.image) || [];
  if (validPhotos.length > 0 && Object.keys(loadingPhotos).length === 0) {
    const initialLoadingState: Record<number, boolean> = {};
    validPhotos.forEach((_, index) => {
      initialLoadingState[index] = true;
    });
    setLoadingPhotos(initialLoadingState);
  }

  return (
    <S.Container>
      {validPhotos.length > 0 && (
        <S.AdditionalPhotosContainer testID="AdditionalPhotosContainer">
          {validPhotos.map((item, index) => {
            // Skip failed photos
            if (failedPhotos[index]) return null;

            return (
              <View key={index} style={{ position: 'relative' }}>
                {loadingPhotos[index] && (
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                    style={S.ActivityIndicatorStyle}
                  />
                )}
                <S.AdditionalPhoto
                  testID="AdditionalPhoto"
                  source={{ uri: item.image }}
                  onLoad={() => handlePhotoLoad(index)}
                  onError={() => handlePhotoError(index)}
                />
              </View>
            );
          })}
        </S.AdditionalPhotosContainer>
      )}
    </S.Container>
  );
};

export default GuestPhotosList;

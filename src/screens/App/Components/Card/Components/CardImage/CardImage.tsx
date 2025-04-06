import FastImage from 'react-native-fast-image';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import * as S from './CardImage.style';
import {useState} from 'react';
import React from 'react';

interface Props {
  isTopCard: boolean | undefined;
  imageSource: string | null;
  imageIndex: number;
}

const CardImage = ({imageSource, isTopCard, imageIndex}: Props) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const handleLoad = () => {
    setLoadedImages(prev => ({
      ...prev,
      [imageIndex]: true,
    }));
  };

  const isLoaded = loadedImages[imageIndex];
  return (
    <>
      {!isLoaded && (
        <S.ImageLoadingView>
          <AppLoader />
        </S.ImageLoadingView>
      )}
      <S.CardImage
        onLoad={handleLoad}
        isTop={isTopCard}
        resizeMode={FastImage.resizeMode.cover}
        source={{
          uri: imageSource,
        }}
      />
    </>
  );
};

export default CardImage;

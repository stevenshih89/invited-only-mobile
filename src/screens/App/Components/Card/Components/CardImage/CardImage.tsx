import FastImage from 'react-native-fast-image';
import React, { useState } from 'react';
import * as S from './CardImage.style';
import AppLoader from 'screens/App/AppLoader/AppLoader';


interface Props {
  isTopCard: boolean | undefined;
  imageSource: string | null;
  imageIndex: number;
}

const CardImage = ({ imageSource, isTopCard, imageIndex }: Props) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [imageErrorUris, setImageErrorUris] = useState<string[]>([]);


  const handleLoad = () => {
    setLoadedImages(prev => ({
      ...prev,
      [imageIndex]: true,
    }));
  };

  const handleError = () => {
    if (imageSource) {
      console.error('Image not available', imageSource);
      setImageErrorUris(prev => [...prev, imageSource]);
    }
  };

  const isCurrentImageError = imageSource ? imageErrorUris.includes(imageSource) : false;

  const isLoaded = loadedImages[imageIndex];
  return (
    <>
      {!isLoaded && (
        <S.ImageLoadingView>
          <AppLoader />
        </S.ImageLoadingView>
      )}
      {isCurrentImageError ? (
        <S.NoImage>
          <S.NoImageText>No image available</S.NoImageText>
        </S.NoImage>
      ) : <S.CardImage
        onLoad={handleLoad}
        onError={handleError}
        isTop={isTopCard}
        resizeMode={FastImage.resizeMode.cover}
        source={{
          uri: isCurrentImageError ? 'https://demofree.sirv.com/nope-not-here.jpg' : imageSource
        }}
      />}

    </>
  );
};

export default CardImage;

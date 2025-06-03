import React, {useState, useCallback, useEffect} from 'react';
import * as S from './CardImage.style';
import AppLoader from 'screens/App/AppLoader/AppLoader';

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds
const LOAD_TIMEOUT = 10000; // 10 seconds

interface Props {
  isTopCard: boolean | undefined;
  imageSource: string | null;
  imageIndex: number;
}

const CardImage = ({imageSource, isTopCard, imageIndex}: Props) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [imageErrorUris, setImageErrorUris] = useState<string[]>([]);
  const [retryCount, setRetryCount] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setLoadedImages(prev => ({
      ...prev,
      [imageIndex]: true,
    }));
    setIsLoading(false);
  }, [imageIndex]);

  const handleError = useCallback(() => {
    if (!imageSource) return;

    const currentRetries = retryCount[imageSource] || 0;

    if (currentRetries < MAX_RETRIES) {
      // Increment retry count
      setRetryCount(prev => ({
        ...prev,
        [imageSource]: currentRetries + 1,
      }));

      // Retry after delay
      setTimeout(() => {
        setLoadedImages(prev => ({
          ...prev,
          [imageIndex]: false,
        }));
        setIsLoading(true);
      }, RETRY_DELAY);
    } else {
      // Max retries reached, mark as error
      console.error(`Image failed to load after ${MAX_RETRIES} retries:`, imageSource);
      setImageErrorUris(prev => [...prev, imageSource]);
      setIsLoading(false);
    }
  }, [imageSource, imageIndex, retryCount]);

  // Set timeout for image loading
  useEffect(() => {
    if (!imageSource || imageErrorUris.includes(imageSource)) return;

    const timeoutId = setTimeout(() => {
      if (isLoading) {
        handleError();
      }
    }, LOAD_TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [imageSource, isLoading, imageErrorUris, handleError]);

  const isCurrentImageError = imageSource ? imageErrorUris.includes(imageSource) : false;
  const isLoaded = loadedImages[imageIndex];

  return (
    <>
      {(!isLoaded || isLoading) && (
        <S.ImageLoadingView>
          <AppLoader />
        </S.ImageLoadingView>
      )}
      {isCurrentImageError ? (
        <S.NoImage>
          <S.NoImageText>No image available</S.NoImageText>
        </S.NoImage>
      ) : (
        <S.CardImage
          onLoad={handleLoad}
          onError={handleError}
          isTop={isTopCard}
          resizeMode={'cover'}
          source={{
            uri: imageSource || 'https://demofree.sirv.com/nope-not-here.jpg',
            priority: 'high',
            cache: 'immutable',
          }}
        />
      )}
    </>
  );
};

export default CardImage;

import { FC } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';

import { components } from '@invited-only/invited-only-api';
import ModalReplacePhoto from '../ModalReplacePhoto';
import * as S from './MyPhotos.style';
import Close from 'assets/images/icons/close.svg';
import Plus from 'assets/images/icons/plus.svg';
import PencilWhiteIcon from 'assets/images/icons/pencil-white.svg';
import { useMyPhotos } from 'hooks/useMyPhotos';

interface MyPhotosProps {
  images: components['schemas']['UserPhoto'][];
  setImages: (images: components['schemas']['UserPhoto'][]) => void;
}

const MyPhotos: FC<MyPhotosProps> = ({ images, setImages }) => {
  const {
    visibleModalReplace,
    setVisibleModalReplace,
    replaceImage,
    createTapGesture,
    offsetX1,
    offsetY1,
    viewRef1,
    animatedStyles1,
    animatedStyles2,
    animatedStyles3,
    animatedStyles4,
    animatedStyles5,
    animatedStyles6,
    handleLayout,
    mainImage,
    deleteImage,
    openLibrary,
    offsetX2,
    offsetY2,
    offsetX3,
    offsetY3,
    offsetX4,
    offsetY4,
    offsetX5,
    offsetY5,
    offsetX6,
    offsetY6,
    viewRef2,
    viewRef3,
    viewRef4,
    viewRef5,
    viewRef6,
    secondImage,
    thirdImage,
    fourthImage,
    fifthImage,
    sixthImage,
  } = useMyPhotos({ images, setImages });

  const renderPhoto = (image: components['schemas']['UserPhoto'], index: number, isMain: boolean = false) => {

    const imageRefs = [viewRef1, viewRef2, viewRef3, viewRef4, viewRef5, viewRef6];
    const offsetsX = [offsetX1, offsetX2, offsetX3, offsetX4, offsetX5, offsetX6];
    const offsetsY = [offsetY1, offsetY2, offsetY3, offsetY4, offsetY5, offsetY6];
    const animatedStyles = [animatedStyles1, animatedStyles2, animatedStyles3, animatedStyles4, animatedStyles5, animatedStyles6];
    return (
      <GestureDetector key={index} gesture={createTapGesture(index + 1, offsetsX[index], offsetsY[index])}>
        <S.PhotoContainer ref={imageRefs[index]} onLayout={() => handleLayout(index + 1)} style={animatedStyles[index]}>
          {image?.image ? (
            <S.ImageContainer>
              <S.StyledImageBackground resizeMode="cover" source={{ uri: image.image || '' }}>
                <S.ButtonsContainer>
                  <S.ButtonWrapper>
                    <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                    <S.Button
                      activeOpacity={0.7}
                      hitSlop={{ left: 15, bottom: 10 }}
                      onPress={() => {
                        console.log('openLibrary');
                        openLibrary(index + 1 || 0);
                      }}>
                      <PencilWhiteIcon />
                    </S.Button>
                  </S.ButtonWrapper>
                  <S.ButtonWrapper>
                    <S.ButtonBlur blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white" />
                    <S.Button activeOpacity={0.7} hitSlop={{ left: 15, bottom: 10 }} onPress={() => deleteImage(index + 1 || 0)}>
                      <Close />
                    </S.Button>
                  </S.ButtonWrapper>
                </S.ButtonsContainer>
              </S.StyledImageBackground>
            </S.ImageContainer>
          ) : (
            <S.PlusButton activeOpacity={0.7} onPress={() => openLibrary(index + 1 || 0)}>
              <Plus />
            </S.PlusButton>
          )}
          <S.LabelContainer>
            <S.LabelBlur blurType="chromeMaterialDark" blurAmount={10} reducedTransparencyFallbackColor="white" />
            <S.LabelText>{isMain ? 'Main' : (index + 1).toString()}</S.LabelText>
          </S.LabelContainer>
        </S.PhotoContainer>
      </GestureDetector>
    );
  };

  return (
    <S.StyledRadialGradient
      colors={['rgba(26, 26, 26, 0.40)', 'rgba(0, 0, 0, 0.00)', 'rgba(255, 255, 255, 0.07)']}
      stops={[0, 0.695, 1]}
      center={[220, -386]}
      radius={400}>
      <ModalReplacePhoto isVisible={visibleModalReplace} onClose={() => setVisibleModalReplace(false)} replaceImage={replaceImage} />
      <S.Title>Your photos</S.Title>
      <S.PhotosGrid>
        <S.Row>
          {renderPhoto(mainImage, 0, true)}
          {renderPhoto(secondImage, 1)}
        </S.Row>
        <S.Row>
          {renderPhoto(thirdImage, 2)}
          {renderPhoto(fourthImage, 3)}
        </S.Row>
        <S.Row>
          {renderPhoto(fifthImage, 4)}
          {renderPhoto(sixthImage, 5)}
        </S.Row>
      </S.PhotosGrid>
    </S.StyledRadialGradient>
  );
};

export default MyPhotos;

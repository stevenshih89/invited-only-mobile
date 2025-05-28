import React, {FC, useState} from 'react';
import FastImage from 'react-native-fast-image';
import * as S from './ProfileSlider.style';
import CheckIcon from 'assets/images/icons/check-star-white.svg';

interface ProfileSliderProps {
  photos: string[];
  userName: string;
  userAge: string;
  isConfirmed: boolean;
}

const ProfileSlider: FC<ProfileSliderProps> = ({photos, userName, userAge, isConfirmed}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <S.Container>
      <S.ImageContainer>
        <FastImage
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
          }}
          source={{
            uri: photos[currentIndex],
          }}
          resizeMode={'cover'}
        />
        {photos.length > 1 && (
          <>
            <S.LeftTouchArea testID="left-touch-area" onPress={handlePrevious} />
            <S.RightTouchArea testID="right-touch-area" onPress={handleNext} />
          </>
        )}
        <S.GradientOverlay colors={['transparent', 'rgba(0, 0, 0, 0.9)']} locations={[0, 1]} pointerEvents="none" />
        <S.ContentContainer>
          {photos.length > 1 && (
            <S.DotsContainer>
              {photos.map((_, index) => (
                <S.Dot testID="slider-dot" key={index} isActive={index === currentIndex} />
              ))}
            </S.DotsContainer>
          )}
          <S.UserInfoContainer>
            {isConfirmed && (
              <CheckIcon
                testID="check-icon"
                width={24}
                height={24}
                style={{
                  marginRight: 12,
                }}
              />
            )}
            <S.UserName>{userName},</S.UserName>
            <S.UserAge>{userAge}</S.UserAge>
          </S.UserInfoContainer>
        </S.ContentContainer>
      </S.ImageContainer>
    </S.Container>
  );
};

export default ProfileSlider;

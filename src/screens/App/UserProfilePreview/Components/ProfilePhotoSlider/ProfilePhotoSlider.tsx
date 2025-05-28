import React, {FC, useState} from 'react';
import * as S from './ProfilePhotoSlider.style';
import CheckIcon from 'assets/images/icons/check-star-white.svg';
import Card from 'screens/App/Components/Card/Card';
import {parseStringToDate} from 'helpers/genericDateFormater';

interface ProfileSliderProps {
  photos: string[];
  userName: string;
  userBirthday: string;
  isConfirmed: boolean;
  isShowAge: boolean;
}

const ProfileSlider: FC<ProfileSliderProps> = ({photos, userName, userBirthday, isConfirmed, isShowAge}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const calculateBirthday = (birthday: string | undefined): number => {
    const parsedBirthday = parseStringToDate(birthday);
    if (!parsedBirthday) return 0;
    const today = new Date();
    const birthDate = new Date(parsedBirthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const userAge = calculateBirthday(userBirthday);

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
      <Card
        isStatic
        withDarkOverlay={false}
        backgroundUrls={photos.map(photo => ({image: photo}))}
        index={currentIndex}
        distanceFromTop={0}
        isTopCard
        uid={''}>
        <S.LeftTouchArea testID="left-touch-area" onPress={handlePrevious} />
        <S.LeftTouchArea testID="left-touch-area" onPress={handlePrevious} />
        <S.RightTouchArea testID="right-touch-area" onPress={handleNext} />
        <S.GradientOverlay colors={['transparent', 'rgba(0, 0, 0, 0.9)']} locations={[0, 1]} pointerEvents="none" />
        <S.ContentContainer>
          <S.DotsContainer>
            {photos.map((_, index) => (
              <S.Dot testID="slider-dot" key={index} isActive={index === currentIndex} />
            ))}
          </S.DotsContainer>
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
            <S.UserName>
              {userName}
              {isShowAge ? ', ' : ''}
            </S.UserName>
            {isShowAge && <S.UserAge>{userAge}</S.UserAge>}
          </S.UserInfoContainer>
        </S.ContentContainer>
      </Card>
    </S.Container>
  );
};

export default ProfileSlider;

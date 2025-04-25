import React from 'react';
import * as S from './SuccessfullySubmitted.style';
import CheckIcon from 'assets/images/icons/check-star-white.svg';
import { useAppNavigation } from 'hooks/useAppNavigation';
import Button from 'components/Button/Button';
import { screenHeight } from 'constants/common';
import useUser from 'hooks/user/useUser';

const SuccessfullySubmitted = () => {
  const { user: userData } = useUser();
  const navigation = useAppNavigation();

  const handleContinue = () => {
    navigation.goBack();
  };

  return (
    <>
      <S.Title>You Got Access</S.Title>
      <S.Subtitle>Congratulations and welcome aboard!</S.Subtitle>
      <S.ImageContainer>
        <S.UserImage source={{ uri: userData?.photos[0]?.image || '' }} />
        <S.BadgeContainer>
          <S.BadgeContent>
            <S.BadgeBlur blurType="dark" />
            <S.BadgeText>{userData?.name}</S.BadgeText>
            <CheckIcon />
          </S.BadgeContent>
        </S.BadgeContainer>
      </S.ImageContainer>
      <Button
        buttonStyle={{
          position: 'absolute',
          bottom: screenHeight / 19,
          width: '80%',
          marginTop: screenHeight / 10,
        }}
        title="Continue"
        onPress={handleContinue}
      />
    </>
  );
};

export default SuccessfullySubmitted;

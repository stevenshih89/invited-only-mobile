import React, { FC, JSX } from 'react';
import { Keyboard } from 'react-native';
import { useVerifyStep } from './hooks/useVerifyStep';
import * as S from './VerifyFirstStep.style';
import { useAppNavigation } from 'hooks/useAppNavigation';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import Button from 'components/Button/Button';
import { screenHeight, screenWidth } from 'constants/common';

const VerifySecondStep: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const { imageUri, handleNext, handleSkip, isLoading, openCamera, selfieSource, setImageUri, gender } = useVerifyStep();

  return (
    <S.Background>
      <S.AvoidingView>
        <S.DismissTouchable onPress={Keyboard.dismiss}>
          <S.SafeArea>
            <S.Container>
              <S.Centered>
                <S.HeaderRow>
                  <S.BackButton onPress={() => navigation.goBack()}>
                    <ArrowLeft />
                  </S.BackButton>
                  <LogoPrimary2 />
                  <S.Spacer />
                </S.HeaderRow>
                <S.TitleWrapper>
                  {imageUri ? (
                    <>
                      <S.SectionHeader>
                        <S.SectionTitle>Your photo</S.SectionTitle>
                        <S.SectionSubtitle>Make sure your face is clearly visible.</S.SectionSubtitle>
                      </S.SectionHeader>
                      <S.ImageContainer height={screenHeight / 2.5}>
                        <S.PhotoBackground source={{ uri: imageUri }}></S.PhotoBackground>
                      </S.ImageContainer>
                    </>
                  ) : (
                    <>
                      <S.SectionHeader>
                        <S.SectionTitle>Verify yourself</S.SectionTitle>
                        <S.SectionSubtitle>Copy this position. Your face must be clearly visible.</S.SectionSubtitle>
                      </S.SectionHeader>
                      <S.ImageContainer height={screenWidth / 1.15}>
                        <S.SelfieBackground source={selfieSource}></S.SelfieBackground>
                      </S.ImageContainer>
                    </>
                  )}
                </S.TitleWrapper>
              </S.Centered>
              {imageUri ? (
                <S.Footer>
                  <Button title="Submit" onPress={handleNext} loading={isLoading} />
                  <Button
                    variant="gray"
                    onPress={async () => {
                      if (isLoading) return;
                      setImageUri('');
                      await openCamera();
                    }}
                    title="Retake photo"
                  />
                </S.Footer>
              ) : (
                <S.Footer>
                  <Button testID="take-photo-button" onPress={openCamera} title="Take a photo" />
                </S.Footer>
              )}
            </S.Container>
          </S.SafeArea>
        </S.DismissTouchable>
      </S.AvoidingView>
    </S.Background>
  );
};

export default VerifySecondStep;

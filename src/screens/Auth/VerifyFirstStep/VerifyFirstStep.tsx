import React, { FC, JSX } from 'react';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import { useVerifyStep } from './hooks/useVerifyStep';
import * as S from './VerifyFirstStep.style';
import { screenHeight, screenWidth } from 'constants/common';

const VerifySecondStep: FC = (): JSX.Element => {
  const { handleNext, isLoading, openCamera, selfieSource, imageUri, setImageUri } = useVerifyStep();
  return (
    <CommonAuthLayout
      title={imageUri ? 'Your photo' : 'Verify yourself'}
      subtitle={imageUri ? 'Make sure your face is clearly visible.' : 'Copy this position. Your face must be clearly visible.'}
      continueButtonTitle={imageUri ? 'Submit' : 'Take a photo'}
      continueButtonTestID="continue-button"
      onContinuePress={() => {
        if (isLoading) return;
        if (imageUri) {
          handleNext();
        } else {
          setImageUri("No photo")
          handleNext();
          // openCamera();
        }
      }}
      continueButtonDisabled={isLoading}
      withKeyboard={false}
      skipButtonTitle={imageUri ? 'Retake photo' : ''}
      onSkipPress={
        imageUri
          ? async () => {
            if (isLoading) return;
            setImageUri('');
            await openCamera();
          }
          : undefined
      }>
      <S.Centered>
        {imageUri ? (
          <>
            <S.ImageContainer height={screenHeight / 2.5}>
              <S.PhotoBackground source={{ uri: imageUri }}></S.PhotoBackground>
            </S.ImageContainer>
          </>
        ) : (
          <>
            <S.ImageContainer height={screenWidth / 1.15}>
              <S.SelfieBackground source={selfieSource}></S.SelfieBackground>
            </S.ImageContainer>
          </>
        )}
      </S.Centered>
    </CommonAuthLayout>
  );
};

export default VerifySecondStep;

import React from 'react';
import * as S from './PhotoVerified.style';
import {usePhotoVerified} from './hooks/usePhotoVerified';
import {useRotationAnimation} from './hooks/useRotationAnimation';
import Loader from 'assets/images/auth/loader.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';

const PhotoVerified = () => {
  const {imageUri} = usePhotoVerified();
  const {animatedStyle} = useRotationAnimation();

  return (
    <S.RootGradient>
      <S.SafeArea>
        <S.Container>
          <S.LogoWrapper>
            <LogoPrimary2 />
          </S.LogoWrapper>
          <S.PhotoWrapper>
            <S.VerifiedIcon>
              <CheckStarIcon width={36} height={36} />
            </S.VerifiedIcon>
            <S.VerifiedImage testID="photo-verified-image" source={{uri: imageUri}} />
          </S.PhotoWrapper>
          <S.Description>Congratulations! Your photo has been successfully verified. Welcome aboard!</S.Description>
          <S.LoaderWrapper testID="photo-verified-loader" style={animatedStyle}>
            <Loader width={90} height={90} />
          </S.LoaderWrapper>
        </S.Container>
      </S.SafeArea>
    </S.RootGradient>
  );
};

export default PhotoVerified;

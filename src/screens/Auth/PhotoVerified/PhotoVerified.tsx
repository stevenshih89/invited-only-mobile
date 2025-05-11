import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import { useVerifyingAnimation } from './hooks/useVerifyingAnimation';
import * as S from './PhotoVerified.style';
import { usePhotoVerified } from './hooks/usePhotoVerified';
import { whiteColor } from 'constants/colors';

const LoadingPayment = () => {
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const { imageUri } = usePhotoVerified();
  const { animatedStyle, SIZE, STROKE_WIDTH, RADIUS, CIRCUMFERENCE, ARC_LENGTH } = useVerifyingAnimation();

  return (
    <S.Root>
      <S.CenterContainer>
        <AnimatedSvg width={SIZE} height={SIZE} style={animatedStyle}>
          <Circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} stroke={'#232323'} strokeWidth={STROKE_WIDTH} fill="none" />
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={whiteColor}
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={`${ARC_LENGTH},${CIRCUMFERENCE - ARC_LENGTH}`}
            strokeLinecap="round"
          />
        </AnimatedSvg>
        <S.StyledImage size={SIZE} source={{ uri: imageUri }} />
      </S.CenterContainer>
      <S.Title>Verifying your photo</S.Title>
      <S.Subtitle>Wait just a moment we are verifying your photo.</S.Subtitle>
    </S.Root>
  );
};

export default LoadingPayment;

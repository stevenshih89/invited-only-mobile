import React from 'react';
import Svg, {Circle} from 'react-native-svg';
import Animated from 'react-native-reanimated';
import {useLoadingAnimation} from './hooks/useLoadingAnimation';
import * as S from './LoadingPayment.style';
import {whiteColor} from 'constants/colors';

const LoadingPayment = () => {
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const {animatedStyle, SIZE, STROKE_WIDTH, RADIUS, CIRCUMFERENCE, ARC_LENGTH} = useLoadingAnimation();

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
        <S.StyledImage size={SIZE} source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} />
      </S.CenterContainer>
      <S.Title>Loading...</S.Title>
      <S.Subtitle>{`Securing youe spot to become\na Premium Host`}</S.Subtitle>
    </S.Root>
  );
};

export default LoadingPayment;

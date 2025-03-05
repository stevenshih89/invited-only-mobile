import React, {FC, useEffect} from 'react';
import Subtract from 'src/assets/images/icons/subtract.svg';
import CheckStarIcon from 'src/assets/images/icons/check-star.svg';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming} from 'react-native-reanimated';
import {screenHeight} from 'constants/common';
import * as S from './Loading.style';

interface LoadingProps {
  text?: string;
  userInfo: any;
  topPosition?: boolean;
  wrapperText?: boolean;
  styleContainer?: any;
  showCheckIcon?: boolean;
  styleInnerContainer?: any;
  textStyle?: any;
}

const Loading: FC<LoadingProps> = ({
  text,
  userInfo,
  topPosition = false,
  wrapperText = true,
  styleContainer,
  showCheckIcon = false,
  styleInnerContainer,
  textStyle,
}) => {
  const firstCircleScale = useSharedValue(0.9);
  const secondCircleScale = useSharedValue(0.9);

  const animatedFirstCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: firstCircleScale.value}],
    };
  });
  const animatedSecondCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: secondCircleScale.value}],
    };
  });

  useEffect(() => {
    firstCircleScale.value = withDelay(
      1200,
      withRepeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      ),
    );
    secondCircleScale.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  return (
    <S.ContainerStyled style={styleContainer}>
      <S.InnerContainer style={styleInnerContainer}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              backgroundColor: '#222222',
              borderRadius: 500,
              alignItems: 'center',
              justifyContent: 'center',
            },
            animatedFirstCircleStyle,
            {top: topPosition ? 0 : screenHeight / 2 - 390, height: topPosition ? 360 : 380, width: topPosition ? 360 : 380},
          ]}
        />
        <Animated.View
          style={[
            {
              position: 'absolute',
              backgroundColor: '#454545',
              borderRadius: 500,
              alignItems: 'center',
              justifyContent: 'center',
            },
            animatedSecondCircleStyle,
            {top: topPosition ? 10 : screenHeight / 2 - 380, height: topPosition ? 340 : 360, width: topPosition ? 340 : 360},
          ]}
        />
        <S.WhiteCircle
          style={{
            top: topPosition ? 35 : screenHeight / 2 - 365,
            height: topPosition ? 290 : 330,
            width: topPosition ? 290 : 330,
          }}>
          {userInfo?.photos && <S.FastImageStyled resizeMode="cover" source={{uri: userInfo?.photos[0]?.image}} />}
        </S.WhiteCircle>
        {wrapperText ? (
          <>
            <S.SubtractWrapper>
              <Subtract />
            </S.SubtractWrapper>
            <S.TextWrapperAbsolute>
              <S.TextContainer>
                <S.RowView>
                  <S.TextStyled style={textStyle}>{text}</S.TextStyled>
                  {showCheckIcon && <CheckStarIcon style={{marginLeft: 6}} />}
                </S.RowView>
              </S.TextContainer>
            </S.TextWrapperAbsolute>
          </>
        ) : (
          <S.TextWrapperAbsolute>
            <S.TextContainerAbsolute>
              <S.TextStyledAbsolute style={textStyle}>{text}</S.TextStyledAbsolute>
            </S.TextContainerAbsolute>
          </S.TextWrapperAbsolute>
        )}
      </S.InnerContainer>
    </S.ContainerStyled>
  );
};

export default Loading;

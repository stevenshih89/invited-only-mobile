import React, {FC, useEffect} from 'react';
import {Text, View} from 'react-native';
import useStyles from 'components/Loading/styles.ts';
import Subtract from 'src/assets/images/icons/subtract.svg';
import CheckStarIcon from 'src/assets/images/icons/check-star.svg';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming} from 'react-native-reanimated';
import {screenHeight, screenWidth} from 'constants/common';
import {blackColor, whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const styles = useStyles();

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
    <View style={[styles.container, styleContainer]}>
      <View style={[{alignItems: 'center', flex: 1}, styleInnerContainer]}>
        <Animated.View
          style={[
            styles.firstCircle,
            animatedFirstCircleStyle,
            {top: topPosition ? 0 : screenHeight / 2 - 390, height: topPosition ? 360 : 380, width: topPosition ? 360 : 380},
          ]}
        />
        <Animated.View
          style={[
            styles.secondCircle,
            animatedSecondCircleStyle,
            {top: topPosition ? 10 : screenHeight / 2 - 380, height: topPosition ? 340 : 360, width: topPosition ? 340 : 360},
          ]}
        />
        <View
          style={[
            styles.whiteCircle,
            {top: topPosition ? 35 : screenHeight / 2 - 365, height: topPosition ? 290 : 330, width: topPosition ? 290 : 330},
          ]}>
          {userInfo?.photos && (
            <FastImage resizeMode="cover" style={{width: 180, height: 180, borderRadius: 100}} source={{uri: userInfo?.photos[0]?.image}} />
          )}
        </View>
        {text && (
          <>
            {wrapperText ? (
              <>
                <View style={{position: 'absolute', top: screenHeight / 2 - 40}}>
                  <Subtract />
                </View>
                <View style={{alignItems: 'center', position: 'absolute', top: screenHeight / 2 - 10}}>
                  <View
                    style={{
                      backgroundColor: whiteColor,
                      borderRadius: 17,
                      paddingHorizontal: 22,
                      paddingVertical: 11,
                      marginTop: -8,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          color: blackColor,
                          fontSize: RFValue(18, 812),
                          fontFamily: Satoshi500,
                          textAlign: 'center',
                          opacity: 0.8,
                          ...textStyle,
                        }}>
                        {text}
                      </Text>
                      {showCheckIcon && <CheckStarIcon style={{marginLeft: 6}} />}
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <View style={{alignItems: 'center', position: 'absolute', top: screenHeight / 2 - 10}}>
                <View
                  style={{
                    width: screenWidth - 32,
                    marginTop: 20,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontSize: RFValue(18, 812),
                      fontFamily: Satoshi400,
                      textAlign: 'center',
                      opacity: 0.8,
                      ...textStyle,
                    }}>
                    {text}
                  </Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Loading;

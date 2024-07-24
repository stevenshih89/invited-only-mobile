import React, {FC, useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import useStyles from 'components/Loading/styles.ts';
import Subtract from 'src/assets/images/icons/subtract.svg';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming} from 'react-native-reanimated';
import {screenHeight} from 'constants/common';

interface LoadingProps {
  text?: string;
  userInfo: any;
  topPosition: boolean;
}

const Loading: FC<LoadingProps> = ({text, userInfo, topPosition}) => {
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
    <View style={styles.container}>
      <View style={{alignItems: 'center', flex: 1}}>
        {/* <View style={{flex:, backgroundColor: 'red', width: 400}}>

        </View> */}
        <Animated.View
          style={[
            styles.firstCircle,
            animatedFirstCircleStyle,
            {top: topPosition ? 0 : screenHeight / 2 - 390, height: topPosition ? 370 : 390, width: topPosition ? 370 : 390},
          ]}
        />
        <Animated.View
          style={[
            styles.secondCircle,
            animatedSecondCircleStyle,
            {top: topPosition ? 10 : screenHeight / 2 - 380, height: topPosition ? 350 : 370, width: topPosition ? 350 : 370},
          ]}
        />
        <View
          style={[
            styles.whiteCircle,
            {top: topPosition ? 35 : screenHeight / 2 - 365, height: topPosition ? 300 : 340, width: topPosition ? 300 : 340},
          ]}>
          {userInfo.photos && <Image style={{width: 180, height: 180, borderRadius: 100}} source={{uri: userInfo?.photos[0]?.image}} />}
        </View>
        {text && (
          <>
            <View style={{position: 'absolute', top: screenHeight / 2 - 30}}>
              <Subtract />
            </View>
            <View style={{alignItems: 'center', position: 'absolute', top: screenHeight / 2 - 10}}>
              <View style={styles.textWrapper}>
                <Text style={styles.textInner}>{text}</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Loading;

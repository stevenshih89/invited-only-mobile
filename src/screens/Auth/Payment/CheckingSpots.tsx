import {black1Color, whiteColor} from 'constants/colors';
import {Text} from 'react-native';
import {SafeAreaView, View} from 'react-native';
import LoaderIcon from 'assets/images/auth/loader.svg';
import {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {paymentPath} from 'constants/pathLocations';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight} from 'constants/common';

export const CheckingSpots = () => {
  const navigation = useAppNavigation();

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      100,
    );
  }, [rotation]);

  useFocusEffect(
    useCallback(() => {
      let timer;
      timer = setTimeout(() => {
        navigation.navigate(paymentPath as never);
      }, 3000);
      return () => clearTimeout(timer);
    }, []),
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: black1Color}}>
      <View style={{flex: 1, paddingHorizontal: 24}}>
        <Animated.View style={[animatedStyle, {width: 90, height: 90, alignSelf: 'center', marginTop: 40}]}>
          <LoaderIcon width={90} height={90} />
        </Animated.View>
        <Text style={{fontFamily: Satoshi400, fontSize: RFValue(18, 812), color: whiteColor, marginTop: 20}}>
          Checking for available spots...{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
};

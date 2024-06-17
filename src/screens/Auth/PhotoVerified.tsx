import {AuthContext} from 'contexts/AuthContext';
import {useCallback, useContext, useEffect} from 'react';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import Loader from 'assets/images/auth/loader.svg';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {black1Color, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {screenHeight} from 'constants/common';
import {useFocusEffect} from '@react-navigation/native';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {summaryInfoPath} from 'constants/pathLocations';

const PhotoVerified = () => {
  const {onBoarding} = useContext(AuthContext);
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
        navigation.navigate(summaryInfoPath as never);
      }, 3000);
      return () => clearTimeout(timer);
    }, []),
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  });

  const imageUri = onBoarding.find((item: {imageUser: string}) => item.imageUser)?.imageUser;

  return (
    <SafeAreaView style={{flex: 1, paddingBottom: 0, backgroundColor: black1Color}}>
      <View style={{paddingHorizontal: 24, flex: 1}}>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <LogoPrimary2 />
        </View>
        <View
          style={{
            marginTop: screenHeight / 10,
            alignSelf: 'center',
            width: 180,
            height: 180,
            position: 'relative',
          }}>
          <CheckStarIcon style={{position: 'absolute', top: 10, right: 10, zIndex: 10}} width={36} height={36} />
          <Image source={{uri: imageUri}} style={{width: 180, height: 180, borderRadius: 180}} />
        </View>
        <Text style={{textAlign: 'center', fontFamily: Satoshi400, fontSize: RFValue(18, 812), color: whiteColor, marginTop: 20}}>
          Congratulations! Your photo has been successfully verified. Welcome aboard!
        </Text>
        <Animated.View style={[animatedStyle, {width: 90, height: 90, alignSelf: 'center', marginTop: 40}]}>
          <Loader width={90} height={90} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default PhotoVerified;

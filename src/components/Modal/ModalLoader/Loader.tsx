import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import LoaderIcon from 'assets/images/icons/loader.svg';
import CheckBlackIcon from 'assets/images/icons/Check-black.svg';
import LogoIcon from 'assets/images/icons/logo.svg';
import { blackColor, lightGray10Color, whiteColor } from 'constants/colors';
import Modal from 'react-native-modal';
import { Outfit500, Satoshi400, Satoshi700Italic } from 'constants/fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { FC, useEffect, useRef } from 'react';
import { screenHeight } from 'constants/common';
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle, withRepeat, cancelAnimation } from 'react-native-reanimated';

interface LoaderProps {
  isVisible: boolean;
  textLoader?: string;
  successfulPay: boolean;
}

const Loader: FC<LoaderProps> = ({
  isVisible,
  textLoader,
  successfulPay
}, props) => {

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1
    );

    return () => {
      cancelAnimation(rotation);
    };
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Modal
      isVisible={isVisible}
      coverScreen
      animationInTiming={1}
      backdropColor={blackColor}
      backdropOpacity={1}
      style={{ margin: 0 }}
    //   onBackdropPress={onCloseSuperInvite}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 24, justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ marginTop: 40 }}>
            <LogoIcon />
          </View>
          <View style={{ alignItems: 'center' }}>
            {successfulPay &&
              <View style={{ alignItems: 'center' }}>
                <View style={{ width: 125, height: 125, borderRadius: 125, backgroundColor: whiteColor, justifyContent: 'center', alignItems: 'center' }}>
                  <CheckBlackIcon width={48} height={48} />
                </View>
                <Text style={{ color: whiteColor, textAlign: 'center', fontSize: RFValue(20, 812), fontFamily: Satoshi400, marginTop: 10 }}>
                  Congratulations! You've secured your spot and become a Premium Host
                </Text>
              </View>}
            {!successfulPay && <Animated.View style={[animatedStyle]}>
              <LoaderIcon />
            </Animated.View>}
            <Text style={{ color: whiteColor, fontSize: RFValue(20, 812), fontFamily: Satoshi400, marginTop: 24 }}>{textLoader}</Text>
          </View>
          <View></View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Loader;

import {blackColor, whiteColor} from 'constants/colors';
import {Text, View, SafeAreaView, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import Flash from 'assets/images/icons/flash-filled.svg';
import {Outfit500, Satoshi700Italic} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight} from 'constants/common';
import {FC, useEffect} from 'react';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, Easing, withDelay} from 'react-native-reanimated';

const widthScreen = Dimensions.get('screen').width;

const SuperInvite: FC<{isVisibleMatch: boolean; nameEvent: string; imageEvent: string}> = ({isVisibleMatch, nameEvent, imageEvent}) => {
  const opacityWrapper = useSharedValue(0);
  const imagePosition = useSharedValue(-200);
  const textSize = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const figurePositin = useSharedValue(-screenHeight * 0.34 - 100);
  const buttonPosition = useSharedValue(-1000);

  const animatedOpacityWrapper = () => {
    opacityWrapper.value = withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.linear),
    });
  };

  const animatedImages = () => {
    imagePosition.value = withTiming(0, {
      duration: 800,
      easing: Easing.bezier(0, 0.1, 0, 1),
    });
  };

  const animatedText = () => {
    textSize.value = withDelay(
      750,
      withTiming(46, {
        duration: 800,
        easing: Easing.bezier(0.25, 0.5, 0.25, 1),
      }),
    );
  };

  const animTextOpacity = () => {
    textOpacity.value = withDelay(
      900,
      withTiming(1, {
        duration: 200,
      }),
    );
  };

  const animateFigure = () => {
    figurePositin.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
  };

  const animateButtons = () => {
    buttonPosition.value = withDelay(
      800,
      withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      }),
    );
  };

  useEffect(() => {
    if (isVisibleMatch) {
      animatedOpacityWrapper();
      animatedImages();
      animatedText();
      animTextOpacity();
      animateFigure();
      animateButtons();
    }
  }, [isVisibleMatch]);

  const figureTopStyle = useAnimatedStyle(() => ({
    top: figurePositin.value,
  }));

  const figureBottomStyle = useAnimatedStyle(() => ({
    bottom: figurePositin.value,
  }));

  const opacityWrapperStyle = useAnimatedStyle(() => ({
    opacity: opacityWrapper.value,
  }));

  const leftImageStyle = useAnimatedStyle(() => ({
    transform: [{translateX: imagePosition.value}],
  }));

  return (
    <View>
      <Modal
        isVisible={isVisibleMatch}
        coverScreen
        backdropOpacity={1}
        backdropColor={blackColor}
        backdropTransitionInTiming={1000}
        animationIn={'fadeIn'}
        animationInTiming={1}>
        <SafeAreaView style={{flex: 1}}>
          <Animated.View style={[{flex: 1, justifyContent: 'space-between'}, opacityWrapperStyle]}>
            <View>
              <Animated.View
                style={[
                  {
                    backgroundColor: whiteColor,
                    width: 141,
                    height: screenHeight * 0.2,
                    position: 'absolute',
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  },
                  figureTopStyle,
                ]}>
                <View
                  style={{
                    width: 106,
                    height: 106,
                    borderRadius: 100,
                    backgroundColor: 'black',
                    marginBottom: 38,
                  }}
                />
              </Animated.View>
            </View>
            <Animated.View
              style={[
                {flexDirection: 'column', marginTop: screenHeight / 20, paddingHorizontal: 20, alignItems: 'center', width: '100%'},
                opacityWrapperStyle,
              ]}>
              <View style={{marginTop: -50, flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'flex-end'}}>
              <Text

                    style={[
                      {
                        color: whiteColor,
                        fontFamily: Outfit500,
                        fontSize: nameEvent?.length > 10? RFValue(36, 812): RFValue(42, 812),
                        letterSpacing: -5,
                        lineHeight: 55,
                        // textAlign: 'center',
                        // marginBottom: screenHeight / 20,
                      },
                    ]}>
                    {nameEvent}
                  </Text>
                <Text style={{color: whiteColor, position: 'absolute', right: 0, bottom: -10, fontSize: RFValue(13, 812)}}>Event</Text>
              </View>
              <View>
                <Animated.Image source={{uri: imageEvent}} style={[{width: 215, height: 215, borderRadius: 215}, leftImageStyle]} />
              </View>
              <View style={{marginTop: 25}}>
                <Flash width={70} height={70} />
              </View>
              <Text style={{fontSize: RFValue(35, 812), color: whiteColor, fontFamily: Satoshi700Italic}}>Super Join</Text>
            </Animated.View>
            <View style={{alignItems: 'flex-end'}}>
              <Animated.View
                style={[
                  {
                    backgroundColor: whiteColor,
                    width: 141,
                    height: screenHeight * 0.2,
                    position: 'absolute',
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  },
                  figureBottomStyle,
                ]}>
                <View
                  style={{
                    width: 106,
                    height: 106,
                    borderRadius: 100,
                    backgroundColor: 'black',
                    marginTop: 38,
                  }}
                />
              </Animated.View>
            </View>
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default SuperInvite;


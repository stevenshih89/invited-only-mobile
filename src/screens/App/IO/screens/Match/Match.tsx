import { lightGray10Color, transparentGray60Color, whiteColor } from 'constants/colors';
import { Text, TouchableOpacity, View, Image, SafeAreaView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import FakeGirlCircle from 'assets/images/app/fake-girl-circle.png';
import FakePlaceCircle from 'assets/images/app/fake-place-circle.png';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import Close from 'assets/images/icons/close.svg';
import Button from 'components/Button/Button';
import { Satoshi400 } from 'constants/fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenHeight } from 'constants/common';
import { FC, useEffect, useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withDelay } from 'react-native-reanimated';

const widthScreen = Dimensions.get('screen').width;

const Match: FC<{ isVisibleMatch: boolean; onCloseMatch: () => void; name: string }> = ({ isVisibleMatch, onCloseMatch, name }) => {

  const opacityWrapper = useSharedValue(0);
  const imagePosition = useSharedValue(-200 - (widthScreen / 15.5));
  const textSize = useSharedValue(0);
  const textOpacity = useSharedValue(0);  

  const words = `wants to join you!`.split(' ');
  const wordTranslations = words.map(() => useSharedValue(widthScreen));
  const nameAnimation = useSharedValue(widthScreen)

  const animatedOpacityWrapper = () => {
    opacityWrapper.value = withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.linear),
    });
  }

  const animatedImages = () => {
    imagePosition.value = withTiming(0, {
      duration: 800,
      easing: Easing.bezier(0, 0.1, 0, 1)
    });
  }

  const animatedText = () => {
    textSize.value = withDelay(750, withTiming(34, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.50, 0.25, 1)
    }));
  }

  const animTextOpacity = () => {
    textOpacity.value = withDelay(900, withTiming(1, {
      duration: 200
    }));
  }

  const animateWords = () => {
    setTimeout(() => {
      wordTranslations.forEach((wordTranslation, index) => {
        wordTranslation.value = withDelay((index + 1) * 100, withTiming(0, {
          duration: 500,
          easing: Easing.out(Easing.cubic)
        }));
      });
    },300)
  }

  const animateName = () => {
    setTimeout(() => {
      nameAnimation.value = withDelay(0, withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.cubic)
      }));
    },300)
  }

  useEffect(() => {
    if (isVisibleMatch) {
      animatedOpacityWrapper();
      animatedImages();
      animatedText();
      animTextOpacity();
      animateWords();
      animateName()
    }
  }, [isVisibleMatch]);

  return (
    <View>
      <Modal
        isVisible={isVisibleMatch}
        coverScreen
        backdropOpacity={0.97}
        onBackdropPress={onCloseMatch}
        backdropColor={lightGray10Color}
        backdropTransitionInTiming={1000}
        animationIn={'fadeIn'}
        animationInTiming={1}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.View style={{ opacity: opacityWrapper,flex: 1, justifyContent: 'space-between'}}>
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onCloseMatch}
                style={{
                  borderRadius: 100,
                  backgroundColor: transparentGray60Color,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                  alignSelf: 'flex-end',
                }}
              >
                <Close />
              </TouchableOpacity>
              <LogoPrimary width={200} style={{ alignSelf: 'center', marginTop: screenHeight / 30 }} />
            </View>
            <Animated.View style={[{ flexDirection: 'row', width: '100%', height: 200 }, { opacity: opacityWrapper }]}>
              {/* <Animated.View style={[{ width: 200, height: 200, borderRadius: 100, backgroundColor: 'red', position: 'absolute', }, { left: imagePosition }]}></Animated.View> */}
              {/* <Animated.View style={[{ width: 200, height: 200, borderRadius: 100, backgroundColor: 'blue', position: 'absolute', }, { right: imagePosition }]}></Animated.View> */}
              <Animated.Image source={FakePlaceCircle} style={[{ width: 200, height: 200, position: 'absolute', }, { left: imagePosition }]} />
              <Animated.Image source={FakeGirlCircle} style={[{ width: 200, height: 200, position: 'absolute', }, { right: imagePosition }]} />
            </Animated.View>
            <View>
              <Animated.Text
                style={{
                  height: 50,
                  color: whiteColor,
                  fontFamily: Satoshi400,
                  opacity: textOpacity,
                  fontSize: textSize,
                  textAlign: 'center',
                  marginBottom: screenHeight / 30,
                }}
              >
                New invite match!
              </Animated.Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Animated.Text style={[
                  {color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(18, 812),
                    marginRight: 5,},
                    useAnimatedStyle(() => ({
                      transform: [{ translateX: nameAnimation.value }]
                    }))
                ]}>
                  {name}
                </Animated.Text>
                {words.map((word, index) => (
                  <Animated.Text
                    key={index}
                    style={[
                      {
                        color: whiteColor,
                        fontFamily: Satoshi400,
                        fontSize: RFValue(18, 812),
                        marginRight: 5,
                        textAlign: 'center',
                        marginBottom: screenHeight / 20
                      },
                      useAnimatedStyle(() => ({
                        transform: [{ translateX: wordTranslations[index].value }]
                      }))
                    ]}
                  >
                   {word}
                  </Animated.Text>
                ))}
              </View>
              <Button onPress={onCloseMatch} title="Approve invitation" />
              <Button onPress={onCloseMatch} title="Continue swiping" variant="transparent" />
            </View>
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Match;



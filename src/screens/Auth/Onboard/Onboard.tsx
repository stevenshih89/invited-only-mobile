import React, {FC, useContext, useEffect} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ViewBase} from 'react-native';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import WelcomeBcgCards from 'assets/images/auth/welcom-screen-cards.png';
import BgDottedLineLeft from 'assets/images/auth/background-dotted-line-left.png';
import BgDottedLineRight from 'assets/images/auth/background-dotted-right.png';
import {backgroundGradientColors, lightGray19Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {eulaPath} from 'constants/pathLocations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'components/Button/Button';
import {AuthContext} from 'contexts/AuthContext';
import * as S from './Onboard.style';
import {openLink} from 'helpers/links';

const backgroundCardsStyle = StyleSheet.create({
  rotatedImage: {
    // These values match your provided measurements; feel free to adjust or round them
    width: 400,
    height: 414,
    opacity: 0.7,
  },
});

const Onboard: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  useEffect(() => {
    const setOnboardingState = async () => {
      try {
        await AsyncStorage.setItem('onBoarding', 'true');
      } catch (e) {
        console.error('Error setting onBoarding state:', e);
      }
    };

    setOnboardingState();
  }, []);

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          <S.BackgroundDottedLineLeft source={BgDottedLineLeft} />
          <S.BackgroundDottedLineRight source={BgDottedLineRight} />
          <S.OnBoardingTopViewContainer>
            <S.OnBoardingTextTitle>HOST OR JOIN VIP TABLES AND EXCLUSIVE EVENTS</S.OnBoardingTextTitle>
            <S.BgCardImage source={WelcomeBcgCards} style={backgroundCardsStyle.rotatedImage} />
          </S.OnBoardingTopViewContainer>
        </View>
        <View
          style={{
            marginTop: Dimensions.get('window').height / 2.5,
            alignItems: 'center',
          }}>
          <LogoPrimary />
        </View>
        <View
          style={{
            marginTop: 'auto',
            alignItems: 'center',
            paddingHorizontal: 24,
          }}>
          <View
            style={{
              alignItems: 'center',
              marginTop: Dimensions.get('window').height / 30,
            }}
          />

          <View
            style={{
              marginBottom: Dimensions.get('window').height / 30,
              marginTop: 45,
              width: '100%',
            }}>
            <Button onPress={() => navigation.navigate(eulaPath as never)} title="Get Access" />
            <S.GetAccessContainer>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi400,
                  fontSize: RFValue(14, 932),
                }}>
                Have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('/sign-in');
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(14, 932),
                  }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </S.GetAccessContainer>
            <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginHorizontal: 40, justifyContent: 'center'}}>
              <S.AcceptPolicyTop style={{fontFamily: Satoshi700, fontSize: RFValue(14, 932), color: lightGray19Color}}>
                By signing up or logging, I accept the IO
              </S.AcceptPolicyTop>
              <View style={{flexDirection: 'row', marginLeft: 12, justifyContent: 'center'}}>
                <S.AcceptPolicyMid
                  style={{fontFamily: Satoshi700, fontSize: RFValue(14, 932), color: whiteColor}}
                  onPress={() => openLink('https://www.invitedonly.app/terms-of-service-eula')}>
                  Terms of Service / EULA
                </S.AcceptPolicyMid>
                <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 932), color: lightGray19Color}}> and </Text>
                <S.AcceptPolicyBottom
                  style={{fontFamily: Satoshi700, fontSize: RFValue(14, 932), color: whiteColor}}
                  onPress={() => openLink('https://www.invitedonly.app/privacy-policy')}>
                  Privacy Policy
                </S.AcceptPolicyBottom>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Onboard;

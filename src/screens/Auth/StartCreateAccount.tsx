import React, {FC} from 'react';
import {ImageBackground, SafeAreaView, Text, TouchableOpacity, View, Linking, Alert} from 'react-native';
import Background from 'assets/images/auth/bg-create-account.png';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {backgroundGradientColors, black1Color, lightGray19Color, whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {eulaPath, signUpPath} from 'constants/pathLocations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {screenHeight} from 'constants/common';
import Button from 'components/Button/Button';

const StartCreateAccount: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        return value;
      }
    } catch (e) {}
  };

  getId();

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('Cannot open the link:', url);
    }
  };

  // @ts-ignore
  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <ImageBackground source={Background} style={{flex: 1}} resizeMode="contain">
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              marginTop: 'auto',
              alignItems: 'center',
              paddingHorizontal: 24,
            }}>
            <Text style={{color: whiteColor, textAlign: 'center', fontFamily: Satoshi500, fontSize: RFValue(28, 932)}}>
              Host or Join VIP Tables And Exclusive Events
            </Text>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: screenHeight / 60,
              }}>
              <Text
                style={{
                  color: lightGray19Color,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(16, 932),
                  letterSpacing: 2,
                  textAlign: 'center',
                }}>
                Let’s find your next unforgettable event nearby or build your guest list.
              </Text>
            </View>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: screenHeight / 29}}>
              <View style={{width: 36, height: 5, borderRadius: 55, backgroundColor: lightGray19Color}} />
              <View style={{width: 36, height: 5, borderRadius: 55, backgroundColor: whiteColor, marginLeft: 5}} />
            </View>
            <View style={{
              width: '100%',
              marginBottom: screenHeight / 58,
              marginTop: screenHeight / 39,
            }}>
              <Button onPress={() => navigation.navigate(eulaPath as never)} title='Get Access'/>
            </View>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', marginBottom: screenHeight / 39}}>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi400,
                  fontSize: RFValue(14, 932),
                }}>
                Have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate(signUpPath as never)}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(14, 932),
                  }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginHorizontal: 40, justifyContent: 'center'}}>
              <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 932), color: lightGray19Color}}>
                By signing up or logging, I accept the IO
              </Text>
              <View style={{flexDirection: 'row', marginLeft: 12, justifyContent: 'center'}}>
                <Text
                  style={{fontFamily: Satoshi700, fontSize: RFValue(14, 932), color: whiteColor}}
                  onPress={() => openLink('https://www.invitedonly.app/terms-and-conditions')}>
                  Terms of Use
                </Text>
                <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 932), color: lightGray19Color}}> and </Text>
                <Text
                  style={{fontFamily: Satoshi700, fontSize: RFValue(14, 932), color: whiteColor}}
                  onPress={() => openLink('https://www.invitedonly.app/privacy-policy')}>
                  Privacy Policy
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default StartCreateAccount;


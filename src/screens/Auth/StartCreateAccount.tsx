import React, {FC} from 'react';
import {ImageBackground, SafeAreaView, Text, TouchableOpacity, View, Linking, Alert} from 'react-native';
import Background from 'assets/images/auth/bg-create-account.png';
import {backgroundGradientColors, black1Color, lightGray19Color, whiteColor} from 'constants/colors';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {eulaPath} from 'constants/pathLocations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

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
            <Text style={{color: whiteColor, textAlign: 'center', fontFamily: Satoshi500, fontSize: RFValue(28, 812)}}>
              Host or Join VIP Tables And Exclusive Events
            </Text>
            <View
              style={{
                alignItems: 'center',
                marginTop: 17,
              }}>
              <Text
                style={{
                  color: lightGray19Color,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(16, 812),
                  letterSpacing: 2,
                  textAlign: 'center',
                }}>
                Let’s find your next unforgettable event nearby or build your guest list.
              </Text>
            </View>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 35}}>
              <View style={{width: 36, height: 5, borderRadius: 55, backgroundColor: lightGray19Color}} />
              <View style={{width: 36, height: 5, borderRadius: 55, backgroundColor: whiteColor, marginLeft: 5}} />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={{top: 26, bottom: 20}}
              onPress={() => navigation.navigate(eulaPath as never)}
              style={{
                backgroundColor: whiteColor,
                borderRadius: 18,
                paddingVertical: 21,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 25,
                marginTop: 25,
              }}>
              <Text
                style={{
                  color: black1Color,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(16, 812),
                  marginRight: 4,
                }}>
                Create Account
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginHorizontal: 40, justifyContent: 'center'}}>
              <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: lightGray19Color}}>
                By signing up or logging, I accept the IO
              </Text>
              <View style={{flexDirection: 'row', marginLeft: 12, justifyContent: 'center'}}>
                <Text
                  style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}
                  onPress={() => openLink('https://www.invitedonly.app/terms-and-conditions')}>
                  Terms of Use
                </Text>
                <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: lightGray19Color}}> and </Text>
                <Text
                  style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}
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

import React, {FC, useState} from 'react';
import {Dimensions, ImageBackground, SafeAreaView, Text, TouchableOpacity, View, Linking, Alert} from 'react-native';
import Background from 'assets/images/auth/background.png';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import ArrowRightBalck from 'assets/images/icons/arrow-right-balck.svg';
import CheckBlack from 'assets/images/icons/Check-black.svg';
import {black1Color, lightGray4Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Outfit500, Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {signUpPath} from 'constants/pathLocations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboard: FC = (): JSX.Element => {
  const [isChecked, setChecked] = useState(false);
  
  const navigation = useAppNavigation();

  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        // console.warn('value', value);
        return value;
      }
    } catch (e) {
      // console.warn('error', e);
    }
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
    <View style={{flex: 1}}>
      <ImageBackground source={Background} style={{flex: 1}} resizeMode="cover">
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              marginTop: Dimensions.get('window').height / 3,
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
            <Text style={{marginRight: -34, color: whiteColor, fontFamily: Satoshi700, letterSpacing: 26, fontSize: RFValue(22, 812)}}>
              WELCOME
            </Text>
            <View
              style={{
                alignItems: 'center',
                marginTop: Dimensions.get('window').height / 30,
              }}>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Outfit500,
                  fontSize: RFValue(13, 812),
                  letterSpacing: 2,
                }}>
                ACCESS IS LIMITED.
              </Text>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Outfit500,
                  fontSize: RFValue(13, 812),
                  letterSpacing: 2,
                  marginTop: 12,
                }}>
                THIS APP IS FOR INVITED ONLY.
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: transparentWhite30Color,
                width: '100%',
                marginTop: Dimensions.get('window').height / 30,
                marginBottom: 10,
              }}
            />
            <TouchableOpacity
              disabled={!isChecked}
              activeOpacity={0.7}
              hitSlop={{top: 26, bottom: 20}}
              onPress={() => navigation.navigate(signUpPath as never)}
              style={{
                backgroundColor: isChecked? whiteColor: lightGray4Color,
                borderRadius: 8,
                paddingVertical: 16,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: Dimensions.get('window').height / 30,
              }}>
              <Text
                style={{
                  color: black1Color,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(20, 812),
                  marginRight: 4,
                }}>
                Get access
              </Text>
              <ArrowRightBalck />
            </TouchableOpacity>

            <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 40}}>
              <TouchableOpacity style={{
                width: 24,
                height: 24,
                borderRadius: 2,
                backgroundColor: whiteColor,
                alignItems: 'center',
                justifyContent:'center'
              }} onPress={() => setChecked(!isChecked)}>
                {isChecked && <CheckBlack width={14} height={14}/>}
              </TouchableOpacity>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 12}}>
                <Text style={{fontFamily: Satoshi400, fontSize: RFValue(14, 812), color: whiteColor}}>
                  By creating account in you accept our{' '}
                </Text>
                <Text
                  style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}
                  onPress={() => openLink('https://www.invitedonly.app/terms-and-conditions')}>
                  Terms of Use
                </Text>
                <Text style={{fontFamily: Satoshi400, fontSize: RFValue(14, 812), color: whiteColor}}> and </Text>
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
    </View>
  );
};

export default Onboard;

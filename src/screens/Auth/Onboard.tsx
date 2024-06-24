import React, {FC} from 'react';
import {Dimensions, ImageBackground, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Background from 'assets/images/auth/background.png';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import ArrowRightBalck from 'assets/images/icons/arrow-right-balck.svg';
import {black1Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Outfit500, Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {signUpPath} from 'constants/pathLocations';

const Onboard: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

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
              activeOpacity={0.7}
              hitSlop={{top: 26, bottom: 20}}
              onPress={() => navigation.navigate(signUpPath as never)}
              style={{
                backgroundColor: whiteColor,
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
            <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
              <Text style={{fontFamily: Satoshi400, fontSize: RFValue(14, 812), color: whiteColor}}>
                By creating account in you accept our{' '}
              </Text>
              <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}} onPress={() => {}}>
                Terms of Use
              </Text>
              <Text style={{fontFamily: Satoshi400, fontSize: RFValue(14, 812), color: whiteColor}}> and </Text>
              <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}} onPress={() => {}}>
                Privacy Policy
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Onboard;

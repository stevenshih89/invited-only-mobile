import React, {FC} from 'react';
import {Dimensions, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import {black1Color, blackColor, lightGray19Color, lightGreen2Color, orange2Color, whiteColor, yellowColor} from 'constants/colors';
import {Outfit500, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {startCreateAccountPath} from 'constants/pathLocations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboard: FC = (): JSX.Element => {  
  const navigation = useAppNavigation();

  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        return value;
      }
    } catch (e) {
    }
  };

  getId();

  // @ts-ignore
  return (
    <View style={{flex: 1, backgroundColor: blackColor}}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              marginTop: Dimensions.get('window').height / 3,
              alignItems: 'center',
            }}>
            <LogoPrimary />
            <View style={{position: 'absolute', top: -180, right: 100, width: 6, height: 6, borderRadius: 6, backgroundColor: yellowColor}} />
            <View style={{position: 'absolute', bottom: -50, left: 170, width: 6, height: 6, borderRadius: 6, backgroundColor: lightGreen2Color}} />
          </View>
          <View
            style={{
              marginTop: 'auto',
              alignItems: 'center',
              paddingHorizontal: 24,
            }}>
            <View style={{position: 'absolute', top: -50, right: 50, width: 6, height: 6, borderRadius: 6, backgroundColor: orange2Color}} />
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
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 80}}>
              <View style={{width: 36, height: 5, borderRadius: 55, backgroundColor: whiteColor}} />
              <View style={{width: 36, height: 5, borderRadius: 55, backgroundColor: lightGray19Color, marginLeft: 5}} />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={{top: 26, bottom: 20}}
              onPress={() => navigation.navigate(startCreateAccountPath as never)}
              style={{
                backgroundColor: whiteColor,
                borderRadius: 18,
                paddingVertical: 21,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: Dimensions.get('window').height / 30,
                marginTop: 45
              }}>
              <Text
                style={{
                  color: black1Color,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(16, 812),
                  marginRight: 4,
                }}>
                Get Access
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    </View>
  );
};

export default Onboard;

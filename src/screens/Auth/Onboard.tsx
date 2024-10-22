import React, {FC} from 'react';
import {Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import WelcomeBcg from 'assets/images/auth/welcome-background.png';
import {backgroundGradientColors, black1Color, lightGray19Color, whiteColor} from 'constants/colors';
import {Outfit500, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {startCreateAccountPath} from 'constants/pathLocations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { screenHeight } from 'constants/common';
import Button from 'components/Button/Button';

const Onboard: FC = (): JSX.Element => {
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

  // @ts-ignore
  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          <Image source={WelcomeBcg} />
        </View>
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
          <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 80}}>
            <View style={{width: 36, height: 5, borderRadius: 55, backgroundColor: whiteColor}} />
            <View style={{width: 36, height: 5, borderRadius: 55, backgroundColor: lightGray19Color, marginLeft: 5}} />
          </View>
          <View style={{
            marginBottom: Dimensions.get('window').height / 30,
            marginTop: 45,
            width: '100%'
          }}>
            <Button onPress={() => navigation.navigate(startCreateAccountPath as never)} title='Get Access'/>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Onboard;

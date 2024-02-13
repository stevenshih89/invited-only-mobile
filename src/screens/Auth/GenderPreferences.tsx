import {isIos, screenHeight} from 'constants/common';
import {FC, useState} from 'react';
import {ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {lightGray3Color, transparentWhite16Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import CheckCircle from 'assets/images/icons/check-circle.svg';
import CircleGray from 'assets/images/icons/circle-gray.svg';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {myInterestsPath} from 'constants/pathLocations';

const GenderPreferences: FC = (): JSX.Element => {
  const MAN = 'man';
  const WOMAN = 'woman';
  const ANY = 'any';
  const [gender, setGender] = useState<string>(MAN);

  const navigation = useAppNavigation();

  return (
    <ImageBackground source={HalfBackground} resizeMode="cover" style={{flex: 1}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1, paddingBottom: 0}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: 0,
                paddingHorizontal: 38,
              }}>
              <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                    hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                    style={{
                      borderRadius: 50,
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: transparentWhite30Color,
                    }}>
                    <ArrowLeft />
                  </TouchableOpacity>
                  <LogoSecondary />
                  <View style={{height: 40, justifyContent: 'center'}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>6/9</Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginBottom: screenHeight / 26,
                    marginTop: screenHeight / 80,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(34, 812),
                      marginBottom: 18,
                      textAlign: 'center',
                    }}>
                    Choose your guests
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
                    }}>
                    Select who you want to invite
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setGender(MAN)}
                    style={{
                      width: '100%',
                      height: screenHeight / 14,
                      backgroundColor: gender === MAN ? transparentWhite16Color : lightGray3Color,
                      borderRadius: 10,
                      borderColor: whiteColor,
                      borderStyle: 'solid',
                      borderWidth: gender === MAN ? 0.5 : 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      marginBottom: 8,
                    }}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Man</Text>
                    {gender === MAN ? <CheckCircle /> : <CircleGray />}
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setGender(WOMAN)}
                    style={{
                      width: '100%',
                      height: screenHeight / 14,
                      backgroundColor: gender === WOMAN ? transparentWhite16Color : lightGray3Color,
                      borderRadius: 10,
                      borderColor: whiteColor,
                      borderStyle: 'solid',
                      borderWidth: gender === WOMAN ? 0.5 : 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      marginBottom: 8,
                    }}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Woman</Text>
                    {gender === WOMAN ? <CheckCircle /> : <CircleGray />}
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setGender(ANY)}
                    style={{
                      width: '100%',
                      height: screenHeight / 14,
                      backgroundColor: gender === ANY ? transparentWhite16Color : lightGray3Color,
                      borderRadius: 10,
                      borderColor: whiteColor,
                      borderStyle: 'solid',
                      borderWidth: gender === ANY ? 0.5 : 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      marginBottom: 8,
                    }}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Any</Text>
                    {gender === ANY ? <CheckCircle /> : <CircleGray />}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginBottom: 4}}>
                <Button onPress={() => navigation.navigate(myInterestsPath)} title="Next" />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default GenderPreferences;

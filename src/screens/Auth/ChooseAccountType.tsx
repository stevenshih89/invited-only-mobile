import {isIos, screenHeight} from 'constants/common';
import {FC, useState} from 'react';
import {ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {lightGray3Color, toggleColor, transparentWhite16Color, transparentWhite30Color, transparentWhite56Color, whiteColor} from 'constants/colors';
import CheckCircle from 'assets/images/icons/check-circle.svg';
import CircleGray from 'assets/images/icons/circle-gray.svg';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {enterNamePath} from 'constants/pathLocations';

const ChooseAccountType: FC = (): JSX.Element => {
  const HOST = 'host';
  const GUEST = 'guest';
  const [accountType, setAccountType] = useState<string>(HOST);

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
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>1/9</Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginBottom: screenHeight / 30,
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
                    Are you Host or guest?
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
                    }}>
                    Select your account type
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setAccountType(HOST)}
                    style={{
                      width: '100%',
                      height: screenHeight / 14,
                      backgroundColor: accountType === HOST ? transparentWhite16Color : lightGray3Color,
                      borderRadius: 10,
                      borderColor: whiteColor,
                      borderStyle: 'solid',
                      borderWidth: accountType === HOST ? 0.5 : 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      marginBottom: 8,
                    }}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Host</Text>
                    {accountType === HOST ? <CheckCircle /> : <CircleGray />}
                  </TouchableOpacity>
                  <Text style={{color: transparentWhite56Color, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>
                    You can create events and invite people
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setAccountType(GUEST)}
                    style={{
                      width: '100%',
                      height: screenHeight / 14,
                      backgroundColor: accountType === GUEST ? transparentWhite16Color : lightGray3Color,
                      borderRadius: 10,
                      borderColor: whiteColor,
                      borderStyle: 'solid',
                      borderWidth: accountType === GUEST ? 0.5 : 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      marginBottom: 8,
                      marginTop: 16,
                    }}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Guest</Text>
                    {accountType === GUEST ? <CheckCircle /> : <CircleGray />}
                  </TouchableOpacity>
                  <Text style={{color: transparentWhite56Color, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>You can join events</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: screenHeight / 24}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>Are you a bussiness?</Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={{color: toggleColor, fontFamily: Satoshi500, fontSize: RFValue(14, 812), textDecorationLine: 'underline'}}>
                      {' '}
                      Click here to join
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginBottom: 4}}>
                <Button onPress={() => navigation.navigate(enterNamePath)} title="Next" />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ChooseAccountType;

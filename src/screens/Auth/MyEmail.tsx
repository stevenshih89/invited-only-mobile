import {isIos, screenHeight} from 'constants/common';
import {FC, useContext, useState} from 'react';
import {ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {connectSocialMediaPath} from 'constants/pathLocations';
import Input from 'components/Inputs/Input';
import {isEmailValid} from 'helpers/regExpValidators';
import {AuthContext} from 'contexts/AuthContext.tsx';

const MyEmail: FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const {onBoarding, setOnBoarding} = useContext(AuthContext);
  const handleEmailChange = (value: string) => {
    const truncatedText = value.slice(0, 40);
    setEmail(truncatedText);
    checkIsValidEmail();
  };

  const checkIsValidEmail = () => {
    setIsValidEmail(isEmailValid(email));
  };

  const handleNext = () => {
    if (!email || !isValidEmail) {
      return;
    }
    setOnBoarding([
      ...onBoarding,
      {
        email: email,
      },
    ]);
    navigation.navigate(connectSocialMediaPath as never);
  };

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
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>8/9</Text>
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
                    My email
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
                    }}>
                    Don’t lose access to your account, verify your email
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <Input
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={checkIsValidEmail}
                    isError={!isValidEmail}
                    errorText="Email is not valid"
                    containerStyle={{width: '100%'}}
                    placeholder="Enter your email"
                  />
                </View>
              </View>
              <View style={{marginBottom: 4}}>
                <Button onPress={() => handleNext()} title="Next" />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default MyEmail;

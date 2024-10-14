import {isIos, screenHeight} from 'constants/common';
import {FC, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import NinetyIcon from 'assets/images/auth/progress/ninety.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {black1Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {privacyPath} from 'constants/pathLocations';
import Input from 'components/Inputs/Input';
import {isEmailValid} from 'helpers/regExpValidators';
import {AuthContext} from 'contexts/AuthContext.tsx';
import AuthProgress from 'components/AuthProgress';
import { useUser } from 'src/store/userStore';

const MyEmail: FC = (): JSX.Element => {
  // const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const { email, setEmail } = useUser();

  const {onBoarding, setOnBoarding} = useContext(AuthContext);
  
  const handleEmailChange = (value: string) => {
    const truncatedText = value.slice(0, 40);
    setEmail(truncatedText);
    setIsValidEmail(true);
    setEmail(truncatedText);
  };

  const handleNext = () => {
    setIsValidEmail(isEmailValid(email));
    const isValidEmail = isEmailValid(email);
    if (!email || !isValidEmail) {
      return;
    }
    setOnBoarding([
      ...onBoarding,
      {
        email: email,
      },
    ]);
    navigation.navigate(privacyPath as never, {screen: 'MyEmail'});
  };

  const navigation = useAppNavigation();

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      keyboardVerticalOffset={15}
      style={{flex: 1, paddingBottom: 0, backgroundColor: black1Color}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingBottom: 0,
              paddingHorizontal: 24,
            }}>
            <View style={{alignItems: 'center'}}>
              <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack()
                  }}
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
                <LogoPrimary2 />
                {/* <NinetyIcon height={40} /> */}
                <AuthProgress startPercentage={80} endPercentage={90} animationDuration={1000} />
              </View>
              <View
                style={{
                  width: '100%',
                  marginBottom: screenHeight / 30,
                  marginTop: screenHeight / 14,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(34, 812),
                    marginBottom: 18,
                  }}>
                  Your email
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(17, 812),
                  }}>
                  Don’t lose access to your account, verify your email
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <Input
                  value={email}
                  onChange={handleEmailChange}
                  isError={!isValidEmail}
                  errorText="Incorrect email"
                  containerStyle={{width: '100%'}}
                  placeholder="Enter your email"
                />
              </View>
            </View>
            <View style={{marginBottom: 4}}>
              <Button onPress={() => handleNext()} disabled={email.length < 5 || !isValidEmail} title="Continue" />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MyEmail;

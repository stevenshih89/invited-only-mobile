import {isIos, screenHeight} from 'constants/common';
import React, {FC, useState} from 'react';
import {ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import {whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {confirmPhonePath} from 'constants/pathLocations';
import auth from '@react-native-firebase/auth';
import {showToast} from 'helpers/showToast.ts';
import {InputPhoneView} from '../../components/Inputs/InputPhoneView';

const SignUp: FC = (): JSX.Element => {
  const [mobilePhone, setMobilePhone] = useState<string>('');
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);

  const navigation = useAppNavigation();

  async function signInWithPhoneNumber() {
    try {
      if (!mobilePhone) {
        return;
      }
      setLoading(true);
      const phone = `${mobilePhone}`.trim().replace(/\s/g, '');

      const confirmation = await auth().signInWithPhoneNumber(phone);
      // @ts-ignore
      setConfirm(confirmation);
      setLoading(false);
      // @ts-ignore
      navigation.navigate(confirmPhonePath, {confirm: confirmation, mobilePhone: phone});
    } catch (e: any) {
      setLoading(false);
      showToast('cancel', `${e?.message.split(']')[1]}`);
      console.warn(e);
    }
  }

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
              }}>
              <View style={{alignItems: 'center'}}>
                <LogoSecondary />
                <View
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: 38,
                    marginBottom: screenHeight / 30,
                    marginTop: screenHeight / 80,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(34, 812),
                      marginBottom: 18,
                    }}>
                    My phone
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
                    }}>
                    We protect our community by ensuring the authenticity of everyone in IO.
                  </Text>
                </View>
                <InputPhoneView value={mobilePhone} setIsValid={setIsValidPhone} onChangeFormattedText={val => setMobilePhone(val)} />
              </View>
              <View style={{paddingHorizontal: 38, marginBottom: 4}}>
                <Button disabled={!isValidPhone && !loading && !confirm} onPress={() => signInWithPhoneNumber()} title="Continue" />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignUp;

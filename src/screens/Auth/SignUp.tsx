import {isIos, screenHeight} from 'constants/common';
import React, {FC, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary from 'assets/images/auth/logo-primary-2.svg';
import {black1Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
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
      // @ts-ignore
      navigation.navigate(confirmPhonePath, {confirm: confirmation, mobilePhone: phone});
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      showToast('cancel', `${e?.message.split(']')[1]}`);
      console.warn(e);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      keyboardVerticalOffset={15}
      style={{flex: 1, paddingBottom: 0, backgroundColor: black1Color}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
          <View
            style={{
              paddingTop: 20,
              flex: 1,
              justifyContent: 'space-between',
              paddingBottom: 0,
            }}>
            <View style={{paddingHorizontal: 24, width: '100%'}}>
              <View style={{alignItems: 'center'}}>
                <LogoPrimary />
              </View>
              <View
                style={{
                  marginBottom: screenHeight / 30,
                  marginTop: screenHeight / 14,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(48, 812),
                    marginBottom: 18,
                  }}>
                  Your phone
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(16, 812),
                  }}>
                  We protect our community by ensuring the authenticity of everyone in IO.
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <InputPhoneView value={mobilePhone} setIsValid={setIsValidPhone} onChangeFormattedText={val => setMobilePhone(val)} />
              </View>
            </View>
            <View style={{paddingHorizontal: 24, marginBottom: 4}}>
              <Button disabled={!isValidPhone && !loading && !confirm} onPress={() => signInWithPhoneNumber()} title="Continue" />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

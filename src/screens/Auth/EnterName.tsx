import {isIos, screenHeight} from 'constants/common';
import React, {FC, useContext, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import TwentyIcon from 'assets/images/auth/progress/twenty.svg';
import {black1Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {turnNotificationsPath} from 'constants/pathLocations';
import Input from 'components/Inputs/Input';
import {AuthContext} from 'contexts/AuthContext.tsx';
import { isName } from 'helpers/regExpValidators';
import AuthProgress from 'components/AuthProgress';

const EnterName: FC = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const {onBoarding, setOnBoarding} = useContext(AuthContext);
  const [errorInputName, setErrorInputName] = useState<boolean>(false)

  const handleNameChange = (value: string) => {
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);

    if(!isName(value) && name.length > 2 || value.length > 14) {
      setErrorInputName(true)
    } else setErrorInputName(false)
    setName(formattedValue)
  };

  const navigation = useAppNavigation();

  const handleNext = async () => {
    if (!name) {
      return;
    }
    const data = [
      ...onBoarding,
      {
        name: name,
      },
    ];

    setOnBoarding(data);
    navigation.navigate(turnNotificationsPath as never);
  };

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
                <LogoPrimary2 />
                <AuthProgress startPercentage={10} endPercentage={20} animationDuration={1000} />
              </View>
              <View
                style={{
                  width: '100%',
                  marginBottom: screenHeight / 30,
                  marginTop: screenHeight / 8,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(40, 812),
                    marginBottom: 18,
                  }}>
                  What’s your first name?
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(18, 812),
                  }}>
                  You won’t be able to change this later.
                </Text>
                <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>
                  It will be shown on your profile.
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <Input isError={errorInputName} errorText='The name must be up to 14 characters long and contain no special characters.' value={name} onChange={handleNameChange} containerStyle={{width: '100%'}} placeholder="Enter your name" />
              </View>
            </View>
            <View style={{marginBottom: 4}}>
              <Button disabled={name.length < 3 || errorInputName} onPress={() => handleNext()} title="Continue" />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EnterName;

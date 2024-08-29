import {isIos, screenHeight} from 'constants/common';
import React, {FC, useContext, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import TwentyIcon from 'assets/images/auth/progress/twenty.svg';
import {black1Color, blackColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {turnNotificationsPath} from 'constants/pathLocations';
import Input from 'components/Inputs/Input';
import {AuthContext} from 'contexts/AuthContext.tsx';

const AddBiusness: FC = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const handleNameChange = (value: string) => {
    const truncatedText = value.slice(0, 40);
    setName(truncatedText);
  };

  const navigation = useAppNavigation();

  const handleGoBack = async () => {
    navigation.goBack()
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
                <TwentyIcon height={40} />
              </View>
              <View>
              <View
                style={{
                  width: '100%',
                  marginBottom: screenHeight / 30,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(48, 812),
                    marginBottom: 18,
                  }}>
                  Join as a Business and get more client's.
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(18, 812),
                  }}>
                  Please provide us with all your business information, and we will get back to you.
                </Text>
              </View>
              <View style={{width: '100%', backgroundColor: '#212121', borderRadius: 10, padding: 16}}>
                <Text style={{fontSize: RFValue(18, 812), fontFamily: Satoshi400, color: whiteColor, marginBottom: 16}}>Please send an email to:</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: 43, height: 43, backgroundColor: blackColor, borderRadius: 43, alignItems: 'center', justifyContent: 'center', marginRight: 6}}>
                        <Text style={{color: whiteColor, fontSize: RFValue(20, 812), fontFamily: Satoshi700}}>IO</Text>
                    </View>
                    <Text style={{fontSize: RFValue(18, 812), fontFamily: Satoshi400, color: whiteColor, }}>Buisness@invitedonly.app</Text>
                </View>
              </View>
              </View>
              <View style={{marginBottom: 4, width: '100%', alignItems: 'center'}}>
              <TouchableOpacity onPress={handleGoBack}>
                <Text style={{color: whiteColor, fontSize: RFValue(18), fontFamily: Satoshi500}}>Go back</Text>
              </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddBiusness;

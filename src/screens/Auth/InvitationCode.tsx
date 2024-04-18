import {isIos, screenHeight} from 'constants/common';
import {FC, useContext, useState} from 'react';
import {ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import Button from 'components/Button/Button';

import {whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Input from 'components/Inputs/Input';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {codeVerifiedPath} from 'constants/pathLocations.ts';
import {AuthContext} from 'contexts/AuthContext.tsx';

const InvitationCode: FC = (): JSX.Element => {
  const [code, setCode] = useState<string>('');
  const navigation = useAppNavigation();

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const generateInviteCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 12;
    let inviteCode = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      inviteCode += characters.charAt(randomIndex);
    }

    return inviteCode;
  };

  const handleNext = () => {
    setOnBoarding([
      ...onBoarding,
      {
        invitationСode: code,
        codeForInvitingOtherUsers: generateInviteCode(),
        notificationSettings: {
          joinedEvent: false,
          myEvents: false,
          requests: false,
          chat: false,
          superInvite: false,
          superJoin: false,
          match: false,
        },
      },
    ]);
    navigation.navigate(codeVerifiedPath as never);
  };

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
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                  <LogoSecondary />
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
                    Do you have an invitation code?
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
                    }}>
                    You will be verified and accepted automatically
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <Input value={code} onChange={setCode} containerStyle={{width: '100%'}} placeholder="Enter your invitation code" />
                </View>
              </View>
              <View style={{marginBottom: 4, flexDirection: 'row', alignItems: 'center'}}>
                <Button onPress={() => handleNext()} title="I don't have a code" buttonStyle={{flex: 1, marginRight: 2}} variant="transparent" />
                <Button onPress={() => handleNext()} title="Continue" buttonStyle={{flex: 1, marginLeft: 2}} />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default InvitationCode;

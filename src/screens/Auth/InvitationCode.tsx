import {isIos, screenHeight} from 'constants/common';
import {FC, useContext, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import Button from 'components/Button/Button';
import Input from 'components/Inputs/Input';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {codeVerifiedPath} from 'constants/pathLocations.ts';
import {AuthContext} from 'contexts/AuthContext.tsx';
import firestore from '@react-native-firebase/firestore';
import {showToast} from 'helpers/showToast.ts';
import {useUser} from '../../store/userStore';
import {black1Color, whiteColor} from 'constants/colors';
import {Outfit500, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

const InvitationCode: FC = (): JSX.Element => {
  const [code, setCode] = useState<string>('');
  const navigation = useAppNavigation();

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const userHost = useUser((i: any) => i?.user);

  const handleNext = async () => {
    const findInvitationСodes = await firestore()
      .collection('userInfo')
      .where('invitationСode', '==', userHost.codeForInvitingOtherUsers)
      .get();
    const data = findInvitationСodes?.docs?.map(i => i?.data());
    const culculate = data?.length - 5;

    if (culculate >= 5) {
      return showToast('cancel', '', 'The maximum amount has been used');
    }

    setOnBoarding([
      ...onBoarding,
      {
        invitationСode: code,
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
              <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                <LogoPrimary2 />
              </View>
              <View />
              <View style={{marginTop: screenHeight / 20}}>
                <View
                  style={{
                    borderColor: '#D9D9D9',
                    borderRadius: 30,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    borderBottomWidth: 0,
                    borderWidth: 1,
                  }}>
                  <Text style={{color: whiteColor, textAlign: 'center', fontFamily: Satoshi500, fontSize: RFValue(38, 812)}}>
                    Do you have an invitation code?
                  </Text>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: '80%',
                      height: 1,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.50)',
                      borderStyle: 'dashed',
                      marginVertical: 20,
                    }}
                  />
                  <View style={{width: '100%', paddingHorizontal: 30, marginBottom: 10}}>
                    <Input value={code} onChange={setCode} containerStyle={{width: '100%'}} placeholder="Enter your invitation code" />
                  </View>
                </View>
                <View
                  style={{
                    borderColor: '#D9D9D9',
                    borderRadius: 30,
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 8,
                    borderTopWidth: 0,
                    borderWidth: 1,
                    paddingVertical: 20,
                    position: 'relative',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: -1,
                      alignSelf: 'center',
                      width: '98%',
                      height: 1,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.50)',
                      borderStyle: 'dashed',
                    }}
                  />
                  <Text style={{color: whiteColor, fontFamily: Outfit500, textAlign: 'center', fontSize: RFValue(14, 812)}}>
                    THIS APP IS FOR INVITED ONLY.
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginBottom: 4}}>
              <Button onPress={() => handleNext()} disabled={!code.length} title="Apply code" />
              <Button
                onPress={() => navigation.navigate(codeVerifiedPath as never)}
                buttonTitleStyle={{textDecorationLine: 'underline'}}
                title="I don't have a code"
                variant="transparent"
              />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InvitationCode;

import { RouteProp } from '@react-navigation/native';
import {
  AppState,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import { FC, JSX, useContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import { isIos } from 'constants/common';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import Button from 'components/Button/Button';
import Input from 'components/Inputs/Input';
import { useAppNavigation, useRoute } from 'hooks/useAppNavigation';
import { verifySocialProfilePath } from 'constants/pathLocations.ts';
import { AuthContext } from 'contexts/AuthContext.tsx';
import { showToast } from 'helpers/showToast.ts';
import { backgroundGradientColors, errorColor, transparentWhite30Color, whiteColor } from 'constants/colors';
import { Outfit500, Satoshi500 } from 'constants/fonts';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import { RootStackParamList } from 'typescript/types';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext';

const InvitationCode: FC = (): JSX.Element => {
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
  const [code, setCode] = useState<string>('');
  const [invalidCode, setInvalidCode] = useState(false);
  const [isFocusInput, setIsfocusInput] = useState<boolean>(false);

  const navigation = useAppNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const route = useRoute<RouteProp<RootStackParamList, '/invitation-code'>>();
  const { cameFromSummary = false } = route?.params || {};

  const { onBoarding, setOnBoarding } = useContext(AuthContext);

  const generateInviteCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 12;
    const countCodes = 5;
    const inviteCodes = [];

    for (let i = 0; i < countCodes; i++) {
      let inviteCode = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        inviteCode += characters.charAt(randomIndex);
      }
      inviteCodes.push({ isActive: true, inviteCode: inviteCode });
    }

    return inviteCodes;
  };

  const formatDate = (date: any) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };



  const handleNext = async () => {
    try {
      const usersRef = firestore().collection(apiUserInfoCollection);
      const snapshot = await usersRef.get();
      let userUid = null;

      for (const doc of snapshot.docs) {
        const userData = doc.data();
        const inviteCodes = userData.codeForInvitingOtherUsers;

        if (Array.isArray(inviteCodes)) {
          const res = inviteCodes.find(item => item.inviteCode === code && item.isActive);
          if (res) {
            userUid = userData.uid;
            break;
          }
        }
      }

      if (userUid) {
        const userInfo = await usersRef.doc(userUid).get();
        const codeForInvitingOtherUsers = userInfo?.data()?.codeForInvitingOtherUsers;
        const updateCodeInvitions = codeForInvitingOtherUsers.map(item => {
          if (item.inviteCode === code) {
            return {
              ...item,
              isActive: false,
            };
          }
          return item;
        });

        await usersRef.doc(userUid).update({ codeForInvitingOtherUsers: updateCodeInvitions });

        const onboardingData = [
          ...onBoarding,
          {
            invitationCode: code,
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
        ];

        setOnBoarding(onboardingData);
        if (cameFromSummary) {
          /// TODO: add logic for summary
        } else {
          try {
            await firestore().collection(apiUserInfoCollection).doc(auth()?.currentUser?.uid).update({
              accountReviewed: true,
              accountConfirmed: true,
            });
          } catch (error) {
            console.log('error update user', error);
          }
        }
        navigation.navigate('/code-verified', { cameFromSummary } as never);
      } else {
        showToast('inviteMatch', 'Please try anther code', 'The invitation code has already been used', { status: 'error' });
        setInvalidCode(true);
      }
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  useEffect(() => {
    setInvalidCode(false);
  }, [code]);

  return (
    <LinearGradient colors={backgroundGradientColors} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{ flex: 1, paddingBottom: 0 }}>
        <TouchableWithoutFeedback onPress={Keyboard?.dismiss}>
          <SafeAreaView style={{ flex: 1, paddingBottom: 0 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: 0,
                paddingHorizontal: 24,
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 16,
                    paddingVertical: 28,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {!cameFromSummary && (
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      activeOpacity={0.7}
                      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        borderRadius: 50,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: transparentWhite30Color,
                      }}>
                      <ArrowLeft />
                    </TouchableOpacity>
                  )}
                  <LogoPrimary2 />
                </View>
                <View />
                <View style={{ marginTop: 64 }}>
                  <View
                    style={{
                      paddingHorizontal: 36,
                      paddingTop: 30,
                      borderColor: '#D9D9D9',
                      borderRadius: 30,
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                      borderBottomWidth: 0,
                      borderWidth: 1,
                    }}>
                    <View style={{ width: '100%' }}>
                      <Text style={{ color: whiteColor, textAlign: 'center', fontFamily: Satoshi500, fontSize: RFValue(34, 812) }}>
                        Do you have an invitation code?
                      </Text>
                    </View>
                    <View
                      style={{
                        alignSelf: 'center',
                        width: '95%',
                        height: 1,
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.50)',
                        borderStyle: 'dashed',
                        marginVertical: 20,
                      }}
                    />
                    <View style={{ width: '100%', marginBottom: 40 }}>
                      <Input
                        testID="invitation-code-input"
                        onPressFocus={() => setIsfocusInput(true)}
                        onBlur={() => setIsfocusInput(false)}
                        value={code}
                        onChange={setCode}
                        errorText="Incorrect invitation code"
                        isError={invalidCode}
                        containerStyle={{
                          width: '100%',
                          height: 60,
                          marginBottom: 10,
                          borderColor: invalidCode ? errorColor : '',
                          borderWidth: 1,
                          borderRadius: 10,
                        }}
                        placeholder="Enter your invitation code"
                      />
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
                      paddingVertical: 26,
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
                    <Text style={{ color: whiteColor, fontFamily: Outfit500, textAlign: 'center', fontSize: RFValue(14, 812) }}>
                      THIS APP IS FOR INVITED ONLY.
                    </Text>
                  </View>
                </View>
              </ScrollView>
              <View style={{ marginBottom: 4, marginTop: isFocusInput ? 16 : 0 }}>
                <Button
                  testID="apply-code-button"
                  onPress={() => handleNext()}
                  loading={loading}
                  disabled={!code.length}
                  title="Apply code"
                />
                {!isFocusInput && cameFromSummary && (
                  <Button
                    onPress={() => navigation.navigate(verifySocialProfilePath as never)}
                    buttonTitleStyle={{ textDecorationLine: 'underline' }}
                    title="I don't have a code"
                    variant="transparent"
                  />
                )}
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default InvitationCode;

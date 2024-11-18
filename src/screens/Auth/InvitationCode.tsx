import {isIos} from 'constants/common';
import {FC, useContext, useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import Button from 'components/Button/Button';
import Input from 'components/Inputs/Input';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {verifySocialProfilePath} from 'constants/pathLocations.ts';
import {AuthContext} from 'contexts/AuthContext.tsx';
import firestore from '@react-native-firebase/firestore';
import {showToast} from 'helpers/showToast.ts';
import {backgroundGradientColors, errorColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Outfit500, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {ScrollView} from 'react-native-gesture-handler';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'typescript/types';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const InvitationCode: FC = (): JSX.Element => {
  const [code, setCode] = useState<string>('');
  const [invalidCode, setInvalidCode] = useState(false);
  const [isFocusInput, setIsfocusInput] = useState<boolean>(false);

  const navigation = useAppNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const route = useRoute<RouteProp<RootStackParamList, '/invitation-code'>>();
  const {cameFromSummary = false} = route.params || {};

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const uploadImage = async (imagePath: string, userId: string | null) => {
    if (imagePath) {
      if (imagePath.includes('https://')) {
        return imagePath;
      } else {
        const uploadUri = Platform.OS === 'ios' ? imagePath : `file://${imagePath}`;
        const filename = `${userId}_${new Date().getTime()}`;
        const storageRef = storage().ref(`images/${filename}`);
        try {
          await storageRef.putFile(uploadUri);
          const url = await storageRef.getDownloadURL();
          return url;
        } catch (e) {
          console.error('Error uploading image:', e);
          return null;
        }
      }
    }
  };

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
      inviteCodes.push({isActive: true, inviteCode: inviteCode});
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

  const handleRegisterUser = async onBoarding => {
    try {
      setLoading(true);
      const registrationDate = new Date();
      const formattedDate = formatDate(registrationDate);
      const user = auth().currentUser;
      const phoneNumber = user?.phoneNumber;

      const mergedObject = {};
      await AsyncStorage.setItem('onBoarding', 'true');

      onBoarding?.forEach(obj => {
        Object.keys(obj)?.forEach(key => {
          // @ts-ignore
          mergedObject[key] = obj[key];
        });
      });

      const userId = await AsyncStorage.getItem('uid');
      const imageUri = mergedObject?.imageUser;

      const photos = mergedObject?.photos;

      const isTurnNotifications = onBoarding.find(item => 'notifications' in item);

      let photosList = [];

      let facePhoto = '';
      const userData = {
        ...mergedObject,
        uid: userId,
        codeForInvitingOtherUsers: generateInviteCode(),
        registrationDate: formattedDate,
        createdAt: moment().format('YYYY-MM-DD'),
        phoneNumber: phoneNumber,
        accountConfirmed: true,
        accountReviewed: true,
        accountPremium: false,
        notifications: [],
        weeklySuperInvites: 5,
        photos: photosList,
        facePhoto: facePhoto,
        superInvites: 0,
        lastUpdateSuperInvite: Date.now(),
        notificationSettings: {
          chat: isTurnNotifications.notifications,
          joinedEvent: isTurnNotifications.notifications,
          match: isTurnNotifications.notifications,
          myEvents: isTurnNotifications.notifications,
          requests: isTurnNotifications.notifications,
          superInvite: isTurnNotifications.notifications,
          superJoin: isTurnNotifications.notifications,
        },
      };

      for (const i of photos) {
        if (i?.image) {
          const img = await uploadImage(i.image, userId);
          console.warn('img', img);
          photosList.push({id: i?.id, image: img});
        }
      }

      const facePhotoImg = await uploadImage(imageUri, userId);

      if (facePhotoImg) {
        facePhoto = facePhotoImg;
      }

      await firestore()
        .collection('userInfo')
        .doc(`${userId}`)
        .set(userData)
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {
      // console.log(e);
      showToast('inviteMatch', '', `${e}`);
      setLoading(false);
    }
  };

  const handleNext = async () => {
    const usersRef = firestore().collection('userInfo');
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

      await usersRef.doc(userUid).update({codeForInvitingOtherUsers: updateCodeInvitions});

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
        await handleRegisterUser(onboardingData);
      } else {
        try {
          await firestore().collection('userInfo').doc(auth()?.currentUser?.uid).update({
            accountReviewed: true,
            accountConfirmed: true,
          });
        } catch (error) {
          console.log('error update user', error);
        }
      }
      navigation.navigate('/code-verified', {cameFromSummary} as never);
    } else {
      showToast('inviteMatch', 'Please try anther code', 'The invitation code has already been used', {status: 'error'});
      setInvalidCode(true);
    }
  };

  useEffect(() => {
    setInvalidCode(false);
  }, [code]);

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1, paddingBottom: 0}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: 0,
                paddingHorizontal: 24,
              }}>
              <ScrollView showsVerticalScrollIndicator={false} style={{}}>
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
                      hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
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
                <View style={{marginTop: 64}}>
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
                    <View style={{width: '100%'}}>
                      <Text style={{color: whiteColor, textAlign: 'center', fontFamily: Satoshi500, fontSize: RFValue(34, 812)}}>
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
                    <View style={{width: '100%', marginBottom: 40}}>
                      <Input
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
                    <Text style={{color: whiteColor, fontFamily: Outfit500, textAlign: 'center', fontSize: RFValue(14, 812)}}>
                      THIS APP IS FOR INVITED ONLY.
                    </Text>
                  </View>
                </View>
              </ScrollView>
              <View style={{marginBottom: 4, marginTop: isFocusInput ? 16 : 0}}>
                <Button onPress={() => handleNext()} loading={loading} disabled={!code.length} title="Apply code" />
                {!isFocusInput && cameFromSummary && (
                  <Button
                    onPress={() => navigation.navigate(verifySocialProfilePath as never)}
                    buttonTitleStyle={{textDecorationLine: 'underline'}}
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

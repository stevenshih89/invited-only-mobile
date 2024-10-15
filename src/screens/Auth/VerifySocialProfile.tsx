import {backgroundGradientColors, errorColor, lightGray15Color, lightGray2Color, whiteColor} from 'constants/colors';
import {Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import CheckCircle from 'assets/images/icons/check-circle.svg';
import CircleGray from 'assets/images/icons/circle-gray.svg';
import {screenHeight} from 'constants/common';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useContext, useEffect, useState} from 'react';
import Input from 'components/Inputs/Input';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {pendingScreenPath} from 'constants/pathLocations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {showToast} from 'helpers/showToast';
import {AuthContext} from 'contexts/AuthContext';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

interface Social {
  id: number;
  title: string;
  name: string;
}

const VerifySocialProfile = () => {
  const [openedSocial, setOpenedSocial] = useState<Social | null>(null);
  const [socialNickname, setSocialNickname] = useState<any>({});
  const [errorInput, setErrorInput] = useState<number[]>([]);  
  
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);

  const {onBoarding} = useContext(AuthContext);

  const handleSocialNicknameChange = (value: string, social: string) => {
    setSocialNickname(prev => ({ ...prev, [social]: value.trim() }));
    const socialIndex = socials.findIndex(s => s.name === social);
    if (errorInput.includes(socialIndex)) {
      setErrorInput(prevErrors => prevErrors.filter(index => index !== socialIndex));
    }
  };

  const socials: Social[] = [
    {
      id: 0,
      title: 'Instagram',
      name: 'instagram',
    },
    {
      id: 1,
      title: 'TikTok',
      name: 'tiktok',
    },
    {
      id: 2,
      title: 'Facebook',
      name: 'facebook',
    },
    {
      id: 3,
      title: 'Other',
      name: 'other',
    },
  ];

  const uploadImage = async (imagePath: string, userId: string | null) => {
    const uploadUri = Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath;
    const filename = `${userId}_${new Date().getTime()}`; // or another unique naming convention
    const storageRef = storage().ref(`images/${filename}`);
    const task = storageRef.putFile(uploadUri);
    try {
      await task;
      // Get the URL to the uploaded image
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (e) {
      // console.error(e);
      return null;
    }
  };

  const updateUserProfileImage = async (userId: string | null, imageUrl: string) => {
    try {
      await firestore().collection('userInfo').doc(userId).update({
        facePhoto: imageUrl,
      });
      // console.log('User profile image updated successfully.');
    } catch (e) {
      // console.error('Error updating user profile image: ', e);
    }
  };

  const updatePhotosImage = async (userId: string | null, imageUrl: string) => {
    try {
      await firestore().collection('userInfo').doc(userId).update({
        photos: imageUrl,
      });
      // console.log('User profile image updated successfully.');
    } catch (e) {
      // console.error('Error updating user profile image: ', e);
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

      const photos = mergedObject?.photos?.map(i => i?.image);

      let allImageUrl: any = [];

      const isTurnNotifications = onBoarding.find(item => 'notifications' in item);

      await firestore()
        .collection('userInfo')
        .doc(`${userId}`)
        .set({
          ...mergedObject,
          uid: userId,
          codeForInvitingOtherUsers: generateInviteCode(),
          registrationDate: formattedDate,
          phoneNumber: phoneNumber,
          accountConfirmed: false,
          accountReviewed: false,
          accountPremium: false,
          notifications: [],
          weeklySuperInvites: 5,
          superInvites: 0,
          socialNickname,
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
        })
        .then(async () => {
          // console.warn('User added!');

          photos?.map(async (i: any, index: number) => {
            await uploadImage(i, userId).then(async image => {
              allImageUrl.push({image: image, id: index});
            });
            await updatePhotosImage(userId, allImageUrl);
          });
          await uploadImage(imageUri, userId).then(async image => {
            await updateUserProfileImage(userId, image);
          });
        });
      setLoading(false);
    } catch (e) {
      // console.log(e);
      showToast('inviteMatch', '', `${e}`);
      setLoading(false);
    }
  };

  const checkErrors = async (isError: boolean) => {    
    if(!isError) {
      await handleRegisterUser(onBoarding);
      navigation.navigate(pendingScreenPath as never);
    }
  }

  const validateSocialMediaLink = (links: Record<string, string>) => {
    const errors: number[] = [];
    Object.entries(links).forEach(([key, value]) => {
      const regex = new RegExp(`^https://www\\.${key}\\.com/[a-zA-Z0-9._-]+/?$`);
      const regexOther = new RegExp(`^https://www\\.[a-zA-Z0-9.-]+\\.com/[a-zA-Z0-9._-]+/?$`);
      if (!regex.test(value)) {
        switch (key) {
          case 'instagram':
            errors.push(0);
            break;
          case 'tiktok':
            errors.push(1);
            break;
          case 'facebook':
            errors.push(2);
            break;
          default:
            break;
        }
      }
      if (key === 'other' && !regexOther.test(value)) {
        errors.push(3);
      }
    });
    setErrorInput(errors);
    checkErrors(!!errors.length);
  };
  

  const filterEmptySocialMediaLink = () => {
    const filteredLinks = Object.fromEntries(
      Object.entries(socialNickname).filter(([_, value]) => value.trim() !== "")
    );
    return filteredLinks
  }

  const handleNext = async () => {
    const filterLink = filterEmptySocialMediaLink()
    validateSocialMediaLink(filterLink)     
  };

  const renderItem = ({item}: {item: Social}) => {    
    const isActive = openedSocial?.id === item.id;       
    const isError = errorInput.includes(item.id)    
    return (
      <TouchableOpacity
        onPress={() => setOpenedSocial(item)}
        style={{
          backgroundColor: isActive ? lightGray15Color : lightGray2Color,
          borderRadius: 10,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: isActive ? 0 : 16,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: isError? errorColor: isActive ? whiteColor : lightGray2Color,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(17, 812)}}>{item.title}</Text>
          {isActive ? <CheckCircle /> : <CircleGray />}
        </View>
        {isActive ? (
          <View style={{marginTop: 16}}>
            <Input
              placeholder={`Enter a link to your ${item.title} profile`}
              onPressFocus={() => setIsFocusInput(true)}
              onBlur={() => setIsFocusInput(false)}
              value={socialNickname[item.name]}
              onChange={val => handleSocialNicknameChange(val, item.name)}
              isError={isError}
              errorText='Incorrect link'
              inputStyle={{borderColor: 'red'}}
              containerInnerStyle={{borderWidth: isError? 1: 0, borderColor: isError? errorColor: ''}}
            />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{paddingHorizontal: 24, flex: 1, justifyContent: 'space-between'}}>
              {!isFocusInput && (
                <View style={{alignItems: 'center', marginTop: 16, paddingVertical: 28}}>
                  <LogoPrimary2 />
                </View>
              )}
              <View
                style={{
                  width: '100%',
                  marginBottom: screenHeight / 28,
                  marginTop: isFocusInput ? screenHeight / 40 : screenHeight / 14,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(38, 812),
                    marginBottom: 18,
                  }}>
                  Provide a link for your social media
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(16, 812),
                  }}>
                  Since you don't have an invitation code we need to check one of your social profile
                </Text>
              </View>
              <KeyboardAwareFlatList
                enableAutomaticScroll={false}
                data={socials}
                ItemSeparatorComponent={() => <View style={{height: 8}} />}
                renderItem={renderItem}
              />
              <View style={{marginVertical: 4}}>
                <Button title="Continue" loading={loading} disabled={!socialNickname[openedSocial?.name]?.length || !!errorInput.length} onPress={handleNext} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default VerifySocialProfile;

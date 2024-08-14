import {black1Color, lightGray15Color, lightGray2Color, whiteColor} from 'constants/colors';
import {FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import CheckCircle from 'assets/images/icons/check-circle.svg';
import CircleGray from 'assets/images/icons/circle-gray.svg';
import {isIos, screenHeight} from 'constants/common';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useContext, useState} from 'react';
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
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

interface Social {
  id: number;
  title: string;
  name: string;
}

const VerifySocialProfile = () => {
  const [openedSocial, setOpenedSocial] = useState<Social | null>(null);
  const [socialNickname, setSocialNickname] = useState<any>({});
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const {onBoarding} = useContext(AuthContext);

  const handleSocialNicknameChange = (value: string, social: string) => {
    setSocialNickname({...socialNickname, [social]: value});
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
      console.error(e);
      return null;
    }
  };

  const updateUserProfileImage = async (userId: string | null, imageUrl: string) => {
    try {
      await firestore().collection('userInfo').doc(userId).update({
        facePhoto: imageUrl,
      });
      console.log('User profile image updated successfully.');
    } catch (e) {
      console.error('Error updating user profile image: ', e);
    }
  };

  const updatePhotosImage = async (userId: string | null, imageUrl: string) => {
    try {
      await firestore().collection('userInfo').doc(userId).update({
        photos: imageUrl,
      });
      console.log('User profile image updated successfully.');
    } catch (e) {
      console.error('Error updating user profile image: ', e);
    }
  };

  const generateInviteCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 12;
    const countCodes = 5
    const inviteCodes = []

    for (let i = 0; i < countCodes; i++) {
      let inviteCode = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        inviteCode += characters.charAt(randomIndex);
      }
      inviteCodes.push({isActive: true, inviteCode: inviteCode})
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
          superInvites: 0
        })
        .then(async () => {
          console.warn('User added!');

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
      console.log(e);
      showToast('inviteMatch', '', `${e}`);
      setLoading(false);
    }
  };

  const handleNext = async () => {
    await handleRegisterUser(onBoarding);
    navigation.navigate(pendingScreenPath as never);
  };

  const renderItem = ({item}: {item: Social}) => {
    const isActive = openedSocial?.id === item.id;
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
          borderColor: isActive ? whiteColor : lightGray2Color,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(17, 812)}}>{item.title}</Text>
          {isActive ? <CheckCircle /> : <CircleGray />}
        </View>
        {isActive ? (
          <View style={{marginTop: 16}}>
            <Input value={socialNickname[item.name]} onChange={val => handleSocialNicknameChange(val, item.name)} />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: black1Color}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{paddingHorizontal: 24, flex: 1, justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <LogoPrimary2 />
          </View>
          <View
            style={{
              width: '100%',
              marginBottom: screenHeight / 28,
              marginTop: screenHeight / 14,
            }}>
            <Text
              style={{
                color: whiteColor,
                fontFamily: Satoshi400,
                fontSize: RFValue(34, 812),
                marginBottom: 18,
              }}>
              Please verify your social profile
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
              data={socials} 
              ItemSeparatorComponent={() => <View style={{height: 8}} />} 
              renderItem={renderItem} />
          </View>
        <View style={{marginVertical: 4}}>
          <Button title="Continue" loading={loading} disabled={!socialNickname[openedSocial?.name]?.length} onPress={handleNext} />
        </View>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default VerifySocialProfile;

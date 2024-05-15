import React, {FC, ReactNode, useContext, useState} from 'react';
import {View, SafeAreaView, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

//import components
import {gray1Color, whiteColor} from 'constants/colors.ts';
import useStyles from 'screens/Auth/TutorialsFlow/styles.ts';
import Stepper from 'components/Stepper/Stepper.tsx';
import CreateEvent from 'screens/Auth/TutorialsFlow/components/CreateEvent/CreateEvent.tsx';
import SwipeToInvite from 'screens/Auth/TutorialsFlow/components/SwipeToInvite/SwipeToInvite.tsx';
import SeeHoWantsToJoinYou from 'screens/Auth/TutorialsFlow/components/SeeHoWantsToJoinYou/SeeHoWantsToJoinYou.tsx';
import ApproveGuest from 'screens/Auth/TutorialsFlow/components/ApproveGuest/ApproveGuest.tsx';
import MeetEnjoy from 'screens/Auth/TutorialsFlow/components/MeetEnjoy/MeetEnjoy.tsx';
import JoinEvents from 'screens/Auth/TutorialsFlow/components/JoinEvents /JoinEvents.tsx';
import Button from 'components/Button/Button.tsx';
import {AuthContext} from 'contexts/AuthContext.tsx';
import {showToast} from 'helpers/showToast.ts';
import {useUser} from '../../../store/userStore';

const TutorialsFlow: FC = (): JSX.Element => {
  const [active, setActive] = useState<number>(0);

  const styles = useStyles();

  const content: ReactNode[] = [<CreateEvent />, <SwipeToInvite />, <SeeHoWantsToJoinYou />, <ApproveGuest />, <MeetEnjoy />, <JoinEvents />]; // all components for stepper
  const {onBoarding} = useContext(AuthContext);
  const accountType = onBoarding[0]?.accountType === 'guest';
  const setOnBoarding = useUser((i: any) => i?.setOnBoarding);

  const handleNext = () => {
    if (active === 5) {
      return handleCloseTutorialFlow();
    }

    setActive(p => p + 1);
  };

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
    let inviteCode = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      inviteCode += characters.charAt(randomIndex);
    }

    return inviteCode;
  };

  const formatDate = (date: any) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleCloseTutorialFlow = async () => {
    try {
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
        })
        .then(async () => {
          console.log('User added!');

          photos?.map(async (i: any, index: number) => {
            await uploadImage(i, userId).then(async image => {
              allImageUrl.push({image: image, id: index});
            });
            await updatePhotosImage(userId, allImageUrl);
          });
          await uploadImage(imageUri, userId).then(async image => {
            await updateUserProfileImage(userId, image);
          });
          setOnBoarding(true);
        });
    } catch (e) {
      console.log(e);
      showToast('cancel', '', `${e}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Stepper active={active} content={content} wrapperStyle={styles.wrapperStyle} />
      <View style={styles.wrapperButtons}>
        <Button buttonStyle={styles.buttonSkip} onPress={handleCloseTutorialFlow} title="Skip" variant="transparent" />
        <Button buttonStyle={styles.buttonNext} onPress={handleNext} title="Next" />
      </View>
      <View style={styles.wrapperBar}>
        {[...Array(accountType ? 5 : 6)].map((_, index) => (
          <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default TutorialsFlow;

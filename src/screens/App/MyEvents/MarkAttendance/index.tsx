import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Config from 'react-native-config';
import {Event, EventData} from 'src/types/event';
import firestore from '@react-native-firebase/firestore';
import {backgroundGradientColors, blackColor, whiteColor} from 'constants/colors';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {ACCEPTED_STATUS, APPROVED_STATUS, INVITE_MATCH_STATUS, screenHeight} from 'constants/common';
import Button from 'components/Button/Button';
import {Checkbox} from '@ant-design/react-native';
import FastImage from 'react-native-fast-image';
import {UserInfo} from 'src/types/userInfo';
import {calculateAge} from 'helpers/calculateAge';

interface MarkUser extends Event.User {
  isPresent?: boolean;
  showAge?: boolean;
  date?: string;
}

const MarkAttendance = () => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiUsersCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const route = useRoute();
  const {eventId} = route.params as {eventId: string};
  const [eventUsersList, setEventUsersList] = useState<MarkUser[] | null>(null);
  const [loadingEventUsersList, setLoadingEventUsersList] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigation = useNavigation();

  const getEventData = async () => {
    if (!eventId) {
      return;
    }
    try {
      setLoadingEventUsersList(true);
      const event = await firestore().collection(apiEventsCollection).doc(eventId).get();
      if (event.exists) {
        const data = event.data() as EventData;
        const usersList = [];
        for (const user of data.usersList) {
          if (user.status === ACCEPTED_STATUS || user.status === INVITE_MATCH_STATUS || user.status === APPROVED_STATUS) {
            const userQuery = await firestore().collection(apiUsersCollection).doc(user.uid).get();
            if (userQuery.exists) {
              const userData: UserInfo = userQuery.data() as UserInfo;
              usersList.push({
                ...user,
                userPhoto: userData.photos[0].image,
                showAge: userData.showAge,
                date: userData.date,
                isPresent: false,
              });
            }
          }
        }

        setEventUsersList(usersList as Event.User[]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingEventUsersList(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getEventData();
  }, [eventId]);

  const handleMarkAllAsPresent = () => {
    const updatedUsersList = eventUsersList?.map(user => ({...user, isPresent: true}));
    setEventUsersList(updatedUsersList!);
  };

  const handleChangePresentUser = (userUid: string) => {
    const updatedUsersList = eventUsersList?.map(user => {
      if (user.uid === userUid) {
        return {...user, isPresent: !user.isPresent};
      }
      return user;
    });
    setEventUsersList(updatedUsersList!);
  };

  const handleSubmit = async () => {
    if (!eventUsersList?.length || loadingSubmit || !eventId) {
      return;
    }
    setLoadingSubmit(true);
    const updatedUsersList = eventUsersList?.map(user => ({
      createdAt: user.createdAt,
      gender: user.gender,
      uid: user.uid,
      name: user.name,
      status: user.status,
      superInvite: user.superInvite,
      userPhoto: user.userPhoto,
      isPresent: user.isPresent,
    }));

    try {
      await firestore().collection(apiEventsCollection).doc(eventId).update({
        usersList: updatedUsersList,
        isMarkedAttendance: true,
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const renderUser = (user: MarkUser) => {
    const isPresent = user?.isPresent;
    const gender = user?.gender.charAt(0).toUpperCase() + user?.gender.slice(1);
    const age = user?.showAge && user?.date ? ` · ${calculateAge(user.date)} years old` : '';

    return (
      <View
        style={{
          width: '100%',
          padding: 16,
          backgroundColor: isPresent ? '#131313' : 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <FastImage source={{uri: user.userPhoto}} style={{width: 56, height: 56, borderRadius: 100}} />
          </View>
          <View
            style={{
              marginLeft: 16,
              gap: 4,
            }}>
            <Text style={{fontSize: RFValue(16, 932), fontFamily: Satoshi700, color: whiteColor}}>{user.name}</Text>
            <Text
              style={{
                fontSize: RFValue(14, 932),
                fontFamily: Satoshi500,
                color: 'rgba(255, 255, 255, 0.72)',
              }}>{`${gender}${age}`}</Text>
          </View>
        </View>
        <View>
          <Checkbox checked={isPresent} onChange={() => handleChangePresentUser(user.uid)} />
        </View>
      </View>
    );
  };

  if (loadingEventUsersList) {
    return (
      <LinearGradient
        colors={backgroundGradientColors}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={whiteColor} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 10}}>
          <TouchableOpacity onPress={handleGoBack}>
            <ArrowLeft />
          </TouchableOpacity>
          <Text style={{fontSize: RFValue(24, 932), fontFamily: Satoshi500, color: whiteColor}}>Mark Attendance</Text>
          <View />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
            paddingTop: screenHeight / 40,
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={handleMarkAllAsPresent}>
            <Text style={{fontSize: RFValue(16, 932), fontFamily: Satoshi700, color: whiteColor}}>Mark All as Present</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <FlatList data={eventUsersList} renderItem={({item}) => renderUser(item)} />
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 16, paddingBottom: 20}}>
          <Button title="Submit" onPress={handleSubmit} loading={loadingSubmit} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MarkAttendance;

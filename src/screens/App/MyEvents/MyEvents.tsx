import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';

//import components
import useStyles from 'screens/App/MyEvents/styles.ts';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard.tsx';
import {useMyEvents} from '../../../store/myEvents';
import {showToast} from 'helpers/showToast.ts';
import {blackColor, grayColor, lightGray2Color, lightGray5Color, whiteColor} from 'constants/colors';
import JoiningEventsCard from 'components/Cards/JoiningEventsCard/JoiningEventsCard';
import ModalCancelAttending from './ModalCancelAttending';
import ModalAcceptInvitation from './ModalAcceptInvitation';
import {useUser} from '../../../store/userStore';
import {ALL, screenHeight, THIS_MONTH, THIS_WEEKEND} from 'constants/common.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {EventsDate} from 'contexts/EventsDate.tsx';

//import images
import CalendarSearchIcon from 'assets/images/icons/calendar-search.svg';
import Button from 'components/Button/Button';
import {eventCreatingStackPath} from 'constants/pathLocations';
import {IOStackNavigation} from 'navigator/AppStackScreens/AppStackScreens';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';

const MyEvents: FC<any> = ({navigation}) => {
  const styles = useStyles();
  const MY_EVENTS = 'my_events';
  const EVENTS_JOINING = 'events_joining';

  const [isVisibleCancelAttendingModal, setIsVisibleCancelAttendingModal] = useState<boolean>(false);
  const [isVisibleAcceptInvitationModal, setIsVisibleAcceptInvitationModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(MY_EVENTS);
  const [activeModalEvent, setActiveModalEvent] = useState<any>({
    id: 0,
    image: '',
    textCityName: '',
    date: '',
    numberOfGirlsInvited: 0,
    host: {
      name: '',
      image: '',
    },
  });
  const [activeUserInfo, setActiveUserInfo] = useState<any>({});  
  
  const [myEventsData, setMyEventsData] = useState([]);
  const [eventsJoiningData, setEventsJoiningData] = useState([]);

  const user = useUser((i: any) => i?.user);
  const setEventsImJoining = useMyEvents((i: any) => i?.setEventsImJoining);
  const isHost = user?.accountType === 'host';
  const {activeEventDate, setActiveEventDate} = useContext(EventsDate);

  const [userInfo, setUserInfo] = useState<any>({});

  const fetchUserInfo = async () => {
    const user = auth().currentUser;

    if (user) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();
        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
        
      } catch (error: any) {
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleOpenCancelAttendingModal = (
    eventInfo: {image: string; textCityName: string; date: string; numberOfGirlsInvited: string},
    userInfo,
  ) => {
    setActiveModalEvent(eventInfo);
    setActiveUserInfo(userInfo);
    setIsVisibleCancelAttendingModal(true);
  };

  const handleOpenAcceptInvitationModal = (
    eventInfo: {
      image: string;
      textCityName: string;
      date: string;
      numberOfGirlsInvited: string;
    },
    userInfo,
  ) => {
    setActiveModalEvent(eventInfo);
    setActiveUserInfo(userInfo);
    setIsVisibleAcceptInvitationModal(true);
  };

  const goToCreateEvent = (): void => {
    if (!user?.accountConfirmed) {
      return;
    }
    navigation.navigate(eventCreatingStackPath);
  };

  const goToIOStack = () => {
    navigation.navigate(IOStackNavigation);
  };

  const handleAcceptInvitation = async () => {
    try {
      let list = activeModalEvent?.list;
      const uid = user?.uid;

      changeStatus(list?.usersList, uid, 'accepted');
      console.log('handleAcceptInvitation');

      console.log('accepted', list?.usersList);
      await firestore().collection('Events').doc(list?.id).update({
        usersList: list?.usersList,
      });
      setIsVisibleAcceptInvitationModal(false);
      showToast('success', '', `You accepted ${activeModalEvent.textCityName} event`);
    } catch (e) {
      showToast('cancel', '', 'Error!');
      console.log(e);
    }
  };

  const handleRejectInvitation = async () => {
    try {
      let list = activeModalEvent?.list;
      const uid = user?.uid;

      changeStatus(list?.usersList, uid, 'notAccepted');

      await firestore().collection('Events').doc(list?.id).update({
        usersList: list?.usersList,
      });
      setIsVisibleAcceptInvitationModal(false);
      showToast('cancel', '', `You rejected ${activeModalEvent.textCityName} event`);
    } catch (e) {
      showToast('cancel', '', 'Error!');
      console.log(e);
    }
  };

  const changeStatus = (usersList: any, uid: string, status: string): void => {
    for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].uid === uid) {
        usersList[i].status = status;
        break;
      }
    }
  };

  const handleCancelAttending = async () => {
    try {
      let list = activeModalEvent?.list;
      const uid = user?.uid;

      changeStatus(list?.usersList, uid, 'notAccepted');

      await firestore().collection('Events').doc(list?.id).update({
        usersList: list?.usersList,
      });
      setIsVisibleCancelAttendingModal(false);
      showToast('cancel', 'Go to my events', `You rejected ${activeModalEvent.textCityName} event`);
    } catch (e) {
      showToast('cancel', '', 'Error!');
      console.log(e);
    }
  };

  const handleGetEventsIJoining = async () => {
    try {
      const uid = user?.uid;
      const events = await firestore().collection('Events').get();
      const data = events?.docs?.map(i => i?.data());

      const filterData = data?.filter(obj => {
        return obj?.usersList?.some(user => {
          return user?.uid === uid && (user?.status === 'invited' || user?.status === 'accepted');
        });
      });

      console.log('filterData', filterData);
      setEventsJoiningData(filterData);
      setEventsImJoining(filterData);
    } catch (e) {
      console.log('error events im joining', e);
      // showToast('cancel', 'Error!');
    }
  };

  const getMyEvents = async () => {
    try {
      if (user) {
        const querySnapshot = await firestore().collection('Events').where('uid', '==', `${user?.uid}`).get();
        const data = querySnapshot?.docs?.map(i => i?.data());
        setMyEventsData(data);
      }
    } catch (e) {
      console.log('error my events', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMyEvents();
      handleGetEventsIJoining();
    }, [setIsVisibleCancelAttendingModal, isVisibleCancelAttendingModal]),
  );

  return (
    <>
      <View style={styles.container}>
        {isHost ? (
          <View style={styles.wrapperHeaderButtonMyEvents}>
            <TouchableOpacity
              style={[
                styles.buttonMyEvents,
                {flex: 1, alignItems: 'center', backgroundColor: activeTab === MY_EVENTS ? whiteColor : lightGray2Color},
              ]}
              onPress={() => setActiveTab(MY_EVENTS)}>
              <Text style={[styles.textMyEvents, {color: activeTab === MY_EVENTS ? blackColor : whiteColor}]}>My events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonEventsJoining,
                {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: activeTab === EVENTS_JOINING ? whiteColor : lightGray2Color,
                },
              ]}
              onPress={() => setActiveTab(EVENTS_JOINING)}>
              <Text
                style={[
                  {
                    fontFamily: Satoshi400,
                    fontSize: RFValue(16, 812),
                    color: activeTab === EVENTS_JOINING ? blackColor : whiteColor,
                  },
                ]}>
                Join Events
              </Text>
              <View style={styles.rowTextCountEvents}>
                <Text style={styles.textCountEvents}>{eventsJoiningData?.length}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginVertical: screenHeight / 50, height: 77, flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.eventButton}
              activeOpacity={0.7}
              onPress={() => {
                if (!user?.accountConfirmed) {
                  return;
                }
                setActiveEventDate(ALL);
              }}>
              <View
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: activeEventDate === ALL ? whiteColor : lightGray5Color,
                  borderStyle: 'solid',
                  padding: 3,
                  width: 55,
                  height: 55,
                  backgroundColor: lightGray5Color,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CalendarSearchIcon width={26} height={26} />
                <Text style={{fontSize: RFValue(6, 812), color: activeEventDate === ALL ? whiteColor : grayColor}}>Today</Text>
              </View>
              <Text
                style={{
                  marginTop: screenHeight / 190,
                  color: whiteColor,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(13, 812),
                  textAlign: 'center',
                }}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.eventButton}
              activeOpacity={0.7}
              onPress={() => {
                if (!user?.accountConfirmed) {
                  return;
                }
                setActiveEventDate(THIS_WEEKEND);
              }}>
              <View
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: activeEventDate === THIS_WEEKEND ? whiteColor : lightGray5Color,
                  borderStyle: 'solid',
                  padding: 3,
                  width: 55,
                  height: 55,
                  backgroundColor: lightGray5Color,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CalendarSearchIcon width={26} height={26} />
                <Text style={{fontSize: RFValue(6, 812), color: activeEventDate === THIS_WEEKEND ? whiteColor : grayColor}}>Weekend</Text>
              </View>
              <Text
                style={{
                  marginTop: screenHeight / 190,
                  color: whiteColor,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(13, 812),
                  textAlign: 'center',
                }}>
                This weekend
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.eventButton}
              activeOpacity={0.7}
              onPress={() => {
                if (!user?.accountConfirmed) {
                  return;
                }
                setActiveEventDate(THIS_MONTH);
              }}>
              <View
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: activeEventDate === THIS_MONTH ? whiteColor : lightGray5Color,
                  borderStyle: 'solid',
                  padding: 3,
                  width: 55,
                  height: 55,
                  backgroundColor: lightGray5Color,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CalendarSearchIcon width={26} height={26} />
                <Text style={{fontSize: RFValue(6, 812), color: activeEventDate === THIS_MONTH ? whiteColor : grayColor}}>Month</Text>
              </View>
              <Text
                style={{
                  marginTop: screenHeight / 190,
                  color: whiteColor,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(13, 812),
                  textAlign: 'center',
                }}>
                This month
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{flex: 1, height: '100%'}}>
          {isHost ? (
            activeTab === MY_EVENTS ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{flex: 1, height: '100%', marginBottom: screenHeight / 10}}
                data={myEventsData}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={() => (
                  <View style={{marginTop: screenHeight / 6}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(44, 812), marginBottom: 20}}>
                      Let's create an event
                    </Text>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(17, 812), opacity: 0.8, marginBottom: 40}}>
                      Get started by creating an event to begin inviting guests.
                    </Text>
                    <Button title="Create event" onPress={goToCreateEvent} />
                  </View>
                )}
                renderItem={({item}) => (
                  <MyEventsCard
                    imageBg={item?.photos}
                    list={item}
                    activeState={item?.statusEvent}
                    allPeople={item?.female + item?.male}
                    date={item?.date}
                    textCityName={item?.name}
                    placeName={item?.placeName}
                    estimeTime={item?.hour}
                    numberOfGirlsInvited={item?.female}
                    placeName={item?.placeName}
                    invitingPeople={item?.usersList?.filter(i => i?.status !== 'notAccepted')}
                    accountConfirmed={user?.accountConfirmed}
                  />
                )}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={eventsJoiningData}
                style={{flex: 1, backgroundColor: 'transparent', height: '100%', marginBottom: screenHeight / 10}}
                ListEmptyComponent={() => (
                  <View style={{marginTop: screenHeight / 6}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(44, 812), marginBottom: 20}}>
                      You need to join an event
                    </Text>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(17, 812), opacity: 0.8, marginBottom: 40}}>
                      You don't have any active event.
                    </Text>
                    <Button title="Join event" onPress={goToIOStack} />
                  </View>
                )}
                renderItem={({item}) => (
                  <JoiningEventsCard
                    id={item?.id}
                    uid={item?.uid}
                    activeState={item.statusEvent}
                    allPeople={item?.female + item?.femaleFriend + item?.male + item?.maleFriend}
                    date={item.date}
                    deleteUsers={item.deleteUsers}
                    oldDate={item.oldDate}
                    oldName={item.oldName}
                    oldHour={item.oldHour}
                    dateNewViewed={item.dateNewViewed}
                    nameNewViewed={item.nameNewViewed}
                    hourNewViewed={item.hourNewViewed}
                    hour={item?.hour}
                    placeName={item?.placeName}
                    list={item}
                    image={item?.photos[0]?.image}
                    textCityName={item.name}
                    estimeTime={item.hour}
                    numberOfGirlsInvited={item?.female + item?.femaleFriend}
                    host={{name: item?.name, image: item?.hostImage, hostUid: item?.uid}}
                    joinedPeopleCount={item?.usersList?.filter(i => i?.status === 'accepted')?.length}
                    isAcceptedInvitation={item?.usersList?.filter(j => j?.uid === user?.uid)[0]?.status === 'accepted'}
                    handleOpenCancelAttendingModal={handleOpenCancelAttendingModal}
                    handleOpenAcceptInvitationModal={handleOpenAcceptInvitationModal}
                    handleAcceptInvitation={handleAcceptInvitation}
                    handleGetEventsIJoining={handleGetEventsIJoining}
                  />
                )}
              />
            )
          ) : (
            <View style={{flex: 1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={eventsJoiningData}
                style={{flex: 1, backgroundColor: 'transparent', height: '100%', marginBottom: screenHeight / 10}}
                ListEmptyComponent={() => (
                  <View style={{marginTop: screenHeight / 6}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(44, 812), marginBottom: 20}}>
                      You need to join an event
                    </Text>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(17, 812), opacity: 0.8, marginBottom: 40}}>
                      You don't have any active event.
                    </Text>
                    <Button title="Join event" onPress={goToIOStack} />
                  </View>
                )}
                renderItem={({item}) => (
                  <JoiningEventsCard
                    uid={item?.uid}
                    activeState={item.statusEvent}
                    allPeople={item?.female + item?.femaleFriend + item?.male + item?.maleFriend}
                    date={item.date}
                    oldName={item.oldName}
                    oldHour={item.oldHour}
                    dateNewViewed={item.dateNewViewed}
                    nameNewViewed={item.nameNewViewed}
                    hourNewViewed={item.hourNewViewed}
                    hour={item?.hour}
                    placeName={item?.placeName}
                    list={item}
                    image={item?.photos[0]?.image}
                    textCityName={item.address}
                    estimeTime={item.hour}
                    numberOfGirlsInvited={item?.female + item?.femaleFriend}
                    host={{name: item?.name, image: item?.hostImage, hostUid: item?.uid}}
                    joinedPeopleCount={item?.usersList?.filter(i => i?.status === 'accepted')?.length}
                    isAcceptedInvitation={item?.usersList?.filter(j => j?.uid === user?.uid)[0]?.status === 'accepted'}
                    handleOpenCancelAttendingModal={handleOpenCancelAttendingModal}
                    handleOpenAcceptInvitationModal={handleOpenAcceptInvitationModal}
                    handleAcceptInvitation={handleAcceptInvitation}
                    handleGetEventsIJoining={handleGetEventsIJoining}
                  />
                )}
              />
            </View>
          )}
        </View>
      </View>
      <ModalCancelAttending
        handleCancelAttending={handleCancelAttending}
        isVisible={isVisibleCancelAttendingModal}
        onClose={() => setIsVisibleCancelAttendingModal(false)}
        eventInfo={activeModalEvent}
        userInfo={activeUserInfo}
      />
      <ModalAcceptInvitation
        handleRejectInvitation={handleRejectInvitation}
        handleAcceptInvitation={handleAcceptInvitation}
        isVisible={isVisibleAcceptInvitationModal}
        onClose={() => setIsVisibleAcceptInvitationModal(false)}
        userInfo={activeUserInfo}
        eventInfo={activeModalEvent}
      />
      {!userInfo?.accountConfirmed && <ModalLockAccount isVisibleButton={true}/>}
    </>
  );
};

export default MyEvents;

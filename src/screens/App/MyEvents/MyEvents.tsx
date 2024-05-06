import React, {FC, useCallback, useContext, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

//import components
import useStyles from 'screens/App/MyEvents/styles.ts';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard.tsx';

//import images
import AddIcon from 'assets/images/icons/add.svg';
import JoiningEventsCard from 'components/Cards/JoiningEventsCard/JoiningEventsCard';
import {FlatList} from 'react-native';
import {blackColor, grayColor, lightGray2Color, lightGray5Color, whiteColor} from 'constants/colors';
import ModalCancelAttending from './ModalCancelAttending';
import {showToast} from 'helpers/showToast.ts';
import ModalAcceptInvitation from './ModalAcceptInvitation';
import {useUser} from '../../../store/userStore';
import {useFocusEffect} from '@react-navigation/native';
import {ALL, screenHeight, THIS_MONTH, THIS_WEEKEND} from 'constants/common.ts';
import {eventCreatingStackPath} from 'constants/pathLocations.ts';
import CalendarSearchIcon from 'assets/images/icons/calendar-search.svg';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi500} from 'constants/fonts.ts';
import {EventsDate} from 'contexts/EventsDate.tsx';

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
  const [myEventsData, setMyEventsData] = useState([]);
  const [eventsJoiningData, setEventsJoiningData] = useState([]);

  const user = useUser((i: any) => i?.user);
  const isHost = user?.accountType === 'host';
  const {activeEventDate, setActiveEventDate} = useContext(EventsDate);

  const handleOpenCancelAttendingModal = (eventInfo: {image: string; textCityName: string; date: string; numberOfGirlsInvited: string}) => {
    setActiveModalEvent(eventInfo);
    setIsVisibleCancelAttendingModal(true);
  };

  const handleOpenAcceptInvitationModal = (eventInfo: {image: string; textCityName: string; date: string; numberOfGirlsInvited: string}) => {
    setActiveModalEvent(eventInfo);
    setIsVisibleAcceptInvitationModal(true);
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

      console.log('data', data);
      const filterData = data?.filter(obj => {
        return obj?.usersList?.some(user => {
          return user?.uid === uid && (user?.status === 'invited' || user?.status === 'accepted');
        });
      });

      console.log('filterData', filterData);
      setEventsJoiningData(filterData);
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
              style={[styles.buttonMyEvents, {backgroundColor: activeTab === MY_EVENTS ? whiteColor : lightGray2Color}]}
              onPress={() => setActiveTab(MY_EVENTS)}>
              <Text style={[styles.textMyEvents, {color: activeTab === MY_EVENTS ? blackColor : whiteColor}]}>My events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonEventsJoining, {backgroundColor: activeTab === EVENTS_JOINING ? whiteColor : lightGray2Color}]}
              onPress={() => setActiveTab(EVENTS_JOINING)}>
              <Text style={[styles.textEventsJoining, {color: activeTab === EVENTS_JOINING ? blackColor : whiteColor}]}>Events I'm Joining</Text>
              <View style={styles.rowTextCountEvents}>
                <Text style={styles.textCountEvents}>21</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(eventCreatingStackPath)} style={styles.addEventButton}>
              <View style={styles.addEventView}>
                <AddIcon width={19} height={19} />
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
                style={{flex: 1, height: '100%', marginBottom: screenHeight / 10}}
                showsVerticalScrollIndicator={false}
                data={myEventsData}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <MyEventsCard
                    imageBg={item?.photos[0]?.image}
                    list={item}
                    activeState={item?.statusEvent}
                    allPeople={item?.female + item?.femaleFriend + item?.male + item?.maleFriend}
                    date={item?.date}
                    textCityName={item?.address}
                    estimeTime={item?.hour}
                    numberOfGirlsInvited={item?.female + item?.femaleFriend}
                    invitingPeople={item?.usersList?.filter(i => i?.status !== 'notAccepted')}
                  />
                )}
              />
            ) : (
              <FlatList
                data={eventsJoiningData}
                style={{flex: 1, backgroundColor: 'transparent'}}
                renderItem={({item}) => (
                  <JoiningEventsCard
                    activeState={item.statusEvent}
                    allPeople={item?.female + item?.femaleFriend + item?.male + item?.maleFriend}
                    date={item.date}
                    hour={item?.hour}
                    placeName={item?.placeName}
                    list={item}
                    image={item?.photos[0]?.image}
                    textCityName={item.address}
                    estimeTime={item.hour}
                    numberOfGirlsInvited={item?.female + item?.femaleFriend}
                    host={{name: item?.name, image: item?.hostImage}}
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
                data={eventsJoiningData}
                style={{flex: 1, backgroundColor: 'transparent'}}
                renderItem={({item}) => (
                  <JoiningEventsCard
                    activeState={item.statusEvent}
                    allPeople={item?.female + item?.femaleFriend + item?.male + item?.maleFriend}
                    date={item.date}
                    hour={item?.hour}
                    placeName={item?.placeName}
                    list={item}
                    image={item?.photos[0]?.image}
                    textCityName={item.address}
                    estimeTime={item.hour}
                    numberOfGirlsInvited={item?.female + item?.femaleFriend}
                    host={{name: item?.name, image: item?.hostImage}}
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
      />
      <ModalAcceptInvitation
        handleRejectInvitation={handleRejectInvitation}
        handleAcceptInvitation={handleAcceptInvitation}
        isVisible={isVisibleAcceptInvitationModal}
        onClose={() => setIsVisibleAcceptInvitationModal(false)}
        eventInfo={activeModalEvent}
      />
    </>
  );
};

export default MyEvents;

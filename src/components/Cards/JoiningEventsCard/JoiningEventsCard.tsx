import React, {FC, useState, useEffect, useCallback} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

//import components
import useStyles from 'components/Cards/JoiningEventsCard/styles.ts';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import CalendarBlank from 'assets/images/icons/CalendarBlank.svg';
import ProfileTwoUser from 'assets/images/icons/profile-2user.svg';
import Users from 'assets/images/icons/Users.svg';
import Clock from 'assets/images/icons/clock-white.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import {blackColor, lightGray8Color, lightGreenColor, transparent60Color, whiteColor} from 'constants/colors.ts';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, eventInfoPath} from 'constants/pathLocations';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight} from 'constants/common';
import ModalEventRemindes from 'components/Modal/ModalEventRemindes/ModalEventRemindes.tsx';
import firestore from '@react-native-firebase/firestore';
import {calculateAge} from 'helpers/calculateAge';
import {useFocusEffect} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { endEvent } from 'react-native/Libraries/Performance/Systrace';

interface JoiningEventsCard {
  estimeTime: string;
  uid: string;
  id: string;
  activeState: boolean;
  host: {image: string; name: string};
  image: string;
  list: any;
  allPeople: number;
  // usersList: [],
  deleteUsers: [],
  dateNewViewed: [],
  hourNewViewed: [],
  nameNewViewed: [],
  textCityName: string;
  numberOfGirlsInvited: string;
  placeName: string;
  date: string;
  hour: string;
  oldDate: string;
  oldName: string;
  oldHour: string;
  joinedPeopleCount: number;
  isAcceptedInvitation: boolean;
  handleAcceptInvitation: any;
  handleGetEventsIJoining: any;
  handleOpenCancelAttendingModal: (eventInfo: {
    list: any;
    host: any;
    image: string;
    textCityName: string;
    date: string;
    numberOfGirlsInvited: string;
  }) => void;
  handleOpenAcceptInvitationModal: (eventInfo: {
    list: any;
    host: any;
    image: string;
    textCityName: string;
    date: string;
    numberOfGirlsInvited: string;
  }) => void;
}

const JoiningEventsCard: FC<JoiningEventsCard> = ({
  activeState,
  uid,
  id,
  estimeTime,
  date,
  oldDate,
  // usersList,
  deleteUsers,
  oldName,
  oldHour,
  dateNewViewed,
  nameNewViewed,
  hourNewViewed,
  image,
  list,
  hour,
  host,
  numberOfGirlsInvited,
  allPeople,
  textCityName,
  placeName,
  joinedPeopleCount,
  isAcceptedInvitation,
  handleOpenCancelAttendingModal,
  handleOpenAcceptInvitationModal,
  handleAcceptInvitation,
  handleGetEventsIJoining,
}) => {
  
  const [eventStarting, setEventStarting] = useState<boolean>(true);
  const [updateEvent, setUpdateEvent] = useState<string | null>(null);
  const [visibleUserDelete, setVisibleUserDelete] = useState(true)
  const [userDelete, setUserDelete] = useState<string | null>(null);
  
  const [userInfo, setUserInfo] = useState<any>();
  const [eventData, setEventData] = useState({
    time: '',
    image: '',
    city: '',
    placeName: '',
    date: '',
    girlInvitatio: '',
  });
  const styles = useStyles();
  const navigation = useAppNavigation();    

  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;

  const getUserInfo = async () => {
    const userInfoDoc = await firestore().collection('userInfo').doc(host?.hostUid).get();
    if (userInfoDoc.exists) {
      setUserInfo(userInfoDoc.data());
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, []),
  );

  const EventInReviewView = () => (
    <View style={styles.eventInReviewView}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}}>
        <Clock width={24} height={24} style={{marginRight: 8}} />
        <Text style={styles.textEventInReview}>Event in review</Text>
      </View>
    </View>
  );

  const calculateTimeDifference = (start: string, end: string) => {
    let startTime = start.split(':');
    let endTime = end.split(':');

    let startHour = parseInt(startTime[0], 10);
    let startMinute = parseInt(startTime[1], 10);
    let endHour = parseInt(endTime[0], 10);
    let endMinute = parseInt(endTime[1], 10);

    let startTotalMinutes = startHour * 60 + startMinute;
    let endTotalMinutes = endHour * 60 + endMinute;

    if (endTotalMinutes < startTotalMinutes) {
      endTotalMinutes += 24 * 60;
    }

    let differenceInMinutes = endTotalMinutes - startTotalMinutes;

    let hours = Math.floor(differenceInMinutes / 60);

    return hours;
  };

  useEffect(() => {
    if (
      (calculateTimeDifference(currentTime, hour) === 0 && !isAcceptedInvitation) ||
      (calculateTimeDifference(currentTime, hour) >= 2 && !isAcceptedInvitation) ||
      (calculateTimeDifference(currentTime, hour) >= 12 && !isAcceptedInvitation) ||
      (calculateTimeDifference(currentTime, hour) >= 24 && !isAcceptedInvitation)
    ) {
      setEventData({
        time: calculateTimeDifference(currentTime, hour).toString(),
        image: image,
        city: textCityName,
        date: moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD.MM.YYYY'),
        girlInvitatio: numberOfGirlsInvited,
        placeName: placeName,
      });
      setEventStarting(true);
    } 
  }, []);

  const checkUpdate = () => {
    const userId = auth().currentUser?.uid;
    const userViewdDate = dateNewViewed.includes(userId, 0);
    const userViewdHour = hourNewViewed.includes(userId, 0);
    const userViewdName = nameNewViewed.includes(userId, 0);    
    
    if(oldDate != date && !userViewdDate && updateEvent != 'name' && updateEvent != 'hour' && updateEvent != 'date') {
      setUpdateEvent('date')
    } else if (oldName != textCityName && !userViewdName && updateEvent != 'name' && updateEvent != 'hour') {
      setUpdateEvent('name')
    } else if(oldHour != hour && !userViewdHour && updateEvent != 'hour' && updateEvent != 'date') {
      setUpdateEvent('hour')
    } else{
      setUpdateEvent(null)
    }
  }

  const deleteUserFromCanceled = async () => {
    const userId = auth().currentUser?.uid;
    const dataEvents = (await firestore().collection('Events').doc(id).get()).data();
    const deleteUsers = dataEvents.deleteUsers.filter(item => item !== userId)
    try {
      await firestore().collection('Events').doc(id).update({
        deleteUsers: [...deleteUsers]
      })
    } catch (error) {
      console.log('error deleteUserFromCanceled', error);
      
    }
  }

  useEffect(() => {
    checkUpdate()
  },[])

  useEffect(() => {
    const userId = auth().currentUser?.uid;
    if(deleteUsers) {
    const userInList = deleteUsers.filter(item => item === userId);
      if(userInList.length) {
        setUserDelete(userInList[0])
      }
    }
  },[deleteUsers])
  
  return (
    <>
    {!userDelete && <View style={styles.container}>
      {activeState ? (
        <View style={{overflow: 'hidden', height: 220}}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={[styles.linearGradientCard, {paddingTop: 0, borderRadius: 20}]}>
            <ImageBackground
              source={{uri: image}}
              resizeMode="cover"
              style={{height: screenHeight / 5, paddingTop: screenHeight / 100}}
              borderRadius={20}>
              <TouchableOpacity
                style={{
                  backgroundColor: transparent60Color,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: 14,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                }}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate(commonStackPath, {
                    screen: eventInfoPath,
                    params: {list: list, isAcceptedInvitation: isAcceptedInvitation},
                  } as never)
                }>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {host?.image && <Image style={{borderRadius: 100, width: 40, height: 40}} source={{uri: host.image}} />}
                  <View style={{marginLeft: 6}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {userInfo?.accountType && (
                        <View
                          style={{
                            borderColor: whiteColor,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderRadius: 5,
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                          }}>
                          <Text style={{textTransform: 'capitalize', color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(9, 812)}}>
                            {userInfo.accountType}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>
                        {userInfo?.name}
                        {userInfo?.date && `, ${calculateAge(userInfo.date)}`}
                      </Text>
                      {userInfo?.accountConfirmed && <CheckStarIcon width={12} height={12} style={{marginLeft: 4}} />}
                    </View>
                  </View>
                </View>
                <ArrowRight style={styles.arrowRightIcon} width={14} height={14} />
              </TouchableOpacity>
              <View style={{marginTop: 'auto'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: 16}}>
                  <View
                    style={{backgroundColor: lightGreenColor, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 5, marginRight: 10}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(11, 812)}}>Active</Text>
                  </View>
                  <Text style={{fontFamily: Satoshi700, fontSize: RFValue(19, 812), color: whiteColor, marginRight: 8}}>{placeName}</Text>
                  {userInfo?.accountConfirmed && <CheckStarIcon />}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenHeight / 70, marginBottom: 10}}>
                  <View
                    style={{
                      backgroundColor: transparent60Color,
                      borderRadius: 50,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 2,
                    }}>
                    <ProfileTwoUser />
                    <Text style={styles.textUnderFooter}>{numberOfGirlsInvited} x Girl invitation</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: transparent60Color,
                      borderRadius: 50,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <CalendarBlank />
                    <Text style={styles.textUnderFooter}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD MMMM YYYY')}</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: transparent60Color,
                      borderRadius: 50,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Users />
                    <Text style={styles.textUnderFooter}>
                      {joinedPeopleCount}/{allPeople}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: lightGray8Color,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}>
              {!isAcceptedInvitation ? (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      handleOpenCancelAttendingModal({
                        image,
                        textCityName,
                        date,
                        numberOfGirlsInvited,
                        host,
                        list,
                      })
                    }
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      paddingVertical: screenHeight / 150,
                      marginRight: 6,
                    }}>
                    <Text style={{fontFamily: Satoshi400, fontSize: RFValue(16, 812), color: whiteColor}}>Reject invitation</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      handleOpenAcceptInvitationModal({
                        image,
                        textCityName,
                        date,
                        numberOfGirlsInvited,
                        host,
                        list,
                      })
                    }
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      paddingVertical: screenHeight / 150,
                      marginLeft: 6,
                      backgroundColor: whiteColor,
                      borderWidth: 1,
                      borderColor: whiteColor,
                    }}>
                    <Text style={{fontFamily: Satoshi400, fontSize: RFValue(16, 812), color: blackColor}}>Accept invitation</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    handleOpenCancelAttendingModal({
                      image,
                      textCityName,
                      date,
                      numberOfGirlsInvited,
                      host,
                      list,
                    })
                  }
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    paddingVertical: screenHeight / 150,
                    marginRight: 6,
                    borderColor: whiteColor,
                    borderStyle: 'solid',
                    borderWidth: 1,
                  }}>
                  <Text style={{fontFamily: Satoshi400, fontSize: RFValue(16, 812), color: whiteColor}}>Cancel attending</Text>
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </View>
      ) : (
        <ImageBackground
          borderRadius={14}
          imageStyle={{borderRadius: 14, overflow: 'hidden'}}
          source={{uri: image}}
          style={styles.imageBackground}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.linearGradientCard}>
            {activeState ? (
              <TouchableOpacity
                style={{
                  backgroundColor: transparent60Color,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: 14,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                }}
                onPress={() =>
                  navigation.navigate(commonStackPath, {
                    screen: eventInfoPath,
                    params: {list: list, isAcceptedInvitation: isAcceptedInvitation},
                  } as never)
                }>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {host?.image && <Image style={{borderRadius: 100, width: 40, height: 40}} source={{uri: host.image}} />}
                  <View style={{marginLeft: 6}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {userInfo?.accountType && (
                        <View
                          style={{
                            borderColor: whiteColor,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderRadius: 5,
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                          }}>
                          <Text style={{textTransform: 'capitalize', color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(9, 812)}}>
                            {userInfo.accountType}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>
                        {userInfo?.name}
                        {userInfo?.date && `, ${calculateAge(userInfo.date)}`}
                      </Text>
                      {userInfo?.accountConfirmed && <CheckStarIcon width={12} height={12} style={{marginLeft: 4}} />}
                    </View>
                  </View>
                </View>
                <ArrowRight style={styles.arrowRightIcon} width={14} height={14} />
              </TouchableOpacity>
            ) : (
              <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
                <EventInReviewView />
              </View>
            )}
            <View style={{marginTop: 'auto'}}>
              <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenHeight / 70, marginBottom: 10}}>
                <View
                  style={{
                    backgroundColor: transparent60Color,
                    borderRadius: 50,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 2,
                  }}>
                  <ProfileTwoUser />
                  <Text style={styles.textUnderFooter}>{numberOfGirlsInvited} x Girl invitation</Text>
                </View>
                <View
                  style={{
                    backgroundColor: transparent60Color,
                    borderRadius: 50,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CalendarBlank />
                  <Text style={styles.textUnderFooter}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD MMMM YYYY')}</Text>
                </View>
                <View
                  style={{
                    backgroundColor: transparent60Color,
                    borderRadius: 50,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Users />
                  <Text style={styles.textUnderFooter}>
                    {joinedPeopleCount}/{allPeople}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      )}
    </View>}
    <ModalEventRemindes
        updateEvent={updateEvent}
        eventStarting={eventStarting}
        setEventStarting={setEventStarting}
        deleteUserFromCanceled={deleteUserFromCanceled}
        id={id}
        uid={uid}
        userDelete={userDelete}
        visibleUserDelete={visibleUserDelete}
        setVisibleUserDelete={setVisibleUserDelete}
        activeState={activeState}
        checkUpdate={checkUpdate}
        host={host}
        setUpdateEvent={setUpdateEvent}
        time={eventData.time}
        hour={hour}
        image={image}
        placeName={placeName}
        joinedPeopleCount={joinedPeopleCount}
        city={eventData.city}
        date={date}
        girlInvitation={eventData.girlInvitatio}
        handleAcceptInvitation={handleAcceptInvitation}
        handleGetEventsIJoining={handleGetEventsIJoining}
        allPeople={allPeople}
      />
    </>
  );
};

export default JoiningEventsCard;

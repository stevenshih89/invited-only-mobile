import {SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import React, {FC, useState, useEffect, useContext, useCallback} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';

//import components
import useStyles from 'screens/App/IO/styles.ts';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';
import {screenHeight} from 'constants/common.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {eventCreatingStackPath, myProfileViewPath, userProfilePath} from 'constants/pathLocations.ts';
import SuperInvite from './screens/SuperInvite/SuperInvite';
import Match from './screens/Match/Match';
import Button from 'components/Button/Button.tsx';
import {showToast} from 'helpers/showToast.ts';
import {calculateAge} from 'helpers/calculateAge';
import {EventContext} from 'contexts/EventContext';
import {blackColor, transparentWhite56Color, whiteColor} from 'constants/colors';
import {fcmHelper, getFcmToken, onMatchNotificationSubscription} from 'helpers/fcmHelper.ts';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {useUser} from '../../../store/userStore';
import ModalReport from 'components/Modal/ModalReport/ModalReport.tsx';

//import icons
import ArrowRightIcon from 'assets/images/icons/arrow-right.svg';
import LocationIcon from 'assets/images/icons/location.svg';
import TablerGenderIcon from 'assets/images/icons/tabler_gender-bigender.svg';
import HomeIcon from 'assets/images/icons/home.svg';
import ArrowIcon from 'assets/images/icons/arrow-3.svg';
import WineIcon from 'assets/images/icons/milk.svg';
import SmokeIcon from 'assets/images/icons/smoke.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import PeopleIcon from 'assets/images/icons/profile-2user.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ClockIcon from 'assets/images/icons/clock-white.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import {EventsDate} from 'contexts/EventsDate.tsx';
import Loading from 'components/Loading/Loading';

const IO: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [isVisibleSuperInvite, setIsVisibleSuperInvite] = useState<boolean>(false);
  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);  
  const [myEvents, setMyEventsList] = useState([]);
  const [nameUser, setNameUser] = useState<string>('');
  const [uidScamUser, setUidScamUser] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>({});
  const [matchData, setMatchData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [modalReport, setModalReport] = useState<boolean>(false);
  const [activeSuperInviteUser, setActiveSuperInviteUser] = useState<any>({});
  const [currentEventCardPosition, setCurrentEventCardPosition] = useState(1);

  const {setMyEvents, setActiveEvent, activeEvent} = useContext(EventContext);

  const {activeEventDate} = useContext(EventsDate);

  const userHost = useUser((i: any) => i?.user);

  let currentDate = new Date();

  useEffect(() => {
    const unsubscribe = onMatchNotificationSubscription(message => {
      const data = message?.data;
      setMatchData(data);
      setIsVisibleMatch(true);
    });

    return () => unsubscribe();
  });

  const handleOpenSuperInvite = (item): void => {
    setActiveSuperInviteUser(item);
    setIsVisibleSuperInvite(true);
  };

  const handleCloseSuperInvite = (): void => {
    setIsVisibleSuperInvite(false);
  };

  const handleCloseMatch = (): void => {
    setIsVisibleMatch(false);
  };

  const getWeekNumber = date => {
    let firstDayOfYear: Date = new Date(date.getFullYear(), 0, 1);
    let pastDaysOfYear: number = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const filterDataByWeekAndMonth = (data, week, month) => {
    const weekNumber: number = parseInt(week);
    const monthNumber: number = parseInt(month);

    const isInWeek = (dateString, weekNumber): boolean => {
      const date: Date = new Date(dateString);
      const targetWeek: 1 | 0 = new Date(date.getFullYear(), 0, 1).getDay() === 0 ? 0 : 1;
      const currentWeek: number = Math.floor(
        ((date - new Date(date.getFullYear(), 0, 1)) / 86400000 + new Date(date.getFullYear(), 0, 1).getDay() + 1) / 7,
      );
      return currentWeek === weekNumber - targetWeek;
    };

    const isInMonth = (dateString, monthNumber): boolean => {
      const date: Date = new Date(dateString);
      return date.getMonth() + 1 === monthNumber;
    };

    const filteredData = data?.filter(event => {
      const eventDate = event?.date?.split('.').reverse().join('-');
      return isInWeek(eventDate, weekNumber) && isInMonth(eventDate, monthNumber);
    });

    return filteredData;
  };

  const handleOpenMatch = async (recipientUid: string, name: string, girlsPhoto: string) => {
    const userId = auth().currentUser?.uid;
    const token = await getFcmToken();

    try {
      await firestore().collection('CollectionOfMatches').add({
        notificationTokenSender: token,
        recipientUid: recipientUid,
        senderUid: userId,
        name: name,
        girlsPhoto: girlsPhoto,
      });
      showToast('pending', `Chat with ${name} >`, 'Invitation approved! Waiting for Alexa to accept your invitation.');
      // setIsVisibleMatch(true);
    } catch (e) {
      console.log(e);
    }
  };

  const OverlayRight = () => {
    return (
      <View style={[styles.overlayLabelContainerInvite]}>
        <Text style={styles.overlayLabelTextInvite}>{userHost?.accountType === 'host' ? 'INVITE' : 'Join'}</Text>
      </View>
    );
  };

  const OverlayLeft = () => {
    return (
      <View style={[styles.overlayLabelContainer]}>
        <Text style={styles.overlayLabelText}>NOPE</Text>
      </View>
    );
  };

  const fetchUserInfo = async () => {
    setLoading(true);
    const user = auth().currentUser;

    if (user) {
      try {
        const userInfoDoc = await firestore().collection('userInfo').doc(user.uid).get();

        if (userInfoDoc.exists) {
          setUserInfo(userInfoDoc.data());
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
    setLoading(false);
  };

  const fetchMyEvents = async (isFirstRender: boolean) => {
    const user = auth().currentUser;
    if (user) {
      try {
        const querySnapshot = await firestore().collection('Events').where('uid', '==', user.uid).get();
        
        if (querySnapshot.empty) {
          setMyEvents([]);
          return;
        }
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyEventsList(data);
        setMyEvents(data);
        isFirstRender && setActiveEvent(data[0]);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  const onInvite = async (forUserUid: string, eventId: string, requestsList: any, usersList: any) => {
    try {
      const guest = await firestore().collection('userInfo').doc(forUserUid).get();

      const activeEventId = activeEvent?.id ? activeEvent?.id : eventId;

      const host = userHost?.accountType === 'host';

      const userInvited = {
        gender: host ? guest.data()?.gender : userHost?.gender,
        name: host ? guest.data()?.name : userHost?.name,
        status: 'invited',
        superInvite: false,
        uid: host ? guest.data()?.uid : userHost?.uid,
        userPhoto: host ? guest.data()?.photos[0]?.image : userHost?.photos[0]?.image,
      };

      const usersListCheck = activeEvent?.usersList ? activeEvent?.usersList : usersList;

      let updateUsersList: any = [userInvited];
      usersListCheck !== undefined && updateUsersList?.push(...usersListCheck);

      if (userHost?.accountType === 'host') {
        await firestore().collection('Events').doc(activeEventId).update({
          usersList: updateUsersList,
        });
      } else {
        const updateRequestsList: any = [...requestsList, userInvited];

        await firestore()
          .collection('Events')
          .doc(activeEventId)
          .update({
            usersList: updateUsersList ? updateUsersList : usersList,
            requestsList: updateRequestsList,
          });
      }
      const ev = events?.filter(i => i?.info?.uid !== forUserUid);

      setEvents(ev);
    } catch (error) {
      console.log('eror invite', error);
    }
  };

  const handleChangeListsEvents = async (uid: string, type: string): Promise<void> => {
    if (type === 'accept') {
      const item = events?.filter(j => j?.info?.uid === uid)[0];
      const filter: any[] = events?.filter(i => i?.info?.uid !== uid);
      console.log('filter', filter);
      await onInvite(item?.info?.uid, item?.info?.id, item?.info?.requestsList, item?.info?.usersList);
      setEvents([...filter]);
    } else {
      console.log('reject', events);
      console.log('uid', uid);
      const filter: any[] = events?.filter(i => i?.info?.uid !== uid);
      console.log('filter events', filter);
      setEvents(filter);
    }
  };

  const getListForGuest = async () => {
    const user = auth().currentUser;
    if (!user) {
      return;
    }

    let filteredEvents: any[] = [];

    try {
      const querySnapshot = await firestore().collection('Events').get();
      filteredEvents = querySnapshot?.docs
        ?.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }))
        ?.filter(
          event =>
            !event.requestsList || (!event.requestsList.some((request: any) => request.uid === user.uid) && event?.uid !== userHost?.uid),
        );
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Something went wrong');
    }

    async function enrichElementsWithPhotos(elements) {
      const promises = elements?.map(async element => {
        const docRef = firestore().collection('userInfo').doc(element?.uid);
        const docRefMessage = firestore().collection('messages').where('uidHost', '==', element?.uid);
        const doc = await docRef?.get();
        const docMessages = await docRefMessage?.get();

        if (!doc?.exists) {
          return null;
        } else {
          const userInfo = doc?.data();
          const messages = docMessages?.docs;
          const findChat = messages
            ?.map(i => i?._data?.chats)
            .flatMap(array => array)
            .concat();
          const checkChat = findChat?.some(j => j?.uid === userHost?.uid);
          return {...element, userPhotos: userInfo?.photos, hostInfo: userInfo, availabilityOfChats: checkChat};
        }
      });

      return Promise.all(promises);
    }

    const enrichedEvents = await enrichElementsWithPhotos(filteredEvents);

    const data: any[] = [];

    const currentMonth = new Date().getMonth() + 1;
    const currentWeek = getWeekNumber(currentDate);

    const filterDataWM = activeEventDate === 'all' ? enrichedEvents : filterDataByWeekAndMonth(enrichedEvents, currentWeek, currentMonth);

    if (!filterDataWM.length) {
      return;
    }

    filterDataWM?.map((event: any) => {
      const currUserPhotos = event?.userPhotos?.map((photo: any) => photo?.image);
      const eventPhotos = event?.photos?.map((photo: any) => photo?.image);

      data.push({
        component: (
          <View style={styles.wrapperFakeCard}>
            <TouchingSlider
              hostInfo={event?.hostInfo}
              placeName={event?.placeName}
              girls={event?.female + event?.femaleFriend}
              date={event?.date}
              isShowEventPreview={true}
              isShowWantsJoin={false}
              isShowInvitesTooltip={false}
              isShowCardButtons={false}
              eventPhotos={eventPhotos}
              photos={currUserPhotos}
            />
            <View style={styles.bioWrapper}>
              <Text style={styles.titleSection}>Host profile</Text>
              <TouchableOpacity // @ts-ignore
                onPress={() => navigation.navigate(userProfilePath, {screen: myProfileViewPath, params: {uid: event?.uid}})}
                style={styles.wrapperHostProfile}>
                <View style={{flexDirection: 'row'}}>
                  {event?.hostImage && (
                    <View style={{flexDirection: 'row'}}>
                      <Image source={{uri: event?.hostImage}} style={{width: 40, height: 40, borderRadius: 50}} />
                      {/*<View style={styles.greenCircle} />*/}
                    </View>
                  )}
                  <View style={{marginLeft: 13}}>
                    <View
                      style={{
                        borderRadius: 4,
                        borderColor: whiteColor,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                      }}>
                      <Text style={{color: whiteColor, textTransform: 'capitalize', fontFamily: Satoshi700, fontSize: RFValue(10, 812)}}>
                        {event?.hostInfo.accountType}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                      <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812), marginRight: 6}}>
                        {event?.hostName}, {calculateAge(event?.hostInfo?.date)}
                      </Text>
                      {event?.hostInfo?.accountConfirmed && <CheckStarWhite />}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.textSeeProfile}>
                    <ArrowRightIcon width={14} height={14} />
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={[styles.titleSection, {marginTop: 20}]}>Event details</Text>
              <Text style={{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812)}}>Place name</Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>{event?.placeName}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812)}, {marginTop: 20}]}>
                Event name
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>{event?.name}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812)}, {marginTop: 20}]}>
                Event description
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>
                {event?.description}
              </Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <View style={{marginTop: 28}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                  <CalendarIcon width={16} height={16} />
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>{event?.date}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                  <ClockIcon width={16} height={16} />
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>{event?.hour}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                  <LocationIcon width={16} height={16} />
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>
                    {event?.address}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                  <PeopleIcon width={16} height={16} />
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>
                    {event?.female + event?.femaleFriend}x girl
                  </Text>
                </View>
              </View>
              <View>
                {eventPhotos?.map((image: string) => (
                  <Image source={{uri: image}} style={{width: '100%', height: screenHeight / 4, marginVertical: 10, borderRadius: 20}} />
                ))}
              </View>
              <Text style={styles.titleSection}>Already joined</Text>
              <View>
                <View style={styles.wrapperNumberPeople}>
                  <Text style={styles.textUnderSubTitle}>Female</Text>
                  <View style={styles.rowNumberPeople}>
                    <Text style={styles.textNumberInvitedPeople}>{event?.female}</Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={[styles.wrapperNumberPeople, {marginTop: 12}]}>
                  <Text style={styles.textUnderSubTitle}>Male</Text>
                  <View style={styles.rowNumberPeople}>
                    <Text style={styles.textNumberInvitedPeople}>{event?.male}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.wrapperButtonsFooter}>
                <TouchableOpacity
                  onPress={() => handleChangeListsEvents(event?.uid, 'reject')}
                  style={[styles.buttonCloseOrCheck, {marginLeft: 1}]}>
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      top: -1,
                      left: -1,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      right: -1,
                      bottom: -1,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: blackColor,
                      borderRadius: 50,
                      zIndex: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CloseIcon />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFlash} onPress={handleOpenSuperInvite}>
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      top: -1,
                      left: -1,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      right: -1,
                      bottom: -1,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: blackColor,
                      borderRadius: 50,
                      zIndex: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FlashIcon />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChangeListsEvents(event?.uid, 'accept')}
                  style={[styles.buttonCloseOrCheck, {marginRight: 1}]}>
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      top: -1,
                      left: -1,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: transparentWhite56Color,
                      width: '100%',
                      height: '100%',
                      borderRadius: 50,
                      position: 'absolute',
                      right: -1,
                      bottom: -1,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: blackColor,
                      borderRadius: 50,
                      zIndex: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CheckIcon />
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.textHideNadSendReport}>Reject and send report</Text>
            </View>
          </View>
        ),
        info: event,
      });
    });

    const recommendedData = sortByInterests(sortByDate(data)?.reverse(), userHost);

    setTimeout(() => {
      setEvents([...recommendedData]);
    }, 2000);
  };

  const getListForHost = async () => {
    const userInfo: FirebaseFirestoreTypes.DocumentData = await firestore().collection('userInfo').limit(20).get();
    let data: any[] = [
      <View style={styles.wrapperCreateEventCard}>
        <Text style={styles.textYouNeedToCreate}>You need to create an event to start inviting</Text>
        <Text style={styles.textYouDontHaveAny}>You don't have any active event.</Text>
        <Button onPress={() => navigation.navigate(eventCreatingStackPath)} title="Create event" />
        <View style={styles.rowText}>
          <Text style={styles.textDontHaveAnEvent}>Don't have an event?</Text>
          <View style={styles.rowJoinOne}>
            <Text style={styles.textJoinOne}>Join one!</Text>
          </View>
        </View>
      </View>,
    ];

    const usersList = await userInfo?._docs;

    usersList
      ?.filter(i => i?._data?.uid !== userHost?.uid)
      ?.map((item: any, index: number): void => {
        const {name, bio, accountType, gender, address, homeAddress, height, alcohol, date, accountConfirmed, uid} = item?._data;

        setNameUser(name);
        const girlPhotos = item?._data?.photos?.map((image: any): void => image?.image);
        const interests = item?._data?.interests?.map((i: any): void => i?.title);
        const smoking = item?._data?.smoke?.title;

        const age: string = calculateAge(date);

        data.push({
          component: (
            <View key={index} style={styles.wrapperFakeCard}>
              <TouchingSlider
                name={name}
                age={age}
                homeAddress={homeAddress}
                isShowInvitesTooltip={false}
                isLocked={!userHost?.accountConfirmed}
                confirmedAccount={accountConfirmed}
                onInvite={() => handleChangeListsEvents(uid, 'accept')}
                handleOpenSuperInvite={() => handleOpenSuperInvite(item?._data)}
                handleOpenMatch={() => handleOpenMatch(uid, name, girlPhotos[0])}
                photos={girlPhotos}
                accountType={accountType}
              />
              <View style={styles.bioWrapper}>
                <Text style={[styles.titleSection, bio && styles.mt31]}>My basics</Text>
                <View style={styles.wrapperTextTags}>
                  {gender && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <TablerGenderIcon />
                      </View>
                      {gender}
                    </Text>
                  )}
                  {address && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <LocationIcon />
                      </View>
                      {address}
                    </Text>
                  )}
                  {homeAddress && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <HomeIcon />
                      </View>
                      {homeAddress}
                    </Text>
                  )}
                  {height && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <ArrowIcon />
                      </View>
                      {height} см
                    </Text>
                  )}
                  {alcohol && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <WineIcon />
                      </View>
                      {alcohol?.title}
                    </Text>
                  )}
                  {smoking && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <View style={{marginRight: 4}}>
                        <SmokeIcon />
                      </View>
                      {smoking}
                    </Text>
                  )}
                </View>
                {bio && (
                  <>
                    <Text style={[styles.titleSection, styles.mt31]}>About me</Text>
                    <Text style={styles.textDescription}>{bio}</Text>
                  </>
                )}
                {!!interests?.length && (
                  <>
                    <Text style={[styles.titleSection, styles.mt31]}>My interests</Text>
                    <View style={styles.wrapperInterestsTags}>
                      {interests?.map((interests: any, index: number) => (
                        <View key={index} style={styles.interestsTags}>
                          <Text style={styles.textTagsInterests}>{interests}</Text>
                        </View>
                      ))}
                    </View>
                  </>
                )}
                <View style={styles.wrapperImageSectionFaceGirl}>
                  {girlPhotos?.map((photo: any, index: number) => (
                    <Image key={index} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />
                  ))}
                </View>
                <View style={styles.wrapperButtonsFooter}>
                  <TouchableOpacity onPress={() => handleChangeListsEvents(uid, 'reject')} style={styles.buttonCloseOrCheck}>
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        top: -1,
                        left: -1,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: blackColor,
                        borderRadius: 50,
                        zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CloseIcon />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonFlash} onPress={() => handleOpenSuperInvite(item?._data)}>
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        top: -1,
                        left: -1,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: blackColor,
                        borderRadius: 50,
                        zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <FlashIcon />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleChangeListsEvents(uid, 'accept')} style={styles.buttonCloseOrCheck}>
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        top: -1,
                        left: -1,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: blackColor,
                        borderRadius: 50,
                        zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CheckIcon />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setUidScamUser(uid);
                    setModalReport(true);
                  }}>
                  <Text style={styles.textHideNadSendReport}>Hide and send report</Text>
                </TouchableOpacity>
              </View>
            </View>
          ),
          info: item?._data,
        });
        setEvents([...data]);
      });
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
      fcmHelper().then();
    }
  };

  const sortByDate = (events: any) => {
    events?.sort((a, b) => {
      let dateA: Date | any = new Date(a?.info?.date.split('.').reverse().join('-'));
      let dateB: Date | any = new Date(b?.info?.date.split('.').reverse().join('-'));

      return dateA - dateB;
    });
    return events;
  };

  const sortByInterests = (dataGuest: any, userHost: any) => {
    const filteredGuests = dataGuest.filter(guest => guest?.info?.hostInfo);

    if (!userHost?.interests || userHost?.interests.length === 0) {
      return [];
    }

    const userInterests = userHost?.interests?.map(interest => interest?.title);

    const matchedGuests = filteredGuests?.sort(guest => {
      if (
        !guest?.info?.hostInfo?.interests ||
        guest?.info?.hostInfo?.interests?.length === 0 ||
        !guest?.info?.availabilityOfChats ||
        guest?.info?.hostInfo?.chooseGuest !== userHost?.chooseGuest
      ) {
        return false;
      }
      return guest?.info?.hostInfo.interests?.some(interest => userInterests?.includes(interest.title));
    });
    return matchedGuests;
  };

  useEffect(() => {
    userHost?.accountType === 'host' ? getListForHost() : getListForGuest();
  }, [userInfo, userHost, activeEventDate]);

  useEffect(() => {
    fetchUserInfo();
    fetchMyEvents(true);
    requestUserPermission();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMyEvents(false);
    }, []),
  );

  const goToCreateEvent = (): void => {
    if (!userHost?.accountConfirmed) {
      return;
    }
    navigation.navigate(eventCreatingStackPath);
  };

  if (loading || !userHost) {
    return <Loading text='Finding people near you...' userInfo={userInfo}/>;
  }

  if(currentEventCardPosition > events.length && events.length > 1) {
    return <Loading text="Sorry, can't find any results. Please try adjusting your search parameters or try again later." userInfo={userInfo}/>
  }

  if(currentEventCardPosition > 1 && myEvents.length < 1) {
    return (
        <View style={{flex: 1, width: '100%', backgroundColor: blackColor, paddingHorizontal: 24}}>
        <View style={{height: 370}}>
          <Loading  userInfo={userInfo} topPosition={true}/>
        </View>
        <View>
          <Text style={{color: whiteColor, textAlign: 'center', fontSize: RFValue(18, 812), fontFamily: Satoshi400}}>
          You don't have any active event.
          Get started by creating an event to begin inviting guests.
          </Text>
        </View>
        <Button onPress={goToCreateEvent} title={'Create event'} buttonStyle={{marginTop: 40, marginBottom: 30}}/>
        <View style={{width: '100%', height: 1, backgroundColor: '#282828', marginBottom: 20, alignItems: 'center'}}>
          <View style={{width: 30, height: 30, backgroundColor: blackColor, borderRadius: 15, transform:[{translateY: -15}], justifyContent: 'center'}}>
            <Text style={{color: whiteColor, textAlign: 'center', fontSize: RFValue(14,812), fontFamily: Satoshi400}}>or</Text>
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity>
            <Text style={{color: whiteColor, fontSize: RFValue(18, 812)}}>
              Start joining!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {events?.map((item, index) => {
          return (
            <View style={styles.cardContainer} pointerEvents="box-none" key={index.toString()}>
              <TinderCard
                // @ts-ignore
                cardWidth="100%"
                // @ts-ignore
                cardHeight="100%"
                onSwipedRight={() => {
                  onInvite(item?.info?.uid, item?.info?.id, item?.info?.requestsList, item?.info?.usersList);
                  setCurrentEventCardPosition(prev => prev + 1);
                }}
                OverlayLabelRight={OverlayRight}
                OverlayLabelLeft={OverlayLeft}
                disableBottomSwipe={true}
                disableTopSwipe={true}
                cardStyle={styles.card}>
                <ScrollView showsVerticalScrollIndicator={false} style={{borderRadius: 22, height: screenHeight - 250}}>
                  {item.component}
                </ScrollView>
              </TinderCard>
            </View>
          );
        })
        // :
        // <Loading text="Sorry, can't find any results. Please try adjusting your search parameters or try again later." userInfo={userInfo}/>
        }
        <ModalReport modalReport={modalReport} setModalReport={setModalReport} uidSender={userHost?.uid} uid={uidScamUser} />
        <SuperInvite
          isVisibleSuperInvite={isVisibleSuperInvite}
          activeSuperInviteUser={activeSuperInviteUser}
          onCloseSuperInvite={handleCloseSuperInvite}
        />
        <Match isVisibleMatch={isVisibleMatch} matchData={matchData} onCloseMatch={handleCloseMatch} userInfo={userInfo} />
      </View>
    </SafeAreaView>
    </>
    
  );
};

export default gestureHandlerRootHOC(IO);


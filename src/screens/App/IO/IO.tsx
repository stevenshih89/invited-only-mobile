import {SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import React, {FC, useState, useEffect, useContext, useCallback} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {TinderCard} from 'rn-tinder-card';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';

//import components
import useStyles from 'screens/App/IO/styles.ts';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';
import {screenHeight, screenWidth} from 'constants/common.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {eventCreatingStackPath, userProfilePath} from 'constants/pathLocations.ts';
import InstagramSlider from 'components/InstagramSlider/InstagramSlider';
import SuperInvite from './screens/SuperInvite/SuperInvite';
import Match from './screens/Match/Match';
import Button from 'components/Button/Button.tsx';
import {showToast} from 'helpers/showToast.ts';
import {calculateAge} from 'helpers/calculateAge';
import {EventContext} from 'contexts/EventContext';
import {whiteColor} from 'constants/colors';
import {fcmHelper, getFcmToken, onMatchNotificationSubscription} from 'helpers/fcmHelper.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {useUser} from '../../../store/userStore';

//import icons
import ArrowRightIcon from 'assets/images/icons/arrow-right.svg';
import PersonIcon from 'assets/images/icons/person.svg';
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
import MapIcon from 'assets/images/icons/location.svg';

const IO: FC = (): JSX.Element => {
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [isVisibleSuperInvite, setIsVisibleSuperInvite] = useState<boolean>(false);
  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);
  const [nameUser, setNameUser] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const {setMyEvents, setActiveEvent, activeEvent} = useContext(EventContext);
  const userHost = useUser((i: any) => i?.user);

  useEffect(() => {
    const unsubscribe = onMatchNotificationSubscription(message => {
      // DEVNOTE: Add posibility to show internal data from match notification.
      setIsVisibleMatch(true);
    });

    return () => unsubscribe();
  });

  const handleOpenSuperInvite = () => {
    setIsVisibleSuperInvite(true);
  };

  const handleCloseSuperInvite = () => {
    setIsVisibleSuperInvite(false);
  };

  const handleCloseMatch = () => {
    setIsVisibleMatch(false);
  };

  const handleOpenMatch = async (recipientUid: string, name: string, girlsPhoto: string) => {
    const user = auth().currentUser?.uid;
    const token = await getFcmToken();

    try {
      await firestore().collection('CollectionOfMatches').doc(`${user}`).set({
        notificationTokenSender: token,
        recipientUid: recipientUid,
        senderUid: user,
        name: name,
        girlsPhoto: girlsPhoto,
      });
      showToast('pending', 'Chat with Alexa >', 'Invitation approved! Waiting for Alexa to accept your invitation.');
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
        setMyEvents(data);
        isFirstRender && setActiveEvent(data[0]);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  const onInvite = async (forUserUid: string) => {
    try {
      const guest = await firestore().collection('userInfo').doc(forUserUid).get();

      const userInvited = {
        gender: guest.data()?.gender,
        name: guest.data()?.name,
        status: 'invited',
        superInvite: false,
        uid: guest.data()?.uid,
        userPhoto: guest.data()?.photos[0]?.image,
      };
      const updateUsersList: any = [...activeEvent?.usersList, userInvited];

      await firestore().collection('Events').doc(activeEvent?.id).update({
        usersList: updateUsersList,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getListForGuest = async () => {
    const user = auth().currentUser;
    if (!user) {
      return;
    }
    try {
      const querySnapshot = await firestore().collection('Events').get();

      const filteredEvents = querySnapshot.docs
        .map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(event => !event.requestsList || !event.requestsList.some((request: any) => request.uid === user.uid));

      async function enrichElementsWithPhotos(elements) {
        const promises = elements?.map(async element => {
          const docRef = firestore().collection('userInfo').doc(element?.uid);
          const docRefMessage = firestore().collection('messages').where('uidHost', '==', element?.uid);
          const doc = await docRef.get();
          const docMessages = await docRefMessage?.get();

          if (!doc.exists) {
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

      enrichedEvents.map((event: any) => {
        const {
          address,
          date,
          description,
          hour,
          name,
          placeName,
          male,
          hostImage,
          hostName,
          meetingSpot,
          uid,
          id,
          photos,
          userPhotos,
          female,
          femaleFriend,
        } = event;

        const currUserPhotos = userPhotos.map((photo: any) => photo?.image);
        const eventPhotos = photos.map((photo: any) => photo?.image);
        const iconsArrayMale = Array.from({length: male}, (_, index) => index);
        const iconsArrayFemale = Array.from({length: female}, (_, index) => index);

        data.push({
          component: (
            <View style={styles.wrapperFakeCard}>
              <TouchingSlider
                placeName={placeName}
                girls={female + femaleFriend}
                date={date}
                isShowEventPreview={true}
                isShowWantsJoin={false}
                isShowInvitesTooltip={false}
                isShowCardButtons={false}
                eventPhotos={eventPhotos}
                photos={currUserPhotos}
              />
              <View style={styles.bioWrapper}>
                <Text style={styles.titleSection}>Event Details</Text>
                <Text style={{marginTop: 14, color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812)}}>Place name</Text>
                <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(14, 812)}}>{placeName}</Text>
                <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812)}, {marginTop: 20}]}>
                  Event name
                </Text>
                <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(14, 812)}}>{name}</Text>
                <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812)}, {marginTop: 20}]}>
                  Event description
                </Text>
                <Text style={styles.textDescription}>{description}</Text>
                <View style={{marginTop: 28}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                    <CalendarIcon width={16} height={16} />
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>{date}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                    <ClockIcon width={16} height={16} />
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>{hour}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                    <MapIcon width={16} height={16} />
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>{address}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                    <PeopleIcon width={16} height={16} />
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>
                      {female + femaleFriend}x girl
                    </Text>
                  </View>
                </View>
                {/* <Image source={ImageBg} style={[styles.imageBg, {marginTop: 8}]} />
                <Image source={ImageBg} style={styles.imageBg} /> */}
                <Text style={styles.titleSection}>Already joined</Text>
                <View>
                  <View style={styles.wrapperNumberPeople}>
                    <Text style={styles.textUnderSubTitle}>Female</Text>
                    <View style={styles.rowNumberPeople}>
                      <Text style={styles.textNumberInvitedPeople}>{female}</Text>
                    </View>
                  </View>
                  <View style={styles.rowPersonIcon}>
                    {iconsArrayFemale?.map(index => (
                      <View key={index} style={[styles.wrapperPersonIcon, {marginLeft: index === 0 ? 0 : 10}]}>
                        <PersonIcon width={18} height={18} />
                      </View>
                    ))}
                  </View>
                </View>
                <View>
                  <View style={[styles.wrapperNumberPeople, {marginTop: 12}]}>
                    <Text style={styles.textUnderSubTitle}>Male</Text>
                    <View style={styles.rowNumberPeople}>
                      <Text style={styles.textNumberInvitedPeople}>{male}</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 12, marginBottom: 28}}>
                    {iconsArrayMale?.map(index => (
                      <View key={index} style={[styles.wrapperPersonIcon, {marginLeft: index === 0 ? 0 : 10}]}>
                        <PersonIcon width={18} height={18} />
                      </View>
                    ))}
                  </View>
                </View>
                <Text style={styles.titleSection}>Host profile</Text>
                <View style={styles.wrapperHostProfile}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Image source={{uri: hostImage}} style={{width: 40, height: 40, borderRadius: 50}} />
                      {/*<View style={styles.greenCircle} />*/}
                    </View>
                    <View style={{marginLeft: 13}}>
                      <Text style={styles.textSimon}>{hostName}</Text>
                      {/*<Text style={styles.textOnline}>Online</Text>*/}
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate(userProfilePath, {params: {uid: uid}})}>
                    <Text style={styles.textSeeProfile}>
                      See profile <ArrowRightIcon width={14} height={14} />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.wrapperButtonsFooter}>
                  <TouchableOpacity style={styles.buttonCloseOrCheck}>
                    <CloseIcon />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonFlash}>
                    <FlashIcon />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonCloseOrCheck}>
                    <CheckIcon />
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
      setEvents([...recommendedData]);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Something went wrong');
    }
  };

  const getListForHost = async () => {
    try {
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

      await userInfo?._docs?.map((item: any, index: number): void => {
        const {name, bio, accountType, gender, address, homeAddress, height, alcohol, date, uid} = item?._data;

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
                handleOpenSuperInvite={handleOpenSuperInvite}
                handleOpenMatch={() => handleOpenMatch(uid, name, girlPhotos[0])}
                photos={girlPhotos}
              />
              <View style={styles.bioWrapper}>
                <Text style={styles.titleSection}>Bio</Text>
                <Text style={styles.textDescription}>{bio}</Text>
                <Text style={[styles.titleSection, styles.mt31]}>About me</Text>
                <View style={styles.wrapperTextTags}>
                  <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                    <PersonIcon />
                    {accountType}
                  </Text>
                  {gender && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <TablerGenderIcon /> {gender}
                    </Text>
                  )}
                  {address && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <LocationIcon /> {address}
                    </Text>
                  )}
                  {homeAddress && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <HomeIcon /> {homeAddress}
                    </Text>
                  )}
                  {height && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <ArrowIcon /> {height} см
                    </Text>
                  )}
                  {alcohol && (
                    <Text style={[styles.textTagsAboutMe, styles.ml18]}>
                      <WineIcon /> {alcohol?.title}
                    </Text>
                  )}
                  {smoking && (
                    <Text style={[styles.textTagsAboutMe, {marginLeft: screenWidth / 33}]}>
                      <SmokeIcon /> {smoking}
                    </Text>
                  )}
                </View>
                <Text style={[styles.titleSection, styles.mt31]}>Interests</Text>
                <View style={styles.wrapperInterestsTags}>
                  {interests?.map((interests: any, index: number) => (
                    <View key={index} style={styles.interestsTags}>
                      <Text style={styles.textTagsInterests}>{interests}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.wrapperImageSectionFaceGirl}>
                  {girlPhotos?.map((photo: any, index: number) => (
                    <Image key={index} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />
                  ))}
                </View>
                <InstagramSlider photosList={girlPhotos} />
                <View style={styles.wrapperButtonsFooter}>
                  <TouchableOpacity style={styles.buttonCloseOrCheck}>
                    <CloseIcon />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonFlash} onPress={handleOpenSuperInvite}>
                    <FlashIcon />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonCloseOrCheck}>
                    <CheckIcon />
                  </TouchableOpacity>
                </View>
                <Text style={styles.textHideNadSendReport}>Hide and send report</Text>
              </View>
            </View>
          ),
          info: item?._data,
        });
        setEvents([...data]);
      });
    } catch (e) {
      console.log(e);
      showToast('cancel', '', `${e}`);
    }
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
  }, [userInfo, userHost]);

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

  if (loading || !userInfo) {
    return <ActivityIndicator style={styles.safeAreaView} />;
  }

  return (
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
                onSwipedRight={() => onInvite(item.info?.uid)}
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
        })}
        <SuperInvite isVisibleSuperInvite={isVisibleSuperInvite} onCloseSuperInvite={handleCloseSuperInvite} />
        <Match isVisibleMatch={isVisibleMatch} onCloseMatch={handleCloseMatch} name={nameUser} />
      </View>
    </SafeAreaView>
  );
};

export default gestureHandlerRootHOC(IO);

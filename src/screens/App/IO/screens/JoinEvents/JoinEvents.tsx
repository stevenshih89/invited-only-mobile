import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert} from 'react-native';
import {TinderCard} from 'rn-tinder-card-bn-digital';

//import components
import useStyles from 'screens/App/IO/screens/JoinEvents/styles.ts';
import {LIKED, screenHeight} from 'constants/common.ts';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';

//import icons
import ArrowRightIcon from 'assets/images/icons/arrow-right.svg';
import PersonIcon from 'assets/images/icons/person.svg';
import PeopleIcon from 'assets/images/icons/profile-2user.svg';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ClockIcon from 'assets/images/icons/clock-white.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import CheckIcon from 'assets/images/icons/check.svg';
import MapIcon from 'assets/images/icons/location.svg';

//import images
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useUser} from '../../../../../store/userStore';
import {showToast} from 'helpers/showToast.ts';
import Match from '../Match/Match';
import {onMatchNotificationSubscription} from 'helpers/fcmHelper';
import Config from 'react-native-config';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';

const JoinEvents = ({navigation}: any) => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const [events, setEvents] = useState<any[]>([]);
  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [ownerEventUserPhoto, setOwnerEventUserPhoto] = useState();
  const [matchData, setMatchData] = useState<any>({});

  const styles = useStyles();
  const userHost = useUser((i: any) => i?.user);

  const OverlayRight = () => {
    return (
      <View style={[styles.overlayLabelContainerInvite]}>
        <Text style={styles.overlayLabelTextInvite}>Join</Text>
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

  useEffect(() => {
    const unsubscribe = onMatchNotificationSubscription(message => {
      const data = message?.data;
      setMatchData({...data, superInvite: data?.superInvite ? JSON.parse(data?.superInvite as any) : false});
      setIsVisibleMatch(true);
    });

    return () => unsubscribe();
  });

  const getListForGuest = async () => {
    const user = auth().currentUser;

    if (!user) {
      return;
    }
    try {
      const querySnapshot = await firestore().collection(apiEventsCollection).limit(20).get();

      const filteredEvents = querySnapshot.docs
        .map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(event => !event.requestsList || !event.requestsList.some((request: any) => request.uid === user.uid));

      // console.log();

      async function enrichElementsWithPhotos(elements) {
        const promises = elements.map(async element => {
          const docRef = firestore().collection(apiUserInfoCollection).doc(element.uid);
          const doc = await docRef.get();
          const userInfo = doc.data();
          return {...element, userPhotos: userInfo?.photos};
        });

        return Promise.all(promises);
      }

      const enrichedEvents = await enrichElementsWithPhotos(filteredEvents);

      const data: any[] = [];

      enrichedEvents?.map((event: any) => {
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

        const currUserPhotos = userPhotos?.map((photo: any) => photo?.image);
        const eventPhotos = photos?.map((photo: any) => photo?.image);
        const iconsArrayMale = Array?.from({length: male}, (_, index) => index);
        const iconsArrayFemale = Array?.from({length: female}, (_, index) => index);

        data?.push({
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
                fromJoinEventsScreen={true}
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
                  <TouchableOpacity onPress={() => onRejected(event)} style={styles.buttonCloseOrCheck}>
                    <CloseIcon />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonFlash}>
                    <FlashIcon />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onInvite(event)} style={styles.buttonCloseOrCheck}>
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

      setEvents([...data]);
    } catch (e: any) {
      showToast('inviteMatch', 'Something went wrong. Error get events', 'Error');
      logErrorToSentry(e)
      // Alert.alert('Error', e.message || 'Something went wrong');
    }
  };

  const onInvite = async (list: any) => {
    try {
      const activeEvent = list?.id;

      const userLiked = {
        gender: userHost?.gender,
        name: userHost?.name,
        superInvite: false,
        uid: userHost?.uid,
        status: LIKED,
        userPhoto: userHost?.photos[0]?.image,
      };

      await firestore()
        .collection(apiEventsCollection)
        .doc(activeEvent)
        .update({
          requestsList: firestore.FieldValue.arrayUnion(userLiked),
        });
      showToast('inviteMatch', '', 'The invitation has been successfully withdrawn!');
    } catch (e) {
      showToast('inviteMatch', 'There was an issue with the invitation. Please try again later.', 'Error');
      logErrorToSentry(e)
      // console.log(e);
    }
  };

  const onRejected = async (list: any) => {
    try {
      const filterEvents = events?.filter(i => i?.info?.id !== list?.id);
      setEvents(filterEvents);
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    getListForGuest();
  }, []);

  const handleCloseMatch = (): void => {
    setIsVisibleMatch(false);
    showToast('inviteMatch', 'Say, Hi! 👋', 'New Connection!', {ownerPhoto: ownerEventUserPhoto, status: 'INVITE MATCH'});
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
        {events?.map((item, index) => {
          return (
            <View style={styles.cardContainer} pointerEvents="box-none" key={index}>
              <TinderCard
                // @ts-ignore
                cardWidth="100%"
                // @ts-ignore
                cardHeight="100%"
                OverlayLabelRight={OverlayRight}
                onSwipedRight={() => onInvite(item?.info)}
                onSwipedLeft={() => onRejected(item.info?.uid)}
                OverlayLabelLeft={OverlayLeft}
                disableBottomSwipe={true}
                disableTopSwipe={true}
                cardStyle={styles.card}>
                <ScrollView showsVerticalScrollIndicator={false} style={{borderRadius: 22, height: screenHeight - 250}}>
                  {item?.component}
                </ScrollView>
              </TinderCard>
            </View>
          );
        })}
        <Match isVisibleMatch={isVisibleMatch} onCloseMatch={handleCloseMatch} guestInfo={userHost} matchData={matchData} />
      </SafeAreaView>
    </View>
  );
};

export default JoinEvents;

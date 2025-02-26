import {SafeAreaView, View, Text, ScrollView, TouchableOpacity, Alert, TouchableWithoutFeedback} from 'react-native';
import React, {FC, useEffect, useCallback} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';

//import components
import useStyles from 'screens/App/IO/styles.ts';
import TouchingSlider from 'components/TouchingSlider/TouchingSlider.tsx';
import {
  ACCEPTED_STATUS,
  APPROVED_STATUS,
  CANCEL_STATUS,
  INVITE_MATCH_STATUS,
  NOT_ACCEPTED_STATUS,
  screenHeight,
} from 'constants/common.ts';
import {
  earlyAccessPath,
  commonStackPath,
  eventCreatingStackPath,
  myProfileViewPath,
  paymentPath,
  userProfilePath,
  demoFlowStackPath,
  demoIOPath,
} from 'constants/pathLocations.ts';
import Button from 'components/Button/Button.tsx';
import {calculateAge} from 'helpers/calculateAge';
import {blackColor, lightGreenColor, transparentWhite16Color, transparentWhite56Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import ModalReport from 'components/Modal/ModalReport/ModalReport.tsx';
import LoaderIcon from 'assets/images/icons/loader.svg';
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
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import PersoneIcon from 'assets/images/icons/Users.svg';
import Loading from 'components/Loading/Loading';
import SuperInvite from './screens/SuperInvite/SuperInvite';
import Match from './screens/Match/Match';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import SuperJoin from 'components/Modal/ModalSuperJoin/SuperJoin';
import FullEvent from 'components/FullEvent';
import ModalFullEvent from 'components/Modal/ModalFullEvent';
import {User, UserInfo} from 'src/types/userInfo';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';
import Animated from 'react-native-reanimated';
import ModalEventLocked from 'components/Modal/ModalEventLocked/ModalEventLocked';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard';
import moment from 'moment';
import {Event} from 'src/types/event';
import Config from 'react-native-config';
import HintCard from 'components/HintCard';
import {hostHintSteps} from 'constants/hints.ts';
import ModalLimitedAccess from 'components/Modal/ModalLimitedAccess/ModalLimitedAccess';
import CardsFakeState from 'components/CardsFakeState';
import ModalChangeAccountType from 'components/Modal/ModalChangeAccountType';
import firebase from '@react-native-firebase/app';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import { useIO } from 'hooks/useIO';

const CARDS_LOADING_LIMIT = 6;

const IO: FC = (): JSX.Element => {
  const styles = useStyles();
  const {
    isHost,
    handleInvite,
    setLoadingCardsList,
    setIsRefreshing,
    events,
    userInfo,
    lastVisibleRef,
    setEvents,
    endReachedRef,
    filterEventByDate,
    handleReject,
    setScrollPosition,
    handleReport,
    navigation,
    setCurrentEventInfo,
    frontAnimatedStyle,
    backAnimatedStyle,
    counterSuperInvites,
    eventsRef,
    handleSuperInvite,
    handleOpenSuperInvite,
    activeEvent,
    apiEventsCollection,
    isDemo,
    apiUserInfoCollection,
    setNameUser,
    handleDemoSwipeCardLeft,
    handleDemoSwipeCardRight,
    swipedCardUids,
    setHintStep,
    setIsVisibleSwipeGuide,
    setIsOpenModalLimitedAccess,
    activeEventDate,
    loadingMyEvents,
    loadingCardsList,
    isFocusedScreen,
    hintStep,
    swipedCardsCount,
    isVisibleMatch,
    visibleModalSuperJoin,
    isVisibleSuperInvite,
    animatedStyle,
    acceptModalVisible,
    setAcceptModalVisible,
    changeAccountTypeModalVisible,
    setChangeAccountModalVisible,
    rejectModalVisible,
    isRefreshing,
    isOpenModalLimitedAccess,
    totalQuantityGuests,
    acceptQuantityGuest,
    totalRequestsGuests,
    cardRef,
    isVisibleModalFullEvent,
    setIsVisibleModalFullEvent,
    handleFilterEvent,
    reportedItem,
    modalReport,
    setModalReport,
    currentEventInfo,
    activeSuperInviteUser,
    handleCloseSuperInvite,
    matchData,
    handleCloseMatch,
    setCurrentEventCardPosition,
    myEvents,
    setLastVisible
  } = useIO();
  
  const OverlayRight = () => {
    return (
      <View style={[styles.overlayLabelContainerInvite]}>
        <Text style={styles.overlayLabelTextInvite}>{isHost ? 'INVITE' : 'Join'}</Text>
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

  const customButton = (id: string, uid: string) => {
    return (
      <TouchableOpacity
        onPress={() => handleInvite({uid, id, withSwipeAnimation: true})}
        style={{
          height: 65,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 18,
          backgroundColor: blackColor,
          marginTop: 25,
        }}>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi700,
            fontSize: RFValue(16, 812),
          }}>
          Join
        </Text>
      </TouchableOpacity>
    );
  };

  const getCardsListForGuest = async (refresh?: boolean) => {
    const user = auth().currentUser;
    if (!user?.uid) {
      return;
    }
    if (!refresh) {
      setLoadingCardsList(true);
    }
    if (refresh && !events?.length) {
      setIsRefreshing(true);
    }
    let filteredEvents: any[] = [];

    try {
      const getGenderFilter = () => {
        if (userInfo?.gender === 'man') {
          return 'male';
        }
        if (userInfo?.gender === 'woman') {
          return 'female';
        }
        return null;
      };

      const genderFilter = getGenderFilter();
      const start = new Date().getTime();
      const cloudFunctionName = Config.CLOUD_FUNCTION_GET_EVENTS_FOR_USER || 'getEventsForUser';
      const getEventsForUserCloudFunction = firebase.app().functions('europe-west3').httpsCallable(cloudFunctionName);
      const eventsQuery = await getEventsForUserCloudFunction({
        uid: user.uid,
        limit: CARDS_LOADING_LIMIT,
        lastDoc: lastVisibleRef.current ? JSON.stringify(lastVisibleRef.current) : null,
        genderFilter,
      });
      const end = new Date().getTime();
      console.warn('time', end - start);

      if (!('events' in eventsQuery?.data) || !('lastDoc' in eventsQuery?.data)) {
        setEvents([]);
        setLoadingCardsList(false);
        endReachedRef.current = true;
        return;
      }

      const eventsData = eventsQuery?.data?.events;
      const lastDoc = eventsQuery?.data?.lastDoc ? JSON.parse(eventsQuery.data.lastDoc) : null;

      if ('lastDoc' in eventsQuery?.data) {
        lastVisibleRef.current = lastDoc;
      }

      if ('endReached' in eventsQuery?.data) {
        endReachedRef.current = eventsQuery?.data?.endReached;
      }

      filteredEvents = eventsData?.filter(event => {
        if (event?.requestsList?.find((requestedUser: Event.User) => requestedUser?.uid === user?.uid)) {
          return false;
        }
        if (
          event?.usersList?.find(
            (invitedUser: Event.User) =>
              invitedUser?.uid === user?.uid &&
              (invitedUser?.status === INVITE_MATCH_STATUS ||
                invitedUser?.status === APPROVED_STATUS ||
                invitedUser?.status === ACCEPTED_STATUS ||
                invitedUser?.status === NOT_ACCEPTED_STATUS ||
                invitedUser?.status === CANCEL_STATUS),
          )
        ) {
          return false;
        }
        if (event?.rejectsByGuestsList?.find((rejectedUid: Event.RejectUser) => rejectedUid.uid === user?.uid)) {
          return false;
        }
        if (event?.date && event?.hour) {
          const adjustedDate = moment(`${event.date}, ${event.hour}`, 'DD.MM.YYYY, HH:mm').add(12, 'hours');
          if (adjustedDate.isBefore(moment())) {
            return false;
          }
        }
        return true;
      });
    } catch (e: any) {
      console.error(e);
      Alert.alert('Error', e.message || 'Something went wrong');
    }

    const filteredDataEvents = filterEventByDate(filteredEvents);

    const data: any[] = [];

    for (const event of filteredDataEvents) {
      const currUserPhotos = [event?.hostImage];
      const eventPhotos = event?.photos?.filter(i => i.image !== null).map((photo: any) => photo?.image);

      const hostInfoData = {
        accountPremium: true,
        accountType: 'host',
        name: event?.hostName,
        photo: event?.hostImage,
      };

      data.push({
        component: (
          <View style={styles.wrapperFakeCard}>
            <TouchingSlider
              hostInfo={hostInfoData}
              userInfo={userInfo}
              placeName={event?.placeName}
              girls={event?.female + event?.femaleFriend}
              female={event?.female}
              male={event?.male}
              activeType={event?.activeType}
              date={event?.date}
              isShowEventPreview={true}
              isShowWantsJoin={false}
              isShowInvitesTooltip={false}
              isShowCardButtons={false}
              eventPhotos={event?.photos}
              photos={currUserPhotos}
              name={event?.name}
              placeName={event?.placeName}
              onReject={() => handleReject({uid: event?.uid, id: event?.id, withSwipeAnimation: true})}
              onInvite={() => handleInvite({uid: event?.uid, id: event?.id, withSwipeAnimation: true})}
              superJoin={() =>
                handleInvite({
                  uid: event?.uid,
                  id: event?.id,
                  withSwipeAnimation: true,
                  superInvite: true,
                })
              }
              confirmedEvent={event?.statusEvent}
              uidUserEvent={event?.uid}
              hourEvent={event?.hour}
              usersListLength={event?.usersList.length}
              usersList={event?.usersList}
              accountType={userInfo?.accountType || ''}
              isPreview={false}
              setCurrentEventCardPosition={setCurrentEventCardPosition}
              setScrollPosition={setScrollPosition}
            />
            <View style={styles.bioWrapper}>
              <Text style={[styles.titleSection]}>Event details</Text>
              <MyEventsCard
                imageBg={event?.photos}
                list={event}
                statusEvent={true}
                eventReviewed={true}
                allPeople={event?.female + event?.male}
                date={event?.date}
                textCityName={event?.name}
                placeName={event?.placeName}
                estimeTime={event?.hour}
                numberOfGirlsInvited={event?.female}
                invitingPeople={event?.usersList?.filter((i: Event.User) => i?.status !== NOT_ACCEPTED_STATUS)}
                accountConfirmed={userInfo?.accountConfirmed}
                findAcceptedGuest={event?.usersList?.filter((eventUser: Event.User) => eventUser.status === INVITE_MATCH_STATUS)}
                totalRequestsGuests={event?.requestsList?.length}
                item={event}
                showGuestList={false}
                customButton={customButton(event?.id, event?.uid)}
              />
              <Text style={{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}>Place name</Text>
              <Text
                style={{
                  marginTop: 6,
                  color: whiteColor,
                  fontFamily: Satoshi400,
                  fontSize: RFValue(16, 812),
                }}>
                {event?.placeName}
              </Text>
              <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
              <Text
                style={[
                  {
                    marginTop: 14,
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(16, 812),
                  },
                  {marginTop: 20},
                ]}>
                Event name
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  color: whiteColor,
                  fontFamily: Satoshi400,
                  fontSize: RFValue(16, 812),
                }}>
                {event?.name}
              </Text>
              <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
              <Text
                style={[
                  {
                    marginTop: 14,
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(16, 812),
                  },
                  {marginTop: 20},
                ]}>
                Event description
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>
                {event?.description}
              </Text>
              <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
              <View style={{marginVertical: 20}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}>Address</Text>
                <Text
                  style={{
                    marginTop: 6,
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(16, 812),
                  }}>
                  {event?.address}
                </Text>
              </View>
              <View
                style={{
                  marginBottom: screenHeight / 40,
                  borderStyle: 'solid',
                  borderTopWidth: 1,
                  borderTopColor: transparentWhite16Color,
                  paddingTop: screenHeight / 40,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleReport(event.uid, event.id);
                  }}>
                  <Text style={styles.textHideNadSendReport}>Block and Report</Text>
                </TouchableOpacity>
              </View>
              <View>
                {eventPhotos?.map((image: string) => (
                  <FastImage
                    source={{uri: image}}
                    style={{width: '100%', height: screenHeight / 4, marginVertical: 10, borderRadius: 20}}
                  />
                ))}
              </View>
              <TouchableOpacity // @ts-ignore
                onPress={() => {
                  navigation.navigate(userProfilePath, {screen: myProfileViewPath, params: {uid: event?.uid}});
                }}
                style={styles.wrapperHostProfile}>
                <View style={{flexDirection: 'row'}}>
                  {event?.hostImage && (
                    <View style={{flexDirection: 'row'}}>
                      <FastImage
                        source={{uri: currUserPhotos?.[0]?.image || event?.hostImage}}
                        style={{width: 40, height: 40, borderRadius: 50}}
                      />
                      {true && (
                        <View
                          style={{
                            width: 11,
                            height: 11,
                            borderRadius: 11,
                            backgroundColor: lightGreenColor,
                            borderWidth: 1.25,
                            borderColor: blackColor,
                            position: 'absolute',
                            bottom: 3,
                            right: 0,
                          }}
                        />
                      )}
                    </View>
                  )}
                  <View style={{marginLeft: 13}}>
                    <View style={{flexDirection: 'row'}}>
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
                        <Text
                          style={{
                            color: whiteColor,
                            textTransform: 'capitalize',
                            fontFamily: Satoshi700,
                            fontSize: RFValue(10, 812),
                          }}>
                          {hostInfoData?.accountType}
                        </Text>
                      </View>
                      {true && (
                        <LinearGradient
                          colors={['#977B4A', '#E5D291', '#A28453']}
                          style={{
                            marginLeft: 6,
                            alignSelf: 'flex-start',
                            borderRadius: 4,
                            paddingHorizontal: 12,
                            paddingVertical: 2,
                            backgroundColor: blackColor,
                          }}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}>
                          {
                            <Text
                              style={{
                                color: blackColor,
                                fontSize: RFValue(10, 812),
                                fontFamily: Satoshi700,
                              }}>
                              Premium
                            </Text>
                          }
                        </LinearGradient>
                      )}
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                      <Text
                        style={{
                          color: whiteColor,
                          fontFamily: Satoshi700,
                          fontSize: RFValue(14, 812),
                          marginRight: 6,
                        }}>
                        {event?.hostName}
                        {hostInfoData?.date && ', ' + calculateAge(hostInfoData?.date)}
                      </Text>
                      {true && <CheckStarWhite />}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.textSeeProfile}>
                    <ArrowRightIcon width={14} height={14} />
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.wrapperButtonsFooter}>
                <TouchableOpacity
                  onPress={() => handleReject({uid: event?.uid, id: event?.id, withSwipeAnimation: true})}
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
                <TouchableWithoutFeedback
                  onPress={() => {
                    setCurrentEventInfo(event);
                    handleSuperInviteBottom(event, 0);
                  }}>
                  <View style={styles.buttonFlash}>
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
                    <Animated.View
                      style={[
                        {
                          width: '100%',
                          height: '100%',
                          backgroundColor: blackColor,
                          borderRadius: 50,
                          zIndex: 10,
                          justifyContent: 'center',
                          position: 'absolute',
                          alignItems: 'center',
                        },
                        frontAnimatedStyle,
                      ]}>
                      <FlashIcon />
                    </Animated.View>
                    <Animated.View
                      style={[
                        {
                          width: '100%',
                          height: '100%',
                          backgroundColor: blackColor,
                          borderRadius: 50,
                          zIndex: 10,
                          position: 'absolute',
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                        backAnimatedStyle,
                      ]}>
                      <Text
                        style={{
                          color: whiteColor,
                          fontSize: 24,
                          fontWeight: '500',
                          transform: [{rotateY: '180deg'}],
                        }}>
                        {counterSuperInvites - 1}
                      </Text>
                    </Animated.View>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity
                  onPress={() => handleInvite({uid: event?.uid, id: event?.id, withSwipeAnimation: true})}
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
              <TouchableOpacity
                onPress={() => {
                  handleReport(event.uid, event.id);
                }}>
                <Text style={styles.textHideNadSendReport}>Block and Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        ),
        info: event,
      });
    }
    // const sortedByInterestsData = sortByDate(data)?.reverse();
    setEvents(prevEvents => {
      if (refresh) {
        const updatedEvents = [...prevEvents.reverse(), ...data].reverse();
        eventsRef.current = updatedEvents;
        return updatedEvents;
      } else {
        eventsRef.current = data;
        return data;
      }
    });
    if (refresh) {
      setIsRefreshing(false);
    }
    setLoadingCardsList(false);
  };

  const handleSuperInviteBottom = (item: any, coinAnimationTimer: number) => {
    handleSuperInvite();
    handleOpenSuperInvite(item, coinAnimationTimer);
  };

  const getCardsListForHost = async (refresh?: boolean) => {
    if (!userInfo?.uid || !activeEvent?.id || !userInfo?.uid) {
      return;
    }

    console.warn(
      refresh,
      events?.map((i: any) => i?.info?.uid),
    );

    if (!refresh) {
      setLoadingCardsList(true);
    }
    if (refresh && !events?.length) {
      setIsRefreshing(true);
    }
    let users;
    try {
      let listOfUsers = [];

      const isDevEvents = apiEventsCollection === 'devEvents';

      if (isDemo) {
        const demoUsersUidsList = isDevEvents
          ? [
              '5E45SWY8PPh6XG6TKosh7KoNGS23',
              'IVIt8krtaqPNgSWR3c2SqYVxNYG2',
              'gkzR767ZUpa2stWJUzw6I8rcGea2',
              'KZ4K7Ptm5ORvDKcOHbTjY9k4n872',
              'bjKkDs5nmgbN8Q4ArsFskwmJo5h2',
              'gMp0lX0rPcfFe6vkV9EhfTu5OU93',
              'qONEe70GvYepjeSgzeAtLqfzNIo1',
            ]
          : [
              'ztlc8qmO09dM9sWXGja8EVHWLIr2',
              '5E7tfk5edaQ9blfBUr6C0w4aBZT2',
              'Bku02o6thxSqNQWqyjowog4600y1',
              'VKXvBdFky3amCw26vxwNkflKQeO2',
              'KdKWeJQ0PSQDlPmmY8C5nJg3QRx1',
              'xQOx2tzTzTVx0fjXqgzCFKyP3IY2',
              'SjZXcwnVpjUvBDLiHOwP10ZbFvv1',
              'x4cIov0QQqQIeJDVpeO7n5GGhnz2',
              'PA4DDwLdH4a70zNNACS0pe8SbTC2',
              'CCfqT1CeRUPkxCyQQxn8FYHXh3w2',
              'jVj6cOgnZRfi3MkkXLRg0ePsNr93',
              'jxqkE8xzKoaMCfC3rqI4HxII9Xj1',
              'iYB5oM8705RyJoo5qFhfa10ZS1K3',
              'JgpDnDZAM0OsKJVb5yz2eoAMJB03',
              '9i7JMq9kQBTKW5jsrTd6RPd9Ie83',
            ];

        for (const uid of demoUsersUidsList) {
          try {
            const userQuery = await firestore().collection(apiUserInfoCollection).doc(uid).get();
            if (userQuery.exists) {
              const data = userQuery.data() as UserInfo;
              listOfUsers.push(data);
            }
          } catch (err) {
            logErrorToSentry(err)
            console.error('error_getCardsListForHost 3', err);
          }
        }
      }

      let listOfUsersResponse: any;
      if (!isDemo && userInfo?.accountPremium) {
        const start = new Date().getTime();
        console.warn('start', start);

        const cloudFunctionName = Config.CLOUD_FUNCTION_GET_USERS_FOR_EVENT || 'getUsersForEvent_v2';
        const getUsersForEventCloudFunction = firebase.app().functions('europe-west3').httpsCallable(cloudFunctionName);
        listOfUsersResponse = await getUsersForEventCloudFunction({
          limit: CARDS_LOADING_LIMIT,
          lastDoc: lastVisibleRef.current ? JSON.stringify(lastVisibleRef.current) : null,
          eventId: activeEvent?.id,
        });

        const lastDoc = listOfUsersResponse?.data?.lastDoc ? JSON.parse(listOfUsersResponse.data.lastDoc) : null;

        if ('lastDoc' in listOfUsersResponse?.data) {
          lastVisibleRef.current = lastDoc;
        }

        if ('endReached' in listOfUsersResponse?.data) {
          endReachedRef.current = listOfUsersResponse?.data?.endReached;
        }

        console.warn('end', new Date().getTime());

        console.warn('execution time', new Date().getTime() - start);
      }

      if (isDemo) {
        users = listOfUsers;
      } else {
        users = listOfUsersResponse?.data?.users as UserInfo[];
      }

      console.warn(users?.map((i: any) => i?.uid));

      if (!users || !Array.isArray(users)) {
        setLoadingCardsList(false);
        endReachedRef.current = true;
        return;
      }

      const data: any[] = [];

      users?.map((item: UserInfo, index: number): void => {
        const {
          name,
          bio,
          accountType,
          gender,
          address,
          homeAddress,
          height,
          alcohol,
          date,
          accountConfirmed,
          uid,
          accountPremium,
          isSuperInvite,
        } = item;

        setNameUser(name);
        const girlPhotos: string[] = item?.photos
          ?.filter((userPhotos: User.Photo) => userPhotos.image !== null)
          .map((image: User.Photo) => `${image?.image}`);

        const interests = item?.interests?.map((i: User.Interests) => i?.title);
        const smoking = item?.smoke?.title;

        const age: string = calculateAge(date);

        data.push({
          component: (
            <View key={index} style={styles.wrapperFakeCard}>
              <TouchingSlider
                name={name}
                age={age}
                homeAddress={homeAddress}
                isShowInvitesTooltip={false}
                isLocked={!userInfo?.accountConfirmed}
                confirmedAccount={accountConfirmed}
                onReject={() =>
                  isDemo
                    ? handleDemoSwipeCardLeft({uid, withSwipeAnimation: true})
                    : handleReject({uid, id: item?.id, withSwipeAnimation: true})
                }
                onInvite={() =>
                  isDemo
                    ? handleDemoSwipeCardRight({uid, withSwipeAnimation: true})
                    : handleInvite({uid, id: item?.id, withSwipeAnimation: true})
                }
                handleOpenSuperInvite={() =>
                  isDemo ? handleDemoSwipeCardRight({uid, withSwipeAnimation: true}) : handleOpenSuperInvite(item, uid)
                }
                photos={girlPhotos}
                accountType={accountType}
                isShowWantsJoin={isSuperInvite}
                isPremium={accountPremium}
                activeEvent={activeEvent}
                location={item.location}
                joinEvents={item.joinEvents}
                online={item.online}
                date={item.date}
                item={item}
                userInfo={userInfo}
                isPreview={false}
              />
              <View style={styles.bioWrapper}>
                <Text style={[styles.titleSection, bio ? styles.mt31 : {}]}>My basics</Text>
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
                      {alcohol}
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
                  <View
                    style={{
                      borderTopWidth: 1,
                      borderStyle: 'solid',
                      borderTopColor: transparentWhite16Color,
                      marginTop: screenHeight / 44,
                      paddingTop: screenHeight / 44,
                    }}>
                    <Text style={[styles.titleSection]}>My interests</Text>
                    <View style={styles.wrapperInterestsTags}>
                      {interests.map((interest: string | null, idx: number) => (
                        <View key={idx} style={styles.interestsTags}>
                          <Text style={styles.textTagsInterests}>{interest}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
                {!isDemo && (
                  <View
                    style={{
                      borderTopWidth: 1,
                      borderStyle: 'solid',
                      borderTopColor: transparentWhite16Color,
                      paddingTop: screenHeight / 34,
                      marginTop: 10,
                      marginBottom: screenHeight / 40,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        handleReport(uid, activeEvent);
                      }}>
                      <Text style={styles.textHideNadSendReport}>Block and Report</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.wrapperImageSectionFaceGirl}>
                  {girlPhotos?.map((photo: string, photoIndex: number) => (
                    <FastImage key={photoIndex} style={[styles.imageFaceGirl, {marginVertical: screenHeight / 55}]} source={{uri: photo}} />
                  ))}
                </View>
                <View style={styles.wrapperButtonsFooter}>
                  <TouchableOpacity
                    onPress={() =>
                      isDemo
                        ? handleDemoSwipeCardLeft({uid, withSwipeAnimation: true})
                        : handleReject({uid, id: item?.id, withSwipeAnimation: true})
                    }
                    style={styles.buttonCloseOrCheck}>
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
                  <TouchableWithoutFeedback
                    onPress={() =>
                      isDemo ? handleDemoSwipeCardLeft({uid, withSwipeAnimation: true}) : handleSuperInviteBottom(item, 400)
                    }>
                    <View style={styles.buttonFlash}>
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
                      <Animated.View
                        style={[
                          {
                            width: '100%',
                            height: '100%',
                            backgroundColor: blackColor,
                            borderRadius: 50,
                            zIndex: 10,
                            justifyContent: 'center',
                            position: 'absolute',
                            alignItems: 'center',
                          },
                          frontAnimatedStyle,
                        ]}>
                        <FlashIcon />
                      </Animated.View>
                      <Animated.View
                        style={[
                          {
                            width: '100%',
                            height: '100%',
                            backgroundColor: blackColor,
                            borderRadius: 50,
                            zIndex: 10,
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                          },
                          backAnimatedStyle,
                        ]}>
                        <Text
                          style={{
                            color: whiteColor,
                            fontSize: 24,
                            fontWeight: '500',
                            transform: [{rotateY: '180deg'}],
                          }}>
                          {counterSuperInvites}
                        </Text>
                      </Animated.View>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableOpacity
                    onPress={() =>
                      isDemo
                        ? handleDemoSwipeCardRight({uid, withSwipeAnimation: true})
                        : handleInvite({uid: item?.uid, id: item?.id, withSwipeAnimation: true})
                    }
                    style={styles.buttonCloseOrCheck}>
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
                {!isDemo && (
                  <TouchableOpacity onPress={() => handleReport(uid, activeEvent)}>
                    <Text style={styles.textHideNadSendReport}>Block and Report</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ),
          info: item,
        });
      });

      eventsRef.current = data;
      setEvents(prevEvents => {
        if (refresh) {
          const filteredData = data.filter(event => {
            if (prevEvents.some(prevEvent => prevEvent.info.uid === event.info.uid) || swipedCardUids.includes(event.info.uid)) {
              return false;
            }
            return true;
          });
          const updatedEvents = [...filteredData, ...[...prevEvents].reverse()].reverse();
          eventsRef.current = updatedEvents;
          return updatedEvents;
        } else {
          eventsRef.current = data;
          return data;
        }
      });

      if (refresh && data?.length) {
        setIsRefreshing(false);
      }
    } catch (error) {
      console.error('error_getCardsListForHost', error);
      endReachedRef.current = true;
      setEvents([]);
      setIsRefreshing(false);
    } finally {
      setLoadingCardsList(false);
    }
  };

  const handleGoToEarlyAccess = () => {
    navigation.navigate(commonStackPath, {screen: earlyAccessPath} as never);
  };

  const goToCreateEvent = (): void => {
    if (!userInfo?.accountConfirmed) {
      return;
    }
    if (!userInfo.accountPremium) {
      navigation.navigate(paymentPath as never);
    } else {
      navigation.navigate(eventCreatingStackPath);
    }
  };

  const handleScroll = event => {
    const positionY = event.nativeEvent.contentOffset.y;
    setScrollPosition(positionY);
  };

  const handleSkipHints = () => {
    navigation.navigate(demoFlowStackPath, {screen: demoIOPath} as never);
    setHintStep(8);
    setIsVisibleSwipeGuide(true);
  };

  const handleSwipeFakeCard = () => {
    setIsOpenModalLimitedAccess(true);
  };

  useEffect(() => {
    if (isHost && activeEvent?.id) {
      lastVisibleRef.current = null;
      endReachedRef.current = false;
      if (events?.length) {
        setIsRefreshing(true);
        getCardsListForHost();
      }
    }
  }, [activeEvent?.id, isHost]);

  useFocusEffect(
    useCallback(() => {
      if (!isHost && activeEventDate) {
        lastVisibleRef.current = null;
        endReachedRef.current = false;
      }
    }, [activeEventDate, isHost]),
  );

  useFocusEffect(
    useCallback(() => {
      if (userInfo?.uid && isHost && activeEvent?.id && !events?.length && !loadingCardsList) {
        console.warn('useEffect_getCardsListForHost', events?.length, lastVisibleRef.current, endReachedRef.current);
        getCardsListForHost();
      }
    }, [userInfo?.uid, activeEvent?.id, loadingMyEvents, loadingCardsList]),
  );

  useFocusEffect(
    useCallback(() => {
      if (userInfo?.uid && !isHost && activeEventDate && !lastVisibleRef.current && !endReachedRef.current) {
        console.warn('useEffect_getCardsListForGuest', events?.length, lastVisibleRef.current, endReachedRef.current);
        getCardsListForGuest();
      }
    }, [userInfo?.uid, activeEventDate]),
  );

  useEffect(() => {
    if (userInfo?.uid) {
      if (isHost) {
        if (events?.length <= 2 && lastVisibleRef.current && !endReachedRef.current) {
          console.warn('getCardsListForHost', events?.length, lastVisibleRef.current, endReachedRef.current);
          setIsRefreshing(true);
          getCardsListForHost(true);
        }
      }
      if (!isHost) {
        if (events?.length <= 2 && lastVisibleRef.current && !endReachedRef.current) {
          console.warn('getCardsListForGuest', events?.length, lastVisibleRef.current, endReachedRef.current);
          getCardsListForGuest(true);
        }
      }
    }
  }, [events]);

  const cardsList = isHost ? [...events].reverse() : events;

  if (!isFocusedScreen) {
    return (
      <>
        <Loading wrapperText={false} text={`Finding ${isHost ? 'guests' : 'events'} near you ...`} userInfo={userInfo} />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  if (userInfo?.uid && isDemo && isHost && hintStep === 7) {
    return (
      <>
        <View style={styles.overlayContainer} />
        <View style={styles.stepHintContainer}>
          <HintCard
            currentStep={hintStep}
            description={hostHintSteps[hintStep - 1]?.description}
            onSkipAction={handleSkipHints}
            onStepChange={setHintStep}
            onNextAction={() => {
              setIsVisibleSwipeGuide(true);
            }}
            totalSteps={hostHintSteps.length}
            title={hostHintSteps[hintStep - 1]?.title}
            directionHorizontal={'center'}
          />
        </View>
        <Loading wrapperText={false} text={`Finding ${isHost ? 'guests' : 'events'} near you ...`} userInfo={userInfo} />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  if (userInfo?.uid && isDemo && isHost) {
    return (
      <>
        {loadingCardsList ? (
          <Loading wrapperText={false} text={`Finding ${isHost ? 'guests' : 'events'} near you ...`} userInfo={userInfo} />
        ) : (
          <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
              {cardsList?.map((item, index) => {
                return (
                  <View style={styles.cardContainer} pointerEvents="box-none" key={index.toString()}>
                    <TinderCard
                      ref={cardRef}
                      // @ts-ignore
                      cardWidth="100%"
                      // @ts-ignore
                      cardHeight="100%"
                      onSwipedLeft={() =>
                        isDemo
                          ? handleDemoSwipeCardLeft({uid: item?.info?.uid, withSwipeAnimation: false})
                          : handleReject({uid: item?.info?.uid, id: item?.info?.id, withSwipeAnimation: false})
                      }
                      onSwipedRight={() =>
                        isDemo
                          ? handleDemoSwipeCardRight({uid: item?.info?.uid, withSwipeAnimation: false})
                          : handleInvite({uid: item?.info?.uid, id: item?.info?.id, withSwipeAnimation: false})
                      }
                      OverlayLabelRight={OverlayRight}
                      OverlayLabelLeft={OverlayLeft}
                      disableBottomSwipe={true}
                      disableTopSwipe={true}
                      cardStyle={styles.card}>
                      <ScrollView
                        onScroll={handleScroll}
                        scrollEventThrottle={20}
                        showsVerticalScrollIndicator={false}
                        style={{borderRadius: 22, height: screenHeight - 250}}>
                        {item.component}
                      </ScrollView>
                    </TinderCard>
                  </View>
                );
              })}
            </View>
          </SafeAreaView>
        )}
        {swipedCardsCount >= (apiEventsCollection === 'devEvents' ? 5 : 12) && <ModalLimitedAccess />}
      </>
    );
  }

  if (loadingMyEvents && isHost && !isVisibleMatch && !visibleModalSuperJoin && !isVisibleSuperInvite) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor}}>
        <Animated.View style={[animatedStyle]}>
          <LoaderIcon />
        </Animated.View>
      </SafeAreaView>
    );
  }

  if (userInfo?.uid && acceptModalVisible) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor}}>
        <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />
      </SafeAreaView>
    );
  }

  if (userInfo?.uid && changeAccountTypeModalVisible) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor}}>
        <ModalChangeAccountType isVisible={changeAccountTypeModalVisible} userInfo={userInfo} setIsVisible={setChangeAccountModalVisible} />
      </SafeAreaView>
    );
  }

  if (userInfo?.uid && rejectModalVisible && userInfo?.photos?.[0].image) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: blackColor}}>
        <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo.photos[0].image} />
      </SafeAreaView>
    );
  }

  if (userInfo?.uid && isRefreshing && !cardsList.length && !isVisibleMatch && !visibleModalSuperJoin && !isVisibleSuperInvite) {
    return (
      <>
        <Loading
          wrapperText={false}
          textStyle={{
            opacity: 0.8,
          }}
          text={`Finding ${isHost ? 'guests' : 'events'} near you ...`}
          userInfo={userInfo}
        />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  if (userInfo?.uid && isHost && !userInfo?.accountReviewed && !userInfo?.accountConfirmed) {
    return (
      <>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <CardsFakeState handleSwipeFakeCard={handleSwipeFakeCard} OverlayRight={OverlayRight} OverlayLeft={OverlayLeft} />
          </View>
        </SafeAreaView>
        <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
      </>
    );
  }

  if (userInfo?.uid && isHost && userInfo?.accountReviewed && userInfo?.accountConfirmed && !userInfo?.accountPremium) {
    return (
      <>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <CardsFakeState handleSwipeFakeCard={handleSwipeFakeCard} OverlayRight={OverlayRight} OverlayLeft={OverlayLeft} />
          </View>
        </SafeAreaView>
        {isOpenModalLimitedAccess && <ModalLimitedAccess showNotNow={false} showCloseIcon={false} />}
      </>
    );
  }

  if (userInfo?.uid && loadingCardsList && !isVisibleMatch && !visibleModalSuperJoin && !isVisibleSuperInvite) {
    return (
      <>
        <Loading wrapperText={false} text={`Finding ${isHost ? 'guests' : 'events'} near you ...`} userInfo={userInfo} />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  if (userInfo?.uid && isHost && !loadingCardsList && !loadingMyEvents && !myEvents.length && !isVisibleMatch && !isDemo) {
    return (
      <>
        <View style={{flex: 1, width: '100%', backgroundColor: blackColor}}>
          <View style={{height: 370, marginTop: screenHeight / 26}}>
            <Loading userInfo={userInfo} topPosition={true} />
          </View>
          <View>
            <Text style={{color: whiteColor, textAlign: 'center', fontSize: RFValue(18, 812), fontFamily: Satoshi500}}>
              You don't have any active event.
            </Text>
            <Text style={{color: whiteColor, textAlign: 'center', fontSize: RFValue(18, 812), fontFamily: Satoshi500}}>
              Get started by creating an event to begin inviting guests.
            </Text>
          </View>
          <View style={{paddingHorizontal: 24, marginTop: 'auto', marginBottom: screenHeight / 14}}>
            <Button onPress={goToCreateEvent} title={'Create event'} buttonStyle={{marginTop: 20, marginBottom: 30}} />
          </View>
        </View>
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  if (
    userInfo?.uid &&
    !loadingCardsList &&
    !events?.length &&
    !isVisibleMatch &&
    !visibleModalSuperJoin &&
    !isVisibleSuperInvite &&
    !acceptModalVisible &&
    !isDemo &&
    !changeAccountTypeModalVisible
  ) {
    return (
      <>
        <View style={{flex: 1, backgroundColor: blackColor, paddingHorizontal: 24}}>
          <Loading topPosition={true} userInfo={userInfo} wrapperText={false} styleInnerContainer={{flex: 0}} styleContainer={{flex: 0}} />
          <View
            style={{
              position: 'absolute',
              top: screenHeight / 2.2,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: whiteColor,
                fontWeight: '700',
                fontSize: RFValue(22, 932),
                letterSpacing: 22,
                fontFamily: Satoshi500,
                textAlign: 'center',
                marginRight: -22,
              }}>
              WELCOME
            </Text>
            <Text
              style={{
                fontFamily: Satoshi700,
                fontSize: RFValue(18, 932),
                color: whiteColor,
                marginTop: screenHeight / 50,
              }}>
              Soon, Everything Changes.
            </Text>
            <Text
              style={{
                fontFamily: Satoshi400,
                fontSize: RFValue(18, 932),
                color: whiteColor,
                textAlign: 'center',
                marginTop: screenHeight / 50,
              }}>
              Be the first to access exclusive offers and VIP events. stay tuned - something extraordinary is coming.
            </Text>
            {userInfo?.accountConfirmed && (
              <TouchableOpacity style={{marginTop: screenHeight / 50}} onPress={handleGoToEarlyAccess}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(14, 812),
                    textDecorationLine: 'underline',
                  }}>
                  IO Invitations
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        {totalQuantityGuests > 0 && (
          <FullEvent
            text={`Event is full: ${acceptQuantityGuest}/${totalQuantityGuests} Guests Accepted`}
            activeEvent={activeEvent}
            totalQuantityGuests={totalQuantityGuests}
            totalRequestsGuests={totalRequestsGuests}
            acceptQuantityGuest={acceptQuantityGuest}
            rightComponent={
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <PersoneIcon width={16} height={16} />
                <Text
                  style={{
                    fontFamily: Satoshi700,
                    fontSize: RFValue(12, 812),
                    color: whiteColor,
                    marginLeft: 2,
                  }}>{`${acceptQuantityGuest}/${totalQuantityGuests}`}</Text>
              </View>
            }
          />
        )}
        <View style={styles.container}>
          {cardsList?.map((item, index) => {
            return (
              <View style={styles.cardContainer} pointerEvents="box-none" key={index.toString()}>
                <TinderCard
                  ref={cardRef}
                  // @ts-ignore
                  cardWidth="100%"
                  // @ts-ignore
                  cardHeight="100%"
                  onSwipedLeft={() => handleReject({uid: item?.info?.uid, id: item?.info?.id, withSwipeAnimation: false})}
                  onSwipedRight={() => handleInvite({uid: item?.info?.uid, id: item?.info?.id, withSwipeAnimation: false})}
                  OverlayLabelRight={OverlayRight}
                  OverlayLabelLeft={OverlayLeft}
                  disableBottomSwipe={true}
                  disableTopSwipe={true}
                  cardStyle={styles.card}>
                  <ScrollView
                    onScroll={handleScroll}
                    scrollEventThrottle={20}
                    showsVerticalScrollIndicator={false}
                    style={{borderRadius: 22, height: screenHeight - 250}}>
                    {item.component}
                  </ScrollView>
                </TinderCard>
              </View>
            );
          })}
          <ModalFullEvent
            isVisible={isVisibleModalFullEvent}
            idEvent={activeEvent?.id}
            setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}
          />
          {!userInfo?.accountReviewed && (
            <ModalLockAccount haveCode accountType={userInfo?.accountType} isPremium={userInfo?.accountPremium} isVisibleButton={true} />
          )}
          {userInfo?.accountConfirmed && isHost && activeEvent?.id && !isDemo && (
            <ModalEventLocked eventReviewed={activeEvent?.eventReviewed} eventStatus={activeEvent?.statusEvent} />
          )}
          <ModalReport
            handleAutoSwipeLeft={() =>
              handleFilterEvent({
                uid: reportedItem?.uid,
                id: reportedItem?.event?.id,
                withSwipeAnimation: false,
              })
            }
            modalReport={modalReport}
            setModalReport={setModalReport}
            uidSender={userInfo?.uid}
            uid={reportedItem?.uid}
            activeEvent={reportedItem?.event?.id}
          />
          {visibleModalSuperJoin && (
            <SuperJoin
              isVisibleMatch={visibleModalSuperJoin}
              nameEvent={currentEventInfo?.name || currentEventInfo?.placeName}
              imageEvent={currentEventInfo ? currentEventInfo.photos[0]?.image : ''}
            />
          )}
          {isVisibleSuperInvite && (
            <SuperInvite
              isVisibleSuperInvite={isVisibleSuperInvite}
              activeSuperInviteUser={activeSuperInviteUser}
              onCloseSuperInvite={handleCloseSuperInvite}
              setLastVisible={setLastVisible}
            />
          )}
        </View>
      </SafeAreaView>
      <Match isVisibleMatch={isVisibleMatch} matchData={matchData} onCloseMatch={handleCloseMatch} />
    </>
  );
};

export default gestureHandlerRootHOC(IO);


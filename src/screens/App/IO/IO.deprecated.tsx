import {SafeAreaView, View, Text, Alert} from 'react-native';
import React, {FC, useEffect, useCallback} from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {useFocusEffect} from 'hooks/useAppNavigation';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import Animated from 'react-native-reanimated';
import moment from 'moment';
import Config from 'react-native-config';
import firebase from '@react-native-firebase/app';
import * as S from './IO.style.deprecated.ts';
// Components
import useStyles from './styles.ts';
import {ACCEPTED_STATUS, APPROVED_STATUS, CANCEL_STATUS, INVITE_MATCH_STATUS, NOT_ACCEPTED_STATUS} from 'constants/common.ts';
import {earlyAccessPath, commonStackPath} from 'constants/pathLocations.ts';
import {blackColor, whiteColor} from 'constants/colors';
import LoaderIcon from 'assets/images/icons/loader.svg';
import PersoneIcon from 'assets/images/icons/Users.svg';
import Loading from 'components/Loading/Loading';
import SuperInvite from './screens/SuperInvite/SuperInvite.tsx';
import Match from './screens/Match/Match.tsx';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import SuperJoin from 'components/Modal/ModalSuperJoin/SuperJoin';
import FullEvent from 'components/FullEvent';
import ModalFullEvent from 'components/Modal/ModalFullEvent';
import {UserInfo} from 'src/types/userInfo';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';
import ModalEventLocked from 'components/Modal/ModalEventLocked/ModalEventLocked';
import ModalReport from 'components/Modal/ModalReport/ModalReport.tsx';
import ModalLimitedAccess from 'components/Modal/ModalLimitedAccess/ModalLimitedAccess';
import CardsFakeState from 'components/CardsFakeState';
import ModalChangeAccountType from 'components/Modal/ModalChangeAccountType';
import {useIO} from 'hooks/useIO/useIO';
import {useCreateEvent} from 'hooks/useCreateEvent';
import {Event} from 'src/types/event';

import HostCardContent from './Components/HostCardContent.tsx';
import EmptyStateView from './Components/EmptyStateView/EmptyStateView.tsx';
import {Satoshi700} from 'constants/fonts.ts';
import GuestCardContent from './Components/GuestCardContent/GuestCardContent.tsx';

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
    setNameUser,
    handleDemoSwipeCardLeft,
    handleDemoSwipeCardRight,
    swipedCardUids,
    setIsOpenModalLimitedAccess,
    activeEventDate,
    loadingMyEvents,
    loadingCardsList,
    isFocusedScreen,
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
    setLastVisible,
  } = useIO();

  const goToCreateEvent = useCreateEvent();

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

      if (
        !eventsQuery?.data ||
        typeof eventsQuery.data !== 'object' ||
        !('events' in eventsQuery.data) ||
        !('lastDoc' in eventsQuery.data)
      ) {
        setEvents([]);
        setLoadingCardsList(false);
        endReachedRef.current = true;
        return;
      }

      const eventsData = eventsQuery.data.events as any[];
      const lastDoc = eventsQuery.data.lastDoc ? JSON.parse(eventsQuery.data.lastDoc as string) : null;

      if ('lastDoc' in eventsQuery.data) {
        lastVisibleRef.current = lastDoc;
      }

      if ('endReached' in eventsQuery.data) {
        endReachedRef.current = Boolean(eventsQuery.data.endReached);
      }

      filteredEvents = eventsData.filter((event: any) => {
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
      data.push({
        component: (
          <GuestCardContent
            event={event}
            userInfo={userInfo}
            handleReject={handleReject}
            handleInvite={handleInvite}
            handleReport={handleReport}
            handleSuperInviteBottom={handleSuperInviteBottom}
            setCurrentEventInfo={setCurrentEventInfo}
            navigation={navigation}
            frontAnimatedStyle={frontAnimatedStyle}
            backAnimatedStyle={backAnimatedStyle}
            counterSuperInvites={counterSuperInvites}
            setCurrentEventCardPosition={setCurrentEventCardPosition}
            setScrollPosition={setScrollPosition}
          />
        ),
        info: event,
      });
    }

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
      let listOfUsersResponse: any;
      if (userInfo?.accountPremium) {
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

      users = listOfUsersResponse?.data?.users as UserInfo[];

      console.warn(users?.map((i: any) => i?.uid));

      if (!users || !Array.isArray(users)) {
        setLoadingCardsList(false);
        endReachedRef.current = true;
        return;
      }

      const data: any[] = [];

      users?.map((item: UserInfo): void => {
        setNameUser(item.name);

        data.push({
          component: (
            <HostCardContent
              item={item}
              userInfo={userInfo}
              activeEvent={activeEvent}
              handleDemoSwipeCardLeft={handleDemoSwipeCardLeft}
              handleDemoSwipeCardRight={handleDemoSwipeCardRight}
              handleReject={handleReject}
              handleInvite={handleInvite}
              handleReport={handleReport}
              handleSuperInviteBottom={handleSuperInviteBottom}
              handleOpenSuperInvite={(item: any) => handleOpenSuperInvite(item, item.uid || '')}
              frontAnimatedStyle={frontAnimatedStyle}
              backAnimatedStyle={backAnimatedStyle}
              counterSuperInvites={counterSuperInvites}
              setScrollPosition={setScrollPosition}
            />
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
    }, [userInfo?.uid, activeEvent?.id]),
  );

  useFocusEffect(
    useCallback(() => {
      if (userInfo?.uid && !isHost && activeEventDate && !lastVisibleRef.current && !endReachedRef.current) {
        console.warn('useEffect_getCardsListForGuest', events?.length, lastVisibleRef.current, endReachedRef.current);
        console.warn('useFocusEffect: calling getCardsListForGuest');
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

  if (loadingMyEvents && isHost && !isVisibleMatch && !visibleModalSuperJoin && !isVisibleSuperInvite) {
    return (
      <S.SafeAreaContainer>
        <Animated.View style={[animatedStyle]}>
          <LoaderIcon />
        </Animated.View>
      </S.SafeAreaContainer>
    );
  }

  if (userInfo?.uid && acceptModalVisible) {
    return (
      <S.SafeAreaContainer>
        <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />
      </S.SafeAreaContainer>
    );
  }

  if (userInfo?.uid && changeAccountTypeModalVisible) {
    return (
      <S.SafeAreaContainer>
        <ModalChangeAccountType isVisible={changeAccountTypeModalVisible} userInfo={userInfo} setIsVisible={setChangeAccountModalVisible} />
      </S.SafeAreaContainer>
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
        <S.SafeAreaContainer>
          <S.Container>
            <Text>Card fake state</Text>
          </S.Container>
        </S.SafeAreaContainer>
        <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
      </>
    );
  }

  if (userInfo?.uid && isHost && userInfo?.accountReviewed && userInfo?.accountConfirmed && !userInfo?.accountPremium) {
    return (
      <>
        <S.SafeAreaContainer style={styles.safeAreaView}>
          <View style={styles.container}>
            <CardsFakeState
              handleSwipeFakeCard={handleSwipeFakeCard}
              OverlayRight={() => (
                <S.OverlayLabelContainerInvite>
                  <S.OverlayLabelTextInvite>{isHost ? 'INVITE' : 'Join'}</S.OverlayLabelTextInvite>
                </S.OverlayLabelContainerInvite>
              )}
              OverlayLeft={() => (
                <S.OverlayLabelContainer>
                  <S.OverlayLabelText>NOPE</S.OverlayLabelText>
                </S.OverlayLabelContainer>
              )}
            />
          </View>
        </S.SafeAreaContainer>
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

  if (userInfo?.uid && isHost && !loadingCardsList && !loadingMyEvents && !myEvents.length && !isVisibleMatch) {
    return (
      <>
        <EmptyStateView userInfo={userInfo} goToCreateEvent={goToCreateEvent} isHost={isHost} />
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
    !changeAccountTypeModalVisible
  ) {
    return (
      <>
        <EmptyStateView
          userInfo={userInfo}
          goToCreateEvent={goToCreateEvent}
          isHost={isHost}
          handleGoToEarlyAccess={handleGoToEarlyAccess}
        />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  return (
    <>
      <S.SafeAreaContainer>
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
        <S.Container>
          {/* <CardsList
            cardsList={cardsList}
            isHost={isHost}
            cardRef={cardRef}
            handleReject={handleReject}
            handleInvite={handleInvite}
            handleScroll={handleScroll}
          /> */}
          <ModalFullEvent
            isVisible={isVisibleModalFullEvent}
            idEvent={activeEvent?.id}
            setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}
          />
          {!userInfo?.accountReviewed && (
            <ModalLockAccount haveCode accountType={userInfo?.accountType} isPremium={userInfo?.accountPremium} isVisibleButton={true} />
          )}
          {userInfo?.accountConfirmed && isHost && activeEvent?.id && (
            <ModalEventLocked eventReviewed={activeEvent?.eventReviewed} eventStatus={activeEvent?.statusEvent} />
          )}
          <ModalReport
            handleAutoSwipeLeft={() =>
              handleFilterEvent({
                uid: reportedItem?.uid || '',
                id: reportedItem?.event?.id || '',
                withSwipeAnimation: false,
              })
            }
            modalReport={modalReport}
            setModalReport={setModalReport}
            uidSender={userInfo?.uid || ''}
            uid={reportedItem?.uid || ''}
          />
          {visibleModalSuperJoin && (
            <SuperJoin
              isVisibleMatch={visibleModalSuperJoin}
              nameEvent={currentEventInfo?.name || currentEventInfo?.placeName || ''}
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
        </S.Container>
      </S.SafeAreaContainer>
      {isVisibleMatch && matchData && <Match isVisibleMatch={isVisibleMatch} matchData={matchData} onCloseMatch={handleCloseMatch} />}
    </>
  );
};

export default gestureHandlerRootHOC(IO);

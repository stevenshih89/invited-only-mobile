import React, { FC } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import Config from 'react-native-config';
import firebase from '@react-native-firebase/app';
import { ACCEPTED_STATUS, APPROVED_STATUS, CANCEL_STATUS, INVITE_MATCH_STATUS, NOT_ACCEPTED_STATUS } from 'constants/common.ts';
import { Event } from 'src/types/event';
import { UserInfo } from 'src/types/userInfo';

const CARDS_LOADING_LIMIT = 6;

interface DataServiceProps {
  isHost: boolean;
  userInfo: any;
  setLoadingCardsList: (value: boolean) => void;
  setIsRefreshing: (value: boolean) => void;
  events: any[];
  lastVisibleRef: React.MutableRefObject<any>;
  setEvents: (callback: (prevEvents: any[]) => any[]) => void;
  endReachedRef: React.MutableRefObject<boolean>;
  filterEventByDate: (events: any[]) => any[];
  eventsRef: React.MutableRefObject<any[]>;
  isDemo: boolean;
  activeEvent: any;
  setNameUser: (name: string) => void;
  swipedCardUids: string[];
  children: (props: {
    getCardsListForGuest: (refresh?: boolean) => Promise<void>;
    getCardsListForHost: (refresh?: boolean) => Promise<void>;
  }) => React.ReactNode;
}

const DataService: FC<DataServiceProps> = ({
  isHost,
  userInfo,
  setLoadingCardsList,
  setIsRefreshing,
  events,
  lastVisibleRef,
  setEvents,
  endReachedRef,
  filterEventByDate,
  eventsRef,
  isDemo,
  activeEvent,
  setNameUser,
  swipedCardUids,
  children,
}) => {
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
        component: null, // Component will be added by parent
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
          component: null, // Component will be added by parent
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

  return <>{children({ getCardsListForGuest, getCardsListForHost })}</>;
};

export default DataService;

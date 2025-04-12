import {useCallback, useContext, useState} from 'react';
//import components

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import {useAdminActions} from 'src/store/adminActions';
import {ACCEPTED_STATUS, ALL, LIKED, THIS_MONTH, THIS_WEEK} from 'constants/common';
import {Event, EventData} from 'src/types/event';
import {EventsDate} from 'contexts/EventsDate';
import {filterEventsByThisMonth} from 'helpers/filterEventsByThisMonth';
import {filterEventsByThisWeek} from 'helpers/filterEventsByThisWeek';
import analytics from '@react-native-firebase/analytics';
import {requestsScreen} from 'constants/analitycs';
import {useMyEvents} from 'src/store/myEvents';
import Config from 'react-native-config';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {MatchData} from 'screens/App/IO/screens/Match/Match';
import {useUser} from 'src/store/userStore';

const COUNT_TO_ADD_REQUEST_ITEMS = 2;
const DEFAULT_LIMIT_REQUEST_ITEMS = 6;
const MAX_LIMIT_REQUEST_ITEMS = 40;
const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';

export const useRequests = () => {
  const {activeEventDate} = useContext(EventsDate);
  const [requestsForHost, setRequestsForHost] = useState<any>([]);
  const userInfo = useUser((i: any) => i?.user);
  const {activeEvent} = useMyEvents(state => state);

  // const [userInfo, setUserInfoData] = useState<UserInfo>({});
  const [dataForGuest, setDataForGuest] = useState<EventData[]>([]);

  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [isVisibleModalFullEvent, setIsVisibleModalFullEvent] = useState<boolean>(false);
  // @ts-ignore
  const [matchData, setMatchData] = useState<MatchData>({});
  const [totalQuantityGuests, setTotalQuantityGuests] = useState<number>(0);
  const [acceptQuantityGuest, setAcceptQuantityGuest] = useState<number>(0);
  const [totalRequestsGuests, setTotalRequestsGuests] = useState<number>(0);

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);
  const changeAccountTypeModalVisible = useAdminActions((i: any) => i?.changeAccountTypeModalVisible);
  const setChangeAccountModalVisible = useAdminActions((i: any) => i?.setChangeAccountModalVisible);
  const currentUser = auth().currentUser;
  const [loadingRequestItems, setLoadingRequestItems] = useState<boolean>(true);

  const [limitRequestItems, setLimitRequestItems] = useState<number>(DEFAULT_LIMIT_REQUEST_ITEMS);

  const handleCloseMatch = (): void => {
    setIsVisibleMatch(false);
  };

  const handleAddCountRequestItems = (): void => {
    if (limitRequestItems >= MAX_LIMIT_REQUEST_ITEMS) {
      return;
    }
    setLimitRequestItems(prev => prev + COUNT_TO_ADD_REQUEST_ITEMS);
  };

  const fetchHostRequests = async (querySnapshot: any) => {
    if (!querySnapshot.exists) {
      setRequestsForHost([]);
      setLoadingRequestItems(false);
      return;
    }
    const data = querySnapshot.data();

    const allGuests = data?.male + data?.female;
    const findAcceptedGuest = data?.usersList.filter((item: Event.User) => item.status === ACCEPTED_STATUS);
    setTotalQuantityGuests(allGuests);
    setAcceptQuantityGuest(findAcceptedGuest.length);
    setTotalRequestsGuests(data?.requestsList?.length);

    if (!data?.requestsList?.length) {
      setRequestsForHost([]);
      setLoadingRequestItems(false);
      return;
    }

    const sortedRequests = data?.requestsList
      ?.sort((a: Event.User, b: Event.User) => {
        return a?.uid.localeCompare(b?.uid);
      })
      .filter((value: any, index: number, self: any) => index === self.findIndex((t: {uid: any}) => t.uid === value.uid))
      .slice(0, limitRequestItems);

    console.warn('sortedRequests', sortedRequests.length);

    setRequestsForHost(sortedRequests);
    setLoadingRequestItems(false);
  };

  const filterByUid = (array: EventData[], uid: string | undefined) => {
    return array?.filter((item: EventData) => {
      if (Array?.isArray(item?.usersList)) {
        return item?.usersList?.some((userItem: Event.User) => userItem?.uid === uid && userItem?.status === LIKED);
      } else {
        return false;
      }
    });
  };

  const fetchGuestRequests = async (querySnapshot: any) => {
    if (querySnapshot.empty) {
      setDataForGuest([]);
      setLoadingRequestItems(false);
      return;
    }
    const data = querySnapshot?.docs?.map((i: {data: () => any}) => i?.data()) as EventData[];
    const filteredRequestsByUid = filterByUid(data, currentUser?.uid);

    const filterEventByDate = () => {
      if (activeEventDate === ALL) {
        return filteredRequestsByUid;
      }
      if (activeEventDate === THIS_WEEK) {
        return filterEventsByThisWeek(filteredRequestsByUid);
      }
      if (activeEventDate === THIS_MONTH) {
        return filterEventsByThisMonth(filteredRequestsByUid);
      }
      return filteredRequestsByUid;
    };

    const filteredRequestsByDate = filterEventByDate();

    setDataForGuest(filteredRequestsByDate);
    setLoadingRequestItems(false);
  };

  const isHost = userInfo?.accountType?.toLowerCase() === 'host';
  const list = isHost ? requestsForHost : dataForGuest;

  const handleOpenMatch = (data: MatchData) => {
    setMatchData(data);
    setIsVisibleMatch(true);
  };

  useFocusEffect(
    useCallback(() => {
      try {
        analytics().logScreenView({
          screen_name: `${requestsScreen}`,
        });
      } catch (e) {
        console.error(e);
      }
    }, []),
  );

  return {
    isHost,
    handleAddCountRequestItems,
    setRequestsForHost,
    handleOpenMatch,
    setIsVisibleModalFullEvent,
    fetchHostRequests,
    setDataForGuest,
    loadingRequestItems,
    list,
    isVisibleMatch,
    rejectModalVisible,
    acceptModalVisible,
    totalRequestsGuests,
    acceptQuantityGuest,
    totalQuantityGuests,
    setAcceptModalVisible,
    changeAccountTypeModalVisible,
    setChangeAccountModalVisible,
    isVisibleModalFullEvent,
    matchData,
    handleCloseMatch,
  };
};

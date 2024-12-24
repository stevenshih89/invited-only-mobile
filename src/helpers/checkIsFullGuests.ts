import firestore from '@react-native-firebase/firestore';
import {ACCEPTED_STATUS} from 'constants/common';
import Config from 'react-native-config';
export const checkIsFullGuests = async (idEvent: string) => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const getEventData = await firestore().collection(apiEventsCollection).doc(idEvent).get();

  const data = getEventData.data();
  const allGuests = data?.male + data?.female;
  const findAcceptedGuest = data?.usersList.filter(item => item.status === ACCEPTED_STATUS);
  return {
    allGuests,
    findAcceptedGuest: findAcceptedGuest.length,
    totalRequestsGuests: data?.requestsList?.length,
  };
};

import firestore from '@react-native-firebase/firestore';
import {INVITE_MATCH_STATUS} from 'constants/common';

export const checkIsFullGuests = async (idEvent: string) => {
  const getEventData = await firestore().collection('Events').doc(idEvent).get();
  // console.warn('getEventData', idEvent, getEventData.data());

  const data = getEventData.data();
  const allGuests = data?.male + data?.female;
  const findAcceptedGuest = data?.usersList.filter(item => item.status === INVITE_MATCH_STATUS);
  return {
    allGuests,
    findAcceptedGuest: findAcceptedGuest.length,
    totalRequestsGuests: data?.requestsList.length,
  };
};

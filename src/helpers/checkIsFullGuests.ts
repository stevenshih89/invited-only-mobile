import firestore from '@react-native-firebase/firestore';
import {ACCEPTED_STATUS} from 'constants/common';

export const checkIsFullGuests = async (idEvent: string) => {
  const getEventData = await firestore().collection('Events').doc(idEvent).get();

  const data = getEventData.data();
  const allGuests = data?.male + data?.female;
  const findAcceptedGuest = data?.usersList.filter(item => item.status === ACCEPTED_STATUS);
  return {
    allGuests,
    findAcceptedGuest: findAcceptedGuest.length,
    totalRequestsGuests: data?.requestsList.length,
  };
};

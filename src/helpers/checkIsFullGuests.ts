import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';
import {showToast} from './showToast';
import {logErrorToSentry} from './logErrorsToSentry';
import {ACCEPTED_STATUS} from 'constants/common';

export const checkIsFullGuests = async (idEvent: string) => {
  try {
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
  } catch (error) {
    showToast('basic', 'An error occurred while checking the event guests. Please try again later.', 'Error');
    logErrorToSentry(error);
  }
};

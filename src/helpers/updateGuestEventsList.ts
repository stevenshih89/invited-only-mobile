import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';
import { logErrorToSentry } from './logErrorsToSentry';

export const updateGuestEventsList = async (eventId: string, forUserUid: string) => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  try {
    const docData = firestore().collection(apiUserInfoCollection).doc(forUserUid);
    const dataUser = await docData.get();
    const eventsList = dataUser?.data()?.eventsList;
    await docData.update({
      eventsListVisit: eventsList ? [...eventsList, eventId] : [eventId],
    });
  } catch (error) {
    logErrorToSentry(error);
  }
};

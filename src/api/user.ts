import firestore from '@react-native-firebase/firestore';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {showToast} from 'helpers/showToast';
import Config from 'react-native-config';

export const getUsersForEvent = async ({
  male,
  female,
  limit = 10,
  lastVisible,
  excludeUids,
}: {
  male: number;
  female: number;
  limit?: number;
  lastVisible?: any;
  excludeUids: string[];
}) => {
  try {
    const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

    let query = firestore()
      .collection(apiUserInfoCollection)
      .orderBy('userBeauty', 'asc')
      .orderBy('uid')
      .where('accountType', '==', 'guest')
      .where('accountConfirmed', '==', true);

    if (excludeUids?.length > 0) {
      query = query.where('uid', 'not-in', excludeUids);
    }

    if (limit !== null) {
      query = query.limit(limit);
    }

    if (lastVisible) {
      query = query.startAfter(lastVisible);
    }

    if (male > 0 && female > 0) {
      return query.get();
    }
    if (male > 0) {
      return query.where('gender', '==', 'man').get();
    }
    if (female > 0) {
      return query.where('gender', '==', 'woman').get();
    }
  } catch (error) {
    showToast('inviteMatch', 'An issue occurred while fetching the users for the event. Please try again later.', 'Error');
    logErrorToSentry(error);
  }
};

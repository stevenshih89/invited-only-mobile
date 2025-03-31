import firestore from '@react-native-firebase/firestore';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {showToast} from 'helpers/showToast';
import {FirebaseCollectionsResponse} from 'src/apiv2/queries/appSettingsQueries';

export const getUsersForEvent = async ({
  male,
  female,
  limit = 10,
  lastVisible,
  excludeUids,
  collectionName,
}: {
  male: number;
  female: number;
  limit?: number;
  lastVisible?: any;
  excludeUids: string[];
  collectionName: keyof FirebaseCollectionsResponse;
}) => {
  try {
    let query = firestore()
      .collection(collectionName)
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

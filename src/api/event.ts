import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {EventData} from 'src/types/event';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import { showToast } from 'helpers/showToast';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';

const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';

export type IOEventPhoto = {
  image: null | string;
  id: number;
};
export type IOEvent = {
  activeType: number;
  female: number;
  name: string;
  description: string;
  date: string;
  hour: string;
  address: string;
  meetingSpot: string;
  male: number;
  femaleFriend: number;
  maleFriend: number;
  placeName: string;
  id: string;
  uid: string;
  requestsList: string[];
  usersList: string[];
  statusEvent: boolean;
  eventReviewed: boolean;
  hostImage: string;
  hostName: string;
  photos: IOEventPhoto[];
};

export async function createEvent(uid: string, event: EventData): Promise<boolean> {
  try {
    await firestore().collection(apiEventsCollection).doc(uid).set(event);
    return true;
  } catch (error) {
    showToast('inviteMatch', 'An issue occurred while creating the event. Please try again later.', 'Error');
    logErrorToSentry(error)
  }
}

interface GetEventsParams {
  lastVisible: FirebaseFirestoreTypes.QueryDocumentSnapshot | null;
  limit?: number | null;
  excludeUids: string[];
  genderFilter?: 'male' | 'female' | null;
}

export const getEvents = async ({limit = 10, lastVisible, excludeUids, genderFilter}: GetEventsParams) => {
  try {
    const currentUser = auth().currentUser;

  if (!currentUser) {
    throw new Error('User not found');
  }

  let query = firestore().collection(apiEventsCollection).where('statusEvent', '==', true).where('isCancelled', '==', false);

  if (genderFilter) {
    query = query.where(genderFilter, '>', 0).orderBy(genderFilter);
  }

  if (excludeUids?.length) {
    query = query.where('uid', 'not-in', excludeUids);
  }

  query = query.orderBy('createdAt', 'desc');

  if (lastVisible) {
    query = query.startAfter(lastVisible);
  }

  if (limit === null) {
    return query.get();
  }

  return query.limit(limit).get();
  } catch (error) {
    showToast('inviteMatch', 'An issue occurred while fetching the events. Please try again later.', 'Error');
    logErrorToSentry(error)
  }
};

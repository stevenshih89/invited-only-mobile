import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {EventData} from 'src/types/event';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';

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
  await firestore().collection(apiEventsCollection).doc(uid).set(event);
  return true;
}

interface GetEventsParams {
  lastVisible: FirebaseFirestoreTypes.QueryDocumentSnapshot | null;
  limit?: number | null;
  excludeUids: string[];
}

export const getEvents = async ({limit = 10, lastVisible, excludeUids}: GetEventsParams) => {
  const currentUser = auth().currentUser;
  if (!currentUser) {
    throw new Error('User not found');
  }
  let query = firestore().collection(apiEventsCollection).where('statusEvent', '==', true).where('isCancelled', '==', false);

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
};

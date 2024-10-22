import firestore from '@react-native-firebase/firestore';
import {EventData} from 'src/types/event';

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
  await firestore().collection('Events').doc(uid).set(event);
  return true;
}

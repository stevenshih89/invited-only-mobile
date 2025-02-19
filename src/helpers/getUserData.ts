import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';
import { logErrorToSentry } from './logErrorsToSentry';

// Start of Selection
interface UserData {
  accountConfirmed: boolean;
  accountPremium: boolean;
  accountReviewed: boolean;
  accountType: string | undefined;
  photos: any[];
  online: boolean;
  name: string;
  date: string;
  gender: string | undefined;
  uid: string;
  superInvites: number;
  weeklySuperInvites: number;
}

export const getUserData = async (userUid: string): Promise<UserData> => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const deaultValues = {
    accountConfirmed: false,
    accountPremium: false,
    accountReviewed: false,
    accountType: undefined,
    photos: [],
    online: false,
    name: '',
    date: '',
    gender: undefined,
    uid: '',
    superInvites: 0,
    weeklySuperInvites: 0,
  };
  try {
    const userQuery = await firestore().collection(apiUserInfoCollection).doc(userUid).get();

    if (userQuery.exists) {
      const data = userQuery.data();
      return {
        accountConfirmed: data?.accountConfirmed || false,
        accountPremium: data?.accountPremium || false,
        accountReviewed: data?.accountReviewed || false,
        accountType: data?.accountType,
        photos: data?.photos ? data?.photos.sort((a: any, b: any) => a.id - b.id) : [],
        online: data?.online || false,
        name: data?.name || '',
        date: data?.date || '',
        gender: data?.gender,
        uid: userQuery.id,
        superInvites: data?.superInvites,
        weeklySuperInvites: data?.weeklySuperInvites,
      };
    } else {
      return deaultValues;
    }
  } catch (e) {
    console.error(e);
    logErrorToSentry(e)
    return deaultValues;
  }
};

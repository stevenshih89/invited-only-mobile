import firestore from '@react-native-firebase/firestore';

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
}

export const getUserData = async (userUid: string): Promise<UserData> => {
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
  };
  try {
    const userQuery = await firestore().collection('userInfo').doc(userUid).get();

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
      };
    } else {
      return deaultValues;
    }
  } catch (e) {
    console.error(e);
    return deaultValues;
  }
};

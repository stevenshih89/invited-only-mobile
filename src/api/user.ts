import firestore from '@react-native-firebase/firestore';

export const getUsersForEvent = async (uid: string, male: number, female: number) => {
  if (male > 0 && female > 0) {
    return firestore()
      .collection('userInfo')
      .where('uid', '!=', uid)
      .where('accountType', '==', 'guest')
      .where('accountConfirmed', '==', true)
      .limit(10)
      .get();
  }
  if (male > 0) {
    return firestore()
      .collection('userInfo')
      .where('uid', '!=', uid)
      .where('accountType', '==', 'guest')
      .where('gender', '==', 'man')
      .where('accountConfirmed', '==', true)
      .limit(10)
      .get();
  }
  if (female > 0) {
    return firestore()
      .collection('userInfo')
      .where('uid', '!=', uid)
      .where('accountType', '==', 'guest')
      .where('gender', '==', 'woman')
      .where('accountConfirmed', '==', true)
      .limit(10)
      .get();
  }
};

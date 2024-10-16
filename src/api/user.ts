import firestore from '@react-native-firebase/firestore';

export const getUsersForEvent = async (uid: string, male: number, female: number) => {
  if (male > 0 && female > 0) {
    return firestore().collection('userInfo').where('uid', '!=', uid).limit(10).get();
  } else if (male > 0) {
    return firestore().collection('userInfo').where('uid', '!=', uid).where('gender', '==', 'man').limit(10).get();
  } else if (female > 0) {
    return firestore().collection('userInfo').where('uid', '!=', uid).where('gender', '==', 'woman').limit(10).get();
  }
};

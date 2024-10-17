import firestore from '@react-native-firebase/firestore';

export const getUsersForEvent = async (uid: string, male: number, female: number) => {
  console.warn(uid, male, female);

  if (male > 0 && female > 0) {
    console.warn(male, female);

    return firestore().collection('userInfo').where('uid', '!=', uid).where('accountType', '==', 'guest').limit(10).get();
  }
  if (male > 0) {
    console.warn('male');

    return firestore()
      .collection('userInfo')
      .where('uid', '!=', uid)
      .where('accountType', '==', 'guest')
      .where('gender', '==', 'man')
      .limit(10)
      .get();
  }
  if (female > 0) {
    console.warn('female');

    return firestore()
      .collection('userInfo')
      .where('uid', '!=', uid)
      .where('accountType', '==', 'guest')
      .where('gender', '==', 'woman')
      .limit(10)
      .get();
  }
};

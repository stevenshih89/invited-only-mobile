import firestore from '@react-native-firebase/firestore';

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
  let query = firestore()
    .collection('userInfo')
    .orderBy('uid')
    .orderBy('createdAt', 'desc')
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
};

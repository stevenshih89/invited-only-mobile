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

  if (limit !== null) {
    query = query.limit(limit);
  }

  if (lastVisible) {
    query = query.startAfter(lastVisible);
  }

  let results: any[] = [];
  if (excludeUids?.length > 0) {
    const batchSize = 10;
    for (let i = 0; i < excludeUids.length; i += batchSize) {
      const batch = excludeUids.slice(i, i + batchSize);
      let batchQuery = query.where('uid', 'not-in', batch);

      if (male > 0 && female > 0) {
        results.push(...(await batchQuery.get()).docs);
      } else if (male > 0) {
        results.push(...(await batchQuery.where('gender', '==', 'man').get()).docs);
      } else if (female > 0) {
        results.push(...(await batchQuery.where('gender', '==', 'woman').get()).docs);
      }
    }
  } else {
    if (male > 0 && female > 0) {
      results = (await query.get()).docs;
    } else if (male > 0) {
      results = (await query.where('gender', '==', 'man').get()).docs;
    } else if (female > 0) {
      results = (await query.where('gender', '==', 'woman').get()).docs;
    }
  }

  return results;
};

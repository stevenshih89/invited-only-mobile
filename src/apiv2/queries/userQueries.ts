import {useQuery, useQueryClient} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../store/userStore';
import {UserQueryKeys} from '../keys/userKeys.ts';
import {logErrorToSentry} from 'helpers/logErrorsToSentry.ts';
import auth from '@react-native-firebase/auth';
import {UserInfo} from '../../types/userInfo.ts';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext.tsx';
import {useContext} from 'react';

const useUserInfo = () => {
  const currentUser = auth()?.currentUser;
  const queryClient = useQueryClient();
  const setUser = useUser((i: any) => i?.setUser);
  const uid = currentUser?.uid ?? '';
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);

  const userUpdatesWatchFn = async () => {
    try {
      // Use a direct return of the unsubscribe function
      return firestore()
        .collection(apiUserInfoCollection)
        .doc(uid)
        .onSnapshot(docSnapshot => {
          const data = docSnapshot.data() as UserInfo;
          const updatedUserInfo = data || {};

          queryClient.setQueryData(UserQueryKeys.getUserInfo(uid), updatedUserInfo);
          setUser(updatedUserInfo);
        });
    } catch (error) {
      logErrorToSentry(error);
      // Return a no-op function in case of error to prevent undefined returns
      return () => {};
    }
  };

  return useQuery({
    queryKey: UserQueryKeys.getUserInfo(uid),
    queryFn: userUpdatesWatchFn,
    gcTime: Infinity, // Keep the data in cache
    enabled: !!uid, // Only run the query if we have a user ID
  });
};

const useFcmTokensFromUsers = (isEnabled: boolean = true) => {
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const getFcmTokensFromUsersFn = async (): Promise<string[]> => {
    try {
      const userInfoDocs = await firestore().collection(apiUserInfoCollection).where('isInvitedOnlyAdmin', '==', true).get();

      const tokens: string[] = [];

      userInfoDocs.forEach(doc => {
        const data = doc.data();
        if (data.fcmToken) {
          tokens.push(data.fcmToken);
        }
      });
      return tokens;
    } catch (error) {
      logErrorToSentry(error);
      return [];
    }
  };

  return useQuery({
    queryKey: UserQueryKeys.getFcmTokensFromUsers(),
    queryFn: getFcmTokensFromUsersFn,
    enabled: isEnabled,
  });
};

export const UserQueries = {
  useUserInfo,
  useFcmTokensFromUsers,
};

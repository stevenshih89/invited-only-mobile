import Config from 'react-native-config';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../store/userStore';
import {UserQueryKeys} from '../keys/userKeys.ts';
import {logErrorToSentry} from 'helpers/logErrorsToSentry.ts';
import auth from '@react-native-firebase/auth';
import {UserInfo} from '../../types/userInfo.ts';

const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

const useUserInfo = () => {
  const currentUser = auth()?.currentUser;
  const queryClient = useQueryClient();
  const setUser = useUser((i: any) => i?.setUser);
  const uid = currentUser?.uid ?? '';

  const userUpdatesWatchFn = async () => {
    try {
      const unsubscribe = firestore()
        .collection(apiUserInfoCollection)
        .doc(uid)
        .onSnapshot(docSnapshot => {
          const data = docSnapshot.data() as UserInfo;
          const updatedUserInfo = data || {};

          queryClient.setQueryData(UserQueryKeys.getUserInfo(uid), () => {
            return updatedUserInfo;
          });
          setUser(updatedUserInfo);
        });
      return () => unsubscribe();
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  return useQuery({
    queryKey: UserQueryKeys.getUserInfo(uid),
    queryFn: userUpdatesWatchFn,
  });
};

const useFcmTokensFromUsers = (isEnabled: boolean = true) => {
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

import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export type AccountInfoFlyWeight = {
  accountConfirmed: boolean;
  accountPremium: boolean;
  accountReviewed: boolean;
  isHost: boolean;
};

const defaultAccountInfo: AccountInfoFlyWeight = {
  accountConfirmed: false,
  accountPremium: false,
  accountReviewed: false,
  isHost: false,
};

export const onUserProfileChangeSubscription = (callback: (info: AccountInfoFlyWeight) => void) => {
  const user = auth().currentUser;

  return firestore()
    .collection('userInfo')
    .doc(user?.uid ?? undefined)
    .onSnapshot(snap => {
      if (!snap.exists) {
        return;
      }

      const userInfo = snap.data();

      const accountInfo = {
        accountConfirmed: userInfo?.accountConfirmed ?? false,
        accountPremium: userInfo?.accountPremium ?? false,
        accountReviewed: userInfo?.accountReviewed ?? false,
        isHost: userInfo?.accountType === 'host' ?? false,
      };

      // DEVNOTE: just keep it for safety
      // callback(accountInfo);
      callback({
        ...userInfo,
        isHost: userInfo?.accountType === 'host' ?? false,
      });
    });
};

export const useUserProfileChangeSubscription = (): AccountInfoFlyWeight => {
  const [state, setState] = useState<AccountInfoFlyWeight>(defaultAccountInfo);

  useEffect(() => {
    const unsubscribe = onUserProfileChangeSubscription(setState);

    return () => unsubscribe();
  }, []);

  return state;
};

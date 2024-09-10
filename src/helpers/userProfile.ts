import {EffectCallback, useEffect, useState} from 'react';
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

export const onUserProfileChangeSubscription = (callback: (info: AccountInfoFlyWeight) => void): EffectCallback => {
  const user = auth().currentUser;
  const unsubscribe: EffectCallback = function () {};

  if (user === null) {
    return unsubscribe;
  }

  return firestore()
    .collection('userInfo')
    .doc(user.uid)
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

      callback(accountInfo);
    });
};

export const useUserProfileChangeSubscription = (): AccountInfoFlyWeight => {
  const [state, setState] = useState<AccountInfoFlyWeight>(defaultAccountInfo);

  useEffect(() => {
    onUserProfileChangeSubscription(setState);
  }, []);

  return state;
};

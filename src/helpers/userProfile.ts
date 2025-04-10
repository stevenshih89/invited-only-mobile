import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import {logErrorToSentry} from './logErrorsToSentry';

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
  try {
    const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
    const user = auth().currentUser;

    // If no user is logged in, return a no-op function
    if (!user?.uid) {
      console.warn('No user ID available for profile subscription');
      return () => {};
    }

    // Create a variable to track if the subscription is still active
    let isActive = true;
    try {
      const unsubscribe = firestore()
        .collection(apiUserInfoCollection)
        .doc(user.uid)
        .onSnapshot(snap => {
          // Only process updates if the subscription is still active
          if (!isActive) return;

          if (!snap.exists) {
            return;
          }

          const userInfo = snap.data();

          // Only call the callback if the subscription is still active
          if (isActive) {
            callback({
              ...userInfo,
              isHost: userInfo?.accountType === 'host' ?? false,
            });
          }
        });
    } catch (error) {
      logErrorToSentry(error);
      return () => {}; // Return a no-op function in case of error
    }

    // Return a function that both sets the flag and unsubscribes
    return () => {
      isActive = false;
      unsubscribe();
    };
  } catch (error) {
    logErrorToSentry(error);
    return () => {}; // Return a no-op function in case of error
  }
};

export const useUserProfileChangeSubscription = (): AccountInfoFlyWeight => {
  const [state, setState] = useState<AccountInfoFlyWeight>(defaultAccountInfo);

  useEffect(() => {
    const unsubscribe = onUserProfileChangeSubscription(setState);

    return () => unsubscribe();
  }, []);

  return state;
};

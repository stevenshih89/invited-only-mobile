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

export const useUserProfileChangeSubscription = (): AccountInfoFlyWeight => {
  const [state, setState] = useState<AccountInfoFlyWeight>(defaultAccountInfo);

  return state;
};

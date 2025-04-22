import { useState} from 'react';

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

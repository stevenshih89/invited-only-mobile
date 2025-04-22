import {useState} from 'react';
import {useAppNavigation} from './useAppNavigation';
import {useUser} from 'src/store/userStore';
import {paymentPath, superInvitePayPath} from 'constants/pathLocations';

export const useMyPlan = () => {
  const [loaderVisible, setLoaderVisible] = useState(false);

  const {user: userInfo} = useUser();

  const navigation = useAppNavigation();

  const goToPaymentPath = () => {
    navigation.navigate(paymentPath as never);
  };

  const goToSuperInvitePay = () => {
    // @ts-ignore
    navigation.navigate(superInvitePayPath);
  };

  console.warn(userInfo?.superInvites, userInfo?.weeklySuperInvites);

  return {
    loaderVisible,
    goToPaymentPath,
    goToSuperInvitePay,
    userInfo,
  };
};

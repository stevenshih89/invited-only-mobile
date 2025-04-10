import {eventCreatingStackPath, paymentPath} from 'constants/pathLocations';
import {useAppNavigation} from './useAppNavigation';
import {useUser} from 'src/store/userStore';

export const useCreateEvent = () => {
  const navigation = useAppNavigation();
  const {user: userInfo} = useUser();

  return () => {
    if (!userInfo?.accountConfirmed) {
      return;
    }
    if (!userInfo.accountPremium) {
      navigation.navigate(paymentPath as never);
    } else {
      navigation.navigate(eventCreatingStackPath);
    }
  };
};

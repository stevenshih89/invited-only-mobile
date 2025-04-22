import {useEffect, useState} from 'react';
import {useAppNavigation} from './useAppNavigation';
import {formatDate} from 'helpers/formatDate';
import {paymentPath} from 'constants/pathLocations';
import {useSubscriptions} from 'src/store/subscriptionsStore';

export const useManageSubscription = () => {
  const [subscriptionName, setSubscriptionName] = useState('');

  const currentSubscriptions = useSubscriptions((i: any) => i?.currentSubscriptions);

  const lastSubscriptionName = currentSubscriptions?.activeSubscriptions?.at(-1);
  const lastSubscriptionData = currentSubscriptions?.latestExpirationDate;
  const purchaseDates = currentSubscriptions?.allPurchaseDates?.[lastSubscriptionName];

  useEffect(() => {
    switch (lastSubscriptionName) {
      case 'io_59_1w':
        setSubscriptionName('weekly');
        break;
      case 'io_29_3m':
        setSubscriptionName('3 months');
        break;
      case 'io_99_1m':
        setSubscriptionName('month');
        break;
      default:
        break;
    }
  }, []);

  const formateDateFun = (date: string) => {
    const convertDate = date.split('T')[0].split('-').reverse().join('.');
    const res = formatDate(convertDate);
    return res;
  };

  const navigation = useAppNavigation();

  const goToMyPaymentPath = () => {
    navigation.navigate(paymentPath as never);
  };

  return {
    subscriptionName,
    currentSubscriptions,
    lastSubscriptionData,
    purchaseDates,
    formateDateFun,
    goToMyPaymentPath,
  };
};

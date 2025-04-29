import {useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Purchases, {PurchasesPackage} from 'react-native-purchases';
import getSymbolFromCurrency from 'currency-symbol-map';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {useSubscriptions} from 'src/store/subscriptionsStore';
import {getActiveSubscription, getSubscriptions} from 'src/api.deprecated/purchase';
import {showToast} from 'helpers/showToast';

export interface PlanListItem {
  id: number;
  identifier?: string;
  title: string;
  duration: number;
  durationName: string;
  description: string;
  pricePerDuration: string;
  fullPrice?: string;
  weeksInPeriod: number;
}

const usePayments = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [plansList, setPlansList] = useState<PlanListItem[]>([
    {
      id: 0,
      title: '1 Week',
      duration: 1,
      durationName: 'week',
      description: 'Week',
      pricePerDuration: '$59/wk',
      fullPrice: '$59',
      weeksInPeriod: 1,
    },
    {
      id: 1,
      title: '1 Month',
      duration: 1,
      durationName: 'month',
      description: 'Month',
      pricePerDuration: '$32/wk',
      fullPrice: '$129',
      weeksInPeriod: 4,
    },
    {
      id: 2,
      title: '3 Month',
      duration: 3,
      durationName: 'months',
      description: 'Months',
      pricePerDuration: '$26/wk',
      fullPrice: '$349',
      weeksInPeriod: 13,
    },
  ]);

  const [activePayment, setActivePayment] = useState<PlanListItem>(plansList[0]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [successfulPay, setSuccessfulPay] = useState(false);
  const [visibleUpgradeSuccessful, setVsibleUpgradeSuccessful] = useState(false);
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);

  const currentSubscriptions = useSubscriptions((i: any) => i?.currentSubscriptions);
  const setCurrentSubscriptions = useSubscriptions((i: any) => i?.setCurrentSubscriptions);

  const updateUser = async (subscriptionId: string, expirationDate: string | null) => {
    const user = {uid: '123'};
    if (user) {
      try {
        await firestore().collection(apiUserInfoCollection).doc(user.uid).update({
          accountPremium: true,
          accountConfirmed: true,
          accountReviewed: true,
          activeSubscription: {
            subscriptionId,
            expirationDate,
          },
        });
      } catch (error: any) {
        logErrorToSentry(error);
        console.log('error user premium update', error);
      }
    }
  };

  const pay = async (pack: PurchasesPackage) => {
    setLoaderVisible(true);
    try {
      const {customerInfo} = await Purchases.purchasePackage(pack);

      const activeSubscription = await getActiveSubscription();
      console.warn('activeSubscription', activeSubscription);

      setCurrentSubscriptions(activeSubscription);

      setSuccessfulPay(true);
      setTimeout(() => {
        setLoaderVisible(false);
      }, 1000);

      const subscriptionId = customerInfo.activeSubscriptions[0];
      const expirationDate = customerInfo.allExpirationDates[subscriptionId];

      updateUser(subscriptionId, expirationDate);
    } catch (e) {
      console.error('error pay', e);

      setLoaderVisible(false);
    }
  };

  const getOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
        const offeringsHostSubscription = offerings.all['Host subscription'];
        console.log('offeringsHostSubscription', offeringsHostSubscription);

        if (activePayment.durationName === 'week') {
          const product = offeringsHostSubscription.availablePackages[0];
          pay(product);
        }

        if (activePayment.durationName === 'month') {
          const product = offeringsHostSubscription.availablePackages[2];
          pay(product);
        }

        if (activePayment.durationName === 'months') {
          const product = offeringsHostSubscription.availablePackages[1];
          pay(product);
        }
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const restorePurchases = async () => {
    try {
      const purchaserInfo = await Purchases.restorePurchases();

      console.warn(purchaserInfo);

      if (purchaserInfo?.activeSubscriptions?.length > 0) {
        switch (purchaserInfo?.activeSubscriptions?.[0]) {
          case 'io_59_1w':
            showToast('inviteMatch', 'Weekly subscription restored', 'Restore purchases', {status: 'success'});

            setCurrentSubscriptions({activeSubscriptions: ['io_59_1w']});
            // navigation.navigate('/profile');
            break;
          case 'io_99_1m':
            showToast('inviteMatch', 'Month subscription restored', 'Restore purchases', {status: 'success'});
            setCurrentSubscriptions({activeSubscriptions: ['io_99_1m']});
            // navigation.navigate('/profile');
            break;
          case 'io_29_3m':
            showToast('inviteMatch', 'Monthly subscription restored', 'Restore purchases', {status: 'success'});
            setCurrentSubscriptions({activeSubscriptions: ['io_29_3m']});
            // navigation.navigate('/profile');
            break;
          default:
            break;
        }
        // console.log('purchases restore', purchaserInfo.activeSubscriptions[0]);
      } else {
        showToast('inviteMatch', 'Active subscription not found', 'Restore purchases', {status: 'fail'});
      }
    } catch (e) {
      console.error('error restore purchases', e);
    }
  };

  const getButtonTitle = () => {
    const {duration, durationName, fullPrice, identifier} = activePayment;
    if (currentSubscriptions?.activeSubscriptions?.includes(identifier)) {
      return 'Current Plan';
    }

    const formattedPrice = fullPrice;
    return `Get ${duration} ${durationName} for ${formattedPrice}`;
  };

  const isButtonDisabled = currentSubscriptions?.activeSubscriptions?.includes(activePayment.identifier);
  const buttonTitle = getButtonTitle();

  useEffect(() => {
    getSubscriptions().then(setSubscriptions);
  }, []);

  useEffect(() => {
    if (!subscriptions.length) {
      return;
    }

    const getIdentifier = (offer: any) => {
      let res;
      switch (offer.identifier) {
        case '$rc_weekly':
          res = 'io_59_1w';
          break;
        case '$rc_monthly':
          res = 'io_99_1m';
          break;
        case '$rc_three_month':
          res = 'io_29_3m';
          break;
        default:
          '';
      }
      return res;
    };

    const modifiedSubscriptions = [subscriptions[0], subscriptions[2], subscriptions[1]];

    const products: PlanListItem[] = modifiedSubscriptions.map((offer, idx) => ({
      id: idx,
      identifier: getIdentifier(offer),
      title: plansList[idx].title,
      duration: plansList[idx].duration,
      durationName: plansList[idx].durationName,
      description: plansList[idx].description,
      pricePerDuration:
        getSymbolFromCurrency(offer.product.currencyCode) + (offer.product.price / plansList[idx].weeksInPeriod).toFixed(2) + '/wk',
      priceString: offer.product.priceString,
      fullPrice: offer.product.priceString,
      package: offer,
      weeksInPeriod: plansList[idx].weeksInPeriod,
    }));
    console.log('products', products);

    setPlansList(products);
    setActivePayment(products[0]);
  }, [subscriptions]);

  return {
    plansList,
    activePayment,
    setActivePayment,
    currentSubscriptions,
    loaderVisible,
    successfulPay,
    visibleUpgradeSuccessful,
    isButtonDisabled,
    buttonTitle,
    restorePurchases,
    getOfferings,
  };
};

export default usePayments;

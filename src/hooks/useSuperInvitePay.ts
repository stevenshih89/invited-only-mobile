import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useAppNavigation} from 'hooks/useAppNavigation.tsx';
import {useEffect, useState} from 'react';
import {IOPath} from 'constants/pathLocations.ts';
import Purchases, {PurchasesPackage} from 'react-native-purchases';
import {showToast} from 'helpers/showToast';
import {getSuperInvites} from 'src/api/purchase';
import getSymbolFromCurrency from 'currency-symbol-map';
import {useUser} from 'src/store/userStore';
import {getUserData} from 'helpers/getUserData';
import moment from 'moment';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';

interface PlanListItem {
  id: number;
  quantity: number;
  priceEach: number;
  priceString: string;
  save: number;
  package: PurchasesPackage;
}

export const useSuperInvitePay = () => {
  const navigation = useAppNavigation();
  const [userData, setUserData] = useState({});
  const [plansList, setPlansList] = useState<PlanListItem[]>([
    {
      id: 0,
      quantity: 30,
      priceEach: 2.67,
      save: 51,
    },
    {
      id: 1,
      quantity: 15,
      priceEach: 3.06,
      save: 43,
    },
    {
      id: 2,
      quantity: 5,
      priceEach: 5.18,
      save: 4,
    },
  ]);
  const user = useUser((i: any) => i?.user);
  const [loadingPurchasing, setLoadingPurchasing] = useState(false);
  const [loadingPurchaseList, setLoadingPurchaseList] = useState(true);
  const [purchaseListError, setPurchaseListError] = useState(false);
  const [activePayment, setActivePayment] = useState<PlanListItem>(plansList[1]);

  const updateSuperInvites = async (superInvites: number, price: string) => {
    const user = auth().currentUser;

    if (user) {
      try {
        const {superInvites: superInvitesCurrent, weeklySuperInvites: weeklySuperInvitesCurrent} = userData;
        const {inAppPurchase} = userData;
        await firestore()
          .collection(apiUserInfoCollection)
          .doc(user.uid)
          .update({
            superInvites: firestore.FieldValue.increment(superInvites),
            inAppPurchase: [...(inAppPurchase ?? []), {number: superInvites, purchaseDate: moment().format(), price}],
          });
        handleNext(superInvitesCurrent + weeklySuperInvitesCurrent + superInvites);
      } catch (error: any) {
        setLoadingPurchasing(false);
        showToast('inviteMatch', '', 'Failed to update super invites / joins', 'Error');
        logErrorToSentry(error);
        // console.log('error updateSuperInvites', error);
      }
    }
  };

  const fetchUserData = async () => {
    const currentUser = auth().currentUser;
    if (!currentUser?.uid) {
      return;
    }
    const userInfo = await getUserData(currentUser?.uid);
    setUserData(userInfo);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleNext = async (superInvites: number) => {
    navigation.navigate(IOPath as never);
    setLoadingPurchasing(false);
    showToast(
      'inviteMatch',
      `You have ${superInvites} super ${userData?.accountType === 'host' ? 'Invites' : 'Joins'}`,
      `Let's start ${userData?.accountType === 'host' ? 'invite' : 'join'}!`,
      {ownerPhoto: userData?.photos[0].image, status: 'SUCCESSFUL'},
    );
  };

  const handleCloseModal = () => {
    navigation.goBack();
  };

  const pay = async (pack: PurchasesPackage, superInvites: number, price: string) => {
    try {
      const {customerInfo} = await Purchases.purchasePackage(pack);
      updateSuperInvites(superInvites, price);
      // console.log('pay successful');
    } catch (e) {
      setLoadingPurchasing(false);
      showToast('inviteMatch', '', 'Failed to purchase');
      // console.log('pay error', e);
    }
  };

  const getOfferings = async () => {
    if (!userData?.uid) {
      setLoadingPurchasing(false);
      showToast('inviteMatch', '', "There's been an error");
      return;
    }
    setLoadingPurchasing(true);
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
        const offeringsHostSubscription = offerings.all['Super Invite'];

        if (activePayment.id === 0) {
          const product = offeringsHostSubscription.availablePackages[0];
          pay(product, 30, activePayment.priceString);
        }

        if (activePayment.id === 1) {
          const product = offeringsHostSubscription.availablePackages[1];
          pay(product, 15, activePayment.priceString);
        }

        if (activePayment.id === 2) {
          const product = offeringsHostSubscription.availablePackages[2];
          pay(product, 5, activePayment.priceString);
        }
      }
    } catch (e) {
      setLoadingPurchasing(false);
      showToast('inviteMatch', '', 'Failed to get offerings');
    }
  };

  const fetchSuperInvites = async () => {
    setLoadingPurchaseList(true);
    await getSuperInvites()
      .then(response => {
        if (response?.length) {
          const products = response.map((offer, idx) => ({
            id: idx,
            quantity: plansList[idx].quantity,
            priceEach: getSymbolFromCurrency(offer.product.currencyCode) + (offer.product.price / plansList[idx].quantity).toFixed(2),
            priceString: offer.product.priceString,
            save: plansList[idx].save,
            package: offer,
          }));
          setPlansList(products);
          setActivePayment(products[1]);
          setLoadingPurchaseList(false);
          setPurchaseListError(false);
        } else {
          setLoadingPurchaseList(false);
          setPurchaseListError(true);
          showToast('inviteMatch', '', "Can't find any purchase");
        }
      })
      .catch(() => {
        setLoadingPurchaseList(false);
        setPurchaseListError(true);
        showToast('inviteMatch', '', "Error: Can't find any purchase");
      });
  };

  useEffect(() => {
    fetchSuperInvites();
  }, [userData?.uid]);

  return {
    loadingPurchaseList,
    activePayment,
    setActivePayment,
    user,
    handleCloseModal,
    purchaseListError,
    plansList,
    getOfferings,
    loadingPurchasing,
  };
};

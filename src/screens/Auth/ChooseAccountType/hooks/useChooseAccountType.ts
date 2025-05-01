import {useContext, useEffect, useState} from 'react';

import {AppState} from 'react-native';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {useAuthStore} from 'src/store/authStore';
import {AuthContext} from 'contexts/AuthContext';
import {addBuisnessPath} from 'constants/pathLocations';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';

export const useChooseAccountType = () => {
  const HOST = 'host';
  const GUEST = 'guest';
  const [accountType, setAccountType] = useState<string>(HOST);
  const {userMetadata: user} = useAuthStore();
  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const navigation = useAppNavigation();

  useEffect(() => {
    let subscription: any;

    const handleAppClose = async () => {
      try {
        await firestore()
          .collection('unfinishedRegistrationUsers')
          .doc(user?.uid)
          .set({
            accountType,
            phoneNumber: user?.phoneNumber,
            createdAt: moment().format('YYYY-MM-DD'),
            screen: 'choose-account-type',
          });
        analytics().logEvent('choose_account_type_app_closed', {
          accountType,
          phoneNumber: user?.phoneNumber,
          createdAt: moment().format('YYYY-MM-DD'),
          screen: 'choose-account-type',
        });
      } catch (e) {
        console.error(e);
        logErrorToSentry(e);
      }
    };

    subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        handleAppClose();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleNext = async () => {
    const index = onBoarding.findIndex((item: any) => item.accountType !== undefined);
    console.log(index);

    if (index > -1) {
      const updatedOnBoarding = [...onBoarding];
      updatedOnBoarding[index] = {accountType: accountType};
      setOnBoarding(updatedOnBoarding);
    } else {
      setOnBoarding([...onBoarding, {accountType: accountType}]);
    }
    navigation.navigate('/enter-name');
  };

  const handleGoToBusiness = () => {
    navigation.navigate(addBuisnessPath as never);
  };

  return {accountType, setAccountType, handleNext, handleGoToBusiness, HOST, GUEST};
};

import Purchases from 'react-native-purchases';
import analytics from '@react-native-firebase/analytics';
import {useEffect, useState} from 'react';
import useUser from './user/useUser';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {accountSettingPath, notificationSettingPath} from 'constants/pathLocations';
import {openLink} from 'helpers/links';
import {showToast} from 'helpers/showToast';
import {useSubscriptions} from 'src/store/subscriptionsStore';
import {settingsScreen} from 'constants/analitycs';

export const useSettings = () => {
  const [isVisibleLogoutModal, setIsVisibleLogoutModal] = useState(false);

  const navigation = useAppNavigation();
  const {user} = useUser();
  const setCurrentSubscriptions = useSubscriptions((i: any) => i?.setCurrentSubscriptions);

  useEffect(() => {
    try {
      analytics().logScreenView({
        screen_name: settingsScreen,
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const openLogoutModal = () => {
    setIsVisibleLogoutModal(true);
  };

  const goToAccountSetting = () => {
    const locationState = user?.location;
    // @ts-ignore
    navigation.navigate(accountSettingPath, {params: {locationState: locationState}});
  };

  const goToNotificationSetting = async () => {
    const notificationSettings = user?.notificationSettings;
    // @ts-ignore
    navigation.navigate(notificationSettingPath, {params: {notificationSettings: notificationSettings}});
  };

  const goToTermsOfUse = () => {
    openLink('https://www.invitedonly.app/terms-of-service-eula');
  };

  const goToPrivacyPolicy = () => {
    openLink('https://www.invitedonly.app/privacy-policy');
  };

  const restorePurchases = async () => {
    try {
      const purchaserInfo = await Purchases.restorePurchases();

      console.warn(purchaserInfo);

      if (purchaserInfo.activeSubscriptions.length > 0) {
        switch (purchaserInfo.activeSubscriptions[0]) {
          case 'io_59_1w':
            showToast('basic', 'Weekly subscription restored', 'Restore purchases');

            setCurrentSubscriptions({activeSubscriptions: ['io_59_1w']});
            // navigation.navigate('/profile');
            break;
          case 'io_99_1m':
            showToast('basic', 'Month subscription restored', 'Restore purchases');
            setCurrentSubscriptions({activeSubscriptions: ['io_99_1m']});
            // navigation.navigate('/profile');
            break;
          case 'io_29_3m':
            showToast('basic', 'Monthly subscription restored', 'Restore purchases');
            setCurrentSubscriptions({activeSubscriptions: ['io_29_3m']});
            // navigation.navigate('/profile');
            break;
          default:
            break;
        }
        // console.log('purchases restore', purchaserInfo.activeSubscriptions[0]);
      } else {
        // console.log('purchases not found');
        showToast('basic', 'Active subscription not found', 'Restore purchases');
      }
    } catch (e) {
      // console.error('error restore purchases', e);
    }
  };

  return {
    goToAccountSetting,
    goToNotificationSetting,
    goToTermsOfUse,
    goToPrivacyPolicy,
    restorePurchases,
    openLogoutModal,
    isVisibleLogoutModal,
    setIsVisibleLogoutModal,
  };
};

import {
  blackColor,
  darkRed2Color,
  lightGray5Color,
  lightGray6Color,
  lightRed1Color,
  transparentWhite16Color,
  whiteColor,
} from 'constants/colors';
import {useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LogoutIcon from 'assets/images/icons/logout.svg';
import UserEdit from 'assets/images/icons/user-edit.svg';
import SecurePrivacy from 'assets/images/icons/secure-privacy.svg';
import Notification from 'assets/images/icons/notification.svg';
import LogoutRed from 'assets/images/icons/logout-red.svg';
import Messages from 'assets/images/icons/messages.svg';
import RestorePurchase from 'assets/images/icons/restore-purchase.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import {Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import ModalLogout from './LogoutModal';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {accountSettingPath, contactAndFAQPath, notificationSettingPath} from 'constants/pathLocations';
import {useUser} from '../../../../../store/userStore';
import {openLink} from 'helpers/links';
import {showToast} from 'helpers/showToast';
import Purchases from 'react-native-purchases';
import {useSubscriptions} from 'src/store/subscriptionsStore';

const Settings = () => {
  const [isVisibleLogoutModal, setIsVisibleLogoutModal] = useState(false);

  const navigation = useAppNavigation();
  const user = useUser((i: any) => i?.user);
  const setCurrentSubscriptions = useSubscriptions((i: any) => i?.setCurrentSubscriptions);

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

  const goToContactAndFAQ = () => {
    navigation.navigate(contactAndFAQPath as never);
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
        // console.log('purchases not found');
        showToast('inviteMatch', 'Active subscription not found', 'Restore purchases', {status: 'fail'});
      }
    } catch (e) {
      // console.error('error restore purchases', e);
    }
  };

  const settingsList = [
    {
      id: 0,
      title: 'Account settings',
      icon: UserEdit,
      onPress: goToAccountSetting,
    },
    {
      id: 1,
      title: 'Notification settings',
      icon: Notification,
      onPress: goToNotificationSetting,
    },
    {
      id: 2,
      title: 'Terms of Service / EULA',
      icon: SecurePrivacy,
      onPress: goToTermsOfUse,
    },
    {
      id: 3,
      title: 'Privacy Policy',
      icon: SecurePrivacy,
      onPress: goToPrivacyPolicy,
    },
    {
      id: 4,
      title: 'Contact & FAQ',
      icon: Messages,
      onPress: goToContactAndFAQ,
    },
    {
      id: 4,
      title: 'Restore purchase',
      icon: RestorePurchase,
      onPress: restorePurchases,
    },
    {
      id: 5,
      title: 'Log out',
      icon: LogoutIcon,
      onPress: openLogoutModal,
    },
  ];

  return (
    <>
      <View style={{backgroundColor: blackColor, flex: 1, paddingHorizontal: 20}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 20, paddingBottom: 50}}
          style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
          <FlatList
            data={settingsList}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{height: 24}} />}
            renderItem={({item}) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  onPress={item.onPress}
                  activeOpacity={0.7}
                  style={{padding: 20, backgroundColor: lightGray5Color, borderRadius: 10}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {Icon && <View
                        style={{
                          width: 32,
                          height: 32,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: blackColor,
                          borderRadius: 100,
                        }}>
                        {item?.title !== 'Log out' ? <Icon width={16} height={16} /> : <LogoutRed width={16} height={16} />}
                      </View>}
                      <Text
                        style={{
                          color: item?.title === 'Log out' ? '#CE2626' : whiteColor,
                          marginLeft: 10,
                          fontFamily: Satoshi500,
                          fontSize: RFValue(18, 812),
                        }}>
                        {item.title}
                      </Text>
                    </View>
                    {item.title !== 'Log out' && <ArrowRight />}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>
      <ModalLogout isVisible={isVisibleLogoutModal} onClose={() => setIsVisibleLogoutModal(false)} />
    </>
  );
};

export default Settings;

import React, {FC, useEffect} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from 'src';
import 'react-native-gesture-handler';
import {blackColor} from 'constants/colors';
import Purchases, {CustomerInfo} from 'react-native-purchases';
import {NavigationContainer} from '@react-navigation/native';
import {useSubscriptions} from 'src/store/subscriptionsStore';
import {getActiveSubscription} from 'src/api/purchase';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNUxcam from 'react-native-ux-cam';
import {requestTrackingPermission} from 'react-native-tracking-transparency';
import {Settings} from 'react-native-fbsdk-next';
import moment from 'moment';
import Config from 'react-native-config';
import Bugsnag from '@bugsnag/react-native';

RNUxcam.optIntoSchematicRecordings();
const configuration = {
  userAppKey: Config.RN_UXCAM_API_KEY || '',
  enableAutomaticScreenNameTagging: false,
  enableAdvancedGestureRecognition: true,
  enableImprovedScreenCapture: true,
  occlusions: [],
};
RNUxcam.startWithConfiguration(configuration);

Bugsnag.start();

const App: FC = (): JSX.Element => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const IO_PUBLICK_RC_IOS = Config.IO_PUBLICK_RC_IOS || '';

  const setCurrentSubscriptions = useSubscriptions((i: any) => i?.setCurrentSubscriptions);

  const handleUpdateUserSubscriptions = async (activeSubscription: CustomerInfo | null) => {
    try {
      const currentUser = auth().currentUser;

      if (!currentUser?.uid) {
        return;
      }

      const userQuery = await firestore().collection(apiUserInfoCollection).doc(currentUser?.uid).get();
      if (!userQuery.exists) {
        return;
      }
      const userData = userQuery.data();

      if (!userData) {
        return;
      }

      const userDataSubscriptionExpirationDate = userData?.activeSubscription?.expirationDate;
      const userDataSubscriptionId = userData?.activeSubscription?.subscriptionId;
      const serverSubscriptionId = activeSubscription?.activeSubscriptions?.[0];
      const serverSubscriptionExpirationDate = activeSubscription?.allExpirationDates?.[serverSubscriptionId || ''];

      let newExpirationDate = '';
      let newSubscriptionId = '';

      const currentDate = moment().toDate();
      let isExpiredSubscription = true;

      if (userDataSubscriptionExpirationDate) {
        if (moment(userDataSubscriptionExpirationDate).isAfter(currentDate)) {
          newExpirationDate = userDataSubscriptionExpirationDate;
          newSubscriptionId = userDataSubscriptionId;
          isExpiredSubscription = false;
        } else if (
          serverSubscriptionExpirationDate &&
          serverSubscriptionId &&
          moment(serverSubscriptionExpirationDate).isAfter(currentDate)
        ) {
          newExpirationDate = serverSubscriptionExpirationDate;
          newSubscriptionId = serverSubscriptionId;
          isExpiredSubscription = false;
        }
      } else if (
        serverSubscriptionExpirationDate &&
        serverSubscriptionId &&
        moment(serverSubscriptionExpirationDate).isAfter(currentDate)
      ) {
        newExpirationDate = serverSubscriptionExpirationDate;
        newSubscriptionId = serverSubscriptionId;
        isExpiredSubscription = false;
      }

      await firestore()
        .collection(apiUserInfoCollection)
        .doc(currentUser?.uid)
        .update({
          accountPremium: !isExpiredSubscription,
          activeSubscription: {
            subscriptionId: newSubscriptionId || '',
            expirationDate: newExpirationDate || '',
          },
        });
    } catch (e) {
      console.error('handleUpdateUserSubscriptions:error ', e);
    }
  };

  const initializeTracking = async () => {
    const start = new Date().getTime();
    const trackingStatus = await requestTrackingPermission();
    if (trackingStatus === 'authorized') {
      Settings.setAdvertiserTrackingEnabled(true);
    } else {
      Settings.setAdvertiserTrackingEnabled(false);
    }
    const end = new Date().getTime();
    console.warn('initializeTracking', end - start);
  };

  useEffect(() => {
    initializeTracking();
    if (Platform.OS === 'ios' && IO_PUBLICK_RC_IOS) {
      Purchases.configure({apiKey: IO_PUBLICK_RC_IOS, usesStoreKit2IfAvailable: false});
    }

    const getSubscription = async () => {
      const start = new Date().getTime();
      const activeSubscription = await getActiveSubscription();
      await handleUpdateUserSubscriptions(activeSubscription);
      setCurrentSubscriptions(activeSubscription);
      const end = new Date().getTime();
      console.warn('getSubscription', end - start);
    };
    getSubscription();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar />
        <View style={{flex: 1, backgroundColor: blackColor}}>
          <Main />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

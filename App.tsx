import React, {FC, useEffect} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from 'src';
import 'react-native-gesture-handler';
import {blackColor} from 'constants/colors';
import Purchases from 'react-native-purchases';
import {NavigationContainer} from '@react-navigation/native';
import {useSubscriptions} from 'src/store/subscriptionsStore';
import {getActiveSubscription} from 'src/api/purchase';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNUxcam from 'react-native-ux-cam';
import {requestTrackingPermission} from 'react-native-tracking-transparency';
import {Settings} from 'react-native-fbsdk-next';

RNUxcam.optIntoSchematicRecordings();
const configuration = {
  userAppKey: 'lgyhu6m9a8cwsgy',
  enableAutomaticScreenNameTagging: false,
  enableAdvancedGestureRecognition: true,
  enableImprovedScreenCapture: true,
  occlusions: [],
};
RNUxcam.startWithConfiguration(configuration);

const App: FC = (): JSX.Element => {
  const IO_PUBLICK_RC_IOS = 'appl_zMgrNWXsDMnWsICHMLKNhAKHebg';

  const setCurrentSubscriptions = useSubscriptions((i: any) => i?.setCurrentSubscriptions);

  const handleUpdateUserSubscriptions = async (activeSubscription: any[]) => {
    try {
      const currentUser = auth().currentUser;
      console.warn('currentUser', currentUser);

      if (!currentUser?.uid) {
        return;
      }

      const isPremium =
        activeSubscription?.includes('io_59_1w') || activeSubscription?.includes('io_29_3m') || activeSubscription?.includes('io_99_1m');
      await firestore().collection('userInfo').doc(currentUser?.uid).update({
        accountPremium: isPremium,
      });
    } catch (e) {
      console.error('handleUpdateUserSubscriptions:error ', e);
    }
  };
  const initializeTracking = async () => {
    const trackingStatus = await requestTrackingPermission();
    if (trackingStatus === 'authorized') {
      Settings.setAdvertiserTrackingEnabled(true);
    } else {
      Settings.setAdvertiserTrackingEnabled(false);
    }
  };

  useEffect(() => {
    initializeTracking();
    if (Platform.OS === 'ios') {
      if (IO_PUBLICK_RC_IOS) {
        Purchases.configure({apiKey: IO_PUBLICK_RC_IOS, usesStoreKit2IfAvailable: false});
      }
    }

    const getSubscription = async () => {
      const activeSubscription = await getActiveSubscription();
      await handleUpdateUserSubscriptions(activeSubscription.activeSubscriptions);
      setCurrentSubscriptions(activeSubscription);
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

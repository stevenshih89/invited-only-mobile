import React, { FC, JSX, useEffect } from 'react';
import { I18nManager, Platform, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import Purchases from 'react-native-purchases';
import { NavigationContainer } from '@react-navigation/native';
import RNUxcam from 'react-native-ux-cam';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { Settings } from 'react-native-fbsdk-next';
import * as amplitude from '@amplitude/analytics-react-native';


import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { blackColor } from 'constants/colors';

import Main from 'src';
import { RN_UXCAM_API_KEY, IO_PUBLICK_RC_IOS, AMPLITUDE_API_KEY } from '@env';

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);


RNUxcam.optIntoSchematicRecordings();
const configuration = {
  userAppKey: RN_UXCAM_API_KEY || '',
  enableAutomaticScreenNameTagging: false,
  enableAdvancedGestureRecognition: true,
  enableImprovedScreenCapture: true,
  occlusions: [],
};
RNUxcam.startWithConfiguration(configuration);

amplitude.init(AMPLITUDE_API_KEY);

const App: FC = (): JSX.Element => {
  const iosPurchaseKey = IO_PUBLICK_RC_IOS || '';


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
    if (Platform.OS === 'ios' && iosPurchaseKey) {
      Purchases.configure({ apiKey: iosPurchaseKey, });
    }
  }, []);


  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <NavigationContainer
          theme={{
            dark: true, colors: {
              background: blackColor,
              primary: 'black',
              card: 'black',
              text: 'white',
              border: 'black',
              notification: 'black'
            }, fonts: { regular: { fontFamily: 'Inter-Regular', fontWeight: '400' }, medium: { fontFamily: 'Inter-Medium', fontWeight: '500' }, bold: { fontFamily: 'Inter-Bold', fontWeight: '700' }, heavy: { fontFamily: 'Inter-Heavy', fontWeight: '900' } }
          }}>
          <StatusBar />
          <View style={{ flex: 1, backgroundColor: blackColor }}>
            <Main />
          </View>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </SafeAreaProvider>

  );
};

export default App;

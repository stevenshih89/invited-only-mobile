import React, { FC, JSX, useEffect } from 'react';
import { I18nManager, Platform, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import Purchases from 'react-native-purchases';
import { NavigationContainer } from '@react-navigation/native';
import RNUxcam from 'react-native-ux-cam';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { Settings } from 'react-native-fbsdk-next';
import Config from 'react-native-config';
import Bugsnag from '@bugsnag/react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { blackColor } from 'constants/colors';

import Main from 'src';

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);


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
  const IO_PUBLICK_RC_IOS = Config.IO_PUBLICK_RC_IOS || '';


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
      Purchases.configure({ apiKey: IO_PUBLICK_RC_IOS, });
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

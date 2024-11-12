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
import RNUxcam from 'react-native-ux-cam';

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

  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (IO_PUBLICK_RC_IOS) {
        Purchases.configure({apiKey: IO_PUBLICK_RC_IOS, usesStoreKit2IfAvailable: false});
      }
    }

    const getSubscription = async () => {
      const activeSubscription = await getActiveSubscription();
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

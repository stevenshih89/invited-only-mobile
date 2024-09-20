import React, {FC, useEffect} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from 'src';
import 'react-native-gesture-handler';
import {black1Color} from 'constants/colors';
import Purchases from 'react-native-purchases';
import {NavigationContainer} from '@react-navigation/native';
import { useSubscriptions } from 'src/store/subscriptionsStore';

const App: FC = (): JSX.Element => {
  const IO_PUBLICK_RC_IOS = 'appl_zMgrNWXsDMnWsICHMLKNhAKHebg';

  const setCurrentSubscriptions = useSubscriptions((i: any) => i?.setCurrentSubscriptions);

  const getActiveSubscription = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
  
      const activeSubscriptions = customerInfo.activeSubscriptions;
      
      if (activeSubscriptions.length > 0) {
        return activeSubscriptions[0]; 
      } else {
        return {activeSubscriptions: []};
      }
    } catch (error) {
      console.log('error get subs', error);
      return {activeSubscriptions: []};
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (IO_PUBLICK_RC_IOS) {
        Purchases.configure({apiKey: IO_PUBLICK_RC_IOS, usesStoreKit2IfAvailable: false});
      }
    }

    const getSubs = async () => {
      const activeSubscription = await getActiveSubscription()
      setCurrentSubscriptions(activeSubscription)
    }
    getSubs()
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar />
        <View style={{flex: 1, backgroundColor: black1Color}}>
          <Main />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

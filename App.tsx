import {FC, useEffect} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from 'src';
import 'react-native-gesture-handler';
import {black1Color} from 'constants/colors';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { IO_PUBLICK_RC_IOS } from '@env';

const App: FC = (): JSX.Element => {

  useEffect(() => {
    if (Platform.OS === 'ios') {
      if(IO_PUBLICK_RC_IOS) { 
      Purchases.configure({apiKey: IO_PUBLICK_RC_IOS});
    }
    } else if (Platform.OS === 'android') {

    }
  },[])

  return (
    <SafeAreaProvider>
      <StatusBar />
      <View
        style={{
          flex: 1,
          backgroundColor: black1Color,
        }}>
        <Main />
      </View>
    </SafeAreaProvider>
  );
};

export default App;

import {FC, useEffect} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from 'src';
import 'react-native-gesture-handler';
import {black1Color} from 'constants/colors';
import Purchases from 'react-native-purchases';

const App: FC = (): JSX.Element => {
  const IO_PUBLICK_RC_IOS = 'appl_zMgrNWXsDMnWsICHMLKNhAKHebg';
  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (IO_PUBLICK_RC_IOS) {
        Purchases.configure({apiKey: IO_PUBLICK_RC_IOS, usesStoreKit2IfAvailable: false});
      }
    } else if (Platform.OS === 'android') {
    }
  }, []);

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

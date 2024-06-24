import {FC} from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from 'src';
import 'react-native-gesture-handler';
import {black1Color} from 'constants/colors';

const App: FC = (): JSX.Element => {
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

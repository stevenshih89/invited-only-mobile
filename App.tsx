import type {FC} from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from 'src';

const App: FC = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>
        <Main />
      </View>
    </SafeAreaProvider>
  );
};

export default App;

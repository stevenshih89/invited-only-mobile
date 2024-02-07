import type {FC} from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Onboard from 'screens/Auth/Onboard';

const App: FC = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <View
        style={{
          flex: 1,
        }}>
        <Onboard />
      </View>
    </SafeAreaProvider>
  );
};

export default App;

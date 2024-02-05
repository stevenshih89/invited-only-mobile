import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <View style={{flex: 1}} />
    </SafeAreaProvider>
  );
};

export default App;

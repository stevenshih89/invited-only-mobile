import AuthStackScreens from 'navigator/AuthStackScreens';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Main = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <SafeAreaProvider>
        <AuthStackScreens />
      </SafeAreaProvider>
    </View>
  );
};
export default Main;

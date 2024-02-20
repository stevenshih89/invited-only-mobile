import {useContext} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

//import components
import {AuthProvider, AuthContext} from './contexts/AuthContext.tsx';
import AuthStackScreens from 'navigator/AuthStackScreens';
import AppStackScreens from 'navigator/AppStackScreens.tsx';

const Main = () => {
  const {user} = useContext(AuthContext);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <AuthProvider>
          <NavigationContainer>
            <SafeAreaProvider>{user ? <AppStackScreens /> : <AuthStackScreens />}</SafeAreaProvider>
          </NavigationContainer>
        </AuthProvider>
      </View>
    </GestureHandlerRootView>
  );
};
export default Main;

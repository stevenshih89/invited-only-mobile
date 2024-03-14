import {useContext, useState, useEffect} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

//import components
import {AuthProvider, AuthContext} from 'contexts/AuthContext.tsx';
import AuthStackScreens from 'navigator/AuthStackScreens/AuthStackScreens.tsx';
import AppStackScreens from 'navigator/AppStackScreens/AppStackScreens.tsx';
import LocalNotification from 'components/LocalNotification/LocalNotification.tsx';

const Main = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [authState, setAuthState] = useState(false);
  const {user, setUser} = useContext(AuthContext);

  function onAuthStateChanged(user: any) {
    setUser(user);
    setAuthState(!!user);
    if (initializing) {
      setInitializing(false);
      setUser(user);
      setAuthState(!!user);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [initializing, user]);

  if (initializing) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <AuthProvider>
          <NavigationContainer>
            <SafeAreaProvider>{authState ? <AppStackScreens /> : <AuthStackScreens />}</SafeAreaProvider>
          </NavigationContainer>
          <LocalNotification />
        </AuthProvider>
      </View>
    </GestureHandlerRootView>
  );
};
export default Main;

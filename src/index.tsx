import {useContext, useState, useEffect} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import components
import {AuthProvider, AuthContext} from 'contexts/AuthContext.tsx';
import AuthStackScreens from 'navigator/AuthStackScreens/AuthStackScreens.tsx';
import AppStackScreens from 'navigator/AppStackScreens/AppStackScreens.tsx';
import LocalNotification from 'components/LocalNotification/LocalNotification.tsx';
import {EventProvider} from 'contexts/EventContext';

const Main = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [authState, setAuthState] = useState(false);
  const [onBoardingState, setOnboarding] = useState(false);
  const {onBoarding, user, setUser} = useContext(AuthContext);

  const onAuthStateChanged = async (user: any) => {
    setUser([user?._user?.uid]);
    await AsyncStorage.setItem('uid', `${user?._user?.uid}`);
    setAuthState(!!user);
    await getOnbordingState();
    if (initializing) {
      setUser([`${user?._user?.uid}`]);
      setInitializing(false);
      setAuthState(!!user);
    }
  };

  const getOnbordingState = async () => {
    const onbording = await AsyncStorage.getItem('onBoarding');
    onbording ? setOnboarding(true) : setOnboarding(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getOnbordingState();
    return subscriber;
  }, [initializing, user, onBoarding, onBoardingState, setUser]);

  if (initializing) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <AuthProvider>
          <EventProvider>
            <NavigationContainer>
              <SafeAreaProvider>{true ? <AppStackScreens /> : <AuthStackScreens />}</SafeAreaProvider>
            </NavigationContainer>
            <LocalNotification />
          </EventProvider>
        </AuthProvider>
      </View>
    </GestureHandlerRootView>
  );
};
export default Main;

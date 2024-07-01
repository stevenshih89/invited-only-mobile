import {useContext, useState, useEffect} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

//import components
import {AuthProvider, AuthContext} from 'contexts/AuthContext.tsx';
import AuthStackScreens from 'navigator/AuthStackScreens/AuthStackScreens.tsx';
import AppStackScreens from 'navigator/AppStackScreens/AppStackScreens.tsx';
import LocalNotification from 'components/LocalNotification/LocalNotification.tsx';
import {getFcmToken, registerListenerWithFCM} from 'helpers/fcmHelper.ts';
import {EventProvider} from 'contexts/EventContext';
import {EventsDateProvider} from 'contexts/EventsDate';
import {useUser} from './store/userStore';
import SplashScreen from 'react-native-splash-screen';

const Main = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [authState, setAuthState] = useState(false);
  const {user, setUser} = useContext(AuthContext);

  const setUserData = useUser((i: any) => i?.setUser);
  const onBoarding = useUser((i: any) => i?.onBoarding);
  const setOnBoarding = useUser((i: any) => i?.setOnBoarding);

  const onAuthStateChanged = async (userState: any) => {
    const uid = userState?._user?.uid;
    setUser([uid]);
    await AsyncStorage.setItem('uid', `${uid}`);
    await getOnbordingState();
    const userData = await firestore().collection('userInfo').doc(uid).get();
    if (userData.exists) {
      console.warn('user', userData.data());
      setAuthState(!!userState);
      setUserData(userData.data());
    }
    if (initializing) {
      setUser([`${uid}`]);
      setInitializing(false);
    }
  };

  const getOnbordingState = async () => {
    const onbording = await AsyncStorage.getItem('onBoarding');
    onbording ? setOnBoarding(true) : setOnBoarding(false);
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getOnbordingState();
    getFcmToken();
    registerListenerWithFCM();
    return subscriber;
  }, [initializing, user, onBoarding, setUser]);

  if (initializing) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <AuthProvider>
          <EventProvider>
            <EventsDateProvider>
              <NavigationContainer>
                <SafeAreaProvider>{authState ? <AppStackScreens /> : <AuthStackScreens />}</SafeAreaProvider>
              </NavigationContainer>
              <LocalNotification />
            </EventsDateProvider>
          </EventProvider>
        </AuthProvider>
      </View>
    </GestureHandlerRootView>
  );
};
export default Main;

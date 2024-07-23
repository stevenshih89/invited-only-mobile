import AuthStackScreens from 'navigator/AuthStackScreens/AuthStackScreens';
import AppStackScreens from 'navigator/AppStackScreens/AppStackScreens.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from './store/userStore';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from 'contexts/AuthContext';
import SplashScreen from 'react-native-splash-screen';
import {getFcmToken, registerListenerWithFCM} from 'helpers/fcmHelper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';

const Navigator = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [authState, setAuthState] = useState(false);
  const {user, setUser} = useContext(AuthContext);

  const setUserData = useUser((i: any) => i?.setUser);
  const userData = useUser((i: any) => i?.user);
  const onBoarding = useUser((i: any) => i?.onBoarding);
  const setOnBoarding = useUser((i: any) => i?.setOnBoarding);

  const onAuthStateChanged = async (userState: any) => {
    if (!userState) {
      setAuthState(false);
    }
    const uid = userState?._user?.uid;
    await AsyncStorage.setItem('uid', `${uid}`);
    await getOnbordingState();
    const userDataInfo = await firestore().collection('userInfo').doc(uid).get();

    if (userDataInfo.exists) {
      console.warn('user', userDataInfo.data());
      setAuthState(!!userState);
      setUserData(userDataInfo.data());
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
    if (!initializing) {
      SplashScreen.hide();
    }
  }, [initializing]);

  useEffect(() => {
    const subcriber = auth().onAuthStateChanged(onAuthStateChanged);
    getOnbordingState();
    getFcmToken();
    registerListenerWithFCM();

    if (userData?.id) {
      setAuthState(true);
    }
    return () => subcriber();
  }, [initializing, user, onBoarding, setUser]);

  if (initializing) {
    return null;
  }

  return <NavigationContainer>{authState ? <AppStackScreens /> : <AuthStackScreens />}</NavigationContainer>;
};

export default Navigator;

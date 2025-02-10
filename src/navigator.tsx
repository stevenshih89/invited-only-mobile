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
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';

const Navigator = () => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const apiAdminChatsCollection = Config.API_ADMIN_CHATS_COLLECTION || 'adminChats';
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
    const start = new Date().getTime();
    const uid = userState?._user?.uid;
    await AsyncStorage.setItem('uid', `${uid}`);
    await getOnbordingState();
    const userDataInfo = await firestore().collection(apiUserInfoCollection).doc(uid).get();
    const end = new Date().getTime();
    console.warn('onAuthStateChanged', end - start);

    if (userDataInfo.exists) {
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
    if (!initializing && userData?.uid) {
      SplashScreen.hide();
    }
  }, [initializing, userData?.uid]);

  useEffect(() => {
    messaging().onMessage(async () => {});
  }, []);

  const handleAddChatWithAdmin = async () => {
    const isAdmin = userData?.isInvitedOnlyAdmin;

    if (!isAdmin && userData?.uid) {
      try {
        const chatQuery = await firestore().collection(apiAdminChatsCollection).doc(userData?.uid).get();
        if (!chatQuery.exists) {
          await firestore().collection(apiAdminChatsCollection).doc(userData?.uid).set({
            uid: userData?.uid,
            lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
            lastSeenUserTimestamp: firestore.FieldValue.serverTimestamp(),
            lastSeenAdminTimestamp: firestore.FieldValue.serverTimestamp(),
          });
        } else if (chatQuery.exists) {
          const data = chatQuery.data();
          if (!data?.lastMessageTimestamp && !data?.uid) {
            await firestore().collection(apiAdminChatsCollection).doc(userData?.uid).set({
              uid: userData?.uid,
              lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
              lastSeenUserTimestamp: firestore.FieldValue.serverTimestamp(),
              lastSeenAdminTimestamp: firestore.FieldValue.serverTimestamp(),
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    handleAddChatWithAdmin();
  }, [userData?.uid]);

  useEffect(() => {
    const subcriber = auth().onAuthStateChanged(onAuthStateChanged);
    getOnbordingState();
    if (authState) {
      getFcmToken();
      registerListenerWithFCM();
    }

    if (userData?.id) {
      setAuthState(true);
    }
    return () => {
      subcriber();
    };
  }, [initializing, user, onBoarding, setUser]);

  if (initializing) {
    return null;
  }

  return authState ? <AppStackScreens /> : <AuthStackScreens />;
};

export default Navigator;

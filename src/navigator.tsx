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
import UnderMaintenance from 'screens/App/UnderMaintenance/UnderMaintenance';
import useMaintenanceState from 'hooks/useMaintenanceState';
import UpdateAvailable from 'screens/App/UpdateAvailableScreen/UpdateAvailableScreen';
import useVersionStateUpdate from 'hooks/useVersionUpdate/useVersionUpdate';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';

const Navigator = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [authState, setAuthState] = useState(false);
  const {user, setUser} = useContext(AuthContext);
  const {userInfo: apiUserInfoCollection, adminChats} = useContext(FirebaseCollectionsContext);
  const setUserData = useUser((i: any) => i?.setUser);
  const userData = useUser((i: any) => i?.user);
  const onBoarding = useUser((i: any) => i?.onBoarding);
  const setOnBoarding = useUser((i: any) => i?.setOnBoarding);
  const {maintenanceData} = useMaintenanceState();
  const {versionData} = useVersionStateUpdate();

  const onAuthStateChanged = async (userState: any) => {
    try {
      if (!userState) {
        setAuthState(false);
      }
      const uid = userState?._user?.uid;

      await AsyncStorage.setItem('uid', `${uid}`);
      await getOnbordingState();
      const userDataInfo = await firestore().collection(apiUserInfoCollection).doc(uid).get();
      console.log(userDataInfo);

      if (userDataInfo.exists) {
        setAuthState(!!userState);
        setUserData(userDataInfo.data());
      }
      if (initializing) {
        console.log(initializing);

        setUser([`${uid}`]);
        setInitializing(false);
      }
    } catch (error) {
      logErrorToSentry(error);
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
    handleAddChatWithAdmin();
  }, [userData?.uid]);

  useEffect(() => {
    messaging().onMessage(async () => {});
  }, []);

  const handleAddChatWithAdmin = async () => {
    const isAdmin = userData?.isInvitedOnlyAdmin;

    if (!isAdmin && userData?.uid) {
      try {
        const chatQuery = await firestore().collection(adminChats).doc(userData?.uid).get();
        if (!chatQuery.exists) {
          await firestore().collection(adminChats).doc(userData?.uid).set({
            uid: userData?.uid,
            lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
            lastSeenUserTimestamp: firestore.FieldValue.serverTimestamp(),
            lastSeenAdminTimestamp: firestore.FieldValue.serverTimestamp(),
          });
        } else if (chatQuery.exists) {
          const data = chatQuery.data();
          if (!data?.lastMessageTimestamp && !data?.uid) {
            await firestore().collection(adminChats).doc(userData?.uid).set({
              uid: userData?.uid,
              lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
              lastSeenUserTimestamp: firestore.FieldValue.serverTimestamp(),
              lastSeenAdminTimestamp: firestore.FieldValue.serverTimestamp(),
            });
          }
        }
      } catch (error) {
        console.error(error);
        logErrorToSentry(error);
      }
    }
  };
  useEffect(() => {
    if (authState) {
      getFcmToken({apiUserInfoCollection: apiUserInfoCollection});
      registerListenerWithFCM();
    }
  }, [authState]);

  useEffect(() => {
    const subcriber = auth().onAuthStateChanged(onAuthStateChanged);

    return () => {
      subcriber();
    };
  }, [onBoarding, user]);

  if (initializing) {
    return null;
  }

  if (versionData?.showUpdateAvailable) {
    return <UpdateAvailable data={versionData} />;
  }

  if (maintenanceData?.isMaintenance) {
    return <UnderMaintenance data={maintenanceData} />;
  }

  return authState ? <AppStackScreens /> : <AuthStackScreens />;
};

export default Navigator;

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
import UnderMaintenance from 'screens/App/UnderMaintenance/UnderMaintenance';
import DeviceInfo from 'react-native-device-info';
import UpdateAvailable from 'screens/App/UpdateAvailableScreen/UpdateAvailableScreen';

const Navigator = () => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const apiAdminChatsCollection = Config.API_ADMIN_CHATS_COLLECTION || 'adminChats';
  const apiAppSettingsCollection = Config.APP_SETTINGS_COLLECTION || 'appSettings';
  const appStoreAppId = Config.APP_STORE_APP_ID || '';
  const [initializing, setInitializing] = useState<boolean>(true);
  const [authState, setAuthState] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState<{
    isMaintenance: boolean;
    approximatelyTime: string | null;
  }>({
    isMaintenance: false,
    approximatelyTime: null,
  });
  const [versionData, setVersionData] = useState<{
    lastAvailableBuild?: string;
    lastAvailableVersion?: string;
    showUpdateAvailable?: boolean;
  }>({
    lastAvailableBuild: '',
    lastAvailableVersion: '',
    showUpdateAvailable: false,
  });
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
    if (!initializing) {
      SplashScreen.hide();
    }
  }, [initializing]);

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

  const handleCheckMaintenance = async () => {
    const maintenanceQuery = await firestore().collection(apiAppSettingsCollection).doc('maintenance').get();
    if (maintenanceQuery.exists) {
      const data = maintenanceQuery.data() as {
        isMaintenance: boolean;
        approximatelyTime: string | null;
      };
      if (data?.isMaintenance) {
        setMaintenanceData(data);
      }
    }
  };

  const checkAppStoreVersion = async () => {
    if (!appStoreAppId) {
      return;
    }
    const appVersion = DeviceInfo.getVersion();

    try {
      const response = await fetch(`https://itunes.apple.com/lookup?id=${appStoreAppId}`);
      const data = await response.json();

      if (data.results.length > 0) {
        const latestVersion = data.results[0].version;

        if (latestVersion !== appVersion) {
          setVersionData({lastAvailableVersion: latestVersion, showUpdateAvailable: true});
        }
      }
    } catch (error) {
      console.error('Error checking for new version:', error);
    }
  };

  const handleCheckAppVersion = async () => {
    const appVersion = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();
    const versionQuery = await firestore().collection(apiAppSettingsCollection).doc('version').get();
    if (versionQuery.exists) {
      const data = versionQuery.data() as {
        lastAvailableBuild: string;
        lastAvailableVersion: string;
      };
      if (data?.lastAvailableBuild && data?.lastAvailableVersion) {
        if (appVersion !== data?.lastAvailableVersion || buildNumber !== data?.lastAvailableBuild) {
          setVersionData({...data, showUpdateAvailable: true});
        }
      }
    }
  };

  useEffect(() => {
    handleAddChatWithAdmin();
    if (apiUserInfoCollection === 'devUserInfo') {
      handleCheckAppVersion();
    } else {
      checkAppStoreVersion();
    }
    handleCheckMaintenance();
  }, [userData?.uid]);

  useEffect(() => {
    if (authState) {
      getFcmToken();
      registerListenerWithFCM();
    }
  }, [authState]);

  useEffect(() => {
    const subcriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subcriber();
    };
  }, [onBoarding]);

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

// import AuthStackScreens from 'navigator/AuthStackScreens/AuthStackScreens';
// import AppStackScreens from 'navigator/AppStackScreens/AppStackScreens.tsx';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useUser} from './store/userStore';
// import {useContext, useEffect, useState} from 'react';
// import {AuthContext} from 'contexts/AuthContext';
// import SplashScreen from 'react-native-splash-screen';
// import {getFcmToken, registerListenerWithFCM} from 'helpers/fcmHelper';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import messaging from '@react-native-firebase/messaging';
// import Config from 'react-native-config';
// import UnderMaintenance from 'screens/App/UnderMaintenance/UnderMaintenance';
// import DeviceInfo from 'react-native-device-info';
// import UpdateAvailable from 'screens/App/UpdateAvailableScreen/UpdateAvailableScreen';

// const Navigator = () => {
//   const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
//   const apiAdminChatsCollection = Config.API_ADMIN_CHATS_COLLECTION || 'adminChats';
//   const apiAppSettingsCollection = Config.APP_SETTINGS_COLLECTION || 'appSettings';
//   const appStoreAppId = Config.APP_STORE_APP_ID || '';
//   const [initializing, setInitializing] = useState<boolean>(true);
//   const [authState, setAuthState] = useState(false);
//   const [maintenanceData, setMaintenanceData] = useState<{
//     isMaintenance: boolean;
//     approximatelyTime: string | null;
//   }>({
//     isMaintenance: false,
//     approximatelyTime: null,
//   });
//   const [versionData, setVersionData] = useState<{
//     lastAvailableBuild?: string;
//     lastAvailableVersion?: string;
//     showUpdateAvailable?: boolean;
//   }>({
//     lastAvailableBuild: '',
//     lastAvailableVersion: '',
//     showUpdateAvailable: false,
//   });
//   const {setUser} = useContext(AuthContext);

//   const {setUser: setUserData, user: userData, onBoarding} = useUser();

//   const onAuthStateChanged = async (userState: any) => {
//     console.warn('userState', userState);

//     if (!userState) {
//       setAuthState(false);
//     }
//     const start = new Date().getTime();
//     const uid = userState?._user?.uid;
//     await AsyncStorage.setItem('uid', `${uid}`);
//     const userDataInfo = await firestore().collection(apiUserInfoCollection).doc(uid).get();
//     const end = new Date().getTime();
//     console.warn('onAuthStateChanged', end - start);

//     if (userDataInfo.exists) {
//       setAuthState(!!userState);
//       setUserData(userDataInfo.data());
//     }
//     if (initializing) {
//       setUser([`${uid}`]);
//       setInitializing(false);
//     }
//   };

//   useEffect(() => {
//     if (!initializing) {
//       SplashScreen.hide();
//     }
//   }, [initializing]);

//   useEffect(() => {
//     messaging().onMessage(async () => {});
//   }, []);

//   const handleAddChatWithAdmin = async () => {
//     const isAdmin = userData?.isInvitedOnlyAdmin;

//     if (!isAdmin && userData?.uid) {
//       try {
//         const chatQuery = await firestore().collection(apiAdminChatsCollection).doc(userData?.uid).get();
//         if (!chatQuery.exists) {
//           await firestore().collection(apiAdminChatsCollection).doc(userData?.uid).set({
//             uid: userData?.uid,
//             lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
//             lastSeenUserTimestamp: firestore.FieldValue.serverTimestamp(),
//             lastSeenAdminTimestamp: firestore.FieldValue.serverTimestamp(),
//           });
//         } else if (chatQuery.exists) {
//           const data = chatQuery.data();
//           if (!data?.lastMessageTimestamp && !data?.uid) {
//             await firestore().collection(apiAdminChatsCollection).doc(userData?.uid).set({
//               uid: userData?.uid,
//               lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
//               lastSeenUserTimestamp: firestore.FieldValue.serverTimestamp(),
//               lastSeenAdminTimestamp: firestore.FieldValue.serverTimestamp(),
//             });
//           }
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const handleCheckMaintenance = async () => {
//     const maintenanceQuery = await firestore().collection(apiAppSettingsCollection).doc('maintenance').get();
//     if (maintenanceQuery.exists) {
//       const data = maintenanceQuery.data() as {
//         isMaintenance: boolean;
//         approximatelyTime: string | null;
//       };
//       if (data?.isMaintenance) {
//         setMaintenanceData(data);
//       }
//     }
//   };

//   const checkAppStoreVersion = async () => {
//     if (!appStoreAppId || !userData?.uid) {
//       return;
//     }
//     const appVersion = DeviceInfo.getVersion();

//     try {
//       const response = await fetch(`https://itunes.apple.com/lookup?id=${appStoreAppId}`);
//       const data = await response.json();

//       if (data.results.length > 0) {
//         const latestVersion = data.results[0].version;

//         if (latestVersion !== appVersion) {
//           setVersionData({lastAvailableVersion: latestVersion, showUpdateAvailable: true});
//         }
//       }
//     } catch (error) {
//       console.error('Error checking for new version:', error);
//     }
//   };

//   const handleCheckAppVersion = async () => {
//     if (!userData?.uid) {
//       return;
//     }
//     const appVersion = DeviceInfo.getVersion();
//     const buildNumber = DeviceInfo.getBuildNumber();
//     const versionQuery = await firestore().collection(apiAppSettingsCollection).doc('version').get();
//     if (versionQuery.exists) {
//       const data = versionQuery.data() as {
//         lastAvailableBuild: string;
//         lastAvailableVersion: string;
//       };
//       if (data?.lastAvailableBuild && data?.lastAvailableVersion) {
//         if (appVersion !== data?.lastAvailableVersion || buildNumber !== data?.lastAvailableBuild) {
//           setVersionData({...data, showUpdateAvailable: true});
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     handleAddChatWithAdmin();
//     if (apiUserInfoCollection === 'devUserInfo') {
//       handleCheckAppVersion();
//     } else {
//       checkAppStoreVersion();
//     }
//     handleCheckMaintenance();
//   }, [userData?.uid]);

//   useEffect(() => {
//     if (authState) {
//       getFcmToken();
//       registerListenerWithFCM();
//     }
//   }, [authState]);

//   useEffect(() => {
//     const subcriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return () => {
//       subcriber();
//     };
//   }, [initializing, onBoarding]);

//   if (initializing) {
//     return null;
//   }

//   if (versionData?.showUpdateAvailable) {
//     return <UpdateAvailable data={versionData} />;
//   }

//   if (maintenanceData?.isMaintenance) {
//     return <UnderMaintenance data={maintenanceData} />;
//   }

//   return authState ? <AppStackScreens /> : <AuthStackScreens />;
// };

// export default Navigator;

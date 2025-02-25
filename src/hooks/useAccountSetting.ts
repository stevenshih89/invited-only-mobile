import { useEffect, useState } from "react";
import Config from "react-native-config";
import { useUser } from "src/store/userStore";
import {showToast} from 'helpers/showToast';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import auth from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';

export const useAccountSetting = (route: any) => {
    const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const locationState = route?.params?.params?.locationState;
  const [isChechked, setIsChechked] = useState(false);
  const [isVisibleDeleteAccountModal, setIsVisibleDeleteAccountModal] = useState(false);
  const [isVisibleConfirmPhoneModal, setIsVisibleConfirmPhoneModal] = useState(false);
  const [location, setLocation] = useState<boolean>(locationState);
  const [loading, setLoading] = useState<boolean>(true);
  const [verificationId, setVerificationId] = useState('');

  const user = useUser((i: any) => i?.user);

  const setUser = useUser((i: any) => i?.setUser);
  const userPhone = auth()?.currentUser?.phoneNumber;
  const uid = user?.uid;

  const isPremium = false;

  const handleChangeLocation = async (state: boolean): Promise<void> => {
    try {
      await firestore()
        .collection(apiUserInfoCollection)
        .doc(uid)
        .update({
          location: state,
        })
        .then(async () => {
          await firestore()
            .collection(apiUserInfoCollection)
            .doc(uid)
            .get()
            .then(res => {
              setUser(res.data());
            });
        });
    } catch (e) {
      showToast('inviteMatch', 'Failed to update location. Please try again.', 'Error');
      logErrorToSentry(e)
      // console.log(e);
    }
  };

  const getCurrentLocation = (): void => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
    });
    Geolocation.getCurrentPosition(
      position => {
        // console.log('Granted', position);
        setLocation(true);
        handleChangeLocation(true);
        setIsChechked(true);
        setLoading(false);
      },
      error => {
        // console.log('Denied', error);
        setLocation(false);
        setIsChechked(false);
        setLoading(false);
        handleChangeLocation(false);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  useEffect(() => {
    if (isChechked) {
      getCurrentLocation();
    }
    setLoading(false);
  }, [location, isChechked]);

  const sendVerificationCode = async () => {
    const phoneNumber = auth().currentUser?.phoneNumber;
    if (!phoneNumber) {
      return;
    }
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation?.verificationId);
    } catch (error) {
      console.error('Failed to send verification code:', error);
      if (error.code === 'auth/too-many-requests') {
        setIsVisibleConfirmPhoneModal(false);
        showToast('inviteMatch', 'We have blocked all requests from this device due to unusual activity. Try again later.', 'Failed');
      }
    }
  };

  return {
    userPhone,
    user,
    isPremium,
    setIsVisibleDeleteAccountModal,
    isVisibleDeleteAccountModal,
    setIsVisibleConfirmPhoneModal,
    sendVerificationCode,
    isVisibleConfirmPhoneModal,
    verificationId
  }
}
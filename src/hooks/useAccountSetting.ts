import {useEffect, useState} from 'react';
import {useUser} from 'src/store/userStore';
import auth from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';
import invitedOnlyBackendApi from 'src/api/backend-api';

export const useAccountSetting = (route: any) => {
  const locationState = route?.params?.params?.locationState;
  const [isChechked, setIsChechked] = useState(false);
  const [isVisibleDeleteAccountModal, setIsVisibleDeleteAccountModal] = useState(false);
  const [isVisibleConfirmPhoneModal, setIsVisibleConfirmPhoneModal] = useState(false);
  const [location, setLocation] = useState<boolean>(locationState);
  const [loading, setLoading] = useState<boolean>(true);
  const [verificationId, setVerificationId] = useState('');
  const {mutate: sendVerificationCodeMutation} = UserMutations.useSendVerificationCode();

  const {mutate: userChangeLocationMutation} = invitedOnlyBackendApi.useMutation('patch', '/users/{id}');

  const user = useUser((i: any) => i?.user);
  const userPhone = auth()?.currentUser?.phoneNumber;

  const isPremium = false;

  const getCurrentLocation = (): void => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
    });
    Geolocation.getCurrentPosition(
      position => {
        // console.log('Granted', position);
        setLocation(true);
        userChangeLocationMutation({
          body: {
            location: position.coords.latitude.toString() + ',' + position.coords.longitude.toString(),
            gender: 'man',
            name: '',
            uid: '',
          },
          params: {
            path: {
              id: user?.uid,
            },
          },
        });
        setIsChechked(true);
        setLoading(false);
      },
      error => {
        // console.log('Denied', error);
        setLocation(false);
        setIsChechked(false);
        setLoading(false);
        userChangeLocationMutation(false);
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
    sendVerificationCodeMutation({
      onSetVerificationId: (verificationId: string) => {
        setVerificationId(verificationId);
      },
      hideConfirmPhoneModal: () => {
        setIsVisibleConfirmPhoneModal(false);
      },
    });
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
    verificationId,
  };
};

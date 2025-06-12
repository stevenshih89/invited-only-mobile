import { useContext, useState, RefObject, useEffect } from 'react';

import { TextInput } from 'react-native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import firestore from '@react-native-firebase/firestore';
import { components } from '@invited-only/invited-only-api';
import * as amplitude from '@amplitude/analytics-react-native';
import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext';
import { useAuthStore } from 'src/store/authStore';
import { showToast } from 'helpers/showToast';
import { useAppNavigation } from 'hooks/useAppNavigation';
import useMessaging from 'hooks/useMessaging';
import useRemoteConfig from 'hooks/useRemoteConfig';
import { BackendApiContext } from 'contexts/BackendApiContex';

export const useConfirmPhone = (route: {
  params: {
    mobilePhone: string;
    isLogin?: boolean;
  };
}) => {
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const navigation = useAppNavigation();
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
  const mobilePhone = route?.params?.mobilePhone;
  const isLogin = route?.params?.isLogin || false;
  const [code, setCode] = useState<string>('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const [resendTimer, setResendTimer] = useState(0);
  const { phoneVerificationCodeLength } = useRemoteConfig();
  const CELL_COUNT: number = phoneVerificationCodeLength ? parseInt(phoneVerificationCodeLength) : 6;
  const ref: RefObject<TextInput> = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const { setupNotifications } = useMessaging();
  const { setOnBoarding, setAccessToken, setRefreshToken, setUserMetadata } = useAuthStore();
  const { mutate: verifyOtp, isPending: isLoadingVerifyOtp } = invitedOnlyBackendApi.useMutation('post', '/auth/verify-otp');
  const { mutate: sendOtp, isPending: isLoadingSendOtp } = invitedOnlyBackendApi.useMutation('post', '/auth/send-otp');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendTimer]);

  async function signInWithPhoneNumber() {
    try {
      if (!mobilePhone || resendTimer > 0) {
        return;
      }
      setResendTimer(59);
      const phone = `${mobilePhone}`.trim().replace(/\s/g, '');
      await sendOtp({ body: { phone } });
    } catch (e: any) {
      showToast('inviteMatch', `${e?.message.split(']')[1]}`);
    }
  }

  const handleConfirmPhoneNumber = async (verificationCode: string = code) => {
    try {
      if (verificationCode.length !== CELL_COUNT) {
        return;
      }

      if (isLogin) {
        const userQuerySnapshot = await firestore()
          .collection(apiUserInfoCollection)
          .where('phoneNumber', '==', mobilePhone)
          .limit(1)
          .get();

        if (userQuerySnapshot.empty) {
          showToast('inviteMatch', 'No account found with this phone number', 'Fail');
          return;
        }

        const userData = userQuerySnapshot.docs[0].data() as components['schemas']['User'];
        verifyOtp(
          { body: { phone: mobilePhone, code: verificationCode } },
          {
            onSuccess: data => {
              setOnBoarding({
                isOnboardingCompleted: true,
                userType: userData.accountType as 'host' | 'guest',
                onboardingStep: '/onboarding-demo-path',
              });

              setAccessToken(data.accessToken);
              setRefreshToken(data.refreshToken);
              setupNotifications();

              if (userData.uid && userData.phoneNumber) {
                setUserMetadata({
                  uid: userData.uid,
                  phoneNumber: userData.phoneNumber,
                  firstLogin: false,
                });
                amplitude.setUserId(userData.uid);
                amplitude.track('Sign IN');
              } else {
                console.error('User data from Firestore missing uid or phoneNumber:', userData);
                showToast('inviteMatch', 'Failed to retrieve user details.', 'Error');
              }
            },
            onError: error => {
              console.error('Verify OTP Error:', error);
              showToast('inviteMatch', 'Verification failed. Please check the code.', 'Error');
            },
          },
        );
      } else {
        verifyOtp(
          { body: { phone: mobilePhone, code: verificationCode } },
          {
            onSuccess: data => {
              setOnBoarding({
                isOnboardingCompleted: false,
                userType: 'guest',
                onboardingStep: '/enter-name',
              });
              setAccessToken(data.accessToken);
              setRefreshToken(data.refreshToken);
              setUserMetadata({
                uid: data.uid,
                phoneNumber: mobilePhone,
                firstLogin: true,
              });
              amplitude.setUserId(data.uid);
              amplitude.track('Sign UP');
              navigation.navigate('/enter-name');
            },
            onError: error => {
              console.error('Verify OTP Error:', error);
              showToast('inviteMatch', 'Verification failed. Please check the code.', 'Error');
            },
          },
        );
      }
    } catch (e: any) {
      console.error('handleConfirmPhoneNumber Error:', e);
      showToast('inviteMatch', '', `An unexpected error occurred.`);
    }
  };

  return {
    mobilePhone,
    code,
    setCode,
    ref,
    props,
    getCellOnLayoutHandler,
    signInWithPhoneNumber,
    handleConfirmPhoneNumber,
    resendTimer,
    isLoadingVerifyOtp,
    isLoadingSendOtp,
    CELL_COUNT,
  };
};

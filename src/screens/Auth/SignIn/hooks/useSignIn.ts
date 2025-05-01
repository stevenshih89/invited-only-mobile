import {useContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';
import {useAppNavigation} from 'hooks/useAppNavigation';
import invitedOnlyBackendApi from 'src/api/backend-api';
import {useAuthStore} from 'src/store/authStore';
import {showToast} from 'helpers/showToast';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';

export const useSignIn = () => {
  const [mobilePhone, setMobilePhone] = useState<string>('');
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [isDisabledValidation, setIsDisabledValidation] = useState<boolean>(true);

  const navigation = useAppNavigation();
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const {mutate: sendOtp, isPending: isSendingOtp} = invitedOnlyBackendApi.useMutation('post', '/auth/send-otp');
  const {setUserMetadata} = useAuthStore();

  async function signInWithPhoneNumber() {
    try {
      if (!mobilePhone) {
        return;
      }
      const phone = `${mobilePhone}`.trim().replace(/\s/g, '');

      try {
        const user = await firestore().collection(apiUserInfoCollection).where('phoneNumber', '==', mobilePhone).get();
        if (user.empty) {
          showToast('inviteMatch', 'No account found with this phone number', 'Fail');
          return;
        }

        setUserMetadata({
          uid: user.docs[0].id,
          phoneNumber: mobilePhone,
        });

        await sendOtp({body: {phone: mobilePhone}});

        navigation.navigate('/confirm-phone', {
          mobilePhone: phone,
          isLogin: true,
        });
      } catch (error: any) {
        logErrorToSentry(error);
        showToast('inviteMatch', `${error?.message.split(']')[1] || 'Error signing in'}`);
      }
    } catch (e: any) {
      logErrorToSentry(e);
      showToast('inviteMatch', `${e?.message.split(']')[1] || 'Error processing request'}`);
    }
  }

  const handleSignIn = () => {
    setIsDisabledValidation(false);
    console.log(isValidPhone);

    if (isValidPhone) {
      signInWithPhoneNumber();
    }
  };

  return {mobilePhone, setMobilePhone, isValidPhone, setIsValidPhone, isDisabledValidation, isSendingOtp, handleSignIn};
};

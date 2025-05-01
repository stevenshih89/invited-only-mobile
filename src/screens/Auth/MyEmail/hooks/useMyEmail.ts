import {useContext, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import invitedOnlyBackendApi from 'src/api/backend-api';
import {useAuthStore} from 'src/store/authStore';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';
import {isEmailValid} from 'helpers/regExpValidators';
import {showToast} from 'helpers/showToast';
import {useAppNavigation} from 'hooks/useAppNavigation';

export const useMyEmail = () => {
  const {mutate: createUser, isPending} = invitedOnlyBackendApi.useMutation('post', '/users');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const navigation = useAppNavigation();

  const {onBoarding, setOnBoarding, userMetadata} = useAuthStore();
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);

  const handleEmailChange = (value: string) => {
    const truncatedText = value.slice(0, 40);
    if (!isValidEmail) {
      setIsValidEmail(isEmailValid(truncatedText));
    }
    setEmail(truncatedText);
  };

  const handleNext = async () => {
    setIsValidEmail(isEmailValid(email));
    const _isValidEmail = isEmailValid(email);
    if (!email || !_isValidEmail) {
      return;
    }
    const userNumber = await firestore().collection(apiUserInfoCollection).where('email', '==', email).get();
    if (!userNumber.empty) {
      showToast('inviteMatch', 'This Email is already exist', 'Fail');
      return;
    }

    setOnBoarding({
      ...onBoarding,
      registrationDetails: {
        ...onBoarding.registrationDetails,
        email: email,
      },
      isOnboardingCompleted: true,
    });
    createUser({
      body: {
        ...onBoarding.registrationDetails,
        phoneNumber: userMetadata?.phoneNumber,
        email: email,
        uid: userMetadata?.uid,
      } as any,
    });
  };

  return {email, isValidEmail, handleEmailChange, handleNext, isPending, navigation};
};

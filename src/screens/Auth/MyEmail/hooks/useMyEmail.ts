import { useContext, useState } from 'react';

import firestore from '@react-native-firebase/firestore';

import { useAuthStore } from 'src/store/authStore';
import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext';
import { isEmailValid } from 'helpers/regExpValidators';
import { showToast } from 'helpers/showToast';
import { useAppNavigation } from 'hooks/useAppNavigation';

export const useMyEmail = () => {

  const { onBoarding, setOnBoarding } = useAuthStore();
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [email, setEmail] = useState<string>(onBoarding.registrationDetails?.email || '');
  const navigation = useAppNavigation();

  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);

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
      isOnboardingCompleted: false,
    });
    navigation.navigate('/welcome-screen');
  };

  return { email, isValidEmail, handleEmailChange, handleNext, navigation };
};

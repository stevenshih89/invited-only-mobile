import Config from 'react-native-config';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import {isEmailValid} from 'helpers/regExpValidators';
import auth from '@react-native-firebase/auth';
import {showToast} from 'helpers/showToast';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';

const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

export const useEmailChange = () => {
  const [email, setEmail] = useState('');

  const handleChangeEmail = async () => {
    const user = auth().currentUser;
    const _isValidEmail = isEmailValid(email);
    if (!email || !_isValidEmail) {
      showToast('inviteMatch', 'Email is not valid', 'Error');
      return;
    }
    try {
      await firestore().collection(apiUserInfoCollection).doc(user?.uid).update({
        email,
      });
      showToast('inviteMatch', 'Email has been changed', 'Success');
    } catch (error) {
      showToast('inviteMatch', 'Failed to update email. Please try again.', 'Error');
      logErrorToSentry(error)
    }
  };

  return {
    handleChangeEmail,
    email,
    setEmail
  }
}
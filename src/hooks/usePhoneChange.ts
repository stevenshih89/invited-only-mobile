import {TextInput, ViewStyle} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { showToast } from 'helpers/showToast';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import {useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {RefObject, useEffect, useState} from 'react';

const items = [
    {
      label: '+380',
      value: 'ua',
    },
    {
      label: '+972',
      value: 'ae',
    },
    {
      label: '+300',
      value: 'fr',
    },
    {
      label: '+400',
      value: 'lo',
    },
    {
      label: '+321',
      value: 'po',
    },
  ];

export const usePhoneChange = () => {
  const [mobilePhone, setMobilePhone] = useState<string>('');
  const [activeItem, setActiveItem] = useState<string>('ae');
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [isSecondStep, setIsSecondStep] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [confirm, setConfirm] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUserUid, setCurrentUserUid] = useState<string | undefined>('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const CELL_COUNT: number = 6;
  const ref: RefObject<TextInput> = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});

  useEffect(() => {
    const userUid = auth().currentUser?.uid;
    setCurrentUserUid(userUid);
  }, []);

  const handleSendOTPOnPhone = async () => {
    try {
      if (!mobilePhone) {
        return;
      }
      setLoading(true);
      const searchCodeId = items?.findIndex(i => i?.value === activeItem);
      const phone = `${items[searchCodeId]?.label}${mobilePhone}`;
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      setLoading(false);
      setIsSecondStep(true);
    } catch (error) {
      // console.log('error', error);
      setLoading(false);
    }
  };

  const handleSendConfirmationCode = async () => {
    const searchCodeId = items?.findIndex(i => i?.value === activeItem);
    const phone = `${items[searchCodeId]?.label}${mobilePhone}`;
    try {
      setLoading(true);
      await confirm.confirm(code);
      firestore()
        .collection('users')
        .doc(currentUserUid)
        .update({
          phoneNumber: phone,
        })
        .then(() => {
          // console.warn('User phone number updated in Firestore');
        })
        .catch(error => {
          // console.error('Error updating user phone number: ', error);
        });
      setLoading(false);
    } catch (error) {
      // Alert.alert('Error', 'Something went wrong');
      showToast('inviteMatch', 'Failed to update phone number. Please try again.', 'Error')
      logErrorToSentry(error);
      setLoading(false);
    }
  };

  const dropdownContainerStyle: ViewStyle = isOpenDropdown
    ? {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {
        borderRadius: 10,
      };

    return {
        isSecondStep,
        activeItem,
        setActiveItem,
        setIsOpenDropdown,
        dropdownContainerStyle,
        mobilePhone,
        setMobilePhone,
        loading,
        handleSendOTPOnPhone,
        setIsSecondStep,
        ref,
        props,
        code,
        setCode,
        CELL_COUNT,
        handleSendConfirmationCode,
        getCellOnLayoutHandler
    }
}
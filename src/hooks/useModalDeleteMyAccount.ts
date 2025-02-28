import {useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {RefObject, useState} from 'react';
import {TextInput} from 'react-native';
import {UserMutations} from "../apiv2/mutations/userMutations.ts";

const CELL_COUNT: number = 6;

export const useModalDeleteMyAccount = (verificationId: string) => {
  const [code, setCode] = useState<string>('');

  const {
    mutate: userDeleteAccountMutation
  } = UserMutations.useUserDeleteAccount();

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const ref: RefObject<TextInput> = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});

  const handleConfirm = async () => {
    userDeleteAccountMutation({
      verificationId,
      code
    })
  };

  return {
    ref,
    code,
    props,
    setCode,
    CELL_COUNT,
    getCellOnLayoutHandler,
    handleConfirm,
  }
}

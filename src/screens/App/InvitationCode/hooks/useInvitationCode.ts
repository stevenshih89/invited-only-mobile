import { RefObject, useState } from 'react';
import { TextInput } from 'react-native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

export const useInvitationCode = () => {
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
  const [code, setCode] = useState('');
  const CELL_COUNT: number = 4;
  const ref: RefObject<TextInput> = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const [isIncorrectCode, setIsIncorrectCode] = useState(false);

  const handleSubmit = () => {
    setIsSuccessfullySubmitted(true);
  };

  return {
    isSuccessfullySubmitted,
    code,
    setCode,
    ref,
    props,
    getCellOnLayoutHandler,
    isIncorrectCode,
    cellCount: CELL_COUNT,
    handleSubmit,
  };
};

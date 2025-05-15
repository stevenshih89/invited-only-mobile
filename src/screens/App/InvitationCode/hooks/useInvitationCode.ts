import { operations } from '@invited-only/invited-only-api';
import { RefObject, useState } from 'react';
import { TextInput } from 'react-native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { showToast } from 'helpers/showToast';
import invitedOnlyBackendApi from 'src/api/backend-api';
import useUser from 'hooks/user/useUser';

type InvitationCodeResponse = operations['getAccessToken']['responses']['200']['content']['application/json'];

export const useInvitationCode = () => {
  const { user } = useUser();
  const { mutate: getAccess, isPending: isGettingAccess } = invitedOnlyBackendApi.useMutation('post', '/auth/get-access');
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
    getAccess({
      body: {
        invitationCode: code,
        userId: user?.uid ?? '',
      },
    }, {
      onSuccess: (invitationCodeResponse: InvitationCodeResponse) => {
        if (invitationCodeResponse.status === 'success') {
          setIsSuccessfullySubmitted(true);
        } else {
          setIsIncorrectCode(true);
          setCode('');
        }
      },
      onError: () => {
        setIsIncorrectCode(true);
        setCode('');
      },
    });
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
    isGettingAccess,
    handleSubmit,
  };
};

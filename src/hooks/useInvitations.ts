import { useEffect, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import useUser from 'src/hooks/user/useUser';
import { showToast } from 'helpers/showToast';

export const useInvitations = () => {
  const [numberCodes, setNumberCodes] = useState<number>();

  const { user: userHost } = useUser();

  const inviteLink = userHost?.codeForInvitingOtherUsers;

  const handleCopy = (val: string) => {
    Clipboard.setString(val);
    showToast('inviteMatch', '', 'Invite code copied!');
  };

  useEffect(() => {
    setNumberCodes(inviteLink?.length || 0);
  }, []);
  return {
    handleCopy,
    numberCodes,
    inviteLink,
  };
};

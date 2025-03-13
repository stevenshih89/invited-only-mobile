import {useEffect, useState} from 'react';
import {useUser} from 'src/store/userStore';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from 'helpers/showToast';

export const useInvitations = () => {
  const [numberCodes, setNumberCodes] = useState<number>();

  const userHost = useUser((i: any) => i?.user);

  const inviteLink = userHost?.codeForInvitingOtherUsers;

  const handleCopy = (val: string) => {
    Clipboard.setString(val);
    showToast('inviteMatch', '', 'Invite code copied!');
  };

  useEffect(() => {
    setNumberCodes(inviteLink.length);
  }, []);
  return {
    handleCopy,
    numberCodes,
    inviteLink,
  };
};

import messaging from '@react-native-firebase/messaging';
import { showToast } from 'helpers/showToast';
import { useAuthStore } from 'src/store/authStore';


export const useLogout = (onClose: () => void) => {

  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      showToast('inviteMatch', '', 'You logged out from your account', { status: 'SUCCESSFULY' });
      logout();
      await messaging().deleteToken();
      onClose();
    } catch (error) {
      console.log('error log out', error);
    }
  };

  return {
    handleLogout,
  };
};

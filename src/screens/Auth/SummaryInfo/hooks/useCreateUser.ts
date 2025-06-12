import { useContext } from 'react';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import * as amplitude from '@amplitude/analytics-react-native';
import { showToast } from 'helpers/showToast';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useAuthStore } from 'src/store/authStore';
import { BackendApiContext } from 'contexts/BackendApiContex';

const useCreateUser = () => {
  const { userMetadata: user, onBoarding, setOnBoarding } = useAuthStore();
  const navigation = useAppNavigation();
  const invitedOnlyBackendApi = useContext(BackendApiContext);
  const { mutateAsync: createUser, isPending } = invitedOnlyBackendApi.useMutation('post', '/users');

  const handleCreateUser = async () => {
    try {
      await createUser({
        body: {
          ...onBoarding.registrationDetails,
          phoneNumber: user?.phoneNumber,
          email: onBoarding.registrationDetails?.email,
          uid: user?.uid,
        },
      });
      setOnBoarding({
        ...onBoarding,
        isOnboardingCompleted: true,
      });
      AppEventsLogger.logEvent('User Registered', { gender: onBoarding.registrationDetails?.gender || 'unknown' });
      amplitude.track('User Registered', { gender: onBoarding.registrationDetails?.gender || 'unknown' });
    } catch (error) {
      showToast('warning', 'Failed to create new user, Please try again later or contact support', 'Fail');
      navigation.navigate('/enter-name');
      console.error(error);
    }
  };

  return { handleCreateUser, isPending };
};

export default useCreateUser;

import {showToast} from 'helpers/showToast';
import {useAppNavigation} from 'hooks/useAppNavigation';
import invitedOnlyBackendApi from 'src/api/backend-api';
import {useAuthStore} from 'src/store/authStore';

const useCreateUser = () => {
  const {userMetadata: user, onBoarding, setOnBoarding} = useAuthStore();
  const navigation = useAppNavigation();
  const {mutateAsync: createUser, isPending} = invitedOnlyBackendApi!.useMutation('post', '/users');

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
    } catch (error) {
      showToast('warning', 'Failed to create new user, Please try again later or contact support', 'Fail');
      navigation.navigate('/enter-name');
      console.error(error);
    }
  };

  return {handleCreateUser, isPending};
};

export default useCreateUser;

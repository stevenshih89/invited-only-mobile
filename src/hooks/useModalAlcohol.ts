import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';
import useUser from 'src/hooks/user/useUser';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {showToast} from 'helpers/showToast';

const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

export const useModalAlcohol = (setShowAlcohol: any, setActiveAlcoholItem: any) => {
  const {user: userHost} = useUser();

  const handleUpdateShowInMyProfile = async (state: string): Promise<void> => {
    if (!userHost?.uid) return;
    try {
      const uid = userHost.uid;
      setShowAlcohol(state);
      await firestore().collection(apiUserInfoCollection).doc(uid).update({
        showAlcohol: state,
      });
    } catch (e) {
      logErrorToSentry(e);
      // console.log(e);
    }
  };
  const handleUpdateAlcohol = async (gender: string): Promise<void> => {
    if (!userHost?.uid) return;
    try {
      const uid = userHost.uid;
      setActiveAlcoholItem(gender);
      await firestore().collection(apiUserInfoCollection).doc(uid).update({
        alcohol: gender,
      });
    } catch (e) {
      showToast('basic', 'Failed to update alcohol preference. Please try again.', 'Error');
      logErrorToSentry(e);
      // console.log(e);
    }
  };

  return {
    handleUpdateAlcohol,
    handleUpdateShowInMyProfile,
  };
};

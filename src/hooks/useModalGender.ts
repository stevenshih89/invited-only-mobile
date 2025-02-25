import { logErrorToSentry } from "helpers/logErrorsToSentry";
import { showToast } from "helpers/showToast";
import Config from "react-native-config";
import { useUser } from "src/store/userStore";
import firestore from '@react-native-firebase/firestore';

const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

export const useModalGender = ({setShowGender, setActiveGenderItem}: {
    setShowGender: any;
    setActiveGenderItem: any;
}) => {
  const userHost = useUser((i: any) => i?.user);
  const setUserInfo = useUser((i: any) => i?.setUser);

  const handleUpdateShowInMyProfile = async (state: string): Promise<void> => {
    try {
      const uid = userHost?.uid;
      setShowGender(state);
      await firestore().collection(apiUserInfoCollection).doc(uid).update({
        showGender: state,
      });
      const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(uid).get();

      if (userInfoDoc?.exists) {
        setUserInfo(userInfoDoc.data());
      }
    } catch (e) {
      showToast('inviteMatch', 'Failed to update your gender visibility in the profile. Please try again.', 'Error');
      logErrorToSentry(e)
      // console.log(e);
    }
  };

  const handleUpdateGender = async (gender: string): Promise<void> => {
    try {
      const uid = userHost?.uid;
      setActiveGenderItem(gender);
      await firestore().collection(apiUserInfoCollection).doc(uid).update({
        gender: gender,
      });
      const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(uid).get();

      if (userInfoDoc?.exists) {
        setUserInfo(userInfoDoc.data());
      }
    } catch (e) {
      showToast('inviteMatch', 'Failed to update your gender in the profile. Please try again.', 'Error');
      logErrorToSentry(e)
      // console.log(e);
    }
  };
  return {
    handleUpdateShowInMyProfile,
    handleUpdateGender
  }
}
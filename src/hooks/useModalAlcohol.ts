import { useUser } from "src/store/userStore";
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import { showToast } from 'helpers/showToast';
import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';

const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

export const useModalAlcohol = (setShowAlcohol: any, setActiveAlcoholItem: any) => {
    const userHost = useUser((i: any) => i?.user);
    const setUserInfo = useUser((i: any) => i?.setUser);

    const handleUpdateShowInMyProfile = async (state: string): Promise<void> => {
        try {
          const uid = userHost?.uid;
          setShowAlcohol(state);
          await firestore().collection(apiUserInfoCollection).doc(uid).update({
            showAlcohol: state,
          });
          const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(uid).get();
    
          if (userInfoDoc?.exists) {
            setUserInfo(userInfoDoc.data());
          }
        } catch (e) {
          logErrorToSentry(e)
          // console.log(e);
        }
      };
      const handleUpdateAlcohol = async (gender: string): Promise<void> => {
        try {
          const uid = userHost?.uid;
          setActiveAlcoholItem(gender);
          await firestore().collection(apiUserInfoCollection).doc(uid).update({
            alcohol: gender,
          });
          const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(uid).get();
    
          if (userInfoDoc?.exists) {
            setUserInfo(userInfoDoc.data());
          }
        } catch (e) {
          showToast('inviteMatch', 'Failed to update alcohol preference. Please try again.', 'Error');
          logErrorToSentry(e)
          // console.log(e);
        }
      };
    
    return {
        handleUpdateAlcohol,
        handleUpdateShowInMyProfile
    }
}
import { useContext } from "react";
import auth from '@react-native-firebase/auth';
import {AuthContext} from 'contexts/AuthContext.tsx';
import {calculateAge} from 'helpers/calculateAge.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from 'helpers/showToast';
import messaging from '@react-native-firebase/messaging';
import { useUser } from "src/store/userStore";

export const useLogout = (onClose: () => void) => {
    const {setUser} = useContext(AuthContext);
      const userHost = useUser((i: any) => i?.user);
      const setHookUser = useUser((i: any) => i?.setUser);
    
      const userAge = calculateAge(userHost?.date);
    
      const handleLogout = async () => {
        try {
          await auth().signOut();
          showToast('inviteMatch', '', 'You logged out from your account', {ownerPhoto: userHost?.photos[0].image, status: 'SUCCESSFULY'});
          setUser([]);
          setHookUser(null);
          await AsyncStorage.removeItem('uid');
          await messaging().deleteToken();
          onClose();
        } catch (error) {
          console.log('error log out', error);
        }
      };
    
    return {
        userHost,
        userAge,
        handleLogout
    }
}
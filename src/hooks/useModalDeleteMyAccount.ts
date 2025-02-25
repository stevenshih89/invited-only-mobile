import {useUser} from 'src/store/userStore';
import {showToast} from 'helpers/showToast';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import Config from 'react-native-config';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import auth from '@react-native-firebase/auth';
import {useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import { useState, RefObject} from 'react';
import { TextInput } from 'react-native';

const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
const apiMessagesCollection = Config.API_MESSAGES_COLLECTION || 'messages';
const CELL_COUNT: number = 6;

export const useModalDeleteMyAccount = (verificationId: string) => {
  const [code, setCode] = useState<string>('');

  const userHost = useUser((i: any) => i?.user);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const ref: RefObject<TextInput> = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});

  const handleConfirm = async () => {
    if (!verificationId || !code) {
      return;
    }
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, code);
      await auth().currentUser?.reauthenticateWithCredential(credential);
      await deleteUser();
    } catch (e) {
    }
  };

  const deleteUser = async () => {
    try {
      if (userHost.accountType === 'host') {
        const docSnapshot = await firestore().collection(apiUserInfoCollection).doc(userHost.uid).get();
        const docData = docSnapshot.data();

        if (docData?.eventsList && docData?.eventsList.length > 0) {
          for (const item of docData?.eventsList) {
            await firestore().collection(apiEventsCollection).doc(item).delete();
            await firestore().collection(apiMessagesCollection).doc(item).delete();
          }
        }
      } else {
        const eventsListGuest = userHost?.eventsListVisit;
        try {
          if (eventsListGuest && eventsListGuest.length > 0) {
            const deletePromises = eventsListGuest.map(async (id: string) => {
              const docMessages = firestore().collection(apiMessagesCollection).doc(id);
              const docData = await docMessages.get();
              if (docData.exists) {
                const messages = docData?.data().chats;
                if (messages && messages.length > 0) {
                  const filteredChats = messages.filter(item => item.uid !== userHost?.uid);
                  if (filteredChats.length !== messages.length) {
                    await docMessages.update({
                      chats: filteredChats,
                    });
                  }
                }
              }
            });
            await Promise.all(deletePromises);
          }
        } catch (error) {
          console.log('error delete messages', error);
        }
      }
      await messaging().deleteToken();
      await auth().currentUser?.delete();
      await firestore().collection(apiUserInfoCollection).doc(userHost.uid).delete();
      await auth().signOut();
      showToast('inviteMatch', '', 'Your account has been deleted', {
        ownerPhoto: userHost?.photos[0].image,
        status: 'SUCCESSED',
      });
    } catch (e) {
      console.log('error delete', e);
      logErrorToSentry(e)
    }
  };

  return {
    ref,
    code,
    props,
    setCode,
    CELL_COUNT,
    getCellOnLayoutHandler,
    handleConfirm,
  }
}
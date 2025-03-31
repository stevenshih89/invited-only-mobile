import {useMutation} from '@tanstack/react-query';
import {UserMutationsKeys} from '../keys/userMutationkeys.ts';
import auth from '@react-native-firebase/auth';
import {isEmailValid} from 'helpers/regExpValidators.ts';
import {showToast} from 'helpers/showToast.ts';
import firestore from '@react-native-firebase/firestore';
import {logErrorToSentry} from 'helpers/logErrorsToSentry.ts';

import {useUser} from '../../store/userStore';
import messaging from '@react-native-firebase/messaging';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext.tsx';
import {useContext} from 'react';

const useUserChangeEmail = () => {
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const currentUser = auth()?.currentUser;

  const changeEmailFn = async (email: string) => {
    const _isValidEmail = isEmailValid(email);
    if (!email || !_isValidEmail) {
      showToast('inviteMatch', 'Email is not valid', 'Error');
      return;
    }
    try {
      await firestore().collection(apiUserInfoCollection).doc(currentUser?.uid).update({
        email,
      });
      showToast('inviteMatch', 'Email has been changed', 'Success');
    } catch (error) {
      showToast('inviteMatch', 'Failed to update email. Please try again.', 'Error');
      logErrorToSentry(error);
    }
  };

  return useMutation({
    mutationKey: UserMutationsKeys.changeUserEmail(currentUser?.uid || ''),
    mutationFn: changeEmailFn,
  });
};

const useUserChangeLocation = () => {
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const currentUser = auth()?.currentUser;

  const changeLocationFn = async (state: boolean) => {
    const uid = currentUser?.uid;
    try {
      await firestore().collection(apiUserInfoCollection).doc(uid).update({
        location: state,
      });
    } catch (e) {
      showToast('inviteMatch', 'Failed to update location. Please try again.', 'Error');
      logErrorToSentry(e);
    }
  };

  return useMutation({
    mutationKey: UserMutationsKeys.changeUserLocation(currentUser?.uid || ''),
    mutationFn: changeLocationFn,
  });
};

const useSendVerificationCode = () => {
  const currentUser = auth().currentUser;
  const sendVerificationCodeFn = async (onSetVerificationId: (verificationId: string) => void, hideConfirmPhoneModal: () => void) => {
    const phoneNumber = currentUser?.phoneNumber;
    if (!phoneNumber) {
      return;
    }
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      onSetVerificationId(confirmation?.verificationId ?? '');
    } catch (error: any | {code: string}) {
      console.error('Failed to send verification code:', error);
      if (error.code === 'auth/too-many-requests') {
        hideConfirmPhoneModal();
        showToast('inviteMatch', 'We have blocked all requests from this device due to unusual activity. Try again later.', 'Failed');
      }
    }
  };

  return useMutation({
    mutationKey: UserMutationsKeys.sendVerificationCode(),
    mutationFn: (callbacks: {onSetVerificationId: (verificationId: string) => void; hideConfirmPhoneModal: () => void}) =>
      sendVerificationCodeFn(callbacks.onSetVerificationId, callbacks.hideConfirmPhoneModal),
  });
};

const useUserDeleteAccount = () => {
  const currentUser = auth().currentUser;
  const userHost = useUser((i: any) => i?.user);
  const {
    userInfo: apiUserInfoCollection,
    events: apiEventsCollection,
    messages: apiMessagesCollection,
  } = useContext(FirebaseCollectionsContext);
  const deleteUserAccountFn = async (variables: {verificationId: string; code: string}) => {
    const {verificationId, code} = variables;

    if (!verificationId || !code) {
      return;
    }
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, code);
      await auth().currentUser?.reauthenticateWithCredential(credential);
      await deleteUser();
    } catch (e) {}
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
                const messages = docData?.data()?.chats;
                if (messages && messages.length > 0) {
                  const filteredChats = messages.filter((item: any) => item.uid !== userHost?.uid);
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
      logErrorToSentry(e);
    }
  };

  return useMutation({
    mutationKey: UserMutationsKeys.deleteUserAccount(currentUser?.uid || ''),
    mutationFn: deleteUserAccountFn,
  });
};

const useUserUpdateGender = () => {
  const currentUser = auth().currentUser;
  const userHost = useUser((i: any) => i?.user);
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const updateUserGenderFn = async (variables: {gender: string; changeActiveGenderItem: () => void}) => {
    try {
      const {gender, changeActiveGenderItem} = variables;
      const uid = userHost?.uid;
      changeActiveGenderItem();
      await firestore().collection(apiUserInfoCollection).doc(uid).update({
        gender: gender,
      });
    } catch (e) {
      showToast('inviteMatch', 'Failed to update your gender in the profile. Please try again.', 'Error');
      logErrorToSentry(e);
    }
  };

  return useMutation({
    mutationKey: UserMutationsKeys.updateUserGender(currentUser?.uid || ''),
    mutationFn: updateUserGenderFn,
  });
};

const useUserUpdateShowGenderInProfile = () => {
  const currentUser = auth().currentUser;
  const userHost = useUser((i: any) => i?.user);
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const updateShowGenderInProfileFn = async (variables: {state: string; changeShowGenderState: () => void}) => {
    try {
      const {state, changeShowGenderState} = variables;
      const uid = userHost?.uid;
      await firestore().collection(apiUserInfoCollection).doc(uid).update({
        showGender: state,
      });
      changeShowGenderState();
    } catch (e) {
      showToast('inviteMatch', 'Failed to update your gender visibility in the profile. Please try again.', 'Error');
      logErrorToSentry(e);
    }
  };

  return useMutation({
    mutationKey: UserMutationsKeys.updateUserShowGenderInProfile(currentUser?.uid || ''),
    mutationFn: updateShowGenderInProfileFn,
  });
};

const useUserUpdateNotificationsSettings = () => {
  const currentUser = auth().currentUser;
  const uid = currentUser?.uid;
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const updateNotificationsSettingsFn = async (mode: boolean | Record<string, boolean>) => {
    try {
      await firestore()
        .collection(apiUserInfoCollection)
        .doc(uid)
        .update({
          notificationSettings:
            typeof mode === 'boolean'
              ? {
                  chat: mode,
                  joinedEvent: mode,
                  match: mode,
                  myEvents: mode,
                  requests: mode,
                  superInvite: mode,
                  superJoin: mode,
                }
              : mode,
        });
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  return useMutation({
    mutationKey: UserMutationsKeys.updateUserNotificationsSettings(currentUser?.uid || ''),
    mutationFn: updateNotificationsSettingsFn,
  });
};

const useUpdateUserEventList = () => {
  const currentUser = auth().currentUser;
  const userUid = currentUser?.uid ?? '';
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const updateUserEventListFn = async (uid: string) => {
    try {
      await firestore()
        .collection(apiUserInfoCollection)
        .doc(userUid)
        .update({
          eventsList: firestore.FieldValue.arrayUnion(uid),
        });
    } catch (error) {
      logErrorToSentry(error);
    }
  };

  return useMutation({
    mutationKey: UserMutationsKeys.updateUserEventList(userUid),
    mutationFn: updateUserEventListFn,
  });
};

const useUpdateUserStatusOnline = () => {
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const updateUserOnlineStatus = async (uid: string, isOnline: boolean) => {
    try {
      await firestore().collection(apiUserInfoCollection).doc(uid).update({online: isOnline});
    } catch (error) {
      logErrorToSentry(error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ['updateUserStatusOnline'],
    mutationFn: ({uid, isOnline}: {uid: string; isOnline: boolean}) => updateUserOnlineStatus(uid, isOnline),
  });
};

const useUpdateSuperInvites = () => {
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const updateSuperInvites = async (uid: string, newInvites: Partial<{weeklySuperInvites: number; superInvites: number}>) => {
    try {
      await firestore().collection(apiUserInfoCollection).doc(uid).update(newInvites);
    } catch (error) {
      logErrorToSentry(error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['updateSuperInvites'],
    mutationFn: ({uid, newInvites}: {uid: string; newInvites: Partial<{weeklySuperInvites: number; superInvites: number}>}) =>
      updateSuperInvites(uid, newInvites),
  });
};

const useUpdateSuperJoinsUser = () => {
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const updateSuperJoinsUser = async (uid: string) => {
    try {
      const getDoc = await firestore().collection(apiUserInfoCollection).doc(uid).get();
      const data = getDoc.data();

      if (!data) return;

      if (data.weeklySuperInvites && data.weeklySuperInvites > 0) {
        await firestore()
          .collection(apiUserInfoCollection)
          .doc(uid)
          .update({
            weeklySuperInvites: data.weeklySuperInvites - 1,
          });
      } else if (data.superInvites && data.superInvites > 0) {
        await firestore()
          .collection(apiUserInfoCollection)
          .doc(uid)
          .update({
            superInvites: data.superInvites - 1,
          });
      }
    } catch (error) {
      logErrorToSentry(error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['updateSuperJoinsUser'],
    mutationFn: (uid: string) => updateSuperJoinsUser(uid),
  });
};

const useFetchUserInfo = () => {
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const fetchUserInfo = async (userId: string) => {
    const userDoc = await firestore().collection(apiUserInfoCollection).doc(userId).get();
    if (!userDoc.exists) throw new Error('User not found');
    return userDoc.data();
  };

  return useMutation({
    mutationFn: fetchUserInfo,
  });
};

const useUpdateUserPassedDemo = (onSuccess: () => void) => {
  const currentUser = auth().currentUser;
  const uid = currentUser?.uid ?? '';
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);

  const updateUserPassedDemoFn = async () => {
    console.log('updateUserPassedDemoFn called, uid:', uid, 'collection:', apiUserInfoCollection);
    if (!uid) {
      console.error('No user UID available for updating passed demo status');
      throw new Error('User UID is required');
    }
    console.log('Attempting to update isPassedDemo to true');
    console.log('UID', uid);

    // Create a timeout promise that rejects after 10 seconds
    const timeoutPromise = new Promise((_, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Firebase update timed out after 10 seconds'));
      }, 10000); // 10 seconds timeout
      return () => clearTimeout(timeoutId);
    });

    // Race the Firebase update against the timeout
    try {
      return await Promise.race([
        firestore()
          .collection(apiUserInfoCollection)
          .doc(uid)
          .update({isPassedDemo: true})
          .then(() => {
            console.log('Promise resolved Successfully updated isPassedDemo');
            return true; // Return a value to indicate success
          }),
        timeoutPromise,
      ]);
    } catch (error) {
      console.log('Firebase update failed or timed out');
      console.error(error);
      throw error; // Re-throw to be caught by the mutation's error handler
    }
  };

  return useMutation({
    mutationKey: UserMutationsKeys.updateUserPassedDemo(uid),
    mutationFn: updateUserPassedDemoFn,
    onSuccess: () => {
      console.log('Mutation success callback');
      if (onSuccess) onSuccess();
    },
    onError: error => {
      console.error('Error updating isPassedDemo:', error);
      logErrorToSentry(error);
    },
  });
};

export const UserMutations = {
  useUserChangeEmail,
  useSendVerificationCode,
  useUserChangeLocation,
  useUserDeleteAccount,
  useUserUpdateGender,
  useUserUpdateShowGenderInProfile,
  useUserUpdateNotificationsSettings,
  useUpdateUserEventList,
  useUpdateUserStatusOnline,
  useUpdateSuperInvites,
  useUpdateSuperJoinsUser,
  useFetchUserInfo,
  useUpdateUserPassedDemo,
};

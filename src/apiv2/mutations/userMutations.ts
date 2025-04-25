import { useMutation } from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { useContext } from 'react';
import { UserMutationsKeys } from '../keys/userMutationkeys.ts';
import useUser from 'hooks/user/useUser';
import { isEmailValid } from 'helpers/regExpValidators.ts';
import { showToast } from 'helpers/showToast.ts';
import { logErrorToSentry } from 'helpers/logErrorsToSentry.ts';

import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext.tsx';
import { useAuthStore } from 'src/store/authStore.ts';

const useUserChangeEmail = () => {
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
  const { userMetadata } = useAuthStore();

  const changeEmailFn = async (email: string) => {
    const _isValidEmail = isEmailValid(email);
    if (!email || !_isValidEmail) {
      showToast('inviteMatch', 'Email is not valid', 'Error');
      return;
    }
    try {
      await firestore().collection(apiUserInfoCollection).doc(userMetadata?.uid).update({
        email,
      });
      showToast('inviteMatch', 'Email has been changed', 'Success');
    } catch (error) {
      showToast('inviteMatch', 'Failed to update email. Please try again.', 'Error');
      logErrorToSentry(error);
    }
  };

  return useMutation({
    mutationKey: UserMutationsKeys.changeUserEmail(userMetadata?.uid || ''),
    mutationFn: changeEmailFn,
  });
};

const useUserChangeLocation = () => {
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
  const { userMetadata } = useAuthStore();

  const changeLocationFn = async (state: boolean) => {
    const uid = userMetadata?.uid;
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
    mutationKey: UserMutationsKeys.changeUserLocation(userMetadata?.uid || ''),
    mutationFn: changeLocationFn,
  });
};


const useUserDeleteAccount = () => {
  const { userMetadata } = useAuthStore();
  const { user: userHost } = useUser();
  const {
    userInfo: apiUserInfoCollection,
    events: apiEventsCollection,
    messages: apiMessagesCollection,
  } = useContext(FirebaseCollectionsContext);
  const deleteUserAccountFn = async (variables: { verificationId: string; code: string }) => {
    const { verificationId, code } = variables;

    if (!verificationId || !code) {
      return;
    }
    try {
      await deleteUser();
    } catch (e) {
      console.log('error delete', e);
      logErrorToSentry(e);
    }
  };

  const deleteUser = async () => {
    try {
      if (userHost?.accountType === 'host') {
        const docSnapshot = await firestore().collection(apiUserInfoCollection).doc(userHost.uid).get();
        const docData = docSnapshot.data();

        if (docData?.eventsList && docData?.eventsList.length > 0) {
          const deletePromises = docData?.eventsList.map(async (id: string) => {
            const docEvent = firestore().collection(apiEventsCollection).doc(id);
            const docData = await docEvent.get();
            if (docData.exists) {
              await docEvent.delete();
            }
          });
        }
      } else {
        const docData = await firestore().collection(apiUserInfoCollection).doc(userHost?.uid).get();
        try {
          if (docData?.eventsListGuest && docData?.eventsListGuest.length > 0) {
            const deletePromises = docData?.eventsListGuest.map(async (id: string) => {
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
      await firestore().collection(apiUserInfoCollection).doc(userHost?.uid).delete();
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
    mutationKey: UserMutationsKeys.deleteUserAccount(userMetadata?.uid || ''),
    mutationFn: deleteUserAccountFn,
  });
};

const useUserUpdateGender = () => {
  const { userMetadata } = useAuthStore();
  const { user: userHost } = useUser();
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
  const updateUserGenderFn = async (variables: { gender: string; changeActiveGenderItem: () => void }) => {
    try {
      const { gender, changeActiveGenderItem } = variables;
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
    mutationKey: UserMutationsKeys.updateUserGender(userMetadata?.uid || ''),
    mutationFn: updateUserGenderFn,
  });
};

const useUserUpdateShowGenderInProfile = () => {
  const { userMetadata } = useAuthStore();
  const { user: userHost } = useUser();
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
  const updateShowGenderInProfileFn = async (variables: { state: string; changeShowGenderState: () => void }) => {
    try {
      const { state, changeShowGenderState } = variables;
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
    mutationKey: UserMutationsKeys.updateUserShowGenderInProfile(userMetadata?.uid || ''),
    mutationFn: updateShowGenderInProfileFn,
  });
};

const useUserUpdateNotificationsSettings = () => {
  const { userMetadata } = useAuthStore();
  const uid = userMetadata?.uid;
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
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
    mutationKey: UserMutationsKeys.updateUserNotificationsSettings(userMetadata?.uid || ''),
    mutationFn: updateNotificationsSettingsFn,
  });
};

const useUpdateUserEventList = () => {
  const { userMetadata } = useAuthStore();
  const userUid = userMetadata?.uid ?? '';
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
  const updateUserEventListFn = async (uid: string) => {
    try {
      const docData = await firestore().collection(apiUserInfoCollection).doc(userUid).get();
      const data = docData.data();
      if (!data) return;
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
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
  const updateUserOnlineStatus = async (uid: string, isOnline: boolean) => {
    try {
      await firestore().collection(apiUserInfoCollection).doc(uid).update({ online: isOnline });
    } catch (error) {
      logErrorToSentry(error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ['updateUserStatusOnline'],
    mutationFn: ({ uid, isOnline }: { uid: string; isOnline: boolean }) => updateUserOnlineStatus(uid, isOnline),
  });
};

const useUpdateSuperInvites = () => {
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
  const updateSuperInvites = async (uid: string, newInvites: Partial<{ weeklySuperInvites: number; superInvites: number }>) => {
    try {
      await firestore().collection(apiUserInfoCollection).doc(uid).update(newInvites);
    } catch (error) {
      logErrorToSentry(error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['updateSuperInvites'],
    mutationFn: ({ uid, newInvites }: { uid: string; newInvites: Partial<{ weeklySuperInvites: number; superInvites: number }> }) =>
      updateSuperInvites(uid, newInvites),
  });
};

const useUpdateSuperJoinsUser = () => {
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
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
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);
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
  const { userMetadata } = useAuthStore();
  const uid = userMetadata?.uid ?? '';
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);

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
          .update({ isPassedDemo: true })
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

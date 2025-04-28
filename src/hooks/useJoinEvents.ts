import { useState } from "react";
import firestore from '@react-native-firebase/firestore';
import Config from "react-native-config";
import useUser from "src/hooks/user/useUser";
import { showToast } from "helpers/showToast";
import { logErrorToSentry } from "helpers/logErrorsToSentry";
import { LIKED } from "constants/common";

const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

export const useJoinEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isVisibleMatch, setIsVisibleMatch] = useState<boolean>(false);
  const [ownerEventUserPhoto, setOwnerEventUserPhoto] = useState();
  const [matchData, setMatchData] = useState<any>({});

  const { user: userHost, isLoading: userIsLoading, error: userError } = useUser();


  const onInvite = async (list: any) => {
    if (!userHost) {
      console.warn('useJoinEvents: Cannot invite, user data not loaded.');
      showToast('inviteMatch', 'Cannot perform action, user data unavailable.', 'Error');
      return;
    }

    try {
      const activeEvent = list?.id;

      const userLiked = {
        gender: userHost?.gender,
        name: userHost?.name,
        superInvite: false,
        uid: userHost?.uid,
        status: LIKED,
        userPhoto: userHost?.photos?.[0]?.image,
      };

      await firestore()
        .collection(apiEventsCollection)
        .doc(activeEvent)
        .update({
          requestsList: firestore.FieldValue.arrayUnion(userLiked),
        });
      showToast('inviteMatch', '', 'The invitation has been successfully withdrawn!');
    } catch (e) {
      showToast('inviteMatch', 'There was an issue with the invitation. Please try again later.', 'Error');
      logErrorToSentry(e)
      // console.log(e);
    }
  };

  const onRejected = async (list: any) => {
    try {
      const filterEvents = events?.filter(i => i?.info?.id !== list?.id);
      setEvents(filterEvents);
    } catch (e) {
      // console.log(e);
    }
  };

  const handleCloseMatch = (): void => {
    setIsVisibleMatch(false);
    showToast('inviteMatch', 'Say, Hi! 👋', 'New Connection!', { ownerPhoto: ownerEventUserPhoto, status: 'INVITE MATCH' });
  };

  return {
    apiUserInfoCollection,
    isVisibleMatch,
    matchData,
    onInvite,
    onRejected,
    handleCloseMatch,
    setEvents,
    setOwnerEventUserPhoto,
    events,
    userHost,
    // userIsLoading,
    // userError,
  }
}
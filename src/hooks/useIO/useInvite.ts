import {EventMutations} from 'src/apiv2/mutations/eventMutations';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {Dispatch, SetStateAction} from 'react';
import {UserMutations} from 'src/apiv2/mutations/userMutations';
import {Event, EventData} from 'src/types/event';
import {UserInfo} from 'src/types/userInfo';
import {showToast} from 'helpers/showToast.ts';
import {useUser} from 'src/store/userStore';
import {useMyEvents} from 'src/store/myEvents';
import {ACCEPTED_STATUS, INVITE_MATCH_STATUS, LIKED} from 'constants/common';
import {MatchData} from 'screens/App/IO/screens/Match/Match.tsx';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {handleCreateChat} from 'helpers/chat';
import {updateGuestEventsList} from 'helpers/updateGuestEventsList';
import {useScrollPosition} from 'src/store/scrollPosition';

interface UseInviteProps {
  setIsVisibleModalFullEvent: Dispatch<SetStateAction<boolean>>;
  setEvents: Dispatch<SetStateAction<{info: EventData; component: JSX.Element}[]>>;
  setMatchData: Dispatch<SetStateAction<MatchData | null>>;
  setIsVisibleMatch: Dispatch<SetStateAction<boolean>>;
  handleAddSwipeCardUid: (uid: string) => void;
  setCurrentEventCardPosition: Dispatch<SetStateAction<number>>;
  handleSwipeCardRight: () => void;
}

export const useInvite = ({
  setIsVisibleModalFullEvent,
  setEvents,
  setMatchData,
  setIsVisibleMatch,
  handleAddSwipeCardUid,
  setCurrentEventCardPosition,
  handleSwipeCardRight,
}: UseInviteProps) => {
  const {mutateAsync: fetchUserInfo} = UserMutations.useFetchUserInfo();
  const {mutateAsync: fetchEventInfo} = EventMutations.useFetchEventInfo();
  const {mutateAsync: inviteUser} = EventMutations.useInviteUser();
  const {mutateAsync: requestUser} = EventMutations.useRequestUser();
  const {mutate: updateSuperJoins} = UserMutations.useUpdateSuperJoinsUser();
  const {user: userInfo} = useUser();
  const {activeEvent, setLoadingCardsList} = useMyEvents();
  const setScrollPosition = useScrollPosition((i: any) => i?.setScrollPosition);

  const route = useRoute();
  const isDemo = (route?.params as {isDemo?: boolean})?.isDemo;

  const isHost = userInfo?.accountType === 'host';

  const onInvite = async (forUserUid: string, eventId: string, superInvite?: boolean) => {
    try {
      const guestQuery = await fetchUserInfo(forUserUid);

      if (!guestQuery) {
        return;
      }
      const guestData = guestQuery as UserInfo;

      const activeEventId = activeEvent?.id ? activeEvent?.id : eventId;

      const eventQuery = await fetchEventInfo(activeEventId);

      if (!eventQuery) {
        return;
      }

      const event = eventQuery as EventData;
      if (!event || event?.statusEvent === false || event?.isCancelled === true) {
        return;
      }

      const userInvited: Event.User = {
        gender: isHost ? guestData?.gender : userInfo?.gender,
        name: isHost ? guestData?.name : userInfo?.name,
        status: LIKED,
        superInvite: superInvite ? superInvite : false,
        uid: isHost ? guestData?.uid : userInfo?.uid,
        userPhoto: isHost ? (guestData?.photos[0]?.image as string) : (userInfo?.photos[0]?.image as string),
        createdAt: moment().format('YYYY-MM-DD'),
      };
      const acceptedUsersList = event?.usersList?.filter(i => i?.status === ACCEPTED_STATUS);
      if (isHost) {
        const maxGuests = event?.male + event?.female;

        if (acceptedUsersList?.length >= maxGuests) {
          showToast('inviteMatch', 'You have reached the maximum number of guests', 'Invite');
          setIsVisibleModalFullEvent(true);
          setLoadingCardsList(true);
          setEvents(prev => [...prev]);
          setLoadingCardsList(false);
          return;
        }

        const matchedGuest = event.requestsList?.find(reqUser => reqUser?.uid === forUserUid && reqUser?.status === LIKED);
        const {matchedGuestData} = await inviteUser({
          matchedGuest,
          userInvited,
          event,
          userInfo,
          guestData,
          activeEventId,
          superInvite,
          forUserUid,
          isDemo,
        });
        if (matchedGuest && matchedGuestData) {
          await handleCreateChat(matchedGuestData);
          await updateGuestEventsList(activeEventId, forUserUid);
          setMatchData(matchedGuestData);
          setIsVisibleMatch(true);
        }
      } else {
        if (acceptedUsersList?.length < event.male + event.female) {
          const matchedGuest = event.usersList?.find(invUser => invUser?.uid === userInfo?.uid && invUser?.status === LIKED);
          let data = {};
          let matchedGuestData: MatchData | null = null;
          if (matchedGuest) {
            const updatedUsersList = event?.usersList?.map(invUser => {
              if (invUser?.uid === userInfo?.uid) {
                return {
                  ...invUser,
                  status: INVITE_MATCH_STATUS,
                };
              }
              return invUser;
            });
            data = {
              usersList: updatedUsersList,
            };
            matchedGuestData = {
              type: 'match',
              nameHost: event?.hostName,
              nameGuest: matchedGuest?.name,
              imageUri: matchedGuest?.userPhoto,
              uidHost: event?.uid,
              uidGuest: matchedGuest?.uid,
              eventId: activeEventId,
              superInvite: superInvite ? superInvite : false,
              userHostImageUri: event?.hostImage,
              joinEvents: userInfo?.joinEvents,
              location: userInfo?.location || '',
              premium: guestData.accountPremium,
              dateHost: guestData.date,
              dateGuest: userInfo?.date,
              onlineGuest: userInfo?.online,
              accountConfirmedHost: userInfo?.accountConfirmed,
              accountConfirmedGuest: userInfo?.accountConfirmed,
              usersListHost: event.usersList,
              accountTypeHost: guestData.accountType,
              accountTypeGuest: userInfo?.accountType,
              eventImage: event.photos[0].image,
              guestsInvited: event.male + event.female,
            };
          } else {
            data = {
              requestsList: firestore.FieldValue.arrayUnion(userInvited),
            };
          }

          requestUser({activeEventId, data, event, userInfo, guestData, isDemo});

          if (matchedGuest && matchedGuestData) {
            await handleCreateChat(matchedGuestData);
            setMatchData(matchedGuestData);
            setIsVisibleMatch(true);
          }

          if (superInvite) {
            updateSuperJoins(userInfo.uid);
          }
        } else {
          const matchedGuestData = {
            type: 'match',
            nameHost: event?.hostName,
            nameGuest: userInfo?.name,
            imageUri: userInfo?.photos[0].image,
            uidHost: userInfo?.uid,
            uidGuest: event?.uid,
            eventId: activeEventId,
            superInvite: superInvite ? superInvite : false,
            userHostImageUri: event?.hostImage,
            joinEvents: userInfo?.joinEvents,
            location: userInfo?.location,
            premium: userInfo.accountPremium,
            dateHost: userInfo.date,
            dateGuest: userInfo?.date,
            onlineGuest: userInfo?.online,
            accountConfirmedHost: userInfo?.accountConfirmed,
            accountConfirmedGuest: userInfo?.accountConfirmed,
            usersListHost: event.usersList,
            accountTypeHost: userInfo.accountType,
            accountTypeGuest: userInfo?.accountType,
            eventImage: event.photos[0].image,
            guestsInvited: event.male + event.female,
          };

          showToast('inviteMatch', `Chat with ${event.hostName} to find a solution`, "The event is full: You can't join", {
            ownerPhoto: event.hostImage,
            status: 'FULL',
            path: 'chatCreate',
            params: matchedGuestData,
          });
          setLoadingCardsList(true);
          setEvents(prev => [...prev]);
          setLoadingCardsList(false);
          return;
        }
      }
      setEvents(prev => prev.filter(i => (isHost ? i?.info?.uid !== forUserUid : i?.info?.id !== eventId)));
      setScrollPosition(0);
    } catch (error) {
      logErrorToSentry(error);
      console.error(error);
    }
  };

  const handleInvite = ({
    uid,
    id,
    withSwipeAnimation,
    superInvite,
  }: {
    uid: string;
    id: string;
    withSwipeAnimation: boolean;
    superInvite?: boolean;
  }) => {
    setScrollPosition(0);
    handleAddSwipeCardUid(uid);
    onInvite(uid, id, superInvite);
    setTimeout(() => {
      setCurrentEventCardPosition(prev => prev + 1);
    }, 500);
    if (withSwipeAnimation) {
      handleSwipeCardRight();
    }
  };

  return {
    onInvite,
    handleInvite,
  };
};

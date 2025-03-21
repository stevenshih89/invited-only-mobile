import {inviteUser, IOscreen, joinEvent} from 'constants/analitycs';
import {EventMutations} from 'src/apiv2/mutations/eventMutations';
import analytics from '@react-native-firebase/analytics';
import {useUser} from 'src/store/userStore';
import {useMyEvents} from 'src/store/myEvents';
import {Dispatch, SetStateAction} from 'react';
import {EventData} from 'src/types/event';

interface UseRejectProps {
  setEvents: Dispatch<SetStateAction<{info: EventData; component: JSX.Element}[]>>;
  setScrollPosition: (data: number) => void;
  handleAddSwipeCardUid: (uid: string) => void;
  setCurrentEventCardPosition: Dispatch<SetStateAction<number>>;
  handleSwipeCardLeft: () => void;
}

export const useReject = ({
  setEvents,
  setScrollPosition,
  handleAddSwipeCardUid,
  setCurrentEventCardPosition,
  handleSwipeCardLeft,
}: UseRejectProps) => {
  const {user: userInfo} = useUser();
  const rejectEvent = EventMutations.useRejectEvent();
  const {activeEvent} = useMyEvents();

  const isHost = userInfo?.accountType === 'host';

  const onReject = (uid: string, eventId: string) => {
    const activeEventId = activeEvent?.id ? activeEvent?.id : eventId;
    const rejectUid = isHost ? uid : userInfo?.uid;
    try {
      analytics().logEvent(`${IOscreen}_reject_${isHost ? inviteUser : joinEvent}`, {
        hostUid: isHost ? userInfo?.uid : eventId,
        guestUid: isHost ? uid : userInfo?.uid,
      });
    } catch (e) {
      console.error(e);
    }

    rejectEvent.mutate({activeEventId, rejectUid, isEventOwner: userInfo?.uid === activeEvent?.uid});

    setTimeout(() => {
      setEvents(prev => prev.filter(i => (isHost ? i?.info?.uid !== uid : i?.info?.id !== eventId)));
    }, 100);
  };

  const handleReject = ({uid, id, withSwipeAnimation}: {uid: string; id: string; withSwipeAnimation: boolean}) => {
    setScrollPosition(0);
    handleAddSwipeCardUid(uid);
    onReject(uid, id);
    setTimeout(() => {
      setCurrentEventCardPosition(prev => prev + 1);
    }, 500);
    if (withSwipeAnimation) {
      handleSwipeCardLeft();
    }
  };

  return {
    handleReject,
  };
};

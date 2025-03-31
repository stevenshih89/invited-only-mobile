import auth from '@react-native-firebase/auth';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import {logErrorToSentry} from 'helpers/logErrorsToSentry.ts';
import {EventQueryKeys} from '../keys/eventKeys.ts';
import {EventData} from '../../types/event.ts';
import {useMyEvents} from '../../store/myEvents';
import {showToast} from 'helpers/showToast.ts';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext.tsx';
import {useContext} from 'react';

const useEvents = () => {
  const user = auth()?.currentUser;
  const queryClient = useQueryClient();
  const setMyEvents = useMyEvents(state => state.setMyEvents);
  const uid = user?.uid ?? '';
  const {events: apiEventsCollection} = useContext(FirebaseCollectionsContext);

  const eventsWatchFn = async () => {
    try {
      // Return a cleanup function that Firebase will call when the query is no longer needed
      return firestore()
        .collection(apiEventsCollection)
        .where('uid', '==', uid)
        .onSnapshot(docSnapshot => {
          let events: EventData[] = [];

          if (!docSnapshot.empty) {
            events = docSnapshot.docs.map(
              doc =>
                ({
                  id: doc.id,
                  ...doc.data(),
                }) as EventData,
            );
          }

          queryClient.setQueryData(EventQueryKeys.getEvents(uid), events);
          setMyEvents(events);
        });
    } catch (error) {
      showToast('inviteMatch', 'Failed to load your events. Please try again later.', 'Error');
      logErrorToSentry(error);
    }
  };

  return useQuery({
    queryKey: EventQueryKeys.getEvents(uid),
    queryFn: eventsWatchFn,
    gcTime: Infinity, // Keep the data in cache
  });
};

const useEvent = (eventId: string | null) => {
  const queryClient = useQueryClient();
  const {events: apiEventsCollection} = useContext(FirebaseCollectionsContext);

  const events = async () => {
    if (!eventId) return null;
    
    try {
      // Get the data once without a listener
      const doc = await firestore()
        .collection(apiEventsCollection)
        .doc(eventId)
        .get();
        
      if (!doc.exists) {
        return null;
      }
      
      const data = doc.data() as EventData;
      return data;
    } catch (error) {
      logErrorToSentry(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: EventQueryKeys.getEvents(eventId ?? ''),
    queryFn: events,
    enabled: !!eventId,
    staleTime: 30000, // 30 seconds before refetching
  });
};

export const EventQueries = {
  useEvents,
  useEvent,
};

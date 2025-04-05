import {useQuery, useQueryClient} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
import {logErrorToSentry} from 'helpers/logErrorsToSentry.ts';
import {EventQueryKeys} from '../keys/eventKeys.ts';
import {Event, EventData} from '../../types/event.ts';
import auth from '@react-native-firebase/auth';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext.tsx';
import {useContext} from 'react';
import {BACKEND_BASE_64_AUTH, BACKEND_BASE_URL} from '@env';
import {GetUsersForEventResponse} from '../types/usersForEventResponse.ts';
import {User} from 'src/types/userInfo.ts';

export interface EventApiResponse {
  date: string;
  hostName: string;
  isCancelled: boolean;
  description: string;
  photos: string[];
  uid: string;
  createdAt: string;
  hour: string;
  name: string;
  eventReviewed: boolean;
  id: string;
  statusEvent: boolean;
  female: number;
  male: number;
}

const useEvent = (eventId: string | null) => {

  const queryClient = useQueryClient();
  const {events: apiEventsCollection} = useContext(FirebaseCollectionsContext);

  const events = async () => {
    if (!eventId) return null;

    try {
      // Get the data once without a listener
      const doc = await firestore().collection(apiEventsCollection).doc(eventId).get();

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

const useGetMyEvents = () => {
  const currentUser = auth().currentUser;
  const getMyEventsFn = () => {
    const headers = new Headers();
    headers.append('Authorization', `Basic ${BACKEND_BASE_64_AUTH}`);

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    return fetch(`${BACKEND_BASE_URL}/events/host-events/${currentUser?.uid}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.error(error));
  };

  return useQuery<EventApiResponse[]>({queryFn: getMyEventsFn, queryKey: EventQueryKeys.getEvents(currentUser?.uid)});
};

const useGetEventsForUser = () => {
  const currentUser = auth().currentUser;
  const getEventForUserFn = () => {
    const headers = new Headers();
    headers.append('Authorization', `Basic ${BACKEND_BASE_64_AUTH}`);

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    return fetch(`${BACKEND_BASE_URL}/events/events-for-user/${currentUser?.uid}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.error(error));
  };

  return useQuery<{events: Event.Info[]}>({queryFn: getEventForUserFn, queryKey: EventQueryKeys.getEventsForUser(currentUser?.uid)});
};

const useGetUserForEvent = (eventUid: string) => {
  const getUserForEventFn = () => {
    const headers = new Headers();
    headers.append('Authorization', `Basic ${BACKEND_BASE_64_AUTH}`);

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };
    console.log(`${BACKEND_BASE_URL}/users/users-for-event/${eventUid}`);

    return fetch(`${BACKEND_BASE_URL}/users/users-for-event/${eventUid}`, requestOptions)
      .then(response => response.json())
      .catch(error => console.error(error));
  };
  return useQuery<{users: User.Info[]}>({queryFn: getUserForEventFn, queryKey: EventQueryKeys.getEvents()});
};

export const EventQueries = {
  useGetMyEvents,
  useEvent,
  useGetUserForEvent,
  useGetEventsForUser,
};

import Config from "react-native-config";
import auth from "@react-native-firebase/auth";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import firestore from "@react-native-firebase/firestore";
import {logErrorToSentry} from "helpers/logErrorsToSentry.ts";
import {EventQueryKeys} from "../keys/eventKeys.ts";
import {EventData} from "../../types/event.ts";
import {useMyEvents} from "../../store/myEvents";
import {showToast} from "helpers/showToast.ts";

const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';

const useEvents = () => {
	const user = auth()?.currentUser;
	const queryClient = useQueryClient();
	const setMyEvents = useMyEvents(state => state.setMyEvents);
	const uid = user?.uid ?? '';

	const eventsWatchFn = async () => {
		try {

			const unsubscribe = firestore()
				.collection(apiEventsCollection)
				.where('uid', '==', uid)
				.onSnapshot((docSnapshot) => {
					let events: EventData[] = [];

					if (!docSnapshot.empty) {
						events = docSnapshot.docs.map(doc => ({
							id: doc.id,
							...doc.data(),
						} as EventData));
					}

					queryClient.setQueryData(EventQueryKeys.getEvents(uid), () => events);
					setMyEvents(events);
				});
			return () => unsubscribe();
		} catch (error) {
			showToast('inviteMatch', 'Failed to load your events. Please try again later.', 'Error');
			logErrorToSentry(error);
		}
	};

	return useQuery({
		queryKey: EventQueryKeys.getEvents(uid),
		queryFn: eventsWatchFn,
	});
};

export const EventQueries = {
	useEvents
}

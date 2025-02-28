import firestore from "@react-native-firebase/firestore";
import {logErrorToSentry} from "helpers/logErrorsToSentry.ts";
import {useMutation} from "@tanstack/react-query";
import {EventMutationsKeys} from "../keys/eventMutationsKeys.ts";
import analytics from "@react-native-firebase/analytics";
import Config from "react-native-config";
import {showToast} from "helpers/showToast.ts";
import {EventData} from "../../types/event.ts";

const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
const useUpdateEvent = (eventId: string) => {

	const updateEventFn = async (variables: {
		eventData: any,
		onSuccess: (data: any) => Promise<void>
	}) => {
		try {
			const {eventData, onSuccess} = variables;

			await firestore().collection(apiEventsCollection).doc(eventId).update(eventData);
			analytics().logEvent('event_saved_changes', {
				eventId: eventId,
			});
			const getDoc = await firestore().collection(apiEventsCollection).doc(eventId).get();
			const data = getDoc.data();

			await onSuccess(data)
			showToast('inviteMatch', 'Continue invite👋', 'Event updated');
		} catch (e) {
			showToast('inviteMatch', 'Something went wrong while updating the event. Please try again later.', 'Error');
			logErrorToSentry(e)
			console.log('error update event', e);
		}
	};

	return useMutation({
		mutationKey: EventMutationsKeys.updateEvent(eventId),
		mutationFn: updateEventFn
	})
}

const useCreateEvent = () => {

	const createEventFn = async (variables: {
		uid: string,
		event: EventData
	}) => {
		const {uid, event} = variables;

		try {
			await firestore().collection(apiEventsCollection).doc(uid).set(event);
			return true;
		} catch (error) {
			showToast('inviteMatch', 'An issue occurred while creating the event. Please try again later.', 'Error');
			logErrorToSentry(error)
		}
	}

	return useMutation({
		mutationKey: EventMutationsKeys.createEvent(),
		mutationFn: createEventFn
	})
}

export const EventMutations = {
	useUpdateEvent,
	useCreateEvent
}

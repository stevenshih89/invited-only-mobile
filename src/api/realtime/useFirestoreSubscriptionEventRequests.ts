import { getFirestore } from "@react-native-firebase/firestore";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { components } from "@invited-only/invited-only-api";
import { logErrorToSentry } from "helpers/logErrorsToSentry";

interface UseFirestoreSubscriptionEventRequestsProps {
    collectionName: string;
    queryKey: QueryKey;
    hostId: string;
}

/**
 * Listens to a Firestore collection for event attendee requests based on hostId 
 * and updates the React Query cache.
 */
const useFirestoreSubscriptionEventRequests = ({ collectionName, queryKey, hostId }: UseFirestoreSubscriptionEventRequestsProps) => {
    const db = getFirestore();
    const queryClient = useQueryClient();

    useEffect(() => {
        // Ensure we have a valid collection name and hostId before subscribing
        if (!collectionName || !hostId) {
            console.warn('Firestore subscription requires collectionName and hostId.');
            return;
        }

        console.log(`Setting up Firestore listener for collection: ${collectionName}, hostId: ${hostId}`);

        const query = db.collection(collectionName).where('hostId', '==', hostId);

        const unsubscribe = query.onSnapshot(
            (snapshot) => {
                try {
                    const eventRequests = snapshot.docs.map(doc => ({
                        id: doc.id, // Include document ID
                        ...(doc.data() as Omit<components['schemas']['ConnectionRequest'], 'id'>)
                    }));

                    console.log(`Received ${eventRequests.length} event requests from Firestore for host ${hostId}`);

                    // Update the React Query cache with the entire new list
                    queryClient.setQueryData<components['schemas']['ConnectionRequest'][]>(queryKey, eventRequests);

                } catch (error) {
                    console.error('Error processing Firestore snapshot or setting query data:', error);
                    logErrorToSentry(error, { extra: { collectionName, queryKey, hostId } });
                }
            },
            (error) => {
                // Handle listener errors
                console.error(`Firestore listener error for collection ${collectionName}, hostId ${hostId}:`, error);
                logErrorToSentry(error, { extra: { collectionName, queryKey, hostId }, level: 'error' });
            }
        );

        // Cleanup function
        return () => {
            console.log(`Unsubscribing from Firestore listener for collection: ${collectionName}, hostId: ${hostId}`);
            unsubscribe();
        };

    }, []);
}

export default useFirestoreSubscriptionEventRequests; 
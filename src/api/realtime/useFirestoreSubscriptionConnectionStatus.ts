import { getFirestore } from "@react-native-firebase/firestore";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { components } from "../v1";

interface UseFirestoreSubscriptionProps {
    collectionName: string;
    queryKey: QueryKey;
    docId: string;
}

const useFirestoreSubscriptionConnectionStatus = ({ collectionName, queryKey, docId }: UseFirestoreSubscriptionProps) => {
    const db = getFirestore();
    const queryClient = useQueryClient();

    useEffect(() => {
        const unsubscribe = db.collection(collectionName).doc(docId).onSnapshot((snapshot) => {
            const connectionStatus: components['schemas']['ConnectionRequest'] = snapshot.data() as components['schemas']['ConnectionRequest'];
            try {

                queryClient.setQueryData(queryKey, (oldData: components['schemas']['ConnectionRequest'][]) => {
                    if (oldData) {
                        const existingIndex = oldData.findIndex(item => {
                            return item.guestId === connectionStatus?.guestId && item?.hostId === connectionStatus?.hostId && item.eventId === connectionStatus?.eventId;
                        });
                        if (existingIndex > -1) {
                            const newData = [...oldData];
                            newData[existingIndex] = connectionStatus;
                            return newData;
                        } else {
                            return [...oldData, connectionStatus];
                        }
                    } else {
                        return [connectionStatus];
                    }
                });
            } catch (error) {
                console.error('error setting query data', error);
            }
        });
        return () => unsubscribe();
    }, []);
}
export default useFirestoreSubscriptionConnectionStatus;
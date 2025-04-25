import { collection, getFirestore, query } from "@react-native-firebase/firestore";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { components } from "../v1";

interface UseFirestoreSubscriptionProps {
    path: string;
    queryKey: QueryKey;
}

const useFirestoreSubscription = ({ path, queryKey }: UseFirestoreSubscriptionProps) => {
    const db = getFirestore();
    const queryClient = useQueryClient();

    useEffect(() => {
        const unsubscribe = query(collection(db, path)).onSnapshot((snapshot) => {
            console.log('snapshot new', snapshot.docs);
            const chatMessages: components['schemas']['ChatMessage'][] = snapshot.docs.map((doc) => doc.data());
            try {
                queryClient.setQueryData(queryKey, chatMessages);
            } catch (error) {
                console.error('error setting query data', error);
            }
        });
        return () => unsubscribe();
    }, []);
}
export default useFirestoreSubscription;
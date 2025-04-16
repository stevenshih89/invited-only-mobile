import { collection, getFirestore } from "@react-native-firebase/firestore";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useFirestoreSubscription = (path: string, type: string, queryKey: QueryKey) => {
    const db = getFirestore();
    const queryClient = useQueryClient();

    useEffect(() => {
        collection(db, path).onSnapshot((snapshot) => {
            console.log('snapshot', snapshot.docs.map((doc) => doc.data()));
            queryClient.setQueryData(queryKey, snapshot.docs.map((doc) => doc.data()).sort((a, b) => a.timestamp - b.timestamp));
        });
    }, []);
}
export default useFirestoreSubscription;
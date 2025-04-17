import { collection, getFirestore } from "@react-native-firebase/firestore";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useFirestoreSubscription = (path: string, queryKey: QueryKey) => {
    const db = getFirestore();
    const queryClient = useQueryClient();

    useEffect(() => {
        collection(db, path).onSnapshot((snapshot) => {
            queryClient.setQueryData(queryKey, snapshot.docs);
        });
    }, []);
}
export default useFirestoreSubscription;
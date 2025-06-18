import { useCallback, useContext } from "react";
import { components } from "@invited-only/invited-only-api";
import { useQueryClient } from "@tanstack/react-query";
import { BackendApiContext } from "contexts/BackendApiContex";
import { useAuthStore } from "src/store/authStore";


const useUserSwipe = () => {
    const backendApi = useContext(BackendApiContext);
    const queryClient = useQueryClient();
    const { userMetadata } = useAuthStore();
    const { mutate, isPending: isSwipingUser } = backendApi.useMutation('post', '/swipe/create', {
        onSuccess: () => {
            queryClient.setQueriesData(
                { queryKey: ['get', '/users/{id}', { params: { path: { id: userMetadata?.uid } } }] },
                (old: components['schemas']['User']) => {
                    return {
                        ...old,
                        dailySwipes: {
                            ...old.dailySwipes,
                            count: (old.dailySwipes?.count || 0) - 1,
                            swipedUserId: userMetadata?.uid,
                        },
                    };
                },
            );
        },
    });
    const swipeUser = useCallback((userId: string) => {
        mutate({
            body: {
                userId: userMetadata?.uid,
                swipedUserId: userId,
            },
        });
    }, [mutate]);

    return { swipeUser, isSwipingUser };
};

export default useUserSwipe;
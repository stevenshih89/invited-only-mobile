import { useCallback, useContext, useState } from "react";
import { BackendApiContext } from "contexts/BackendApiContex";
import { useAuthStore } from "src/store/authStore";

interface UserSwipe {
    initialSwipeCount: number;
}

const useUserSwipe = ({ initialSwipeCount }: UserSwipe) => {
    const backendApi = useContext(BackendApiContext);
    const [swipeCount, setSwipeCount] = useState(initialSwipeCount);
    const { userMetadata } = useAuthStore();
    const { mutate, isPending: isSwipingUser } = backendApi.useMutation('post', '/swipe/create', {
        onSuccess: () => {
            setSwipeCount(swipeCount - 1);
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

    return { swipeUser, isSwipingUser, swipeCount };
};

export default useUserSwipe;
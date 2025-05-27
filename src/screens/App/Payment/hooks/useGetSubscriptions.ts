import { useQueryClient } from "@tanstack/react-query";

import { components } from "@invited-only/invited-only-api";
import invitedOnlyBackendApi from "src/api/backend-api";
import { useAuthStore } from "src/store/authStore";

const useGetSubscriptions = () => {
    const queryClient = useQueryClient();
    const { userMetadata } = useAuthStore();
    const { data, isLoading, error } = invitedOnlyBackendApi.useQuery('get', '/subscription/get/{userId}', {
        params: {
            path: {
                userId: userMetadata?.uid
            }
        }
    })

    const updateSubscription = (subscriptionData: Partial<components['schemas']['Subscription']>) => {
        queryClient.setQueryData(['get', '/subscription/get/{userId}', { params: { path: { userId: userMetadata?.uid } } }], (old: any) => {
            return {
                ...old,
                ...subscriptionData,
                status: 'active'
            }
        })
        queryClient.setQueryData(['get', '/users/{id}', { params: { path: { id: userMetadata?.uid } } }], (old: components['schemas']['User']) => {
            return {
                ...old,
                accountPremium: true,
            }
        })
    }
    return {
        data,
        isLoading,
        error,
        updateSubscription
    }
};

export default useGetSubscriptions;

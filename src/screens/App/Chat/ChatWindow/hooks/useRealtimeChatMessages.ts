import invitedOnlyBackendApi from "src/api/backend-api";
import useFirestoreSubscription from "src/api/realtime/useFirestoreSubscription";



const useRealtimeChatMessages = (chatId: string) => {
    const { data: chatMessages } = invitedOnlyBackendApi.useQuery('get', '/chat/message/{chatId}', {
        params: {
            path: {
                chatId
            }
        }
    })
    useFirestoreSubscription({
        path: `devChats/${chatId}/devMessages`,
        queryKey: ['get', '/chat/message/{chatId}', { params: { path: { chatId } } }]
    })

    return {
        chatMessages,
    }
}

export default useRealtimeChatMessages;

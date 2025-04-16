import invitedOnlyBackendApi from "src/api/backend-api";
import useFirestoreSubscription from "src/api/hooks/useFirestoreSubscription";



const useRealtimeChatMessages = (chatId: string) => {
    const { data: chatMessages } = invitedOnlyBackendApi.useQuery('get', '/chat/message/{chatId}', {
        params: {
            path: {
                chatId
            }
        }
    })
    useFirestoreSubscription(`devChats/${chatId}/devMessages`, 'collection', ['get', '/chat/message/{chatId}', { params: { path: { chatId } } }])

    return {
        chatMessages,
    }
}

export default useRealtimeChatMessages;

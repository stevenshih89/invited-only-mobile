import { components } from "@invited-only/invited-only-api";
import { useQueryClient } from "@tanstack/react-query";
import invitedOnlyBackendApi from "src/api/backend-api";

const useRealtimeChatMessages = (chatId: string) => {
    const queryClient = useQueryClient();
    const { data: chatMessages, } = invitedOnlyBackendApi.useQuery('get', '/chat/message/{chatId}', {
        params: {
            path: {
                chatId
            }
        }
    })
    const updateChatMessages = (newMessages: components['schemas']['ChatMessage'][]) => {
        queryClient.setQueryData(['get', '/chat/message/{chatId}', { params: { path: { chatId } } }], (oldData: components['schemas']['ChatMessage'][]) => {
            return [...oldData, ...newMessages];
        });
    }
    return {
        chatMessages,
        updateChatMessages
    }
}

export default useRealtimeChatMessages;

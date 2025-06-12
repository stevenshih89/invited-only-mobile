import { components } from "@invited-only/invited-only-api";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { BackendApiContext } from "contexts/BackendApiContex";

interface UpdateChatMessageProps {
    newMessage: components['schemas']['ChatMessage'];
}

const useRealtimeChatMessages = (chatId: string) => {
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const queryClient = useQueryClient();
    const { data: chatMessages, isLoading } = invitedOnlyBackendApi.useQuery('get', '/chat/message/{chatId}', {
        params: {
            path: {
                chatId
            }
        }
    })
    const updateChatMessages = (props: UpdateChatMessageProps) => {
        queryClient.setQueryData(['get', '/chat/message/{chatId}', { params: { path: { chatId } } }], (oldData: components['schemas']['ChatMessage'][]) => {
            return [...oldData, props.newMessage];
        });
    }
    return {
        chatMessages,
        updateChatMessages,
        isLoading
    }
}

export default useRealtimeChatMessages;

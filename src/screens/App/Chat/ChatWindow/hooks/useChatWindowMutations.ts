import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { components } from "@invited-only/invited-only-api";
import invitedOnlyBackendApi from "src/api/backend-api";


interface UseChatWindowMutationsProps {
    chatId: string;
    userId: string;
    sendMessage: (text: string) => void;
}

const useChatWindowMutations = ({ chatId, userId, sendMessage }: UseChatWindowMutationsProps) => {
    const [newMessage, setNewMessage] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);
    const queryClient = useQueryClient();

    const { mutate: markChatAsSeen } = invitedOnlyBackendApi.useMutation('patch', '/chat/{chatId}/seen')

    useEffect(() => {
        markChatAsSeen({
            params: {
                path: {
                    chatId: chatId,
                },
            },
            body: {
                userId: userId,
            },
        });
        scrollViewRef.current?.scrollToEnd({ animated: true });
        return () => {
            markChatAsSeen({
                params: {
                    path: {
                        chatId: chatId,
                    },
                },
                body: {
                    userId: userId,
                },
            });
        }
    }, [chatId, userId]);

    const handleSendMessage = () => {
        queryClient.setQueryData(['get', '/chat/message/{chatId}', { params: { path: { chatId } } }], (oldData: components['schemas']['ChatMessage'][]) => {
            return [...oldData, {
                content: newMessage,
                senderId: userId,
                timestamp: new Date().toISOString(),
            }];
        });
        if (newMessage.trim()) {
            sendMessage(newMessage);
        }
    }

    return {
        newMessage,
        setNewMessage,
        scrollViewRef,
        handleSendMessage,
    }
}

export default useChatWindowMutations;
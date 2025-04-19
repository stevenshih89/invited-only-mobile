import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import invitedOnlyBackendApi from "src/api/backend-api";
import { components } from "src/api/v1";


interface UseChatWindowMutationsProps {
    chatId: string;
    userId: string;
}

const useChatWindowMutations = ({ chatId, userId }: UseChatWindowMutationsProps) => {
    const [newMessage, setNewMessage] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);
    const queryClient = useQueryClient();

    const { mutate: markChatAsSeen } = invitedOnlyBackendApi.useMutation('patch', '/chat/{chatId}/seen')

    const { mutate: createMessage } = invitedOnlyBackendApi.useMutation('post', '/chat/message/{chatId}', {
        onSuccess: (response, request) => {
            console.log('send message', response, request);
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }
    })

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
            createMessage({
                body: {
                    content: newMessage,
                    senderId: userId,
                },
                params: {
                    path: {
                        chatId: chatId,
                    },
                },
            });
            setNewMessage('');
        }
    }

    return {
        createMessage,
        newMessage,
        setNewMessage,
        scrollViewRef,
        handleSendMessage,
    }
}

export default useChatWindowMutations;
import { View, Text, TextInput, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import { components } from "src/api/v1";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "typescript/types";
import * as S from "./ChatWindow.style";
import { useUser } from "src/store/userStore";
import { useState, useEffect, useRef } from "react";
import SendIcon from "src/assets/images/icons/send-message.svg";
import { ChatWindowHeader } from "./ChatWindowHeader/ChatWindowHeader";
import invitedOnlyBackendApi from "src/api/backend-api";
import useRealtimeChatMessages from "./hooks/useRealtimeChatMessages";
import { isIos } from "constants/common";

type ChatWindowRouteParams = RootStackParamList['/chat/chat-window'];

export const ChatWindow = () => {
    const { mutate: createMessage } = invitedOnlyBackendApi.useMutation('post', '/chat/message/{chatId}', {
        onSuccess: () => {
            setNewMessage('');
            const timer = setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 50);
            return () => clearTimeout(timer);
        }
    })

    const scrollViewRef = useRef<ScrollView>(null);
    const route = useRoute();
    const params = route.params as ChatWindowRouteParams;
    const chat = params?.chat;
    const user = useUser((state) => state.user);
    const { chatMessages } = useRealtimeChatMessages(chat?.id || '');
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [chatMessages]);

    const formatTime = (timestamp?: string) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const sortedChatMessages = chatMessages?.sort((a, b) => {
        const timestampA = a?.timestamp ? new Date(a.timestamp).getTime() : 0;
        const timestampB = b?.timestamp ? new Date(b.timestamp).getTime() : 0;
        return timestampA - timestampB;
    });

    return (
        <S.Container>
            {chat && (
                <ChatWindowHeader
                    chat={chat}
                />
            )}

            <S.ContentContainer>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                    }}
                >
                    {chatMessages?.[0]?.timestamp && (
                        <S.TimeBadge>
                            <S.TimeText>Today at {formatTime(chatMessages?.[0]?.timestamp)}</S.TimeText>
                        </S.TimeBadge>
                    )}
                    {sortedChatMessages?.map((item) => {
                        const isOwn = item.senderId === user?.uid;
                        const avatarUrl = isOwn ? user?.facePhoto : chat?.guestImageUrl;
                        const senderName = isOwn ? user?.name : chat?.guestName;

                        return (
                            <S.MessageContainer key={item.id} isOwn={isOwn}>
                                <S.MessageRow isOwn={isOwn}>
                                    {!isOwn && avatarUrl && <S.Avatar source={{ uri: avatarUrl }} />}
                                    <S.MessageBubble isOwn={isOwn}>
                                        <S.MessageText>{item.content}</S.MessageText>
                                    </S.MessageBubble>
                                </S.MessageRow>
                                <S.SenderInfo isOwn={isOwn}>
                                    <S.SenderText>
                                        {senderName} - {formatTime(item.timestamp)}
                                    </S.SenderText>
                                </S.SenderInfo>
                            </S.MessageContainer>
                        );
                    })}
                    <View style={{ height: 10 }} />
                </ScrollView>
            </S.ContentContainer>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
            >
                <S.InputContainer>
                    <S.InputField
                        placeholder="Write your message..."
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        value={newMessage}
                        onChangeText={setNewMessage}
                    />
                    <S.SendButton onPress={() => {
                        if (newMessage.trim()) {
                            createMessage({
                                body: {
                                    content: newMessage,
                                    senderId: user?.uid || '',
                                },
                                params: {
                                    path: {
                                        chatId: chat?.id || '',
                                    },
                                },
                            });
                        }
                    }}>
                        <SendIcon />
                    </S.SendButton>
                </S.InputContainer>
            </KeyboardAvoidingView>

        </S.Container>
    );
};  
import { View, Platform, ScrollView, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as S from "./ChatWindow.style";
import { ChatWindowHeader } from "./ChatWindowHeader/ChatWindowHeader";
import useRealtimeChatMessages from "./hooks/useRealtimeChatMessages";
import useChatWindowMutations from "./hooks/useChatWindowMutations";
import { RootStackParamList } from "typescript/types";
import useUser from "hooks/user/useUser";
import SendIcon from "src/assets/images/icons/send-message.svg";
import useChatSocket from "src/api/realtime/useChatSocket";
import { whiteColor } from "constants/colors";
import DefaultBackground from "components/DefaultBackground/DefaultBackground";


type ChatWindowRouteParams = RootStackParamList['/chat/chat-window'];

export const ChatWindow = () => {
    const route = useRoute();
    const params = route.params as ChatWindowRouteParams;
    const chat = params?.chat;
    const chatId = `${chat?.eventId}_${chat?.hostId}_${chat?.guestId}`;
    const isJoinedEvent = params?.isJoinedEvent;
    const { chatMessages, updateChatMessages, isLoading } = useRealtimeChatMessages(chatId);
    const { user } = useUser();
    const { sendMessage } = useChatSocket(chatId, updateChatMessages);
    const { newMessage, setNewMessage, scrollViewRef, handleSendMessage } = useChatWindowMutations({
        chatId: chatId,
        userId: user?.uid || '',
        sendMessage: sendMessage
    });


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
                    isJoinedEvent={isJoinedEvent}
                />
            )}

            {isLoading ? (
                <DefaultBackground>
                    <ActivityIndicator size="large" color={whiteColor} />
                </DefaultBackground>
            ) : (
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
                            const avatarUrl = isOwn ? user?.facePhoto : isJoinedEvent ? chat?.hostImageUrl : chat?.guestImageUrl;
                            const senderName = isOwn ? user?.name : isJoinedEvent ? chat?.hostName : chat?.guestName;

                            return (
                                <S.MessageContainer key={item.timestamp} isOwn={isOwn}>
                                    <S.MessageRow isOwn={isOwn}>
                                        {!isOwn && avatarUrl && <S.Avatar source={{ uri: avatarUrl }} />}
                                        <S.MessageBubble isOwn={isOwn}>
                                            <S.MessageText>
                                                {typeof item?.content === 'object' ? JSON.stringify(item.content) : item?.content}
                                            </S.MessageText>
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
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <S.InputContainer>
                    <S.InputField
                        placeholder="Write your message..."
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        value={newMessage}
                        onChangeText={setNewMessage}
                    />
                    <S.SendButton disabled={!newMessage || newMessage.trim() === ''} onPress={
                        () => {
                            handleSendMessage();
                            setNewMessage('');
                        }
                    }>
                        {newMessage.trim() === '' && <S.DisabledOverlay />}
                        <SendIcon />
                    </S.SendButton>
                </S.InputContainer>
            </KeyboardAvoidingView>

        </S.Container>
    );
};  
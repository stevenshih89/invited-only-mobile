import { io, Socket } from 'socket.io-client';

import { ClientToServerEvents, components, MessagePayload, ServerToClientEvents } from '@invited-only/invited-only-api';
import { useCallback, useEffect, useState } from 'react';
import { APP_ENV, SOCKET_URL } from '@env';

import { useAuthStore } from 'src/store/authStore';
import useUser from 'hooks/user/useUser';
import useRefreshToken from 'hooks/auth/useRefreshToken';

interface UseChatSocketReturn {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
    sendMessage: (text: string) => void;
}

interface UpdateChatMessageProps {
    newMessage: components['schemas']['ChatMessage'];
}


export const useChatSocket = (chatId: string, updateChatMessages: (props: UpdateChatMessageProps) => void): UseChatSocketReturn => {
    const { refreshToken } = useRefreshToken();
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
    const { accessToken } = useAuthStore();
    const { user } = useUser();

    useEffect(() => {
        const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL + '/chat', {
            path: `/${APP_ENV}/socket.io/chat`,
            reconnectionAttempts: 5,
            reconnectionDelay: 3000,
            transports: ['websocket'],
            auth: {
                token: accessToken,
            },
        });

        setSocket(newSocket);

        const handleConnect = () => {
            console.log('handleConnect', chatId);
            newSocket.emit('joinChatRoom', chatId);
        };

        const handleDisconnect = async (reason: Socket.DisconnectReason) => {
            console.warn('Socket disconnected:', reason);


        };

        const handleConnectError = async (error: Error) => {
            console.error('Socket connection error:', error.message);
            if (error.message === 'Token expired.' && newSocket) {
                try {
                    const refreshedToken = await refreshToken();
                    if (refreshedToken && newSocket) {
                        newSocket.auth = { token: refreshedToken };
                        newSocket.connect();
                    } else {
                        console.error('Failed to refresh token or socket is invalid.');
                    }
                } catch (error) {
                    console.error('Error during token refresh or reconnection:', error);
                }
            }
        };

        const handleReceiveMessage = (payload: { senderId: string; message: any; timestamp: Date }) => {
            updateChatMessages({
                newMessage: {
                    chatId: chatId,
                    content: payload.message,
                    senderId: payload.senderId,
                    timestamp: new Date(payload.timestamp).toISOString(),
                }
            });
        };


        newSocket.on('connect', handleConnect);
        newSocket.on('disconnect', handleDisconnect);
        newSocket.on('connect_error', handleConnectError);
        newSocket.on('receiveMessage', handleReceiveMessage);

        return () => {
            newSocket.emit('leaveChatRoom', chatId);
            newSocket.off('connect', handleConnect);
            newSocket.off('disconnect', handleDisconnect);
            newSocket.off('connect_error', handleConnectError);
            newSocket.off('receiveMessage', handleReceiveMessage);
            newSocket.disconnect();
            setSocket(null);
        };

    }, [chatId, accessToken]);

    const sendMessage = useCallback(
        (text: string) => {
            if (socket?.connected && user && user.uid) {
                const messagePayload: MessagePayload = {
                    message: text,
                    senderId: user.uid,
                    chatId: chatId,
                    timestamp: new Date(),
                };
                try {
                    socket.emit('sendMessage', messagePayload);
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            } else if (!socket?.connected) {
                console.warn('Socket not connected, cannot send message.');
            } else if (!user) {
                console.warn('User data not available, cannot send message.');
            }
        },
        [socket, chatId, user]
    );

    return { socket, sendMessage };
};

export default useChatSocket;
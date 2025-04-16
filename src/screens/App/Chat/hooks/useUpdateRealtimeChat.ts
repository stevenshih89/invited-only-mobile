import invitedOnlyBackendApi from "src/api/backend-api";
import { useFirestoreSubscription } from "src/api/hooks/useFirestoreSubscription";
import { components } from "src/api/v1";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useMemo } from "react";
import { QueryKey } from "openapi-react-query";

interface UseInvitedOnlyRealtimeChatProps {
    chatId: string;
    eventChatsQueryKey: any;
}

const useUpdateRealtimeChat = ({ chatId, eventChatsQueryKey }: UseInvitedOnlyRealtimeChatProps) => {
    console.log('eventChatsQueryKey', eventChatsQueryKey);

    const { data: chatMessages, updateQueryData } = useFirestoreSubscription<components['schemas']['ChatMessage'][], any>({
        path: `devChats/${chatId}`,
        type: 'document',
        queryKey: eventChatsQueryKey,
    });



    return {
        chatMessages,
        updateQueryData,
    };
};

export default useUpdateRealtimeChat;
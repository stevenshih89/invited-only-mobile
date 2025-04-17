import invitedOnlyBackendApi from "src/api/backend-api";
import useFirestoreSubscription from "src/api/realtime/useFirestoreSubscription";


type ChatMessageQueryParams = { path: { chatId: string } };
type ChatMessageQueryKey = [
    'get', // Literal type for the method
    '/chat/message/{chatId}', // Literal type for the path
    ChatMessageQueryParams // Type for the params object
];


const useRealtimeChatMessages = (chatId: string) => {

    const queryKey: ChatMessageQueryKey = [
        'get',
        '/chat/message/{chatId}',
        { path: { chatId } }
    ];

    const [method, path, paramsObject] = queryKey;


    const { data: chatMessages } = invitedOnlyBackendApi.useQuery(method, path, {
        params: paramsObject
    });

    useFirestoreSubscription(`devChats/${chatId}/devMessages`, queryKey);

    return {
        chatMessages,
    }
}

export default useRealtimeChatMessages;
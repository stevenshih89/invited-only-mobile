import { components } from "@invited-only/invited-only-api";
import { showToast } from "helpers/showToast";
import { useAppNavigation } from "hooks/useAppNavigation";
import invitedOnlyBackendApi from "src/api/backend-api";

interface UseChatGuestConnectionActionsProps {
    eventId: string;
    guestId: string;
    hostId: string;
}


const useChatGuestConnectionActions = ({ eventId, guestId, hostId }: UseChatGuestConnectionActionsProps) => {
    const { goBack } = useAppNavigation();

    const { mutate: updateChat } = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees', {
        onSuccess: (response) => {
            console.log('response', response);
        },
    });

    const { mutate: deleteChat } = invitedOnlyBackendApi.useMutation('delete', '/chat');



    const handleDeleteChat = () => {
        deleteChat({
            body: {
                eventId: eventId ?? '',
                guestId: guestId ?? '',
                hostId: hostId ?? '',
            },
        }, {
            onSuccess: () => {
                goBack();
                showToast('success', 'Chat deleted successfully', 'Chat Removed');
            },
            onError: (error) => {
                showToast('warning', 'Chat not deleted', 'Chat not deleted');
            },
        });
    }

    const handleApproveChat = (chat: components['schemas']['Chat']) => {
        updateChat({
            body: {
                eventId: chat.eventId ?? '',
                guestId: chat.guestId ?? '',
                hostId: chat.hostId ?? '',
                guestConfirm: true,
            },
        }, {
            onSuccess: () => {
                goBack();
                showToast('success', 'Chat approved successfully', 'Chat Removed');
            },
        });
    }

    const handleCancelChat = (chat: components['schemas']['Chat']) => {
        updateChat({
            body: {
                eventId: chat.eventId ?? '',
                guestId: chat.guestId ?? '',
                hostId: chat.hostId ?? '',
                guestConfirm: false,
            },
        }, {
            onSuccess: () => {
                goBack();
                showToast('success', 'Connection cancelled successfully', 'Connection cancelled');
            },
            onError: () => {
                showToast('warning', 'Connection not cancelled', 'Connection not cancelled');
            },
        });
    }

    return { handleApproveChat, handleCancelChat, handleDeleteChat };
}

export default useChatGuestConnectionActions;
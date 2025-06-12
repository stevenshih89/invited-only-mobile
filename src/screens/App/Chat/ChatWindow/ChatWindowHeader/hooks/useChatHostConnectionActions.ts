import { components } from "@invited-only/invited-only-api";
import { useContext } from "react";
import { BackendApiContext } from "contexts/BackendApiContex";

interface UseChatConnectionActionsProps {
    eventId: string;
    guestId: string;
    hostId: string;
}


const useChatHostConnectionActions = ({ eventId, guestId, hostId }: UseChatConnectionActionsProps) => {
    const invitedOnlyBackendApi = useContext(BackendApiContext);

    const { mutate: updateChat } = invitedOnlyBackendApi.useMutation('patch', '/eventAttendees', {
        onSuccess: (response) => {
        },
    });


    const handleApproveChat = () => {
        console.log("approve chat");

        updateChat({
            body: {
                eventId: eventId ?? '',
                guestId: guestId ?? '',
                hostId: hostId ?? '',
                hostConfirm: true,
            },
        });
    }

    const handleCancelChat = (chat: components['schemas']['Chat']) => {
        updateChat({
            body: {
                eventId: chat.eventId ?? '',
                guestId: chat.guestId ?? '',
                hostId: chat.hostId ?? '',
                hostConfirm: false,
            },
        });
    }

    return { handleApproveChat, handleCancelChat };
}

export default useChatHostConnectionActions;
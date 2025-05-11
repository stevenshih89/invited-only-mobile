import { components } from "@invited-only/invited-only-api";
import { formatDate } from "../EventListItemHostContent/EventListItemHostContent";
import * as S from './EventListItemGuestConetnt.style';
import useGuestJoinedEventActions from "./hooks/useGuestJoinedEventActions";
import { useAuthStore } from "src/store/authStore";

interface EventListItemGuestConetntProps {
    event: components['schemas']['EventData'];
}

export const EventListItemGuestConetnt = ({ event }: EventListItemGuestConetntProps) => {
    const { userMetadata } = useAuthStore()
    const { handleCancelInvitation } = useGuestJoinedEventActions({ eventId: event?.uid, guestId: userMetadata?.uid || '', hostId: event?.hostId || '' })

    return <S.ContentContainer>
        <S.InfoContainer>
            <S.DateText>{formatDate(event?.createdAt)}</S.DateText>
            <S.EventNameText>{event?.name}</S.EventNameText>
            {event?.location && <S.LocationText>{event?.location}</S.LocationText>}
        </S.InfoContainer>
        <S.ActionButtonBase onPress={handleCancelInvitation}>
            <S.ActionButtonText>Cancel Invitation</S.ActionButtonText>
        </S.ActionButtonBase>
    </S.ContentContainer>
};

export default EventListItemGuestConetnt;

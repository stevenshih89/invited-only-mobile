import { components } from '@invited-only/invited-only-api';
import { Timestamp } from '@react-native-firebase/firestore';
import * as S from './EventListItemHostContent.style';
import { useAppNavigation } from 'hooks/useAppNavigation';
import ManageEventIcon from 'src/assets/images/icons/manage-event-icon.svg';
import { eventRequestStackPath } from 'constants/pathLocations';
import { formatDate } from 'helpers/genericDateFormater';

interface EventListItemHostContentProps {
    event: components['schemas']['EventData'];
    isReview: boolean;
    requestCount: number;
}

const EventListItemHostContent = ({ event, isReview, requestCount }: EventListItemHostContentProps) => {
    const { navigate } = useAppNavigation();

    return (
        <S.ContentContainer>
            <S.InfoContainer>
                <S.DateText>{formatDate(event?.createdAt)}</S.DateText>
                <S.EventNameText>{event?.name}</S.EventNameText>
                {event?.location && <S.LocationText>{event?.location}</S.LocationText>}
            </S.InfoContainer>
            <S.ActionsContainer disabled={true}>
                <S.ViewRequestsButton
                    disabled={!isReview}
                    onPress={() => {
                        const currentEventId = event?.uid;
                        navigate(eventRequestStackPath, { eventId: currentEventId });
                    }}
                    activeOpacity={0.7}
                >
                    <S.ViewRequestsText disabled={!isReview}>View Requests</S.ViewRequestsText>
                    {requestCount ? (
                        <S.RequestCountBadge>
                            <S.RequestCountText>{requestCount}</S.RequestCountText>
                        </S.RequestCountBadge>
                    ) : null}
                </S.ViewRequestsButton>
                <S.ManageButton
                    onPress={() => navigate('/events/manage-event', { event: event })}
                    activeOpacity={0.7}
                    disabled={!isReview}
                >
                    <ManageEventIcon />
                </S.ManageButton>
            </S.ActionsContainer>
        </S.ContentContainer>
    );
};

export default EventListItemHostContent;
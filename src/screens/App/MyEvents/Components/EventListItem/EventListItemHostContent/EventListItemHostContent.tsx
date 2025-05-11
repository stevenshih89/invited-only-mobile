import { components } from '@invited-only/invited-only-api';
import { Timestamp } from '@react-native-firebase/firestore';
import * as S from './EventListItemHostContent.style';
import { useAppNavigation } from 'hooks/useAppNavigation';
import ManageEventIcon from 'src/assets/images/icons/manage-event-icon.svg';
import { eventRequestStackPath } from 'constants/pathLocations';

interface EventListItemHostContentProps {
    event: components['schemas']['EventData'];
    isReview: boolean;
    requestCount: number;
}

interface FirebaseTimestamp {
    _seconds: number;
    _nanoseconds: number;
}

export const formatDate = (dateInput: string | Timestamp | undefined | null): string => {

    if (!dateInput) {
        return 'Invalid Date';
    }

    try {
        let date: Date;

        // Handle Firebase Timestamp
        if (typeof dateInput === 'object' && dateInput !== null && '_seconds' in dateInput) {
            const timestamp = dateInput as unknown as FirebaseTimestamp;
            date = new Date(timestamp._seconds * 1000);
        }
        // Handle string date
        else if (typeof dateInput === 'string') {
            date = new Date(dateInput);
        }
        // Handle Date object
        else if (typeof dateInput === 'object' && dateInput !== null && 'getTime' in dateInput) {
            date = dateInput as unknown as Date;
        } else {
            return 'Invalid Date';
        }

        // Validate the date
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        // Format the date
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC'  // Important for ISO strings with 'Z'
        }).format(date);
    } catch (error) {
        console.error('Date parsing error:', error);
        return 'Invalid Date';
    }
};

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
                    onPress={() => navigate('/events/manage-event', { eventId: event?.uid })}
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
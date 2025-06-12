import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';

import * as S from './ManageEventInfo.style'; // Create style file later if needed
import { BackendApiContext } from 'contexts/BackendApiContex';

import { whiteColor } from 'constants/colors';
// Define props if needed, e.g., to receive eventId or event details
interface ManageEventInfoProps {
    eventId: string;
}

export const ManageEventInfo: React.FC<ManageEventInfoProps> = ({ eventId }) => {
    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const { data: event, isLoading } = invitedOnlyBackendApi.useQuery('get', '/events/{eventId}', {
        params: {
            path: { eventId: eventId },
        },
    });

    if (isLoading) {
        return <S.Container>
            <ActivityIndicator size="large" color={whiteColor} />
        </S.Container>
    }
    return (
        <S.Container>
            <S.EventImageContainer source={{ uri: event?.photos?.[0]?.image }} >
                <S.ImageOverlay >
                    <S.StatusContainer>
                        <S.StatusText>
                            {event?.statusEvent ? 'Active' : 'Inactive'}
                        </S.StatusText>
                    </S.StatusContainer>
                </S.ImageOverlay>

            </S.EventImageContainer>
            <S.EventNameContainerAndDateContainer>
                <S.EventNameContainer>
                    <S.EventNameLabel>Name</S.EventNameLabel>
                    <S.EventNameText>{event?.name}</S.EventNameText>
                </S.EventNameContainer>
                <S.EventDateContainer>
                    <S.EventDateLabel>Event Date</S.EventDateLabel>
                    <S.EventDateText>{new Date(event?.date || '').toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</S.EventDateText>
                </S.EventDateContainer>
            </S.EventNameContainerAndDateContainer>
            {event?.description && <S.EventDescriptionContainer>
                <S.EventDescriptionLabel>Description</S.EventDescriptionLabel>
                <S.EventDescriptionText>{event?.description}</S.EventDescriptionText>
            </S.EventDescriptionContainer>}
        </S.Container>
    );
};

export default ManageEventInfo;

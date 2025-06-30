import React from 'react';
import {components} from '@invited-only/invited-only-api';
import {EventsDropdown} from '../../../Components/EventsDropdown/EventsDropdown';
import * as S from './IoHeader.style';
import CreateEventButton from './Components/CreateEventButton/CreateEventButton';
import useGetEventRequests from './hooks/useGetEventRequests';

interface IoHeaderProps {
    onRequestPress: () => void;
    events: components['schemas']['EventData'][];
    selectedEvent: components['schemas']['EventData'];
    onEventSelect: (event: components['schemas']['EventData']) => void;
    onDropdownChange: () => void;
    attendingGuests: components['schemas']['ConnectionRequest'][];
}

const IoHeader: React.FC<IoHeaderProps> = ({events, selectedEvent, onEventSelect, onRequestPress, onDropdownChange, attendingGuests}) => {
    const {requests} = useGetEventRequests({eventId: selectedEvent?.uid});

    return (
        <S.HeaderContainer testID="header-container">
            {events.length > 0 ? (
                <S.RequestAndEventsContainer>
                    <EventsDropdown
                        events={events}
                        onEventSelect={onEventSelect}
                        selectedEvent={selectedEvent}
                        onDropdownChange={onDropdownChange}
                        attendingGuestsCount={attendingGuests?.length}
                    />
                    <S.RequestButton onPress={onRequestPress}>
                        <S.RequestButtonText>Requests</S.RequestButtonText>
                        <S.RequestBadge>
                            <S.RequestBadgeText>{requests?.length || 0}</S.RequestBadgeText>
                        </S.RequestBadge>
                    </S.RequestButton>
                </S.RequestAndEventsContainer>
            ) : (
                <S.RequestAndEventsContainer>
                    <CreateEventButton />
                    <S.RequestButton>
                        <S.RequestButtonText>Requests</S.RequestButtonText>
                        <S.RequestBadge>
                            <S.RequestBadgeText>0</S.RequestBadgeText>
                        </S.RequestBadge>
                    </S.RequestButton>
                </S.RequestAndEventsContainer>
            )}
        </S.HeaderContainer>
    );
};

export default IoHeader;

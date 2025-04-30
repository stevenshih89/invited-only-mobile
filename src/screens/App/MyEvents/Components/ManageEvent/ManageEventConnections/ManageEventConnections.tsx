import React, { useState } from 'react';

import * as S from '../ManageEvent.style'; // Reuse existing container style for now
import { ManageEventCollapsible } from '../ManageEventCollapsible/ManageEventCollapsible';
import { useManageEventDetails } from '../hooks/useManageEventDetails';
import { components } from 'src/api/v1'; // Moved down

type ConnectionRequest = components['schemas']['ConnectionRequest']; // Alias for type

// Define props if needed, e.g., to receive eventId
interface ManageEventConnectionsProps {
    eventId: string;
}

export const ManageEventConnections: React.FC<ManageEventConnectionsProps> = ({ eventId }) => {
    // State for collapsible sections
    const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
        NewConnections: true,
        Approved: false,
        Attending: false,
        NotAttending: false,
    });

    // Fetch event requests (assuming hook needs eventId)
    const { eventRequests } = useManageEventDetails({ eventId: eventId });

    return (
        <S.Container>
            <ManageEventCollapsible
                toggle={() => setIsOpen({ ...isOpen, "NewConnections": !isOpen["NewConnections"] })}
                title="New Connections"
                eventRequests={eventRequests?.filter((request: ConnectionRequest) => request.status === 'connection-complete')}
                isOpen={isOpen["NewConnections"]}
            />
            <ManageEventCollapsible
                toggle={() => setIsOpen({ ...isOpen, "Approved": !isOpen["Approved"] })}
                title="Approved"
                eventRequests={eventRequests?.filter((request: ConnectionRequest) => request.status === 'pending-confirmation')}
                isOpen={isOpen["Approved"]}
            />
            <ManageEventCollapsible
                toggle={() => setIsOpen({ ...isOpen, "Attending": !isOpen["Attending"] })}
                title="Attending"
                eventRequests={eventRequests?.filter((request: ConnectionRequest) => request.status === 'confirmation-complete')}
                isOpen={isOpen["Attending"]}
            />
            <ManageEventCollapsible
                toggle={() => setIsOpen({ ...isOpen, "NotAttending": !isOpen["NotAttending"] })}
                title="Not Attending"
                eventRequests={eventRequests?.filter((request: ConnectionRequest) => request.status === 'pending-attendance')}
                isOpen={isOpen["NotAttending"]}
            />
        </S.Container>
    );
};

export default ManageEventConnections;

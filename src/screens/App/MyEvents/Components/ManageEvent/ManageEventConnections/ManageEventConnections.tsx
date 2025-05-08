import React, {useState} from 'react';

import {components} from 'src/api/v1'; // Moved down
import * as S from '../ManageEvent.style'; // Reuse existing container style for now
import {ManageEventCollapsible} from '../ManageEventCollapsible/ManageEventCollapsible';
import {useManageEventDetails} from '../hooks/useManageEventDetails';
import ModalEventInfo from 'components/Modal/ModalEventInfo/ModalEventInfo';

type ConnectionRequest = components['schemas']['ConnectionRequest']; // Alias for type

// Define props if needed, e.g., to receive eventId
interface ManageEventConnectionsProps {
  eventId: string;
}

type EventInfoName = 'newConnection' | 'approved' | 'attending' | 'notAccepted' | 'canceled';

export const ManageEventConnections: React.FC<ManageEventConnectionsProps> = ({eventId}) => {
  // State for collapsible sections
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
    NewConnections: true,
    Approved: false,
    Attending: false,
    NotAttending: false,
  });

  // Fetch event requests (assuming hook needs eventId)
  const {eventRequests} = useManageEventDetails({eventId: eventId});

  const [isVisibleModalEventInfo, setIsVisibleModalEventInfo] = useState(false);
  const [selectedEventInfoName, setSelectedEventInfoName] = useState<EventInfoName | null>(null);
  const eventInfoData: Record<EventInfoName, {title: string; description: string}> = {
    newConnection: {
      title: 'New Connection',
      description: `A connection has been made, but no action has been taken yet by either side. Now it's your turn to approve the user`,
    },
    approved: {
      title: 'Approved',
      description: `The Approved status means the guest's request to join has been accepted. They’re all set to attend the event.`,
    },
    attending: {
      title: 'Attending',
      description: `The guest has confirmed their attendance. They’re officially joining the event!`,
    },
    notAccepted: {
      title: 'Not Accepted',
      description: `The invitation hasn't been accepted yet. The guest may still be deciding or hasn't responded.`,
    },
    canceled: {
      title: 'Canceled',
      description: `The guest canceled their attendance. They won’t be joining the event.`,
    },
  };

  const handlePressTooltip = (name: EventInfoName) => {
    setSelectedEventInfoName(name);
    setIsVisibleModalEventInfo(true);
  };

  return (
    <S.Container>
      <ManageEventCollapsible
        toggle={() => setIsOpen({...isOpen, NewConnections: !isOpen['NewConnections']})}
        title="New Connections"
        eventRequests={eventRequests?.filter((request: ConnectionRequest) => request.status === 'connection-complete')}
        isOpen={isOpen['NewConnections']}
        onPressTooltip={() => handlePressTooltip('newConnection')}
      />
      <ManageEventCollapsible
        toggle={() => setIsOpen({...isOpen, Approved: !isOpen['Approved']})}
        title="Approved"
        eventRequests={eventRequests?.filter((request: ConnectionRequest) => request.status === 'pending-confirmation')}
        isOpen={isOpen['Approved']}
        onPressTooltip={() => handlePressTooltip('approved')}
      />
      <ManageEventCollapsible
        toggle={() => setIsOpen({...isOpen, Attending: !isOpen['Attending']})}
        title="Attending"
        eventRequests={eventRequests?.filter((request: ConnectionRequest) => request.status === 'confirmation-complete')}
        isOpen={isOpen['Attending']}
        onPressTooltip={() => handlePressTooltip('attending')}
      />
      <ManageEventCollapsible
        toggle={() => setIsOpen({...isOpen, NotAttending: !isOpen['NotAttending']})}
        title="Not Attending"
        eventRequests={eventRequests?.filter((request: ConnectionRequest) => request.status === 'pending-attendance')}
        isOpen={isOpen['NotAttending']}
        onPressTooltip={() => handlePressTooltip('notAccepted')}
      />
      <ModalEventInfo
        isVisible={isVisibleModalEventInfo}
        onClose={() => setIsVisibleModalEventInfo(false)}
        closeText="Close"
        title={eventInfoData[selectedEventInfoName ?? 'newConnection'].title}
        description={eventInfoData[selectedEventInfoName ?? 'newConnection'].description}
      />
    </S.Container>
  );
};

export default ManageEventConnections;

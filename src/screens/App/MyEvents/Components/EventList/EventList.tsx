import React from 'react';
import { EventApiResponse } from 'src/apiv2/queries/eventQueries';
import EventListItem from '../EventListItem/EventListItem';
import * as S from './EventList.style';

interface EventListProps {
  events: EventApiResponse[];
  // Add navigation handlers if needed, e.g.:
  // onEventPress: (eventId: string) => void;
  // onViewRequestsPress: (eventId: string) => void;
  // onManagePress: (eventId: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const renderItem = ({ item }: { item: EventApiResponse }) => {
    
    // Determine status string
    let statusString = 'Unknown';
    if (item.isCancelled) {
      statusString = 'Cancelled';
    } else if (item.statusEvent) {
      statusString = 'Active';
    } else {
      statusString = 'Inactive'; // Or 'Past', 'Upcoming' based on date?
    }

    // Get first photo URL
    const firstPhotoUrl = item.photos && item.photos.length > 0 ? item.photos[0] : undefined;
    
    return (
      <EventListItem 
        event={item} // Pass the whole event object for potential use inside
        imageUrl={firstPhotoUrl}
        status={statusString}
        attendees={[]} // Not available in EventApiResponse from useGetMyEvents
        requestCount={0} // Not available - explicitly setting 0 to hide badge

      />
    );
  };

  return (
    <S.ListContainer
      data={events}
      renderItem={renderItem}
      
      keyExtractor={(item: EventApiResponse) => item.id}
      contentContainerStyle={{ paddingBottom: 20 }}
      // Add other FlatList props as needed (e.g., ItemSeparatorComponent)
    />
  );
};

export default EventList; 
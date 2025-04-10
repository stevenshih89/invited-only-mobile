import React from 'react';
import {EventApiResponse} from 'src/apiv2/queries/eventQueries';
import EventListItem from '../EventListItem/EventListItem';
import * as S from './EventList.style';
import {components} from 'src/api/v1';
interface EventListProps {
  events: components['schemas']['EventData'][];
}

const EventList: React.FC<EventListProps> = ({events}) => {
  const renderItem = ({item}: {item: components['schemas']['EventData']}) => {
    // Determine status string
    let statusString = 'Unknown';
    if (item.isCancelled) {
      statusString = 'Cancelled';
    } else if (item.statusEvent) {
      statusString = 'Active';
    } else {
      statusString = 'Inactive'; // Or 'Past', 'Upcoming' based on date?
    }

    const firstPhotoUrl = item.photos && item.photos.length > 0 ? item.photos[0] : undefined;

    return <EventListItem event={item} imageUrl={firstPhotoUrl?.image} status={statusString} attendees={[]} requestCount={0} />;
  };

  return (
    <S.ListContainer
      data={events}
      renderItem={renderItem}
      keyExtractor={(item: EventApiResponse) => item.uid}
      contentContainerStyle={{paddingBottom: 20}}
      // Add other FlatList props as needed (e.g., ItemSeparatorComponent)
    />
  );
};

export default EventList;

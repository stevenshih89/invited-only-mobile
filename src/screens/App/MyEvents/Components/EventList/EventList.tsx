import React from 'react';

import { components } from '@invited-only/invited-only-api';
import EventListItem from '../EventListItem/EventListItem';
import * as S from './EventList.style';


interface EventListProps {
  events: components['schemas']['EventData'][];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const renderItem = ({ item }: { item: components['schemas']['EventData'] }) => {
    let statusString = 'Unknown';
    if (!item.eventReviewed) {
      statusString = 'Under Review';
    } else if (item.isCancelled) {
      statusString = 'Cancelled';
    } else if (item.statusEvent) {
      statusString = 'Active';
    } else {
      statusString = 'Inactive';
    }

    const firstPhotoUrl = item.photos && item.photos.length > 0 ? item.photos[0] : undefined;

    return <EventListItem event={item} imageUrl={firstPhotoUrl?.image} statusEvent={statusString} attendees={[]} requestCount={0} isReview={item.eventReviewed} />;
  };

  return (
    <S.ListContainer
      data={events}
      renderItem={renderItem}
      keyExtractor={(item: components['schemas']['EventData']) => item.uid}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default EventList;

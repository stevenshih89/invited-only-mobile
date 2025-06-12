import React from 'react';
import { components } from '@invited-only/invited-only-api';
import EventListItem from '../EventListItem/EventListItem';
import JoinedEventsEmptyFallback from '../JoinedEventsEmptyFallback/JoinedEventsEmptyFallback';
import * as S from './JoinedEventsScreen.style';
import useGetJoinedEvents from './hooks/useGetJoinedEvents';
import AppLoader from 'screens/App/AppLoader/AppLoader';

const JoinedEventsScreen = () => {
  const { data, isLoading } = useGetJoinedEvents();
  console.log('data', data);
  if (isLoading) {
    return <AppLoader />;
  }

  if (data?.length === 0) {
    return <JoinedEventsEmptyFallback />;
  }

  const renderItem = ({ item }: { item: components['schemas']['EventData'] }) => {
    return <EventListItem event={item} imageUrl={item.photos?.[0]?.image} isHost={false} />;
  };

  return (
    <S.ListContainer
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: components['schemas']['EventData']) => item.uid}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default JoinedEventsScreen;

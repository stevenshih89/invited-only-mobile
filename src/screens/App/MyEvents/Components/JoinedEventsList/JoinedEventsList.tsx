import React from 'react';
import { components } from '@invited-only/invited-only-api';
import { TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import EventListItem from '../EventListItem/EventListItem';
import JoinedEventsEmptyFallback from '../JoinedEventsEmptyFallback/JoinedEventsEmptyFallback';
import useRequestedEvents from './hooks/useRequestedEvents';
import * as S from './JoinedEventsList.style';

import InfoIcon from 'assets/images/icons/info-circle.svg';
import AppLoader from 'screens/App/AppLoader/AppLoader';

interface JoinedEventsListProps {
  events: components['schemas']['EventData'][];
  isOpen: boolean;
  onPressTooltip: () => void;
  title: string;
  toggle: () => void;
}

const JoinedEventsList: React.FC<JoinedEventsListProps> = ({ events, isOpen, onPressTooltip, title, toggle }) => {
  const { data, isLoading } = useRequestedEvents();
  if (isLoading) {
    return <AppLoader />;
  }

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
    return <EventListItem key={item.uid} event={item} imageUrl={item.photos?.[0]?.image} isHost={false} statusEvent={statusString} />;
  };

  return (
    <>
      <S.CardContainer>
        <S.ContentWrapper>
          <S.TitleRow onPress={toggle}>
            <S.StyledArrow isOpen={isOpen} />
            <S.LabelContainer>
              <S.LabelText>{title}</S.LabelText>
            </S.LabelContainer>
            <TouchableOpacity
              onPress={onPressTooltip}
              hitSlop={{
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              }}>
              <InfoIcon />
            </TouchableOpacity>
          </S.TitleRow>
          <S.NumberBadge>
            <S.NumberText>{events?.length ?? 0}</S.NumberText>
          </S.NumberBadge>
        </S.ContentWrapper>
      </S.CardContainer>
      <Collapsible collapsed={!isOpen}>
        <View
          style={{
            flex: 1,
          }}>
          {data?.length ? <>{events?.map((event, index) => renderItem({ item: event }))}</> : <JoinedEventsEmptyFallback />}
        </View>
      </Collapsible>
    </>

  );
};

export default JoinedEventsList;

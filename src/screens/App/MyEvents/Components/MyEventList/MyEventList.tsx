import React from 'react';
import {components} from '@invited-only/invited-only-api';
import {TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import EventListItem from '../EventListItem/EventListItem';
import MyEventsEmptyFallback from '../MyEventesEmptyFallback/MyEventesEmptyFallback';
import * as S from './MyEventList.style';
import InfoIcon from 'assets/images/icons/info-circle.svg';

interface MyEventListProps {
  events: components['schemas']['EventData'][];
  isOpen: boolean;
  onPressTooltip: () => void;
  title: string;
  toggle: () => void;
}

const MyEventList: React.FC<MyEventListProps> = ({events, isOpen, onPressTooltip, title, toggle}) => {
  const renderItem = ({item}: {item: components['schemas']['EventData']}) => {
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

    return (
      <View key={`${item.uid}-${item.name}`}>
        <EventListItem
          key={item.uid}
          event={item}
          imageUrl={firstPhotoUrl?.image}
          statusEvent={statusString}
          attendees={[]}
          requestCount={0}
          isReview={item.eventReviewed}
          isHost={true}
        />
      </View>
    );
  };

  return (
    <>
      <S.CardContainer
        style={{
          paddingBottom: 16,
          paddingTop: 16,
          marginBottom: 12,
        }}>
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
          {events?.length ? <>{events?.map((event, index) => renderItem({item: event}))}</> : <MyEventsEmptyFallback />}
        </View>
      </Collapsible>
    </>
  );
};

export default MyEventList;

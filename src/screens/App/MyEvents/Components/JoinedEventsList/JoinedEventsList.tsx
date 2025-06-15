import React from 'react';
import {components} from '@invited-only/invited-only-api';
import {TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import EventListItem from '../EventListItem/EventListItem';
import JoinedEventsEmptyFallback from '../JoinedEventsEmptyFallback/JoinedEventsEmptyFallback';
import * as S from './JoinedEventsList.style';
import useGetJoinedEvents from './hooks/useGetJoinedEvents';
import InfoIcon from 'assets/images/icons/info-circle.svg';

interface JoinedEventsListProps {
  events: components['schemas']['EventData'][];
  isOpen: boolean;
  onPressTooltip: () => void;
  title: string;
  toggle: () => void;
}

const JoinedEventsList: React.FC<JoinedEventsListProps> = ({events, isOpen, onPressTooltip, title, toggle}) => {
  const {data, isLoading} = useGetJoinedEvents();

  // if (isLoading) {
  //   return <AppLoader />;
  // }

  // if (data?.length === 0) {
  //   return;
  // }

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
    return <EventListItem event={item} imageUrl={item.photos?.[0]?.image} isHost={false} statusEvent={statusString} />;
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
          {data?.length ? <>{events?.map((event, index) => renderItem({item: event}))}</> : <JoinedEventsEmptyFallback />}
        </View>
      </Collapsible>
    </>

    // <S.ListContainer
    //   data={data}
    //   renderItem={renderItem}
    //   keyExtractor={(item: components['schemas']['EventData']) => item.uid}
    //   contentContainerStyle={{paddingBottom: 20}}
    // />
  );
};

export default JoinedEventsList;

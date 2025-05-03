import React, { FC, ReactElement, useState, useRef, useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { components } from '@invited-only/invited-only-api';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import usePersistentCardSwipe from '../IO/hooks/usePersistentCardSwipe';

import JoinEventsHeader from './Components/JoinEventsHeader/JoinEventsHeader';
import ExploreEventsEmptyFallback from './Components/ExploreEventsEmptyFallback/ExploreEventsEmptyFallback';
import * as S from './JoinEvents.style';
import EventCard from './Components/EventCard/EventCard';
import PhotosList from './Components/EventCard/Components/PhotosList/PhotosList';
import ActionButtons from './Components/EventCard/Components/ActionButtons/ActionButtons';
import HostButton from './Components/EventCard/Components/HostButton/HostButton';
import EventInfo from './Components/EventCard/Components/EventInfo/EventInfo';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import ModalReport from 'components/Modal/ModalReport/ModalReport';

interface Props {
  events: components['schemas']['EventData'][];
}

const JoinEvents: FC<Props> = ({ events }): ReactElement => {
  const {
    cards: currentEventCards,
    handleSwipeLeft,
    handleSwipeRight,
    handleSuperInvite,
  } = usePersistentCardSwipe<components['schemas']['EventData']>({
    cardsData: events,
    eventId: '1',
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const uniqueEventCards =
    currentEventCards?.reduce((acc: components['schemas']['EventData'][], current) => {
      if (!acc.find(item => item.uid === current.uid)) {
        acc.push({ ...current });
      }
      return acc;
    }, []) || [];

  const hasCards = uniqueEventCards.length > 0;
  const currentCard = hasCards ? uniqueEventCards[uniqueEventCards.length - 1] : undefined;

  return (
    <BottomSheetModalProvider>
      <DefaultBackground>
        <JoinEventsHeader onMyEventsPress={() => { }} />
        {events.length > 0 ? (
          <ScrollView>
            <S.Container>
              <S.EventCardContainer>
                {uniqueEventCards.map((event, index) => (
                  <EventCard
                    uniqueEventCards={uniqueEventCards}
                    key={event.uid}
                    event={event}
                    index={index}
                    isTopCard={index === uniqueEventCards.length - 1}
                    onReject={handleSwipeLeft}
                    onSuperInvite={handleSuperInvite}
                    onInvite={handleSwipeRight}
                    topIndex={uniqueEventCards.length - 1}
                  />
                ))}
              </S.EventCardContainer>
            </S.Container>
            <S.BottomWrapper>
              <HostButton hostName={currentCard?.hostName || ''} hostImage={currentCard?.hostImage || ''} />
              {currentCard && <EventInfo event={currentCard} />}
              <PhotosList photosList={currentCard?.photos || []} />
              <ActionButtons onReject={handleSwipeLeft} onSuperInvite={handleSuperInvite} onInvite={handleSwipeRight} />
              <S.BlockAndReportContainer>
                <S.BlockAndReportButton onPress={handlePresentModalPress}>
                  <S.BlockText>Block and Report</S.BlockText>
                </S.BlockAndReportButton>
              </S.BlockAndReportContainer>
            </S.BottomWrapper>
          </ScrollView>
        ) : (
          <ExploreEventsEmptyFallback />
        )}
        <ModalLockedAccount />
        <ModalReport
          ref={bottomSheetModalRef}
        />
      </DefaultBackground>
    </BottomSheetModalProvider>
  );
};

export default JoinEvents;

import { ScrollView } from 'react-native';
import { FC, useCallback, useRef } from 'react';
import { components } from '@invited-only/invited-only-api';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import HostButton from '../../Components/EventCard/Components/HostButton/HostButton';
import PhotosList from '../../Components/EventCard/Components/PhotosList/PhotosList';
import ActionButtons from '../../Components/EventCard/Components/ActionButtons/ActionButtons';
import EventCard from '../../Components/EventCard/EventCard';
import EventInfo from '../../Components/EventCard/Components/EventInfo/EventInfo';
import ExploreEventsEmptyFallback from '../../Components/ExploreEventsEmptyFallback/ExploreEventsEmptyFallback';
import * as S from './ExploreEvents.style';
import usePersistentCardSwipe from 'screens/App/IO/hooks/usePersistentCardSwipe';
import ModalReport from 'components/Modal/ModalReport/ModalReport';

interface ExploreEventsProps {
  events: components['schemas']['EventData'][];
}

const ExploreEvents: FC<ExploreEventsProps> = ({ events }) => {
  const {
    cards: currentEventCards,
    handleSwipeLeft,
    handleSwipeRight,
    handleSuperInvite,
  } = usePersistentCardSwipe<components['schemas']['EventData']>({
    cardsData: events,
    eventId: '1',
  });

  const uniqueEventCards =
    currentEventCards?.reduce((acc: components['schemas']['EventData'][], current) => {
      if (!acc.find(item => item.uid === current.uid)) {
        acc.push(current);
      }
      return acc;
    }, []) || [];

  const hasCards = uniqueEventCards.length > 0;
  const currentCard = hasCards ? uniqueEventCards[uniqueEventCards.length - 1] : undefined;

  if (!currentCard || !events.length) {
    return <ExploreEventsEmptyFallback />;
  }
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleBlockAndReport = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
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
        <EventInfo event={currentCard} />
        <PhotosList photosList={currentCard?.photos || []} />
        <ActionButtons onReject={handleSwipeLeft} onSuperInvite={handleSuperInvite} onInvite={handleSwipeRight} />
        <S.BlockAndReportContainer>
          <S.BlockAndReportButton onPress={handleBlockAndReport}>
            <S.BlockText>Block and Report</S.BlockText>
          </S.BlockAndReportButton>
        </S.BlockAndReportContainer>
        <ModalReport ref={bottomSheetModalRef} />
      </S.BottomWrapper>
    </ScrollView>
  );
};
export default ExploreEvents;

import { FC, ReactElement } from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import usePersistentCardSwipe from '../IO/hooks/usePersistentCardSwipe';
import NewConnectionModal from '../IO/components/InviteGuestsEvent/Components/NewConnectionModal/NewConnectionModal';
import { useNewConnectionModal } from '../IO/components/InviteGuestsEvent/hooks/useNewConnectionModal';
import useSwipeCardAction from '../Components/Card/hooks/useSwipeCardAction';
import JoinEventsHeader from './Components/JoinEventsHeader/JoinEventsHeader';
import ExploreEventsEmptyFallback from './Components/ExploreEventsEmptyFallback/ExploreEventsEmptyFallback';
import * as S from './JoinEvents.style';
import EventCard from './Components/EventCard/EventCard';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

import { components } from 'src/api/v1';

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
    eventId: "1"
  });

  const uniqueEventCards = currentEventCards?.reduce((acc: components['schemas']['EventData'][], current) => {
    if (!acc.find(item => item.uid === current.uid)) {
      acc.push(current);
    }
    return acc;
  }, []) || [];

  return (
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
        </ScrollView>
      ) : (
        <ExploreEventsEmptyFallback />
      )}
      <ModalLockedAccount />
    </DefaultBackground>
  );
};

export default JoinEvents;

import {FC, ReactElement} from 'react';

import {ScrollView} from 'react-native-gesture-handler';
import usePersistentCardSwipe from '../IO/hooks/usePersistentCardSwipe';
import JoinEventsHeader from './Components/JoinEventsHeader/JoinEventsHeader';
import ExploreEventsEmptyFallback from './Components/ExploreEventsEmptyFallback/ExploreEventsEmptyFallback';
import * as S from './JoinEvents.style';
import EventCard from './Components/EventCard/EventCard';
import ModalLockedAccount from 'components/Modal/ModalLockedAccount/ModalLockedAccount';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

import {components} from 'src/api/v1';

interface Props {
  events: components['schemas']['EventData'][];
}

const JoinEvents: FC<Props> = ({events}): ReactElement => {
  const {handleSuperInvite, handleSwipeLeft, handleSwipeRight, cards} = usePersistentCardSwipe({
    cardsData: events,
    eventId: events[0]?.uid,
  });

  return (
    <DefaultBackground>
      <JoinEventsHeader onMyEventsPress={() => {}} />
      {false ? (
        <ScrollView>
          <S.Container>
            <S.EventCardContainer>
              {cards?.map((event, index) => (
                <EventCard
                  key={event.uid}
                  event={event}
                  index={index}
                  isTopCard={index === cards.length - 1}
                  onReject={handleSwipeLeft}
                  onSuperInvite={handleSuperInvite}
                  onInvite={handleSwipeRight}
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

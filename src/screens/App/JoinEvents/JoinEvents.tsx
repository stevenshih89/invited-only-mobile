import {FC, ReactElement} from 'react';

import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import {mockedEventsList} from './Events.mock';
import useEventCardsSwipes from './hooks/useEventCardSwipes';
import JoinEventsHeader from './Components/JoinEventsHeader/JoinEventsHeader';
import * as S from './JoinEvents.style';
import {ScrollView} from 'react-native-gesture-handler';
import EventCard from './Components/EventCard/EventCard';

const JoinEvents: FC = (): ReactElement => {
  const {handleSuperInvite, handleSwipeLeft, handleSwipeRight, visibleCards} = useEventCardsSwipes({
    events: mockedEventsList,
  });

  return (
    <DefaultBackground>
      <JoinEventsHeader onMyEventsPress={() => {}} />
      <ScrollView>
        <S.Container>
          <S.EventCardContainer>
            {visibleCards
              .map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  isTopCard={index === 0}
                  onReject={handleSwipeLeft}
                  onSuperInvite={handleSuperInvite}
                  onInvite={handleSwipeRight}
                />
              ))
              .reverse()}
          </S.EventCardContainer>
        </S.Container>
      </ScrollView>
    </DefaultBackground>
  );
};

export default JoinEvents;

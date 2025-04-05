import {FC, ReactElement} from 'react';

import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import JoinEventsHeader from './Components/JoinEventsHeader/JoinEventsHeader';
import * as S from './JoinEvents.style';
import {ScrollView} from 'react-native-gesture-handler';
import EventCard from './Components/EventCard/EventCard';
import useCardSwipe from '../IO/Components/InviteGuestsEvent/hooks/useCardSwipe';
import {Event} from 'src/types/event';

interface Props {
  events: Event.Info[];
}

const JoinEvents = ({events}: Props): ReactElement => {
  const {handleSuperInvite, handleSwipeLeft, handleSwipeRight, cards} = useCardSwipe({
    cardsData: events,
  });

  console.log(cards);

  return (
    <DefaultBackground>
      <JoinEventsHeader onMyEventsPress={() => {}} />
      <ScrollView>
        <S.Container>
          <S.EventCardContainer>
            {cards?.map((event, index) => (
              <EventCard
                key={event.id}
                event={event as Event.Info}
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
    </DefaultBackground>
  );
};

export default JoinEvents;

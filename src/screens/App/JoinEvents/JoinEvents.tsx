import {FC, ReactElement} from 'react';

import DefaultBackground from 'components/DefaultBackground/DefaultBackground';
import JoinEventsHeader from './Components/JoinEventsHeader/JoinEventsHeader';
import * as S from './JoinEvents.style';
import {ScrollView} from 'react-native-gesture-handler';
import EventCard from './Components/EventCard/EventCard';
import useCardSwipe from '../IO/Components/InviteGuestsEvent/hooks/useCardSwipe';
import {components} from 'src/api/v1';

interface Props {
  events: components['schemas']['EventData'][];
}

const JoinEvents = ({events}: Props): ReactElement => {
  const {handleSuperInvite, handleSwipeLeft, handleSwipeRight, cards} = useCardSwipe({
    cardsData: events,
  });

  return (
    <DefaultBackground>
      <JoinEventsHeader onMyEventsPress={() => {}} />
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
    </DefaultBackground>
  );
};

export default JoinEvents;

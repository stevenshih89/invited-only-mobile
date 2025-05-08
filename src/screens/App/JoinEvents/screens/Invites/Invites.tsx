import {FC} from 'react';
import {FlatList} from 'react-native';
import {components} from 'src/api/v1';
import InviteCard from './Components/InviteCard/InviteCard';
import * as S from './Invites.style';
import usePersistentCardSwipe from 'screens/App/IO/hooks/usePersistentCardSwipe';

interface Props {
  events: components['schemas']['EventData'][];
}

const Invites: FC<Props> = ({events}) => {
  const {cards: currentEventCards} = usePersistentCardSwipe<components['schemas']['EventData']>({
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

  return (
    <S.Container>
      <FlatList
        data={uniqueEventCards}
        keyExtractor={item => item.uid}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <S.InviteCardWrapper key={item.uid}>
            <InviteCard event={item} />
          </S.InviteCardWrapper>
        )}
      />
    </S.Container>
  );
};

export default Invites;

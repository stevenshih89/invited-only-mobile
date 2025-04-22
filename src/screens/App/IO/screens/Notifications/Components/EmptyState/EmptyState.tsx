import {useNavigation} from '@react-navigation/native';
import * as S from './EmptyState.style';
import PlusIcon from 'assets/images/icons/plus.svg';
import {eventCreatingStackPath} from 'constants/pathLocations';

const EmptyState = () => {
  const navigation = useNavigation();

  const handleCreateEvent = () => {
    navigation.navigate(eventCreatingStackPath as never);
  };

  return (
    <S.Container>
      <S.Title>No notifications</S.Title>
      <S.Description>Notifications for connections and events will show up here! Just create an event to start.</S.Description>
      <S.CreateEventButton onPress={handleCreateEvent}>
        <S.IconContainer>
          <PlusIcon
            style={{
              width: 10,
              height: 10,
            }}
          />
        </S.IconContainer>
        <S.ButtonText>Create Event</S.ButtonText>
      </S.CreateEventButton>
    </S.Container>
  );
};

export default EmptyState;

import {useAppNavigation} from 'hooks/useAppNavigation';
import * as S from './CreateNewEventButton.style';
import CreateEventIcon from 'src/assets/images/icons/plus-black.svg';

const CreateNewEventButton = () => {
  const {navigate} = useAppNavigation();
  return (
    <S.CreateEventButton
      onPress={() => {
        navigate('/event-creating-stack');
      }}>
      <S.IconContainer>
        <CreateEventIcon />
      </S.IconContainer>
      <S.CreateNewText>Create New</S.CreateNewText>
    </S.CreateEventButton>
  );
};

export default CreateNewEventButton;

import { View } from '@ant-design/react-native';
import * as S from './CreateEventButton.style';
import { useAppNavigation } from 'hooks/useAppNavigation';
import CreateEventIcon from 'src/assets/images/icons/plus-black.svg';

const CreateEventButton = () => {
  const { navigate } = useAppNavigation();

  return (
    <View>
      <S.CreateEventButtonContainer
        onPress={() => {
          navigate('/event-creating-stack');
        }}>
        <CreateEventIcon />
        <S.CreateEventButtonText>Create New</S.CreateEventButtonText>
      </S.CreateEventButtonContainer>
    </View>
  );
};

export default CreateEventButton;

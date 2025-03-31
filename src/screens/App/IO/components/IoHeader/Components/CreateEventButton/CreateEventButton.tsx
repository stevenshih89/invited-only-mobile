import {useAppNavigation} from 'hooks/useAppNavigation';
import * as S from './CreateEventButton.style';
import CreateEventIcon from 'src/assets/images/icons/plus-black.svg';
import {TouchableOpacity} from 'react-native';
import {View} from '@ant-design/react-native';
import {Text} from 'react-native-gesture-handler';
import {whiteColor} from 'constants/colors';

const CreateEventButton = () => {
  const {navigate} = useAppNavigation();

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

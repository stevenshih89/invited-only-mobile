import {View} from '@ant-design/react-native';
import * as S from './CreateEventButton.style';
import {useAppNavigation} from 'hooks/useAppNavigation';
import CreateEventIcon from 'src/assets/images/icons/plus-black.svg';
import useGetSubscriptions from 'screens/App/Payment/hooks/useGetSubscriptions';
import {paymentPath} from 'constants/pathLocations';

const CreateEventButton = () => {
  const {navigate} = useAppNavigation();
  const {data: subscriptionData} = useGetSubscriptions();
  const navigationPath = subscriptionData?.status === 'active' ? '/event-creating-stack' : paymentPath;

  return (
    <View>
      <S.CreateEventButtonContainer
        onPress={() => {
          navigate(navigationPath);
        }}>
        <CreateEventIcon />
        <S.CreateEventButtonText>Create New</S.CreateEventButtonText>
      </S.CreateEventButtonContainer>
    </View>
  );
};

export default CreateEventButton;

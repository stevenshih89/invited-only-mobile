import * as S from './CreateNewEventButton.style';
import {paymentPath} from 'constants/pathLocations';
import {useAppNavigation} from 'hooks/useAppNavigation';
import useGetSubscriptions from 'screens/App/Payment/hooks/useGetSubscriptions';
import CreateEventIcon from 'src/assets/images/icons/plus-black.svg';

const CreateNewEventButton = () => {
  const {navigate} = useAppNavigation();
  const {data: subscriptionData} = useGetSubscriptions();
  const navigationPath = subscriptionData?.status === 'active' ? '/event-creating-stack' : paymentPath;

  return (
    <S.CreateEventButton
      onPress={() => {
        navigate(navigationPath as never);
      }}>
      <S.IconContainer>
        <CreateEventIcon />
      </S.IconContainer>
      <S.CreateNewText>Create New</S.CreateNewText>
    </S.CreateEventButton>
  );
};

export default CreateNewEventButton;

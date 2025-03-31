import {View} from 'react-native';
import * as S from './PreviewEventStep.style';
import Card from 'screens/App/Components/Card/Card';
import {useFormikContext} from 'formik';
import {CreateEventFormValues} from '../../CreateEventFlow';

const PreviewEventStep = () => {
  const {values} = useFormikContext<CreateEventFormValues>();

  return (
    <View>
      <Card isStatic backgroundUrls={[values.photos.main, values.photos.photo2, values.photos.photo3]} index={0} uid="1">
        <View>
          <S.CardContent>
            <S.CardNameAndAge>
              <S.CardName>{values.eventName},</S.CardName>
            </S.CardNameAndAge>
            <S.ButtonsContainer>
              <S.RejectButton>
                <S.RejectIcon />
                <S.RejectButtonText>Reject</S.RejectButtonText>
              </S.RejectButton>
              <S.SuperInviteButton>
                <S.SuperInviteIcon style={{opacity: 1}} />
                <S.SuperInviteButtonText>Super Invite</S.SuperInviteButtonText>
              </S.SuperInviteButton>
              <S.InviteButton>
                <S.InviteIcon style={{opacity: 1}} />
                <S.InviteButtonText>Invite</S.InviteButtonText>
              </S.InviteButton>
            </S.ButtonsContainer>
          </S.CardContent>
        </View>
      </Card>
    </View>
  );
};
export default PreviewEventStep;

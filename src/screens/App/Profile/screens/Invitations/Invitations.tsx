import {FC} from 'react';
import {ScrollView} from 'react-native';
import Copy from 'assets/images/icons/copy.svg';
import {grayColor, whiteColor} from 'constants/colors';
import {useInvitations} from 'hooks/useInvitations';
import * as S from './Invitations.style';

const Invitations: FC = () => {
  const {handleCopy, inviteLink, numberCodes} = useInvitations();

  return (
    <S.Container>
      <S.Title>You have {numberCodes} App invitations codes</S.Title>
      <S.Label>IO Invitations</S.Label>
      <ScrollView>
        {inviteLink.map((item: any) => (
          <S.InviteContainer key={item.inviteCode}>
            <S.InviteButton disabled={!item.isActive} activeOpacity={0.7} onPress={() => handleCopy(item.inviteCode)}>
              <S.InviteText style={{color: !item.isActive ? grayColor : whiteColor}}>{item.inviteCode}</S.InviteText>
              {item.isActive && <Copy />}
            </S.InviteButton>
          </S.InviteContainer>
        ))}
      </ScrollView>
    </S.Container>
  );
};

export default Invitations;

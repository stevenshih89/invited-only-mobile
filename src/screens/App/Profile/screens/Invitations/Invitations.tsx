import { FC } from 'react';
import { ScrollView } from 'react-native';
import * as S from './Invitations.style';
import { grayColor, whiteColor } from 'constants/colors';
import { useInvitations } from 'hooks/useInvitations';
import CopyFillIcon from 'assets/images/icons/copy-fill.svg';

const Invitations: FC = () => {
  const { handleCopy, inviteLink, numberCodes } = useInvitations();

  return (
    <S.Container>
      <S.Title>You have {numberCodes} App invitations codes</S.Title>
      <ScrollView>
        {inviteLink?.map((item: any) => (
          <S.InviteContainer key={item.inviteCode}>
            <S.InviteButton disabled={!item.isActive} activeOpacity={0.7} onPress={() => handleCopy(item.inviteCode)}>
              <S.InviteText style={{ color: !item.isActive ? grayColor : whiteColor }}>{item.inviteCode}</S.InviteText>
              {item.isActive && <CopyFillIcon />}
            </S.InviteButton>
          </S.InviteContainer>
        ))}
      </ScrollView>
    </S.Container>
  );
};

export default Invitations;

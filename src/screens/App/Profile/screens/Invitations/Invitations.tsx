import React, { FC } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import * as S from './Invitations.style';
import useGetInvitationCodes from './hooks/useGetInvitationCodes';
import { grayColor, whiteColor } from 'constants/colors';
import CopyFillIcon from 'assets/images/icons/copy-fill.svg';
import { useInvitations } from 'hooks/useInvitations';

const Invitations: FC = () => {
  const { handleCopy } = useInvitations();
  const { data: invitationCodes, isLoading } = useGetInvitationCodes();

  if (isLoading) {
    return <S.Container>
      <ActivityIndicator size="large" color={whiteColor} />
    </S.Container>
  }

  return (
    <S.Container>
      {invitationCodes && invitationCodes?.length > 0 ? (
        <>
          <S.Title>You have {invitationCodes?.length} App invitations codes</S.Title>
          <ScrollView>
            {invitationCodes?.map((item: string) => (
              <S.InviteContainer key={item}>
                <S.InviteButton activeOpacity={0.7} onPress={() => handleCopy(item)}>
                  <S.InviteText >{item.slice(0, 2)}-{item.slice(2, 4)}</S.InviteText>
                  <CopyFillIcon />
                </S.InviteButton>
              </S.InviteContainer>
            ))}
          </ScrollView>
        </>
      ) : (
        <S.Title>You have {invitationCodes?.length} App invitations codes</S.Title>
      )}
    </S.Container>
  );
};

export default Invitations;

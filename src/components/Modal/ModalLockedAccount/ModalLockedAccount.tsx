import React, { FC } from 'react';

import * as S from './ModalLockedAccount.style';
import LockIcon from 'assets/images/icons/key-rounded.svg';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { invitationCodePath } from 'constants/pathLocations';
import Button from 'components/Button/Button';
import useUser from 'hooks/user/useUser';

const ModalLockedAccount: FC = () => {
  const navigation = useAppNavigation();

  const handleInviteCodePress = () => {
    navigation.navigate(invitationCodePath as never);
  };

  const { user, isLoading } = useUser();

  if ((user?.uid && user?.accountReviewed) || isLoading) {
    return null;
  }

  return (
    <S.Container>
      <S.ModalWrapper>
        <S.ContentWrapper>
          <S.StyledBlurView />
          <S.LockBadgeContainer>
            <S.LockBadge>
              <LockIcon />
              <S.LockText>Locked</S.LockText>
            </S.LockBadge>
          </S.LockBadgeContainer>
          <S.Title>Profile is Under Review</S.Title>
          <S.Description>{`You'll be able to invite soon`}</S.Description>
          <Button
            buttonStyle={{
              width: '100%',
              marginTop: 24,
            }}
            variant="default"
            onPress={handleInviteCodePress}
            title="I have an invitation code"
          />
        </S.ContentWrapper>
      </S.ModalWrapper>
    </S.Container>
  );
};

export default ModalLockedAccount;

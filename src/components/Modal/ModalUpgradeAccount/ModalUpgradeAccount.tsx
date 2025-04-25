import React, { FC } from 'react';
import * as S from './ModalUpgradeAccount.style';
import LockIcon from 'assets/images/icons/key-rounded.svg';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { invitationCodePath } from 'constants/pathLocations';
import Button from 'components/Button/Button';
import useUser from 'hooks/user/useUser';

const ModalUpgradeAccount: FC = () => {
  const navigation = useAppNavigation();

  const handleInviteCodePress = () => {
    navigation.navigate(invitationCodePath as never);
  };

  const { user } = useUser();

  if (user?.uid && user?.accountReviewed && user?.accountConfirmed && user?.accountType === 'host' && !user?.accountPremium) {
    return (
      <S.Container>
        <S.ModalWrapper>
          <S.ContentWrapper>
            <S.BlurBackground />
            <S.LockContainer>
              <S.LockBadge>
                <LockIcon />
                <S.LockText>Locked</S.LockText>
              </S.LockBadge>
            </S.LockContainer>
            <S.Title>Upgrade to Access</S.Title>
            <S.Description>Upgrade to Premium to create events, invite guests, and access all features</S.Description>
            <Button
              buttonStyle={{
                width: '100%',
                marginTop: 24,
              }}
              variant="default"
              onPress={handleInviteCodePress}
              title="Upgrade to Premium"
            />
          </S.ContentWrapper>
        </S.ModalWrapper>
      </S.Container>
    );
  }

  return null;
};

export default ModalUpgradeAccount;

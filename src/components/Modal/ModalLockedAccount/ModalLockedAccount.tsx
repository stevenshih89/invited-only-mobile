import React, {FC} from 'react';
import LockIcon from 'assets/images/icons/key-rounded.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {invitationCodePath} from 'constants/pathLocations';
import {useUser} from 'src/store/userStore';
import * as S from './ModalLockedAccount.style';
import Button from 'components/Button/Button';

const ModalLockedAccount: FC = () => {
  const navigation = useAppNavigation();

  const handleInviteCodePress = () => {
    navigation.navigate(invitationCodePath as never);
  };

  const {user} = useUser();

  if (user?.uid && user?.accountReviewed) {
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
          <S.Description>You'll be able to invite soon</S.Description>
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

import React, { FC } from 'react';
import * as S from './ModalOutOfSwipes.style';
import { CountdownContainer, CountdownWrapper, StyledCountDown } from './ModalOutOfSwipes.style';
import { useAppNavigation } from 'hooks/useAppNavigation';
import Button from 'components/Button/Button';

interface ModalOutOfSwipesProps {
  timeToUnlock: Date;
}

const ModalOutOfSwipes: FC<ModalOutOfSwipesProps> = ({ timeToUnlock }) => {
  const navigation = useAppNavigation();

  const handleUpgradePress = () => {
    navigation.navigate('/profile/payment');
  };

  const secondsUntilUnlock = Math.max(0, Math.floor((timeToUnlock.getTime() - Date.now()) / 1000));

  return (
    <S.Container>
      <S.ModalWrapper>
        <S.ContentWrapper>
          <S.StyledBlurView />
          <S.LockBadgeContainer>
          </S.LockBadgeContainer>
          <S.Title>Limit Reached</S.Title>
          <S.Description>{`Go Premium for unlimited swipes
or come back in 24h`}</S.Description>
          <CountdownContainer>
            <CountdownWrapper>
              <S.StyledBlurView />
              <StyledCountDown
                until={secondsUntilUnlock}
                showSeparator
                timeToShow={['H', 'M', 'S']}
                onFinish={() => { }}
                size={36}
              />
            </CountdownWrapper>
          </CountdownContainer>
          <Button
            buttonStyle={{
              width: '100%',
              marginTop: 24,
            }}
            variant="default"
            onPress={handleUpgradePress}
            title="Upgrade Now"
          />
        </S.ContentWrapper>
      </S.ModalWrapper>
    </S.Container>
  );
};

export default ModalOutOfSwipes;

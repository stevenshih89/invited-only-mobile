import React, { FC } from 'react';
import { useTimer } from 'react-timer-hook';
import * as S from './ModalOutOfSwipes.style';
import { CountdownContainer, CountdownWrapper } from './ModalOutOfSwipes.style';
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

  const expiryTimestamp = new Date(timeToUnlock);
  const {
    seconds,
    minutes,
    hours,
  } = useTimer({ expiryTimestamp, onExpire: () => { } });

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
              <S.CountdownTimeRow>
                <S.CountdownDigit>{String(hours).padStart(2, '0')}</S.CountdownDigit>
                <S.CountdownSeparator>:</S.CountdownSeparator>
                <S.CountdownDigit>{String(minutes).padStart(2, '0')}</S.CountdownDigit>
                <S.CountdownSeparator>:</S.CountdownSeparator>
                <S.CountdownDigit>{String(seconds).padStart(2, '0')}</S.CountdownDigit>
              </S.CountdownTimeRow>
              <S.CountdownLabelRow>
                <S.CountdownLabel>HOURS</S.CountdownLabel>
                <S.CountdownLabel>MINUTES</S.CountdownLabel>
                <S.CountdownLabel>SECONDS</S.CountdownLabel>
              </S.CountdownLabelRow>
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

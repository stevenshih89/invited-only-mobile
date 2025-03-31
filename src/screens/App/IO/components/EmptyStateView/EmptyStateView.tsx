import React from 'react';
import {TouchableOpacity} from 'react-native';
import {screenHeight} from 'constants/common.ts';
import Button from 'components/Button/Button.tsx';
import Loading from 'components/Loading/Loading';
import * as S from './EmptyStateView.style';

interface EmptyStateViewProps {
  userInfo: any;
  goToCreateEvent: () => void;
  isHost: boolean;
  handleGoToEarlyAccess?: () => void;
}

const EmptyStateView: React.FC<EmptyStateViewProps> = ({userInfo, goToCreateEvent, isHost, handleGoToEarlyAccess}) => {
  if (isHost) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <Loading userInfo={userInfo} topPosition={true} wrapperText={false} />
        </S.LoadingContainer>
        <S.MessageContainer>
          <S.MessageText>You don't have any active event.</S.MessageText>
          <S.MessageText>Get started by creating an event to begin inviting guests.</S.MessageText>
        </S.MessageContainer>
        <S.ButtonContainer>
          <Button onPress={goToCreateEvent} title={'Create event'} buttonStyle={{marginTop: 20, marginBottom: 30}} />
        </S.ButtonContainer>
      </S.Container>
    );
  }

  return (
    <S.GuestContainer>
      <Loading topPosition={true} userInfo={userInfo} wrapperText={false} styleInnerContainer={{flex: 0}} styleContainer={{flex: 0}} />
      <S.WelcomeContainer>
        <S.WelcomeTitle>WELCOME</S.WelcomeTitle>
        <S.WelcomeSubtitle>Soon, Everything Changes.</S.WelcomeSubtitle>
        <S.WelcomeDescription>
          Be the first to access exclusive offers and VIP events. stay tuned - something extraordinary is coming.
        </S.WelcomeDescription>
        {userInfo?.accountConfirmed && handleGoToEarlyAccess && (
          <TouchableOpacity style={{marginTop: screenHeight / 50}} onPress={handleGoToEarlyAccess}>
            <S.InvitationLink>IO Invitations</S.InvitationLink>
          </TouchableOpacity>
        )}
      </S.WelcomeContainer>
    </S.GuestContainer>
  );
};

export default EmptyStateView;

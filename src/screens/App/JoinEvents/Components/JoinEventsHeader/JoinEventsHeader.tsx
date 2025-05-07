import React, { FC } from 'react';
import * as S from './JoinEventsHeader.style';

interface JoinEventsHeaderProps {
  onMyEventsPress?: () => void;
  onJoinEventsPress?: () => void;
  activeTab: 'explore' | 'invites';
  handleTabChange: (tab: 'explore' | 'invites') => void;
}

const JoinEventsHeader: FC<JoinEventsHeaderProps> = ({ onMyEventsPress, onJoinEventsPress, activeTab, handleTabChange }) => {
  const exploreEvents = () => {
    handleTabChange('explore');
    if (onMyEventsPress) {
      onMyEventsPress();
    }
  };

  const handleInvitesPress = () => {
    handleTabChange('invites');
    if (onJoinEventsPress) {
      onJoinEventsPress();
    }
  };

  return (
    <S.HeaderContainer>
      <S.TabContainer>
        <S.TabButton onPress={exploreEvents}>
          {activeTab === 'explore' ? <S.ActiveTabText>Explore events</S.ActiveTabText> : <S.TabText>Explore events</S.TabText>}
          {activeTab === 'explore' && <S.Underline />}
        </S.TabButton>
        <S.TabButton onPress={handleInvitesPress}>
          {activeTab === 'invites' ? <S.ActiveTabText>Invites</S.ActiveTabText> : <S.TabText>Invites</S.TabText>}
          {activeTab === 'invites' && <S.Underline />}
        </S.TabButton>
      </S.TabContainer>
    </S.HeaderContainer>
  );
};

export default JoinEventsHeader;

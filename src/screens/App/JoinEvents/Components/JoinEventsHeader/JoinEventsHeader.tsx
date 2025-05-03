import React, { FC, useState } from 'react';
import * as S from './JoinEventsHeader.style';

interface JoinEventsHeaderProps {
  onMyEventsPress?: () => void;
  onJoinEventsPress?: () => void;
}

const JoinEventsHeader: FC<JoinEventsHeaderProps> = ({ onMyEventsPress, onJoinEventsPress }) => {
  const [activeTab, setActiveTab] = useState<'explore' | 'invites'>('explore');

  const exploreEvents = () => {
    setActiveTab('explore');
    if (onMyEventsPress) {
      onMyEventsPress();
    }
  };

  const handleInvitesPress = () => {
    setActiveTab('invites');
    if (onJoinEventsPress) {
      onJoinEventsPress();
    }
  };

  return (
    <S.HeaderContainer>
      <S.TabContainer>
        <S.TabButton onPress={exploreEvents}>
          {activeTab === 'explore' ? <S.ActiveTabText>Explore events</S.ActiveTabText> : <S.TabText>Explore Events</S.TabText>}
          {activeTab === 'explore' && <S.Underline />}
        </S.TabButton>

        <S.TabButton disabled onPress={handleInvitesPress}>
          {activeTab === 'invites' ? <S.ActiveTabText>Invites</S.ActiveTabText> : <S.TabText>Invites</S.TabText>}
          {activeTab === 'invites' && <S.Underline />}
        </S.TabButton>
      </S.TabContainer>
    </S.HeaderContainer>
  );
};

export default JoinEventsHeader;

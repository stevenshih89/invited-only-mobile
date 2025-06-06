import React, {FC} from 'react';
import * as S from './JoinEventsHeader.style';

interface JoinEventsHeaderProps {
  onMyEventsPress?: () => void;
  onJoinEventsPress?: () => void;
  activeTab: 'explore' | 'invites';
  handleTabChange: (tab: 'explore' | 'invites') => void;
}

const JoinEventsHeader: FC<JoinEventsHeaderProps> = ({onMyEventsPress, onJoinEventsPress, activeTab, handleTabChange}) => {
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
    <S.HeaderContainer testID="header-container">
      <S.TabContainer testID="tab-container">
        <S.TabButton testID="explore-tab" onPress={exploreEvents}>
          {activeTab === 'explore' ? (
            <S.ActiveTabText testID="explore-active-text">Explore events</S.ActiveTabText>
          ) : (
            <S.TabText testID="explore-text">Explore events</S.TabText>
          )}
          {activeTab === 'explore' && <S.Underline testID="explore-underline" />}
        </S.TabButton>
        <S.TabButton testID="invites-tab" onPress={handleInvitesPress}>
          {activeTab === 'invites' ? (
            <S.ActiveTabText testID="invites-active-text">Invites</S.ActiveTabText>
          ) : (
            <S.TabText testID="invites-text">Invites</S.TabText>
          )}
          {activeTab === 'invites' && <S.Underline testID="invites-underline" />}
        </S.TabButton>
      </S.TabContainer>
    </S.HeaderContainer>
  );
};

export default JoinEventsHeader;

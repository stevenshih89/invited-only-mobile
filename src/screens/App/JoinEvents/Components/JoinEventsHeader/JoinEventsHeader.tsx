import React, {FC, useState} from 'react';
import * as S from './JoinEventsHeader.style';

interface JoinEventsHeaderProps {
  onMyEventsPress?: () => void;
  onJoinEventsPress?: () => void;
}

const JoinEventsHeader: FC<JoinEventsHeaderProps> = ({onMyEventsPress, onJoinEventsPress}) => {
  const [activeTab, setActiveTab] = useState<'myEvents' | 'joinEvents'>('joinEvents');

  const handleMyEventsPress = () => {
    setActiveTab('myEvents');
    if (onMyEventsPress) {
      onMyEventsPress();
    }
  };

  const handleJoinEventsPress = () => {
    setActiveTab('joinEvents');
    if (onJoinEventsPress) {
      onJoinEventsPress();
    }
  };

  return (
    <S.HeaderContainer>
      <S.TabContainer>
        <S.TabButton onPress={handleMyEventsPress}>
          {activeTab === 'myEvents' ? <S.ActiveTabText>Explore events</S.ActiveTabText> : <S.TabText>Explore Events</S.TabText>}
          {activeTab === 'myEvents' && <S.Underline />}
        </S.TabButton>

        <S.TabButton disabled onPress={handleJoinEventsPress}>
          {activeTab === 'joinEvents' ? <S.ActiveTabText>Invites</S.ActiveTabText> : <S.TabText>Invites</S.TabText>}
          {activeTab === 'joinEvents' && <S.Underline />}
        </S.TabButton>
      </S.TabContainer>
    </S.HeaderContainer>
  );
};

export default JoinEventsHeader;

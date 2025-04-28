import React from 'react';
import JoinedEventsEmptyFallback from '../JoinedEventsEmptyFallback/JoinedEventsEmptyFallback';
import * as S from './JoinedEventsScreen.style';

const JoinedEventsScreen = () => {
  const isComingSoon = true;

  if (isComingSoon) {
    return <JoinedEventsEmptyFallback />;
  }

  return (
    <S.Container>
      <S.PlaceholderText>Joined Events - Coming Soon!</S.PlaceholderText>
    </S.Container>
  );
};

export default JoinedEventsScreen;

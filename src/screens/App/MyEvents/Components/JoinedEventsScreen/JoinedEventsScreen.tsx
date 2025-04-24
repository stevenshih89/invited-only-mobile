import React from 'react';
import * as S from './JoinedEventsScreen.style';
import JoinedEventsEmptyFallback from '../JoinedEventsEmptyFallback/JoinedEventsEmptyFallback';

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

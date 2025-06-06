import React from 'react';

import CreateEventButton from '../IoHeader/Components/CreateEventButton/CreateEventButton';
import * as S from './EmptyStateView.style';
import CardsSwipeImage from 'src/assets/images/app/empty-fallback-io-screen.png';

const EmptyStateView = () => {
  return (
    <S.OuterContainer>
      <S.CardsSwipeImage testID="empty-state-image" source={CardsSwipeImage} />
      <S.CreateEventContainer>
        <S.CreateEventTitle>Create Your First Event</S.CreateEventTitle>

        <S.WelcomeDescription>Create your first event to start inviting guests.</S.WelcomeDescription>
      </S.CreateEventContainer>
      <CreateEventButton />
    </S.OuterContainer>
  );
};

export default EmptyStateView;

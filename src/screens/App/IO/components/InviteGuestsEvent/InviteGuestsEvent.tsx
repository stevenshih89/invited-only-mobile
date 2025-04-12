import React from 'react';
import * as S from './InviteGuestsEvent.styled';
import {ScrollView} from 'react-native-gesture-handler';
import GuestBasicInfoCard from './Components/GuestBasicInfoCard/GuestBasicInfoCard';
import GuestBioCard from './Components/GuestBioCard/GuestBioCard';
import {GuestCard} from './Components/GuestCard/GuestCard';
import {components} from 'src/api/v1';
import GuestLanguagesCard from './Components/GuestLanguagesCard/GuestLanguagesCard';
import AppLoader from 'screens/App/AppLoader/AppLoader';

// Define the guest type alias
type GuestUser = components['schemas']['User'];

// Update component props
interface InviteGuestsEventProps {
  selectedEvent: components['schemas']['EventData'];
  cardsToShow: GuestUser[];
  isLoading: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSuperInvite: () => void;
}

const InviteGuestsEvent = ({selectedEvent, cardsToShow, isLoading, onSwipeLeft, onSwipeRight, onSuperInvite}: InviteGuestsEventProps) => {
  const hasCards = cardsToShow.length > 0;
  const currentCard = hasCards ? cardsToShow[cardsToShow.length - 1] : null;

  const renderCards = () => {
    if (isLoading) {
      return <AppLoader />;
    }
    if (!hasCards) {
      return <S.NoCardsText>No more guests to show.</S.NoCardsText>;
    }

    return cardsToShow.map((guest, index) => (
      <GuestCard
        key={guest.uid}
        guest={guest} // Already correct type GuestUser
        index={index}
        isTopCard={index === cardsToShow.length - 1}
        onReject={onSwipeLeft} // Use passed handler
        onSuperInvite={onSuperInvite} // Use passed handler
        onInvite={onSwipeRight} // Use passed handler
        topIndex={cardsToShow.length - 1}
      />
    ));
  };

  return (
    <ScrollView>
      <S.Container>
        <S.CardContainer>{renderCards()}</S.CardContainer>

        {/* Use currentCard derived variable */}
        {!isLoading && currentCard && (
          <>
            <GuestBasicInfoCard guestInfo={currentCard} />
            <GuestBioCard guestInfo={currentCard} />
            <GuestLanguagesCard guestInfo={currentCard} />
            <S.BlockAndReportContainer>
              <S.BlockAndReportButton>
                <S.BlockText>Block and Report</S.BlockText>
              </S.BlockAndReportButton>
            </S.BlockAndReportContainer>
          </>
        )}
      </S.Container>
    </ScrollView>
  );
};

export default InviteGuestsEvent;

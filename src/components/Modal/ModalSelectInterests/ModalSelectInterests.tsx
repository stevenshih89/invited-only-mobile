import React, { FC, useState, useCallback } from 'react';
import { View } from 'react-native';
import * as S from './ModalSelectInterests.style';
import SearchIcon from 'assets/images/icons/search.svg';
import CheckIcon from 'assets/images/icons/Check-black.svg';
import Button from 'components/Button/Button';
import { components } from 'src/api/v1';

// --- Import necessary image sources ---
import BirthdayParty from 'src/assets/images/auth/interests/birthday-party.png';
import Exclusive from 'src/assets/images/auth/interests/exclusive.png';
import PoolParty from 'src/assets/images/auth/interests/pool-party.png';
import Private from 'src/assets/images/auth/interests/private.png';
import Restaurant from 'src/assets/images/auth/interests/restaurant.png';
import VipTables from 'src/assets/images/auth/interests/vip-tables.png';
import YachtParty from 'src/assets/images/auth/interests/yacht-party.png';


const getInterestImageSource = (interestId?: number) => {
  switch (interestId) {
    case 1: return BirthdayParty;
    case 2: return Exclusive;
    case 3: return PoolParty;
    case 4: return Private;
    case 5: return Restaurant;
    case 6: return VipTables;
    case 7: return YachtParty;
    default: return undefined;
  }
};

type Interest = components['schemas']['Interest'];


interface ModalSelectInterestsProps {
  modalInterests: boolean;
  setModalInterests: (value: boolean) => void;
  availableInterests: Interest[]; // All possible interests
  formikFieldName: string; // Name of the field in Formik (e.g., "interests")
  formikValues: { [key: string]: any }; // Formik values object
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void; // Formik's setFieldValue
}

const ModalSelectInterests: FC<ModalSelectInterestsProps> = ({
  modalInterests,
  setModalInterests,
  availableInterests,
  formikFieldName,
  formikValues,
  setFieldValue,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // --- Filter available interests based on search ---
  const filteredInterests = searchQuery.length > 0 ? availableInterests.filter(interest =>
    interest.title?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : availableInterests;

  // --- Handle selecting/deselecting an interest (updates with full object) ---
  const handleSelectInterest = useCallback((clickedInterestId: number) => {
    // Get current selected Interest objects from Formik values
    const currentSelectedInterests = (formikValues[formikFieldName] as Interest[] || []);
    let newSelectedInterests: Interest[];

    const isCurrentlySelected = currentSelectedInterests.some(interest => interest.id === clickedInterestId);

    if (isCurrentlySelected) {
      // Deselect: Remove the interest object
      newSelectedInterests = currentSelectedInterests?.filter(interest => interest.id !== clickedInterestId);
    } else {
      // Select: Find the full object and add it
      const interestToAdd = availableInterests.find(interest => interest.id === clickedInterestId);
      if (interestToAdd) {
        newSelectedInterests = [...currentSelectedInterests, interestToAdd];
      } else {
        // Should not happen if availableInterests is correct, but handle defensively
        newSelectedInterests = currentSelectedInterests;
        console.warn(`Interest with ID ${clickedInterestId} not found in availableInterests.`);
      }
    }

    // Update the Formik field with the new array of Interest objects
    setFieldValue(formikFieldName, newSelectedInterests);
  }, [formikValues, formikFieldName, setFieldValue, availableInterests]);


  // --- Render individual interest item ---
  const renderInterestItem = useCallback(
    ({ item }: { item: Interest }) => {
      const isSelected = (formikValues[formikFieldName] as Interest[] || []).some(interest => interest.id === item.id);
      const imageSource = getInterestImageSource(item.id);

      // Don't render if image source is invalid or title is missing
      if (!imageSource || !item.title) {
        return null;
      }

      return (
        <S.InterestItem activeOpacity={0.7} onPress={() => handleSelectInterest(item.id)}>
          <S.InterestImage source={imageSource} resizeMode="cover">
            <S.InterestOverlay />
            <View style={{ flex: 1, justifyContent: 'flex-end', padding: 8 }}>
              <S.InterestTitle>{item.title}</S.InterestTitle>
            </View>
            <S.SelectionIndicator isSelected={isSelected}>
              {isSelected && <CheckIcon width={14} height={14} />}
            </S.SelectionIndicator>
          </S.InterestImage>
        </S.InterestItem>
      );
    },
    [handleSelectInterest, formikValues, formikFieldName] // Dependencies include Formik values
  );

  // --- Close modal function (used by backdrop and button) ---
  const handleCloseModal = () => {
    setModalInterests(false);
  }

  return (
    <S.StyledModal
      isVisible={modalInterests}
      onBackdropPress={handleCloseModal}
      onSwipeComplete={handleCloseModal}
      swipeDirection={['down']}
      propagateSwipe
      style={{ margin: 0 }}
      avoidKeyboard // Add this prop if the search input might be obscured by keyboard
    >
      <S.Wrapper>
        <S.WhiteLine />
        <S.Title>Select Interests</S.Title>

        <S.SearchContainer>
          <S.SearchIconContainer>
            <SearchIcon width={20} height={20} />
          </S.SearchIconContainer>
          <S.SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery} // Directly set search query
            placeholder="Search"
            placeholderTextColor="#767676"
          />
        </S.SearchContainer>

        <S.ListContainer>
          <S.InterestGrid
            data={filteredInterests}
            renderItem={renderInterestItem}
            keyExtractor={(item: Interest) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }} // Ensure space for button
          />
        </S.ListContainer>

        {/* Button now just closes the modal */}
        <S.SaveButtonWrapper>
          <Button title="Done" onPress={handleCloseModal} />
        </S.SaveButtonWrapper>
      </S.Wrapper>
    </S.StyledModal>
  );
};

export default ModalSelectInterests;

import React, {FC, useState, useCallback, SetStateAction, Dispatch} from 'react';
import {View} from 'react-native';
import {Interest} from 'hooks/useProfileEditing';
import * as S from './ModalSelectInterests.style';
import SearchIcon from 'assets/images/icons/search.svg';
import CheckIcon from 'assets/images/icons/Check-black.svg';
import Button from 'components/Button/Button';

interface ModalSelectInterestsProps {
  modalInterests: boolean;
  setModalInterests: (value: boolean) => void;
  onSave: (selectedInterests: Interest[]) => void;
  listOfInterests: Interest[];
  setListOfInterests: Dispatch<SetStateAction<Interest[]>>;
}

const ModalSelectInterests: FC<ModalSelectInterestsProps> = ({
  modalInterests,
  setModalInterests,
  onSave,
  listOfInterests: interests,
  setListOfInterests,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const filteredInterests = interests.filter(interest => interest.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelectInterest = (id: number) => {
    const updatedInterests = interests.map(interest => (interest.id === id ? {...interest, isSelected: !interest.isSelected} : interest));
    setListOfInterests(updatedInterests);
  };

  const handleSave = () => {
    const selectedInterests = interests.filter(interest => interest.isSelected);
    onSave(selectedInterests);
    setModalInterests(false);
  };

  const renderInterestItem = useCallback(
    ({item}: {item: Interest}) => (
      <S.InterestItem activeOpacity={0.7} onPress={() => handleSelectInterest(item.id)}>
        <S.InterestImage source={item.image} resizeMode="cover">
          <S.InterestOverlay />
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <S.InterestTitle>{item.title}</S.InterestTitle>
          </View>
          <S.SelectionIndicator isSelected={item.isSelected}>{item.isSelected && <CheckIcon />}</S.SelectionIndicator>
        </S.InterestImage>
      </S.InterestItem>
    ),
    [handleSelectInterest],
  );

  return (
    <S.StyledModal
      isVisible={modalInterests}
      onBackdropPress={() => setModalInterests(false)}
      onSwipeComplete={() => setModalInterests(false)}
      swipeDirection={['down']}
      propagateSwipe
      style={{margin: 0}}>
      <S.Wrapper>
        <S.WhiteLine />
        <S.Title>Select Interests</S.Title>

        <S.SearchContainer>
          <S.SearchIconContainer>
            <SearchIcon width={20} height={20} />
          </S.SearchIconContainer>
          <S.SearchInput value={searchQuery} onChangeText={handleSearch} placeholder="Search" placeholderTextColor="#767676" />
        </S.SearchContainer>
        <S.ListContainer>
          <S.InterestGrid
            data={filteredInterests}
            renderItem={renderInterestItem}
            keyExtractor={(item: Interest) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
          />
        </S.ListContainer>
        <S.SaveButtonWrapper>
          <Button title="Save Changes" onPress={handleSave} />
        </S.SaveButtonWrapper>
      </S.Wrapper>
    </S.StyledModal>
  );
};

export default ModalSelectInterests;

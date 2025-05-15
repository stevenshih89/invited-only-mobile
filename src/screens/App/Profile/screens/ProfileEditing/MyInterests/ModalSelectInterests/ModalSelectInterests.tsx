import React, {FC, useState, useCallback} from 'react';
import {View} from 'react-native';
import {components} from 'src/api/v1';
import * as S from './ModalSelectInterests.style';
import SearchIcon from 'assets/images/icons/search.svg';
import CheckIcon from 'assets/images/icons/Check-black.svg';
import Button from 'components/Button/Button';

import Sports from 'assets/images/interests/sports.png';
import Festivals from 'assets/images/interests/festivals.png';
import Yachts from 'assets/images/interests/yachts.png';
import VipTables from 'assets/images/interests/vip-tables.png';
import Concerts from 'assets/images/interests/concerts.png';
import Fashion from 'assets/images/interests/fashion.png';
import Bars from 'assets/images/interests/bars.png';
import Business from 'assets/images/interests/business.png';
import Restaurants from 'assets/images/interests/restaurants.png';
import PoolParties from 'assets/images/interests/pool-parties.png';
import Private from 'assets/images/interests/private.png';
import Exclusive from 'assets/images/interests/exclusive.png';
import BeachParties from 'assets/images/interests/beach-parties.png';
import Nightclubs from 'assets/images/interests/nightclubs.png';
import LiveShows from 'assets/images/interests/live-shows.png';
import Brunches from 'assets/images/interests/brunches.png';

const getInterestImageSource = (interestId?: number) => {
  switch (interestId) {
    case 0:
      return Sports;
    case 1:
      return Festivals;
    case 2:
      return Yachts;
    case 3:
      return VipTables;
    case 4:
      return Concerts;
    case 5:
      return Fashion;
    case 6:
      return Bars;
    case 7:
      return Business;
    case 8:
      return Restaurants;
    case 9:
      return PoolParties;
    case 10:
      return Private;
    case 11:
      return Exclusive;
    case 12:
      return BeachParties;
    case 13:
      return Nightclubs;
    case 14:
      return LiveShows;
    case 15:
      return Brunches;
    default:
      return undefined;
  }
};

type Interest = components['schemas']['Interest'];

interface ModalSelectInterestsProps {
  modalInterests: boolean;
  setModalInterests: (value: boolean) => void;
  availableInterests: Interest[];
  formikFieldName: string;
  formikValues: {[key: string]: any};
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
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

  const filteredInterests =
    searchQuery.length > 0
      ? availableInterests?.filter(interest => interest.title?.toLowerCase().includes(searchQuery.toLowerCase()))
      : availableInterests;

  console.log('filteredInterests', filteredInterests);
  const handleSelectInterest = useCallback(
    (id: number) => {
      const currentSelectedInterests = (formikValues[formikFieldName] as Interest[]) || [];
      let newSelectedInterests: Interest[];

      if (currentSelectedInterests.flatMap(interest => interest.id).includes(id)) {
        newSelectedInterests = currentSelectedInterests.filter(selectedInterest => selectedInterest.id !== id);
      } else {
        newSelectedInterests = [...currentSelectedInterests, {id}];
      }

      setFieldValue(formikFieldName, newSelectedInterests);
    },
    [formikValues, formikFieldName, setFieldValue],
  );

  const renderInterestItem = useCallback(
    ({item}: {item: Interest}) => {
      const isSelected = ((formikValues[formikFieldName] as Interest[]) || []).some(interest => interest.id === item.id);
      const imageSource = getInterestImageSource(item.id);

      if (!imageSource || !item.title) {
        return null;
      }

      return (
        <S.InterestItem activeOpacity={0.7} onPress={() => handleSelectInterest(item.id)}>
          <S.InterestImage source={imageSource} resizeMode="cover">
            <S.InterestOverlay />
            <View style={{flex: 1, justifyContent: 'flex-end', padding: 8}}>
              <S.InterestTitle>{item.title}</S.InterestTitle>
            </View>
            <S.SelectionIndicator isSelected={isSelected}>{isSelected && <CheckIcon width={14} height={14} />}</S.SelectionIndicator>
          </S.InterestImage>
        </S.InterestItem>
      );
    },
    [handleSelectInterest, formikValues, formikFieldName],
  );

  const handleCloseModal = () => {
    setModalInterests(false);
  };

  return (
    <S.StyledModal
      isVisible={modalInterests}
      onBackdropPress={handleCloseModal}
      onSwipeComplete={handleCloseModal}
      swipeDirection={['down']}
      propagateSwipe
      style={{margin: 0}}
      avoidKeyboard>
      <S.Wrapper>
        <S.WhiteLine />
        <S.Title>Select Interests</S.Title>

        <S.SearchContainer>
          <S.SearchIconContainer>
            <SearchIcon width={20} height={20} />
          </S.SearchIconContainer>
          <S.SearchInput value={searchQuery} onChangeText={setSearchQuery} placeholder="Search" placeholderTextColor="#767676" />
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
          <Button title="Done" onPress={handleCloseModal} />
        </S.SaveButtonWrapper>
      </S.Wrapper>
    </S.StyledModal>
  );
};

export default ModalSelectInterests;

import React, {FC, JSX, useCallback} from 'react';
import CommonAuthLayout from '../Layouts/CommonAuthLayout/CommonAuthLayout';
import {InterestState, useMyInterests} from './hooks/useMyInterests';
import * as S from './MyInterests.style';
import CheckIcon from 'assets/images/icons/Check-black.svg';

const MyInterests: FC = (): JSX.Element => {
  const {listOfInterests, handleSelectInterest, handleNext, navigation} = useMyInterests();

  const renderItem = useCallback(
    ({item}: {item: InterestState}) => {
      return (
        <S.InterestItem onPress={() => handleSelectInterest(item.id)} isSelected={item.isSelected} testID={`interest-item-${item.id}`}>
          <S.InterestImage testID={`image-of-interest`} source={item.image} resizeMode="cover">
            <S.InterestTitleWrapper>
              <S.InterestTitle>{item.title}</S.InterestTitle>
            </S.InterestTitleWrapper>
            <S.SelectionIndicator isSelected={item.isSelected}>
              {item.isSelected && <CheckIcon width={14} height={14} />}
            </S.SelectionIndicator>
            <S.ItemGradient colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']} />
          </S.InterestImage>
        </S.InterestItem>
      );
    },
    [listOfInterests],
  );

  return (
    <CommonAuthLayout
      title="Your event types"
      subtitle="Select at least 3 event types you love."
      startPercentage={70}
      endPercentage={80}
      continueButtonTitle="Continue"
      continueButtonDisabled={listOfInterests.filter(i => i.isSelected).length < 3}
      onContinuePress={handleNext}
      continueButtonTestID="continue-button"
      skipButtonTitle="Skip"
      onSkipPress={handleNext}
      skipButtonTestID="skip-button">
      <S.ListContainer>
        <S.InterestsList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={listOfInterests}
          keyExtractor={({id}: {id: number}) => id.toString()}
          renderItem={renderItem}
        />
        <S.ListGradient colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']} />
      </S.ListContainer>
    </CommonAuthLayout>
  );
};

export default MyInterests;

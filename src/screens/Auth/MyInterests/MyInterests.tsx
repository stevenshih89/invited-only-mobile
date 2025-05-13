import React, {FC, JSX, useCallback} from 'react';
import {Keyboard} from 'react-native';
import {InterestState, useMyInterests} from './hooks/useMyInterests';
import * as S from './MyInterests.style';
import AuthProgress from 'components/AuthProgress';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
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
    <S.GradientBackground>
      <S.AvoidingContainer>
        <S.TouchableDismiss onPress={Keyboard.dismiss}>
          <S.SafeArea>
            <S.Wrapper>
              <S.Header>
                <S.TopRow>
                  <S.BackButton onPress={() => navigation.goBack()}>
                    <ArrowLeft />
                  </S.BackButton>
                  <LogoPrimary2 />
                  <AuthProgress startPercentage={70} endPercentage={80} animationDuration={1000} />
                </S.TopRow>
                <S.TitleContainer>
                  <S.Title testID="interests-title">Your event types</S.Title>
                  <S.Subtitle>Select at least 3 event types you love.</S.Subtitle>
                </S.TitleContainer>
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
              </S.Header>
              <S.ButtonsContainer>
                <S.ContinueButton disabled={listOfInterests.filter(i => i.isSelected).length < 3} onPress={handleNext} title={`Continue`} />
                <S.SkipButton onPress={handleNext} title="Skip" />
              </S.ButtonsContainer>
            </S.Wrapper>
          </S.SafeArea>
        </S.TouchableDismiss>
      </S.AvoidingContainer>
    </S.GradientBackground>
  );
};

export default MyInterests;

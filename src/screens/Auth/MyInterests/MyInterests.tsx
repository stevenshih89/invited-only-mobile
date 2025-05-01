import React, {FC, JSX} from 'react';
import {Keyboard} from 'react-native';
import {useMyInterests} from './hooks/useMyInterests';
import * as S from './MyInterests.style';
import AuthProgress from 'components/AuthProgress';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import CheckIcon from 'assets/images/icons/Check-black.svg';
import UserOne from 'assets/images/auth/interests/user-one.png';
import UserTwo from 'assets/images/auth/interests/user-two.png';

const MyInterests: FC = (): JSX.Element => {
  const {listOfInterests, handleSelectInterest, handleNext, accountType, navigation} = useMyInterests();

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
                  <S.Title>Choose interests</S.Title>
                  <S.Subtitle>
                    Choose up to <S.BoldText>3 event types</S.BoldText> you love to help us find the right{' '}
                    {accountType === 'host' ? 'guests for your events.' : 'events for you.'}
                  </S.Subtitle>
                </S.TitleContainer>
                <S.ListContainer>
                  <S.InterestsList
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={listOfInterests}
                    keyExtractor={({id}: {id: number}) => id.toString()}
                    ItemSeparatorComponent={() => <S.InterestSeparator />}
                    renderItem={({
                      item: {id, title, isSelected, image},
                    }: {
                      item: {id: number; title: string; isSelected: boolean; image: string};
                    }) => (
                      <S.InterestItem selected={isSelected} testID={`interest-${id}`} onPress={() => handleSelectInterest(id)}>
                        <S.ImageWrapper>
                          <S.BackgroundImage source={image}>
                            <S.CheckButton selected={isSelected}>
                              <CheckIcon />
                            </S.CheckButton>
                            <S.LabelBar>
                              <S.LabelBarRow>
                                <S.InterestTitle>{title}</S.InterestTitle>
                                <S.AvatarStack>
                                  <S.Avatar source={UserOne} />
                                  <S.AvatarSecond source={UserTwo} />
                                  <S.AvatarCount>
                                    <S.CountText>40</S.CountText>
                                  </S.AvatarCount>
                                </S.AvatarStack>
                              </S.LabelBarRow>
                            </S.LabelBar>
                          </S.BackgroundImage>
                        </S.ImageWrapper>
                      </S.InterestItem>
                    )}
                  />
                </S.ListContainer>
              </S.Header>
              <S.ButtonsContainer>
                <S.ContinueButton
                  disabled={listOfInterests.filter(i => i.isSelected).length < 3}
                  onPress={handleNext}
                  title={`Continue (${listOfInterests.filter(i => i.isSelected).length}/3)`}
                />
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

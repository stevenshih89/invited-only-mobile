import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import ListItem from './Components/ListItem/ListItem';
import * as S from './WelcomeToPremium.style';
import {useReanimatedCarousel} from './hooks/useReanimatedCarousel';
import WelcomeToPremiumImage from 'assets/images/app/welcome-to-premium-bcg.png';
import CloseIcon from 'assets/images/icons/close.svg';
import {screenHeight, screenWidth} from 'constants/common';

const WelcomeToPremium = () => {
  const {slidesList, progressValue, carouselRef, handlePaginationPress} = useReanimatedCarousel();

  return (
    <S.Root>
      <S.BackgroundContainer>
        <S.StyledImage source={WelcomeToPremiumImage} resizeMode="cover" />
      </S.BackgroundContainer>
      <S.TopSafeArea>
        <S.TopBar>
          <S.CloseButton onPress={() => {}} activeOpacity={0.8}>
            <S.StyledBlurView />
            <CloseIcon width={screenWidth / 22} height={screenWidth / 22} />
          </S.CloseButton>
        </S.TopBar>
      </S.TopSafeArea>
      <S.BottomSafeArea>
        <S.Content>
          <S.Title>Welcome to Premium</S.Title>
          <S.Subtitle>{`You're all set as a Premium Host! Enjoy exclusive perks, priority visibility, and quicker connections`}</S.Subtitle>
          <S.CarouselContainer>
            <Carousel
              ref={carouselRef}
              loop={false}
              width={screenWidth - 80}
              height={screenHeight / 5}
              data={slidesList}
              renderItem={({item}) => <ListItem item={item} />}
              onProgressChange={progressValue}
              snapEnabled={true}
              pagingEnabled={false}
              style={{width: screenWidth}}
            />
            <S.PaginationContainer>
              <S.PaginationBasic progress={progressValue} data={slidesList} onPress={handlePaginationPress} />
            </S.PaginationContainer>
          </S.CarouselContainer>
          <S.StyledButton title="Let's Go" onPress={() => {}} />
        </S.Content>
      </S.BottomSafeArea>
    </S.Root>
  );
};

export default WelcomeToPremium;

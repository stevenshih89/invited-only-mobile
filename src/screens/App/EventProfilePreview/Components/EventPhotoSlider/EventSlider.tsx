import React, { FC, useState } from 'react';
import { components } from '@invited-only/invited-only-api';
import * as S from './EventPhotoSlider.style';
import Card from 'screens/App/Components/Card/Card';



interface EventSliderProps {
  event: components['schemas']['EventData'];
}

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  if (!isNaN(dateObj.getTime())) {
    return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
  }
  return date;
}

const EventSlider: FC<EventSliderProps> = ({ event }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (event?.photos?.length && currentIndex < event?.photos?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <S.Container>
      <Card
        isStatic
        withDarkOverlay={false}
        backgroundUrls={event?.photos?.map((photo) => ({ image: photo.image })) || []}
        index={currentIndex}
        distanceFromTop={0}
        isTopCard
        uid={''}
      >
        <S.LeftTouchArea testID="left-touch-area" onPress={handlePrevious} />
        <S.LeftTouchArea testID="left-touch-area" onPress={handlePrevious} />
        <S.RightTouchArea testID="right-touch-area" onPress={handleNext} />
        <S.GradientOverlay colors={['transparent', 'rgba(0, 0, 0, 0.9)']} locations={[0, 1]} pointerEvents="none" />
        <S.ContentContainer>
          <S.DotsContainer>
            {event?.photos?.map((_, index) => (
              <S.Dot testID="slider-dot" key={index} isActive={index === currentIndex} />
            ))}
          </S.DotsContainer>
          <S.UserInfoContainer>
            <S.EventName>{event?.name}</S.EventName>
            <S.EventDate>{formatDate(event?.date || '')}</S.EventDate>
          </S.UserInfoContainer>
        </S.ContentContainer>
      </Card>
    </S.Container>
  );
};

export default EventSlider;

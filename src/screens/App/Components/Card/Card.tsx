import React, {ReactNode, useState} from 'react';
import * as S from './Card.style';
import {GestureDetector, PanGesture} from 'react-native-gesture-handler';
import {AnimatedStyle} from 'react-native-reanimated';
import InvisibleTouchZone from './Components/InvisibleTouchZone/InvisibleTouchZone';
import ImageIndicator from './Components/ImageIndicator/ImageIndicator';

import {User} from 'src/types/userInfo';
import CardImage from './Components/CardImage/CardImage';

interface CardProps {
  uid: string;
  backgroundUrls: User.Photo[];
  index: number;
  isTopCard?: boolean;
  distanceFromTop: number;
  onReject?: () => void;
  onSuperInvite?: () => void;
  onInvite?: () => void;
  children: ReactNode;
  gestureHandler?: PanGesture;
  animatedStyle?: AnimatedStyle;
  likeOpacityStyle?: AnimatedStyle;
  nopeOpacityStyle?: AnimatedStyle;
  isStatic?: boolean;
  showDots?: boolean;
}

const PhysicCard = ({
  children,
  uid,
  index,
  setImageIndex,
  backgroundUrls,
  distanceFromTheTop,
}: {
  children: ReactNode;
  uid: string;
  index: number;
  setImageIndex: any;
  backgroundUrls: User.Photo[];
  distanceFromTheTop: number;
}) => {
  return (
    <S.Card key={uid} distanceFromTheTop={distanceFromTheTop} index={index}>
      <InvisibleTouchZone setImageIndex={setImageIndex} imageCount={backgroundUrls?.length} />
      {children}
    </S.Card>
  );
};

const Card: React.FC<CardProps> = ({
  uid,
  backgroundUrls,
  index,
  children,
  gestureHandler,
  animatedStyle,
  likeOpacityStyle,
  nopeOpacityStyle,
  isStatic = false,
  showDots = true,
  isTopCard,
  distanceFromTop,
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  if (isStatic) {
    const showImageIndexIndicator = isTopCard && showDots && backgroundUrls.length > 1;
    return (
      <PhysicCard
        distanceFromTheTop={distanceFromTop}
        index={index}
        uid={uid}
        backgroundUrls={backgroundUrls}
        setImageIndex={setImageIndex}>
        <S.StyledNotAnimatedView>
          <CardImage imageSource={backgroundUrls[imageIndex].image} isTopCard={isTopCard} imageIndex={imageIndex} />

          <S.CardGradient colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.9)']} locations={[0, 0.4, 1]} />
          {showImageIndexIndicator && <ImageIndicator currentIndex={imageIndex} totalImages={backgroundUrls.length} />}
          {children}
        </S.StyledNotAnimatedView>
      </PhysicCard>
    );
  }

  return (
    <GestureDetector gesture={gestureHandler!}>
      <PhysicCard
        distanceFromTheTop={distanceFromTop}
        index={index}
        uid={uid}
        backgroundUrls={backgroundUrls}
        setImageIndex={setImageIndex}>
        <InvisibleTouchZone setImageIndex={setImageIndex} imageCount={backgroundUrls?.length} />
        <S.StyledAnimatedView style={[animatedStyle]}>
          <CardImage imageSource={backgroundUrls[imageIndex].image} isTopCard={isTopCard} imageIndex={imageIndex} />

          <S.CardGradient colors={['rgba(0, 0, 0, 0), 0)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.9)']} locations={[0, 0.7, 1]} />

          <S.LikeAnimatedOpacity style={likeOpacityStyle}>
            <S.LabelTextLike>LIKE</S.LabelTextLike>
          </S.LikeAnimatedOpacity>
          <S.NopeAnimatedOpacity style={nopeOpacityStyle}>
            <S.LabelTextNope>NOPE</S.LabelTextNope>
          </S.NopeAnimatedOpacity>
          {backgroundUrls.length > 1 && <ImageIndicator currentIndex={imageIndex} totalImages={backgroundUrls.length} />}
          {children}
        </S.StyledAnimatedView>
      </PhysicCard>
    </GestureDetector>
  );
};

export default Card;

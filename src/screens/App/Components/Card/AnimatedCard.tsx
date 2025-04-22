import React, { useState, ReactNode } from 'react';
import { GestureDetector, PanGesture } from 'react-native-gesture-handler';
import { AnimatedStyle } from 'react-native-reanimated';
import * as S from './Card.style';
import ImageIndicator from './Components/ImageIndicator/ImageIndicator';
import CardImage from './Components/CardImage/CardImage';
import { PhysicCard } from './Card'; // Assuming PhysicCard remains in Card.tsx or is exported
import { NopeRejectBadge } from './Components/NopeRejectBadge/NopeRejectBadge';
import { components } from 'src/api/v1';

interface AnimatedCardProps {
  uid: string;
  backgroundUrls: components['schemas']['UserPhoto'][];
  index: number;
  children: ReactNode;
  gestureHandler: PanGesture; // Required for animated card
  animatedStyle: AnimatedStyle; // Required for animated card
  likeOpacityStyle?: AnimatedStyle;
  nopeOpacityStyle?: AnimatedStyle;
  showDots?: boolean;
  isTopCard?: boolean;
  distanceFromTop: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  uid,
  backgroundUrls,
  index,
  children,
  gestureHandler,
  animatedStyle,
  likeOpacityStyle,
  nopeOpacityStyle,
  showDots = true,
  isTopCard,
  distanceFromTop,
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const showImageIndexIndicator = isTopCard && showDots && backgroundUrls.length > 1;
  return (
    <GestureDetector gesture={gestureHandler}>
      <PhysicCard
        distanceFromTheTop={distanceFromTop}
        index={index}
        uid={uid}
        backgroundUrls={backgroundUrls}
        setImageIndex={setImageIndex}>

        <S.StyledAnimatedView style={animatedStyle}>
          {showImageIndexIndicator && <ImageIndicator currentIndex={imageIndex} totalImages={backgroundUrls.length} />}
          <CardImage imageSource={backgroundUrls[imageIndex]?.image || null} isTopCard={isTopCard} imageIndex={imageIndex} />
          <S.CardGradient colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.9)']} locations={[0, 0.7, 1]} />
          <S.LikeAnimatedOpacity style={likeOpacityStyle}>
            <NopeRejectBadge text="Invite" />
          </S.LikeAnimatedOpacity>
          <S.NopeAnimatedOpacity style={nopeOpacityStyle}>
            <NopeRejectBadge text="Reject" />
          </S.NopeAnimatedOpacity>
          {children}
        </S.StyledAnimatedView>
      </PhysicCard>
    </GestureDetector>
  );
};

export default AnimatedCard;

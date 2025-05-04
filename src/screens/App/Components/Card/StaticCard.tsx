import React, { useState, ReactNode } from 'react';
import { components } from '@invited-only/invited-only-api';
import * as S from './Card.style';
import ImageIndicator from './Components/ImageIndicator/ImageIndicator';
import CardImage from './Components/CardImage/CardImage';
import { PhysicCard } from './Card'; // Assuming PhysicCard remains in Card.tsx or is exported

interface StaticCardProps {
  uid: string;
  backgroundUrls: components['schemas']['UserPhoto'][];
  index: number;
  children: ReactNode;
  showDots?: boolean;
  isTopCard?: boolean;
  distanceFromTop: number;
  withDarkOverlay?: boolean;
  disabled?: boolean;
}

const StaticCard: React.FC<StaticCardProps> = ({ uid, backgroundUrls, index, children, showDots = true, isTopCard, distanceFromTop, withDarkOverlay = true, disabled = false }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const showImageIndexIndicator = isTopCard && showDots && backgroundUrls.length > 1;

  return (
    <PhysicCard distanceFromTheTop={distanceFromTop} index={index} uid={uid} backgroundUrls={backgroundUrls} setImageIndex={setImageIndex} disabled={disabled}>
      <S.StyledNotAnimatedView>
        <CardImage imageSource={backgroundUrls[imageIndex]?.image || null} isTopCard={isTopCard} imageIndex={imageIndex} />
        {withDarkOverlay && <S.CardGradient colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.9)']} locations={[0, 0.4, 1]} />}
        {showImageIndexIndicator && <ImageIndicator currentIndex={imageIndex} totalImages={backgroundUrls.length} />}
        {children}
      </S.StyledNotAnimatedView>
    </PhysicCard>
  );
};

export default StaticCard;

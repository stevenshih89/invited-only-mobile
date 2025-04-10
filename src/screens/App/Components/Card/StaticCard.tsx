import React, {useState, ReactNode} from 'react';
import * as S from './Card.style';
import ImageIndicator from './Components/ImageIndicator/ImageIndicator';
import CardImage from './Components/CardImage/CardImage';
import {PhysicCard} from './Card'; // Assuming PhysicCard remains in Card.tsx or is exported
import {components} from 'src/api/v1';

interface StaticCardProps {
  uid: string;
  backgroundUrls: components['schemas']['UserPhoto'][];
  index: number;
  children: ReactNode;
  showDots?: boolean;
  isTopCard?: boolean;
  distanceFromTop: number;
}

const StaticCard: React.FC<StaticCardProps> = ({uid, backgroundUrls, index, children, showDots = true, isTopCard, distanceFromTop}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const showImageIndexIndicator = isTopCard && showDots && backgroundUrls.length > 1;
  console.log('backgroundUrls', backgroundUrls);

  return (
    <PhysicCard distanceFromTheTop={distanceFromTop} index={index} uid={uid} backgroundUrls={backgroundUrls} setImageIndex={setImageIndex}>
      <S.StyledNotAnimatedView>
        <CardImage imageSource={backgroundUrls[imageIndex]?.image || null} isTopCard={isTopCard} imageIndex={imageIndex} />
        <S.CardGradient colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.9)']} locations={[0, 0.4, 1]} />
        {showImageIndexIndicator && <ImageIndicator currentIndex={imageIndex} totalImages={backgroundUrls.length} />}
        {children}
      </S.StyledNotAnimatedView>
    </PhysicCard>
  );
};

export default StaticCard;

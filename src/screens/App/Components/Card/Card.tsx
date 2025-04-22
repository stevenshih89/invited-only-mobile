import React, { ReactNode, Dispatch, SetStateAction } from 'react';
import { PanGesture } from 'react-native-gesture-handler';
import { AnimatedStyle } from 'react-native-reanimated';
import * as S from './Card.style';
import InvisibleTouchZone from './Components/InvisibleTouchZone/InvisibleTouchZone';
import AnimatedCard from './AnimatedCard';
import StaticCard from './StaticCard';
import { components } from 'src/api/v1';

interface CardProps {
  uid: string;
  backgroundUrls: components['schemas']['UserPhoto'][];
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

export const PhysicCard = ({
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
  setImageIndex: Dispatch<SetStateAction<number>>;
  backgroundUrls: components['schemas']['UserPhoto'][];
  distanceFromTheTop: number;
}) => {
  return (
    <S.Card key={uid} distanceFromTheTop={distanceFromTheTop} index={index}>
      <InvisibleTouchZone setImageIndex={setImageIndex} imageCount={backgroundUrls?.length} />
      {children}
    </S.Card>
  );
};

const Card: React.FC<CardProps> = props => {
  const { isStatic = false, gestureHandler, animatedStyle } = props;

  if (isStatic) {
    return (
      <StaticCard
        uid={props.uid}
        backgroundUrls={props.backgroundUrls}
        index={props.index}
        distanceFromTop={props.distanceFromTop}
        isTopCard={props.isTopCard}
        showDots={props.showDots}>
        {props.children}
      </StaticCard>
    );
  }

  if (!gestureHandler || !animatedStyle) {
    console.error('Gesture handler and animated style are required for non-static cards.');
    return null;
  }

  return <AnimatedCard {...props} gestureHandler={gestureHandler} animatedStyle={animatedStyle} />;
};

export default Card;

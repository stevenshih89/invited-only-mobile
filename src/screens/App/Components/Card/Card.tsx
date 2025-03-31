import React, {ReactNode} from 'react';
import * as S from './Card.style';
import {View} from 'react-native';
import {GestureDetector, PanGesture} from 'react-native-gesture-handler';
import Animated, {AnimatedStyle} from 'react-native-reanimated';

interface CardProps {
  uid: string;
  backgroundUrl: string;
  index: number;
  isTopCard?: boolean;
  onReject?: () => void;
  onSuperInvite?: () => void;
  onInvite?: () => void;
  children: ReactNode;
  gestureHandler?: PanGesture;
  animatedStyle?: AnimatedStyle;
  likeOpacityStyle?: AnimatedStyle;
  nopeOpacityStyle?: AnimatedStyle;
  isStatic?: boolean;
}

const Card: React.FC<CardProps> = ({
  uid,
  backgroundUrl,
  index,
  children,
  gestureHandler,
  animatedStyle,
  likeOpacityStyle,
  nopeOpacityStyle,
  isStatic = false,
}) => {
  // Render static card without animations
  if (isStatic) {
    return (
      <S.Card key={uid} index={index}>
        <View>
          <S.CardImage source={{uri: backgroundUrl}} />
          {index > 0 && <S.CardOverlay />}
          <S.CardGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']} locations={[0, 0.5, 1]} />
          {children}
        </View>
      </S.Card>
    );
  }

  // Render animated card with gesture detection
  return (
    <GestureDetector gesture={gestureHandler!}>
      <S.Card key={uid} index={index}>
        <Animated.View style={animatedStyle}>
          <S.CardImage source={{uri: backgroundUrl}} />
          {index > 0 && <S.CardOverlay />}
          <S.CardGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']} locations={[0, 0.5, 1]} />
          <S.LikeAnimatedOpacity style={likeOpacityStyle}>
            <S.LabelTextLike>LIKE</S.LabelTextLike>
          </S.LikeAnimatedOpacity>
          <S.NopeAnimatedOpacity style={nopeOpacityStyle}>
            <S.LabelTextNope>NOPE</S.LabelTextNope>
          </S.NopeAnimatedOpacity>
          {children}
        </Animated.View>
      </S.Card>
    </GestureDetector>
  );
};

export default Card;

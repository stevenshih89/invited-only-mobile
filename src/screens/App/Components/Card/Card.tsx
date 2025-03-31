import React, {ReactNode, useState} from 'react';
import * as S from './Card.style';
import {View} from 'react-native';
import {GestureDetector, PanGesture} from 'react-native-gesture-handler';
import Animated, {AnimatedStyle} from 'react-native-reanimated';
import {screenHeight} from 'constants/common';
import InvisibleTouchZone from './Components/InvisibleTouchZone/InvisibleTouchZone';

interface CardProps {
  uid: string;
  backgroundUrls: string[];
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
  backgroundUrls,
  index,
  children,
  gestureHandler,
  animatedStyle,
  likeOpacityStyle,
  nopeOpacityStyle,
  isStatic = false,
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  if (isStatic) {
    return (
      <S.Card key={uid} index={index} style={{height: screenHeight * 0.6}}>
        <InvisibleTouchZone setImageIndex={setImageIndex} imageCount={backgroundUrls.length} />
        <View style={{height: '100%'}}>
          <S.CardImage source={{uri: backgroundUrls[imageIndex]}} style={{height: '100%'}} />
          {index > 0 && <S.CardOverlay />}
          <S.CardGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']}
            locations={[0, 0.5, 1]}
            style={{height: '100%'}}
          />
          {children}
        </View>
      </S.Card>
    );
  }

  return (
    <GestureDetector gesture={gestureHandler!}>
      <S.Card key={uid} index={index} style={{height: screenHeight * 0.6}}>
        <InvisibleTouchZone setImageIndex={setImageIndex} imageCount={backgroundUrls.length} />
        <Animated.View style={[animatedStyle, {height: '100%'}]}>
          <S.CardImage source={{uri: backgroundUrls[imageIndex]}} style={{height: '100%'}} />
          {index > 0 && <S.CardOverlay />}
          <S.CardGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']}
            locations={[0, 0.5, 1]}
            style={{height: '100%'}}
          />
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

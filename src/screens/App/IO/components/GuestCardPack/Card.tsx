import React, {useEffect, useState} from 'react';
import * as S from './GuestCard.styled';
import {useCardGesture} from './hooks/useCardGesture';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface CardProps {
  guest: {
    id: string;
    name: string;
    age: number;
    image: string[];
    bio?: string;
  };
  index: number;
  isTopCard: boolean;
  onReject: () => void;
  onSuperInvite: () => void;
  onInvite: () => void;
}

const Card: React.FC<CardProps> = ({guest, index, isTopCard, onReject, onSuperInvite, onInvite}) => {
  // Animation values for card position - initial offset based on index
  const offsetX = useSharedValue(index === 0 ? 0 : (index % 2 === 0 ? -1 : 1) * (index * 3));
  const offsetY = useSharedValue(index === 0 ? 0 : -10 * index);
  const cardRotation = useSharedValue(index === 0 ? 0 : (index % 2 === 0 ? -1 : 1) * (index * 1.5));
  
  const {gestureHandler, animatedStyle, likeOpacityStyle, nopeOpacityStyle, animateInvite, animateReject, animateSuperInvite} =
    useCardGesture({
      onSwipeLeft: onReject,
      onSwipeRight: onInvite,
      enabled: isTopCard,
    });
    
  // Track previous top card status to detect when a card becomes the top card
  const [wasTopCard, setWasTopCard] = useState(isTopCard);
  
  useEffect(() => {
    // If this card wasn't the top card before but is now, animate it
    if (isTopCard && !wasTopCard) {
      // Reset values immediately to ensure proper starting position
      offsetX.value = (index % 2 === 0 ? -1 : 1) * (index * 3);
      offsetY.value = -10 * index;
      cardRotation.value = (index % 2 === 0 ? -1 : 1) * (index * 1.5);
      
      // Then animate with a delay
      setTimeout(() => {
        offsetX.value = withTiming(0, { 
          duration: 400, 
          easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
        });
        offsetY.value = withTiming(0, { 
          duration: 400, 
          easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
        });
        cardRotation.value = withTiming(0, { 
          duration: 400, 
          easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
        });
      }, 300);
    }
    
    // Update the previous top card status
    setWasTopCard(isTopCard);
  }, [isTopCard, offsetX, offsetY, cardRotation, wasTopCard, index]);
  
  // Additional animated style for card position including rotation
  const cardPositionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetX.value },
        { translateY: offsetY.value },
        { rotate: `${cardRotation.value}deg` }
      ]
    };
  });
  const onClickReject = () => {
    if (isTopCard) {
      animateReject();
    }
  };

  const onClickInvite = () => {
    if (isTopCard) {
      animateInvite();
    }
  };

  return (
    <GestureDetector gesture={gestureHandler}>
      <S.Card key={guest.id} index={index}>
        <Animated.View style={[animatedStyle, cardPositionStyle]}>
          <S.CardImage source={{uri: guest.image[0]}} />

          {index > 0 && <S.CardOverlay />}

          <S.CardGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']} locations={[0, 0.5, 1]} />
          <S.LikeAnimatedOpacity style={likeOpacityStyle}>
            <S.LabelTextLike>LIKE</S.LabelTextLike>
          </S.LikeAnimatedOpacity>
          <S.NopeAnimatedOpacity style={nopeOpacityStyle}>
            <S.LabelTextNope>NOPE</S.LabelTextNope>
          </S.NopeAnimatedOpacity>
          <S.CardContent>
            <S.CardNameAndAge>
              <S.CardName>{guest.name},</S.CardName>
              <S.CardGuestAge>{guest.age}</S.CardGuestAge>
            </S.CardNameAndAge>
            {isTopCard && (
              <S.ButtonsContainer>
                <S.RejectButton onPress={onClickReject}>
                  <S.RejectButtonText>Reject</S.RejectButtonText>
                </S.RejectButton>
                <S.SuperInviteButton
                  onPress={() => {
                    if (isTopCard) {
                      animateSuperInvite();
                    }
                  }}>
                  <S.SuperInviteButtonText>Super Invite</S.SuperInviteButtonText>
                </S.SuperInviteButton>

                <S.InviteButton onPress={onClickInvite}>
                  <S.InviteButtonText>Invite</S.InviteButtonText>
                </S.InviteButton>
              </S.ButtonsContainer>
            )}
          </S.CardContent>
        </Animated.View>
      </S.Card>
    </GestureDetector>
  );
};

export default Card;

import React, {ReactNode, useState} from 'react';
import * as S from './Card.style';
import {View, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {GestureDetector, PanGesture} from 'react-native-gesture-handler';
import Animated, {AnimatedStyle} from 'react-native-reanimated';

interface CardProps {
  uid: string;
  backgroundUrl: string | string[];
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
  const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Convert single string to array for consistent handling
  const imageUrls = Array.isArray(backgroundUrl) ? backgroundUrl : [backgroundUrl];
  
  const handlePrevImage = () => {
    if (imageUrls.length > 1) {
      setCurrentImageIndex(prevIndex => 
        prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
      );
    }
  };
  
  const handleNextImage = () => {
    if (imageUrls.length > 1) {
      setCurrentImageIndex(prevIndex => 
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const renderCardContent = (wrapperStyle?: any) => {
    const currentImageUrl = imageUrls[currentImageIndex];
    
    return (
      <View style={[wrapperStyle, {height: '100%'}]}>
        <S.CardImage source={{uri: currentImageUrl}} style={{height: '100%'}} />
        {index > 0 && <S.CardOverlay />}
        <S.CardGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']}
          locations={[0, 0.5, 1]}
          style={{height: '100%'}}
        />
        
        {/* Navigation touch areas */}
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '30%', // Leave bottom area for other interactions
          flexDirection: 'row',
        }}>
          <TouchableWithoutFeedback onPress={handlePrevImage}>
            <View style={{flex: 1}} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleNextImage}>
            <View style={{flex: 1}} />
          </TouchableWithoutFeedback>
        </View>
        
        {/* Image indicator dots */}
        {imageUrls.length > 1 && (
          <View style={{
            position: 'absolute',
            top: 10,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {imageUrls.map((_, i) => (
              <View 
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: i === currentImageIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                  margin: 4,
                }}
              />
            ))}
          </View>
        )}
        
        {!isStatic && (
          <>
            <S.LikeAnimatedOpacity style={likeOpacityStyle}>
              <S.LabelTextLike>LIKE</S.LabelTextLike>
            </S.LikeAnimatedOpacity>
            <S.NopeAnimatedOpacity style={nopeOpacityStyle}>
              <S.LabelTextNope>NOPE</S.LabelTextNope>
            </S.NopeAnimatedOpacity>
          </>
        )}
        
        {children}
      </View>
    );
  };
  
  if (isStatic) {
    return (
      <S.Card key={uid} index={index} style={{height: screenHeight * 0.6}}>
        {renderCardContent()}
      </S.Card>
    );
  }

  return (
    <GestureDetector gesture={gestureHandler!}>
      <S.Card key={uid} index={index} style={{height: screenHeight * 0.6}}>
        {renderCardContent(animatedStyle)}
      </S.Card>
    </GestureDetector>
  );
};

export default Card;

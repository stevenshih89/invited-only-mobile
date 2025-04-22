import React, {useState, useEffect} from 'react';
import {useSharedValue, useAnimatedStyle, withTiming, Easing} from 'react-native-reanimated';
import * as S from './EnterTypeWordsAnimation.style';

const EnterTypeWordsAnimation = () => {
  const words = ['Connect', 'Invite', 'Meet', 'Join'];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation values
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    // Function to animate the next word
    const animateNextWord = () => {
      translateY.value = 100;
      opacity.value = 0;

      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, {duration: 300});

      setTimeout(() => {
        opacity.value = withTiming(0, {duration: 300});

        // Move to next word after fade out
        setTimeout(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % words.length);
        }, 300);
      }, 2000);
    };

    // Start the animation immediately
    animateNextWord();

    const interval = setInterval(() => {
      animateNextWord();
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <S.Container>
      <S.AnimatedText style={animatedStyle}>{words[currentIndex]}</S.AnimatedText>
    </S.Container>
  );
};

export default EnterTypeWordsAnimation;

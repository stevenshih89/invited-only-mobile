import React, {useEffect, useState} from 'react';
import * as S from './EnterTypeScreen.style';
import styled from 'styled-components/native';
import {useSharedValue, cancelAnimation, withRepeat, withTiming, useAnimatedStyle, Easing} from 'react-native-reanimated';

const Container = styled.View`
  margin-top: 150px;
  position: relative;
  overflow: hidden;
  height: 150px;
`;

const EnterTypeWordsAnimation = () => {
  // Define your words.
  const words = ['Connect', 'Invite', 'Meet', 'Join'];
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);
  const [wordsIndex, setWordIndex] = useState<number>(0);
  useEffect(() => {
    // Cancel any ongoing animations before starting new ones.
    cancelAnimation(opacity);
    cancelAnimation(translateY);

    const timeoutId = setTimeout(() => {
      // Reset shared values for the next word.
      opacity.value = 0;
      translateY.value = 40;
      setWordIndex(prev => (prev + 1) % words.length);
    }, 1500);

    opacity.value = withRepeat(withTiming(1, {duration: 1500}), 1);
    translateY.value = withRepeat(withTiming(0, {duration: 750, easing: Easing.out(Easing.exp)}), 1);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimation(opacity);
      cancelAnimation(translateY);
    };
  }, [wordsIndex, words, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  return (
    <Container>
      <S.AnimatedWordsStyle style={animatedStyle}>{words[wordsIndex]}</S.AnimatedWordsStyle>
    </Container>
  );
};

export default EnterTypeWordsAnimation;

import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useScreenFocus = () => {
  const [isFocusedScreen, setIsFocusedScreen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsFocusedScreen(true);
      return () => {
        setIsFocusedScreen(false);
      };
    }, [])
  );

  return isFocusedScreen;
};

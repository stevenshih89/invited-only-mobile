import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useResetEventCardPosition = (setCurrentEventCardPosition: any, activeEventId: any) => {
  useFocusEffect(
    useCallback(() => {
      setCurrentEventCardPosition(1);
    }, [activeEventId])
  );
};

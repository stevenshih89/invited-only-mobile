import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { withRepeat, withTiming, Easing, cancelAnimation } from 'react-native-reanimated';

interface UseRotationLoaderParams {
  rotationLoader: any;
  loadingCardsList: boolean;
  loadingMyEvents: boolean;
}

export const useRotationLoader = ({
  rotationLoader,
  loadingCardsList,
  loadingMyEvents,
}: UseRotationLoaderParams) => {
  useFocusEffect(
    useCallback(() => {
      if (loadingCardsList || loadingMyEvents) {
        rotationLoader.value = withRepeat(
          withTiming(360, {
            duration: 2000,
            easing: Easing.linear,
          }),
          -1,
        );
      }

      return () => {
        cancelAnimation(rotationLoader);
      };
    }, [rotationLoader, loadingCardsList, loadingMyEvents]),
  );
};

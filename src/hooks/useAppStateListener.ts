import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export const useAppStateListener = (userInfo: { uid: string }, mutate: (data: { uid: string; isOnline: boolean }) => void) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: 'active' | 'inactive' | 'background' | 'unknown' | 'extension') => {
      if (nextAppState === 'active' || nextAppState === 'inactive') {
        mutate({ uid: userInfo.uid, isOnline: nextAppState === 'active' });
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [userInfo, mutate]);

  return { appState };
};

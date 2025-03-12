import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { onMatchNotificationSubscription } from 'helpers/fcmHelper';

const useMatchNotification = (setMatchData: any, setIsVisibleMatch: any, setRejectVisible: any, setAcceptVisible: any) => {
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = onMatchNotificationSubscription(
        message => {
          const data = message?.data;
          setMatchData(data);
          setIsVisibleMatch(true);
        },
        setRejectVisible,
        setAcceptVisible
      );

      return () => unsubscribe();
    }, [setMatchData, setIsVisibleMatch, setRejectVisible, setAcceptVisible])
  );
};

export default useMatchNotification;

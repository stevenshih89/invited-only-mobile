import { useEffect } from 'react';

export const useHandleSetWeeklySuperInvites = (userInfo: any, handleSetWeeklySuperInvites: any) => {
  useEffect(() => {
    if (userInfo?.uid) {
      handleSetWeeklySuperInvites();
    }
  }, [userInfo?.uid, handleSetWeeklySuperInvites]);
};

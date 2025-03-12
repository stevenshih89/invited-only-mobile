import { useEffect } from 'react';

export const useGetSuperInvites = (userInfo: any, getSuperInvites: any) => {
  useEffect(() => {
    if (userInfo?.uid) {
      getSuperInvites();
    }
  }, [userInfo?.uid]);
};
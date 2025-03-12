import { showToast } from 'helpers/showToast';
import { useEffect } from 'react';

export const useAccountReviewNotification = (userInfo: any) => {
  useEffect(() => {
    if (userInfo?.uid && !userInfo?.accountReviewed) {
      showToast('inviteMatch', 'have a code? click here', 'Your account is under review', {
        ownerPhoto: userInfo?.photos[0]?.image,
        status: 'ON REVIEW',
        path: 'invitationCode',
      });
    }
  }, [userInfo?.uid, userInfo?.accountReviewed]);
};

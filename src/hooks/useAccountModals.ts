import { useEffect } from 'react';
import { useAdminActions } from 'src/store/adminActions';

export const useAccountModals = (userInfo: any) => {
  const setRejectModalVisible = useAdminActions((i:any) => i.setRejectModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i.setAcceptModalVisible);
  const setChangeAccountModalVisible = useAdminActions((i: any) => i.setChangeAccountModalVisible);

  const setRejectVisible = () => {
    setAcceptModalVisible(false);
    setRejectModalVisible(true);
  };

  const setAcceptVisible = () => {
    setRejectModalVisible(false);
    setAcceptModalVisible(true);
  };

  useEffect(() => {
    if (userInfo?.uid) {
      setAcceptModalVisible(!!userInfo?.showModalAccept);
      setChangeAccountModalVisible(!!userInfo?.showModalChangeAccountType);
      setRejectModalVisible(!!(userInfo?.accountReviewed && !userInfo?.accountConfirmed));
    }
  }, [userInfo, setAcceptModalVisible, setChangeAccountModalVisible, setRejectModalVisible]);

  return {
    setAcceptModalVisible,
    setChangeAccountModalVisible,
    setRejectVisible,
    setAcceptVisible,
  };
};

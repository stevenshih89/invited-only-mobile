import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { components } from '@invited-only/invited-only-api';
import { useCallback, useRef, useState } from 'react';


export const useManageEventCollapse = () => {
  const [openCancelInvitationModal, setOpenCancelInvitationModal] = useState(false);
  const [openUnconnectedModal, setOpenUnconnectedModal] = useState(false);
  const [activeRequest, setActiveRequest] = useState<components['schemas']['ConnectionRequest'] | null>(null);
  const modalManageUserOnEventRef = useRef<BottomSheetModal>(null);
  const modalBlockReportRef = useRef<BottomSheetModal>(null);

  const handleOpenModalManageUserOnEvent = useCallback((request: components['schemas']['ConnectionRequest']) => {
    setActiveRequest(request);
    modalManageUserOnEventRef.current?.present();
  }, []);

  const handleCloseModalManageUserOnEvent = useCallback(() => {
    setActiveRequest(null);
    modalManageUserOnEventRef.current?.dismiss();
  }, []);

  const handleOpenBlockReportModal = useCallback(() => {
    modalBlockReportRef.current?.present();
  }, []);

  const handleOpenCancelInvitationModal = useCallback(() => {
    setOpenCancelInvitationModal(true);
  }, []);

  const handleOpenUnconnectedModal = useCallback(() => {
    setOpenUnconnectedModal(true);
  }, []);

  const handleCloseCancelInvitationModal = useCallback(() => {
    setOpenCancelInvitationModal(false);
  }, []);

  const handleCloseUnconnectedModal = useCallback(() => {
    setOpenUnconnectedModal(false);
  }, []);

  return {
    modalManageUserOnEventRef,
    modalBlockReportRef,
    activeRequest,
    openCancelInvitationModal,
    openUnconnectedModal,
    handleOpenModalManageUserOnEvent,
    handleCloseModalManageUserOnEvent,
    handleOpenBlockReportModal,
    handleOpenCancelInvitationModal,
    handleOpenUnconnectedModal,
    handleCloseCancelInvitationModal,
    handleCloseUnconnectedModal,
  };
};

import React from 'react';
import Collapsible from 'react-native-collapsible';
import { ScrollView, TouchableOpacity } from 'react-native';
import { components } from '@invited-only/invited-only-api';
import * as S from './ManageEventCollapsible.styled';
import { ManageEventGuestInfo } from './ManageEventGuestInfo/ManageEventGuestInfo';
import { useManageEventCollapse } from './hooks/useManageEventCollapse';
import InfoIcon from 'assets/images/icons/info-circle.svg';
import ModalManageUserOnEvent from 'components/Modal/ModalManageUserOnEvent/ModalManageUserOnEvent';
import ModalDefault from 'components/Modal/ModalDefault/ModalDefault';
import ModalReport from 'components/Modal/ModalReport/ModalReport';

interface ManageEventCollapsibleProps {
  eventRequests?: components['schemas']['ConnectionRequest'][];
  title: string;
  isOpen: boolean;
  toggle: () => void;
  onPressTooltip: () => void;
}

export const ManageEventCollapsible = ({ title, eventRequests, isOpen, toggle, onPressTooltip }: ManageEventCollapsibleProps) => {
  const {
    activeRequest,
    modalManageUserOnEventRef,
    modalBlockReportRef,
    openCancelInvitationModal,
    openUnconnectedModal,
    handleOpenModalManageUserOnEvent,
    handleCloseModalManageUserOnEvent,
    handleOpenBlockReportModal,
    handleOpenCancelInvitationModal,
    handleOpenUnconnectedModal,
    handleCloseCancelInvitationModal,
    handleCloseUnconnectedModal,
  } = useManageEventCollapse();

  if (title === 'New Connections') {
    console.log("eventRequests", eventRequests);
    console.log('isOpen', isOpen);
  }


  return (
    <S.CardContainer>
      <S.ContentWrapper>
        <S.TitleRow disabled={eventRequests?.length === 0} onPress={toggle}>
          <S.StyledArrow isOpen={isOpen} />
          <S.LabelContainer>
            <S.LabelText disabled={eventRequests?.length === 0}>{title}</S.LabelText>
          </S.LabelContainer>
          <TouchableOpacity
            onPress={onPressTooltip}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}>
            <InfoIcon />
          </TouchableOpacity>
        </S.TitleRow>
        <S.NumberBadge>
          <S.NumberText>{eventRequests?.length ?? 0}</S.NumberText>
        </S.NumberBadge>
      </S.ContentWrapper>
      <Collapsible collapsed={!isOpen}>
        <S.CardContainer>
          <ScrollView>
            {eventRequests?.map((request, index) => {
              return (
                <ManageEventGuestInfo
                  key={index}
                  request={request}
                  title={title}
                  handleOpenModalManageUserOnEvent={handleOpenModalManageUserOnEvent}
                />
              );
            })}
          </ScrollView>
        </S.CardContainer>
      </Collapsible>
      <ModalManageUserOnEvent
        ref={modalManageUserOnEventRef}
        onClose={handleCloseModalManageUserOnEvent}
        request={activeRequest}
        openBlockReportModal={handleOpenBlockReportModal}
        openCancelInvitationModal={handleOpenCancelInvitationModal}
        openUnconnectedModal={handleOpenUnconnectedModal}
      />
      <ModalReport ref={modalBlockReportRef} />
      <ModalDefault
        isVisible={openCancelInvitationModal}
        onClose={handleCloseCancelInvitationModal}
        title="Cancel Invitation?"
        description="Are you sure you want to cancel invitation? The user will no longer be able to accept it"
        onConfirm={() => { }}
        confirmText="Cancel Invitation"
        cancelText="Exit"
      />
      <ModalDefault
        isVisible={openUnconnectedModal}
        onClose={handleCloseUnconnectedModal}
        title="Unconnected?"
        description="You are no longer connected. Do you want to remove this connection?"
        onConfirm={() => { }}
        confirmText="Remove Connection"
        cancelText="Cancel"
      />
    </S.CardContainer>
  );
};
export default ManageEventCollapsible;

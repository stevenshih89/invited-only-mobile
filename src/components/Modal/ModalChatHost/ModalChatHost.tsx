import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {forwardRef, useMemo} from 'react';
import * as S from './ModalChatHost.style';
import {useButtonPropsByStatus} from './hooks/useButtonPropsByStatus';
import {whiteColor} from 'constants/colors';
import ProfileFillIcon from 'assets/images/icons/profile-fill.svg';
import ReportRoundedIcon from 'assets/images/icons/report-rounded-gray.svg';
import CancelOutlineRoundedIcon from 'assets/images/icons/cancel-outline-rounded.svg';
import TrashSolidIcon from 'assets/images/icons/trash-solid-gray.svg';

import Button from 'components/Button/Button';
import {useInvitationStatus} from 'hooks/useInvitationStatus';

interface ModalChatHostProps {
  onClose: () => void;
  chat: any;
  openBlockReportModal: () => void;
  openDeleteChatModal: () => void;
}

interface Option {
  icon: React.ElementType;
  title: string;
  description: string;
  onPress: () => void;
}

const ModalChatHost = forwardRef<BottomSheetModal, ModalChatHostProps>(
  ({onClose, openBlockReportModal, chat, openDeleteChatModal}, ref) => {
    const snapPoints = useMemo(() => ['45%', '60%'], []);

    const optionsList: Option[] = [
      {
        icon: ProfileFillIcon,
        title: 'View Profile',
        description: 'View detailed information',
        onPress: () => {},
      },
      {
        icon: ReportRoundedIcon,
        title: 'Block and Report',
        description: 'Report inappropriate behavior',
        onPress: () => openBlockReportModal(),
      },
      {
        icon: CancelOutlineRoundedIcon,
        title: 'Cancel Invitation',
        description: 'Withdraw your invite',
        onPress: () => {},
      },
      {
        icon: TrashSolidIcon,
        title: 'Delete Chat',
        description: 'Remove conversation from chats',
        onPress: () => openDeleteChatModal(),
      },
    ];

    const {invitationStatus} = useInvitationStatus(chat.connectionStatus);

    const {buttonProps} = useButtonPropsByStatus(invitationStatus);

    const handleDismiss = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.dismiss();
      }
      if (onClose) onClose();
    };
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onDismiss={handleDismiss}
        backgroundComponent={S.ModalBackground}
        handleIndicatorStyle={{
          backgroundColor: whiteColor,
        }}>
        <S.Wrapper>
          <S.Container>
            <S.MenuListItem activeOpacity={1}>
              <S.StyledImage source={{uri: chat.hostImageUrl}} />
              <S.MenuListTextBlock>
                <S.MenuListTitle>{chat.guestName}</S.MenuListTitle>
                <S.MenuListDescription>24 Years Old</S.MenuListDescription>
              </S.MenuListTextBlock>
            </S.MenuListItem>
            <S.ButtonContainer>
              <Button {...buttonProps} />
            </S.ButtonContainer>
            <S.MenuList
              data={optionsList}
              keyExtractor={(item: Option) => item.title}
              ItemSeparatorComponent={S.MenuListSeparator}
              renderItem={({item}: {item: Option}) => {
                const Icon = item.icon;
                return (
                  <S.MenuListItem onPress={item.onPress}>
                    <S.MenuListIcon>
                      <Icon width={32} height={32} />
                    </S.MenuListIcon>
                    <S.MenuListTextBlock>
                      <S.MenuListTitle>{item.title}</S.MenuListTitle>
                      <S.MenuListDescription>{item.description}</S.MenuListDescription>
                    </S.MenuListTextBlock>
                  </S.MenuListItem>
                );
              }}
            />
          </S.Container>
        </S.Wrapper>
      </BottomSheetModal>
    );
  },
);

ModalChatHost.displayName = 'ModalChatHost';

export default ModalChatHost;

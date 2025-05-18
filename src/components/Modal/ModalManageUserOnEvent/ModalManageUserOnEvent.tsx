import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo } from 'react';
import { components } from '@invited-only/invited-only-api';
import * as S from './ModalManageUserOnEvent.style';
import { useButtonPropsByStatus } from './hooks/useButtonPropsByStatus';
import { whiteColor } from 'constants/colors';
import ProfileFillIcon from 'assets/images/icons/profile-fill.svg';
import ReportRoundedIcon from 'assets/images/icons/report-rounded-gray.svg';
import CancelOutlineRoundedIcon from 'assets/images/icons/cancel-outline-rounded.svg';
import TrashSolidIcon from 'assets/images/icons/trash-solid-gray.svg';
import MessageIcon from 'assets/images/icons/message-minus-fill.svg';

import Button from 'components/Button/Button';
import { calculateAge } from 'helpers/calculateAge';
import invitedOnlyBackendApi from 'src/api/backend-api';
import useNavigateToChat from 'screens/App/Chat/hooks/useNavigateToChat';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { userProfilePreviewPath } from 'constants/pathLocations';
import useHostConnectionActions from 'hooks/connections/useHostConnectionActions';

interface ModalManageUserOnEventProps {
  onClose: () => void;
  request: components['schemas']['ConnectionRequest'] | null;
  openBlockReportModal: () => void;
  openUnconnectedModal: () => void;
  openCancelInvitationModal: () => void;
}

interface Option {
  icon: React.ElementType;
  title: string;
  description: string;
  onPress: () => void;
}

const ModalManageUserOnEvent = forwardRef<BottomSheetModal, ModalManageUserOnEventProps>(
  ({ onClose, openBlockReportModal, request, openUnconnectedModal, openCancelInvitationModal }, ref) => {
    const { data: userDetails } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
      params: {
        path: { id: request?.guestId || '' },
      },
    }, {
      enabled: !!request?.guestId,
    });

    const { handleHostConfirmEvent } = useHostConnectionActions({
      hostId: request?.hostId || '',
      guestId: request?.guestId || '',
      eventId: request?.eventId || '',
    });



    const navigation = useAppNavigation();

    const navigateToUserProfile = () => {
      navigation.navigate(userProfilePreviewPath as any, {
        userUid: request?.guestId as string,
      });
    };

    const { navigateToChat } = useNavigateToChat({
      eventId: request?.eventId || '',
      hostId: request?.hostId || '',
      guestId: request?.guestId || '',
      asGuest: false,
    });

    const snapPoints = useMemo(() => ['70%', '80%'], []);

    const optionsList: Option[] = [
      {
        icon: ProfileFillIcon,
        title: 'View Profile',
        description: 'View detailed information',
        onPress: () => navigateToUserProfile(),
      },
      {
        icon: MessageIcon,
        title: 'Open Chat',
        description: 'Start a conversation',
        onPress: () => {
          navigateToChat();
        },
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
        onPress: () => openCancelInvitationModal(),
      },
      {
        icon: TrashSolidIcon,
        title: 'Unconnected',
        description: 'Remove connection',
        onPress: () => openUnconnectedModal(),
      },
    ];

    const { buttonProps } = useButtonPropsByStatus({
      request: request || null,
      approveGuest: () => { handleHostConfirmEvent() },
    });

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
              <S.StyledImage source={{ uri: userDetails?.photos?.[0]?.image }} />
              <S.MenuListTextBlock>
                <S.MenuListTitle>{userDetails?.name}</S.MenuListTitle>
                <S.MenuListDescription>{calculateAge(userDetails?.date || '')}</S.MenuListDescription>
              </S.MenuListTextBlock>
            </S.MenuListItem>
            <S.ButtonContainer>
              <Button {...buttonProps} />
            </S.ButtonContainer>
            <S.MenuList
              data={optionsList}
              keyExtractor={(item: Option) => item.title}
              ItemSeparatorComponent={S.MenuListSeparator}
              renderItem={({ item }: { item: Option }) => {
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

ModalManageUserOnEvent.displayName = 'ModalManageUserOnEvent';

export default ModalManageUserOnEvent;

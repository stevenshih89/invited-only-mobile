import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {forwardRef, useMemo} from 'react';
import moment from 'moment';
import * as S from './ModalChatGuest.style';
import {useButtonPropsByStatus} from './hooks/useButtonPropsByStatus';
import {whiteColor} from 'constants/colors';
import ProfileFillIcon from 'assets/images/icons/profile-fill.svg';
import ReportRoundedIcon from 'assets/images/icons/report-rounded-gray.svg';
import CalendarEventDarkGrayIcon from 'assets/images/icons/calendar-event-darkgray.svg';
import TrashSolidIcon from 'assets/images/icons/trash-solid-gray.svg';

import Button from 'components/Button/Button';
import {useInvitationStatus} from 'hooks/useInvitationStatus';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {userProfilePreviewPath} from 'constants/pathLocations';

interface ModalChatGuestProps {
  onClose: () => void;
  chat: any;
  openBlockReportModal: () => void;
}

interface Option {
  icon: React.ElementType;
  title: string;
  description: string;
  onPress: () => void;
}

const ModalChatGuest = forwardRef<BottomSheetModal, ModalChatGuestProps>(({onClose, openBlockReportModal, chat}, ref) => {
  const snapPoints = useMemo(() => ['45%', '60%'], []);

  const navigation = useAppNavigation();

  const handleGoToProfile = () => {
    // @ts-ignore
    navigation.navigate(userProfilePreviewPath, {
      userUid: chat.hostId,
    });
  };

  const optionsList: Option[] = [
    {
      icon: CalendarEventDarkGrayIcon,
      title: 'View Event Details',
      description: 'Check the full details of event',
      onPress: () => {},
    },
    {
      icon: ProfileFillIcon,
      title: 'Event Owner Profile',
      description: 'See profile for more information',
      onPress: () => handleGoToProfile(),
    },
    {
      icon: ReportRoundedIcon,
      title: 'Block and Report',
      description: 'Block this user and report any issues',
      onPress: () => openBlockReportModal(),
    },

    {
      icon: TrashSolidIcon,
      title: 'Delete Chat',
      description: 'Remove conversation from chats',
      onPress: () => {},
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
            <S.StyledImage source={{uri: chat?.eventPhoto}} />
            <S.MenuListTextBlock>
              <S.MenuListTitle>{chat?.eventName}</S.MenuListTitle>
              <S.MenuListDescription>{moment(chat?.eventDate).format('DD MMM, HH:mm')}</S.MenuListDescription>
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
});

ModalChatGuest.displayName = 'ModalChatGuest';

export default ModalChatGuest;

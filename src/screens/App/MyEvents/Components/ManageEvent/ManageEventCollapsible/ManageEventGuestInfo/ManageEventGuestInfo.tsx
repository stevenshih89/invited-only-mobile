import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {useContext} from 'react';

import {components} from '@invited-only/invited-only-api';
import * as S from './ManageEventGuestInfo.style';
import {BackendApiContext} from 'contexts/BackendApiContex';
import ThreeDotsIcon from 'assets/images/icons/dots-horizontal.svg';
import useHostConnectionActions from 'hooks/connections/useHostConnectionActions';
import HourGlassIcon from 'assets/images/icons/hourglass-filled.svg';

interface ManageEventGuestInfoProps {
    request: components['schemas']['ConnectionRequest'];
    title: string;
    handleOpenModalManageUserOnEvent: (request: components['schemas']['ConnectionRequest']) => void;
    handleActionDone: () => void;
}

export const ManageEventGuestInfo = ({request, title, handleOpenModalManageUserOnEvent, handleActionDone}: ManageEventGuestInfoProps) => {
    if (title === 'Not Accepted') {
        console.log('request', request.guestId);
    }

    const invitedOnlyBackendApi = useContext(BackendApiContext);
    const {data: userDetails, isLoading} = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
        params: {
            path: {id: request.guestId},
        },
    });
    const {handleHostConfirmEvent} = useHostConnectionActions({
        hostId: request.hostId,
        guestId: request.guestId,
        eventId: request.eventId,
    });

    if (isLoading) {
        return (
            <S.PersonContainer>
                <ActivityIndicator testID="loading-indicator" />
            </S.PersonContainer>
        );
    }
    return (
        <S.PersonContainer>
            <S.ProfileImageContainer>
                <S.ProfileImage source={{uri: userDetails?.photos?.[0]?.image}} />
            </S.ProfileImageContainer>

            <S.TextInfoContainer>
                <S.NameAgeContainer>
                    <S.NameText>{userDetails?.name}</S.NameText>
                </S.NameAgeContainer>
                {(title === 'Approved' || title === 'New Connections') && (
                    <S.ApproveButtonContainer
                        onPress={() => {
                            handleHostConfirmEvent();
                            handleActionDone();
                        }}>
                        <S.ApproveButtonText>Approve</S.ApproveButtonText>
                    </S.ApproveButtonContainer>
                )}
                {title === 'Not Accepted' && (
                    <S.ApproveButtonContainer onPress={() => handleHostConfirmEvent()}>
                        <S.WaitingContainer>
                            <HourGlassIcon width={16} height={16} />
                            <S.WaitingText>Waiting</S.WaitingText>
                        </S.WaitingContainer>
                    </S.ApproveButtonContainer>
                )}
                <TouchableOpacity
                    onPress={() => {
                        handleOpenModalManageUserOnEvent(request);
                        handleActionDone();
                    }}>
                    <ThreeDotsIcon />
                </TouchableOpacity>
            </S.TextInfoContainer>
        </S.PersonContainer>
    );
};

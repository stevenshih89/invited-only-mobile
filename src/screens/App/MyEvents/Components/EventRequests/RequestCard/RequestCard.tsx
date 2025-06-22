import { TouchableOpacity } from 'react-native';

import { components } from '@invited-only/invited-only-api';
import { useState } from 'react';
import * as S from './RequestCard.style';
import useGetGuestDetails from './hooks/useGetGuestDetails';
import useReqeustActions from './hooks/useInviteGuest';
import Card from 'screens/App/Components/Card/Card';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import { parseStringToDate } from 'helpers/genericDateFormater';

interface RequestCardProps {
    guestReuestUid: string;
    isSuperJoinRequest: boolean;
    connectionDetails: components['schemas']['ConnectionRequest'];
    updateEventAttendee: (guestId: string, hostId: string, hostSwipe: string) => void;
    onPress?: () => void;
    setNewConnectionModal: (data: components['schemas']['User'] | null) => void;
}

const getAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
}

export const RequestCard = ({ guestReuestUid, connectionDetails, updateEventAttendee, onPress, setNewConnectionModal }: RequestCardProps) => {
    const { data, isLoading } = useGetGuestDetails(guestReuestUid);
    const { handleInviteGuest, handleRejectGuest, isPending } = useReqeustActions(updateEventAttendee);

    if (isLoading || isPending) {
        return (
            <S.Container>
                <AppLoader />
            </S.Container>
        );
    }

    return (
        <S.Container>
            <TouchableOpacity onPress={onPress} style={{ width: '100%', height: '100%' }}>
                <Card uid={guestReuestUid} backgroundUrls={data?.photos || []} index={0} isStatic={true} distanceFromTop={0} withDarkOverlay={false}>
                    <S.ContentContainer>
                        <S.BottomContainer>
                            <S.NameAndAgeContainer>
                                <S.GuestNameText>{data?.name} {data?.birthday && data?.birthday && data.showAge && ','}</S.GuestNameText>
                                {data?.birthday && data.showAge && <S.GuestNameAgeText>{getAge(parseStringToDate(data?.birthday)?.toISOString() || '')}</S.GuestNameAgeText>}
                            </S.NameAndAgeContainer>
                            <S.ButtonContainer>
                                <TouchableOpacity onPress={(e) => {
                                    e.stopPropagation();
                                    handleRejectGuest({ guestId: guestReuestUid, eventId: connectionDetails.eventId || '', hostId: connectionDetails?.hostId || '' })
                                }}>
                                    <S.RejectIcon />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={(e) => {
                                    e.stopPropagation();
                                    handleInviteGuest({
                                        guestId: guestReuestUid,
                                        eventId: connectionDetails.eventId || '',
                                        hostId: connectionDetails?.hostId || ''
                                    });
                                    setNewConnectionModal({ ...data });
                                }}>
                                    <S.InviteButtonContainer>
                                        <S.InviteButtonText>Invite</S.InviteButtonText>
                                        <S.InviteIcon />
                                    </S.InviteButtonContainer>
                                </TouchableOpacity>
                            </S.ButtonContainer>
                        </S.BottomContainer>
                    </S.ContentContainer>
                </Card>
            </TouchableOpacity>

        </S.Container>
    );
};
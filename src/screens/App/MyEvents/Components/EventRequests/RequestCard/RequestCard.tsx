
import { TouchableOpacity } from 'react-native';
import * as S from './RequestCard.style';
import useGetGuestDetails from './hooks/useGetGuestDetails';
import useReqeustActions from './hooks/useInviteGuest';
import Card from 'screens/App/Components/Card/Card';
import AppLoader from 'screens/App/AppLoader/AppLoader';
import { components } from 'src/api/v1';

interface RequestCardProps {
    guestReuestUid: string;
    isSuperJoinRequest: boolean;
    connectionDetails: components['schemas']['ConnectionRequest'];
}

const getAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
}
export const RequestCard = ({ guestReuestUid, connectionDetails }: RequestCardProps) => {
    const { data, isLoading } = useGetGuestDetails(guestReuestUid);
    const { handleInviteGuest, handleRejectGuest, isPending } = useReqeustActions();

    if (isLoading || isPending) {
        return (
            <S.Container>
                <AppLoader />
            </S.Container>
        );
    }

    return <S.Container >
        <Card uid={guestReuestUid} backgroundUrls={data?.photos || []} index={0} isStatic={true} distanceFromTop={0} withDarkOverlay={false}>
            <S.ContentContainer>
                <S.BottomContainer>
                    <S.NameAndAgeContainer>
                        <S.GuestNameText>{data?.name} {data?.birthday && data.showAge && ','}</S.GuestNameText>
                        {data?.birthday && data.showAge && <S.GuestNameAgeText>{getAge(data?.birthday)}</S.GuestNameAgeText>}
                    </S.NameAndAgeContainer>
                    <S.ButtonContainer>
                        <TouchableOpacity onPress={() => {
                            console.log('rejecting guest');
                            handleRejectGuest({ guestId: guestReuestUid, eventId: connectionDetails.eventId || '', hostId: connectionDetails?.hostId || '' })
                        }}>

                            <S.RejectIcon />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleInviteGuest({
                            guestId: guestReuestUid, eventId: connectionDetails
                                .eventId || '', hostId: connectionDetails?.hostId || ''
                        })}>
                            <S.InviteButtonContainer>
                                <S.InviteButtonText>Invite</S.InviteButtonText>
                                <S.InviteIcon />
                            </S.InviteButtonContainer>
                        </TouchableOpacity>
                    </S.ButtonContainer>
                </S.BottomContainer>
            </S.ContentContainer>
        </Card>
    </S.Container>;
};
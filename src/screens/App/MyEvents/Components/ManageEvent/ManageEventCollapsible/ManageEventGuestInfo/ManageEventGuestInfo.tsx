import { ActivityIndicator } from 'react-native';
import * as S from './ManageEventGuestInfo.style';
import invitedOnlyBackendApi from 'src/api/backend-api';
import { components } from 'src/api/v1';

interface ManageEventGuestInfoProps {
    request: components['schemas']['ConnectionRequest'];
    key: number;
    title: string;
}

export const ManageEventGuestInfo = ({ request, key, title }: ManageEventGuestInfoProps) => {
    const { data: userDetails, isLoading } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
        params: {
            path: { id: request.guestId }
        }
    })

    if (isLoading) {
        return <S.PersonContainer key={key}>
            <ActivityIndicator />
        </S.PersonContainer>
    }


    return (
        <S.PersonContainer key={key}>
            <S.ProfileImageContainer>
                <S.ProfileImage source={{ uri: userDetails?.photos?.[0]?.image }} />
            </S.ProfileImageContainer>

            <S.TextInfoContainer>
                <S.NameAgeContainer>
                    <S.NameText>{userDetails?.name}</S.NameText>
                </S.NameAgeContainer>
                {title === 'New Connections' && <S.ApproveButtonContainer>
                    <S.ApproveButtonText>Approve</S.ApproveButtonText>
                </S.ApproveButtonContainer>}

            </S.TextInfoContainer>
        </S.PersonContainer>
    )
}
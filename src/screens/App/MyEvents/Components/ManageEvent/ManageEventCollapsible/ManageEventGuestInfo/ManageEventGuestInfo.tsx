import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { components } from '@invited-only/invited-only-api';
import * as S from './ManageEventGuestInfo.style';
import invitedOnlyBackendApi from 'src/api/backend-api';
import ThreeDotsIcon from 'assets/images/icons/dots-horizontal.svg';

interface ManageEventGuestInfoProps {
  request: components['schemas']['ConnectionRequest'];
  title: string;
  handleOpenModalManageUserOnEvent: (request: components['schemas']['ConnectionRequest']) => void;
}

export const ManageEventGuestInfo = ({ request, title, handleOpenModalManageUserOnEvent }: ManageEventGuestInfoProps) => {



  const { data: userDetails, isLoading } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
    params: {
      path: { id: request.guestId },
    },
  });
  console.log("request", userDetails?.photos?.[0]?.image);

  if (isLoading) {
    return (
      <S.PersonContainer>
        <ActivityIndicator />
      </S.PersonContainer>
    );
  }

  return (
    <S.PersonContainer>
      <S.ProfileImageContainer>
        <S.ProfileImage source={{ uri: userDetails?.photos?.[0]?.image }} />
      </S.ProfileImageContainer>

      <S.TextInfoContainer>
        <S.NameAgeContainer>
          <S.NameText>{userDetails?.name}</S.NameText>
        </S.NameAgeContainer>
        {title === 'New Connections' && (
          <S.ApproveButtonContainer>
            <S.ApproveButtonText>Approve</S.ApproveButtonText>
          </S.ApproveButtonContainer>
        )}
        <TouchableOpacity onPress={() => handleOpenModalManageUserOnEvent(request)}>
          <ThreeDotsIcon />
        </TouchableOpacity>
      </S.TextInfoContainer>
    </S.PersonContainer>
  );
};

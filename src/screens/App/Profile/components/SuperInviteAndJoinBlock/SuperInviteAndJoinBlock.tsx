import * as S from './SuperInviteAndJoinBlock.style';
import useUser from 'hooks/user/useUser';
import LightningIcon from 'assets/images/icons/lightning.svg';

import { useAppNavigation } from 'hooks/useAppNavigation';

const SuperInviteBlock = () => {
  const { user: userData } = useUser();
  const navigation = useAppNavigation();

  return (

    <S.SuperContainer>
      <S.SuperIconContainer>
        <LightningIcon width={24} height={24} />
      </S.SuperIconContainer>
      <S.SuperContent>
        <S.SuperDivider>
          <S.SuperTitle>Super</S.SuperTitle>
          <S.SuperDescription>Unlock premium features to connect, invite, and join events even faster and easier</S.SuperDescription>
        </S.SuperDivider>
        <S.SuperInfoContainer>
          <S.SuperCountContainer>
            <S.SuperCount>{userData?.superInvites || 0}</S.SuperCount>
            <S.SuperLabel>Super Join</S.SuperLabel>
          </S.SuperCountContainer>
          <S.AddMoreButton onPress={() => {
            navigation.navigate('/profile/super-join');
          }}>
            <S.AddMoreText>Add More</S.AddMoreText>
          </S.AddMoreButton>
        </S.SuperInfoContainer>
        {userData?.accountPremium && (
          <S.SuperInfoContainer>
            <S.SuperCountContainer>
              <S.SuperCount>{userData?.superInvites || 0 + (userData?.weeklySuperInvites || 0)}</S.SuperCount>
              <S.SuperLabel>Super Invite</S.SuperLabel>
            </S.SuperCountContainer>
            <S.AddMoreButton onPress={() => {
              navigation.navigate('/profile/super-invite');
            }}>
              <S.AddMoreText>Add More</S.AddMoreText>
            </S.AddMoreButton>
          </S.SuperInfoContainer>
        )}
      </S.SuperContent>
    </S.SuperContainer>

  );
};

export default SuperInviteBlock;

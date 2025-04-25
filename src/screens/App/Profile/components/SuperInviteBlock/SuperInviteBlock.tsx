import * as S from './SuperInviteBlock.style';
import useUser from 'hooks/user/useUser';
import LightningIcon from 'assets/images/icons/lightning.svg';

const SuperInviteBlock = () => {
  const { user: userData } = useUser();

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
            <S.SuperCount>{userData?.superInvites || 0 + (userData?.weeklySuperInvites || 0)}</S.SuperCount>
            <S.SuperLabel>Super {userData?.accountType === 'host' ? 'Invite' : 'Join'}</S.SuperLabel>
          </S.SuperCountContainer>
          <S.AddMoreButton>
            <S.AddMoreText>Add More</S.AddMoreText>
          </S.AddMoreButton>
        </S.SuperInfoContainer>
      </S.SuperContent>
    </S.SuperContainer>
  );
};

export default SuperInviteBlock;

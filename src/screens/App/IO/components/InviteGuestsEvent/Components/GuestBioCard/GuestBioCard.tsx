import {User} from 'src/types/userInfo';
import * as S from './GuestBioCard.style';

interface Props {
  guestInfo: User.Info;
}
const GuestBioCard = ({guestInfo}: Props) => {
  return (
    <S.Container>
      <S.CardLabel>Bio</S.CardLabel>
      <S.WhiteTextInfo>{guestInfo.bio}</S.WhiteTextInfo>
    </S.Container>
  );
};

export default GuestBioCard;

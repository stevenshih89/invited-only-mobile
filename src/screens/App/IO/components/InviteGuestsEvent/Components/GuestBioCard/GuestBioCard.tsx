import * as S from './GuestBioCard.style';
import {components} from 'src/api/v1';

interface Props {
  guestInfo: components['schemas']['User'];
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

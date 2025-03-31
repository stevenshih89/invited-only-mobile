import {User} from 'src/types/userInfo';
import * as S from './GuestBasicInfoCard.style';
import TablerGenderIcon from 'src/assets/images/icons/gender-girl.svg';

interface Props {
  guestInfo: User.Info;
}
const GuestBasicInfoCard = ({guestInfo}: Props) => {
  return (
    <S.Container>
      <S.CardLabel>Basics</S.CardLabel>
      <S.DescriptionTextContainer>
        <S.RoundedTextViewContainer>
          <TablerGenderIcon />
          <S.WhiteTextInfo>{guestInfo.gender === 'woman' ? 'She (her)' : 'He'}</S.WhiteTextInfo>
        </S.RoundedTextViewContainer>
        <S.WhiteGrayInfo>Lives in</S.WhiteGrayInfo>
        <S.RoundedTextViewContainer>
          <S.WhiteTextInfo>{guestInfo.location}</S.WhiteTextInfo>
        </S.RoundedTextViewContainer>
        <S.WhiteGrayInfo>And work as</S.WhiteGrayInfo>
        <S.RoundedTextViewContainer>
          <S.WhiteTextInfo>Product Manager</S.WhiteTextInfo>
        </S.RoundedTextViewContainer>
      </S.DescriptionTextContainer>
    </S.Container>
  );
};

export default GuestBasicInfoCard;

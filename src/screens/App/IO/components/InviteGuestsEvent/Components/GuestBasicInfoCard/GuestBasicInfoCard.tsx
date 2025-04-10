import * as S from './GuestBasicInfoCard.style';
import TablerGenderIcon from 'src/assets/images/icons/gender-girl.svg';
import {components} from 'src/api/v1';
import InterestImageUrl from 'screens/App/Components/Intrests/InterestImage';

interface Props {
  guestInfo: components['schemas']['User'];
}
const GuestBasicInfoCard = ({guestInfo}: Props) => {
  return (
    <S.Container>
      <S.BasicsContainer>
        <S.CardLabel>Basics</S.CardLabel>
        <S.DescriptionTextContainer>
          <S.RoundedTextViewContainer>
            <TablerGenderIcon />
            <S.WhiteTextInfo>{guestInfo.gender === 'woman' ? 'She (her)' : 'He'}</S.WhiteTextInfo>
          </S.RoundedTextViewContainer>
          <S.WhiteGrayInfo>Lives in</S.WhiteGrayInfo>
          <S.RoundedTextViewContainer>
            <S.WhiteTextInfo>{guestInfo.homeAddress}</S.WhiteTextInfo>
          </S.RoundedTextViewContainer>
          <S.WhiteGrayInfo>And work as</S.WhiteGrayInfo>
          <S.RoundedTextViewContainer>
            <S.WhiteTextInfo>{guestInfo.work?.title}</S.WhiteTextInfo>
          </S.RoundedTextViewContainer>
        </S.DescriptionTextContainer>
        <S.InterestsContainer>
          {guestInfo.interests?.map((interest, index) => (
            <S.RoundedTextViewContainer key={index}>
              <S.InterestImage source={InterestImageUrl({interestId: interest.id})} />
              <S.WhiteTextInfo>{typeof interest === 'string' ? interest : interest.title}</S.WhiteTextInfo>
            </S.RoundedTextViewContainer>
          ))}
        </S.InterestsContainer>
      </S.BasicsContainer>
    </S.Container>
  );
};

export default GuestBasicInfoCard;

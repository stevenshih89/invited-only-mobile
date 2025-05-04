import { components } from '@invited-only/invited-only-api';
import * as S from './InterestImge.style';
import BirthdayParty from 'src/assets/images/auth/interests/birthday-party.png';
import Exclusive from 'src/assets/images/auth/interests/exclusive.png';
import PoolParty from 'src/assets/images/auth/interests/pool-party.png';
import Private from 'src/assets/images/auth/interests/private.png';
import Restaurant from 'src/assets/images/auth/interests/restaurant.png';
import VipTables from 'src/assets/images/auth/interests/vip-tables.png';
import YachtParty from 'src/assets/images/auth/interests/yacht-party.png';


interface InterestImageProps {
  interests: components['schemas']['Interest'][];
}

const getInterestImageUrl = (interestId: number) => {
  switch (interestId) {
    case 1:
      return BirthdayParty;
    case 2:
      return Exclusive;
    case 3:
      return PoolParty;
    case 4:
      return Private;
    case 5:
      return Restaurant;
    case 6:
      return VipTables;
    case 7:
      return YachtParty;
    default:
      return null;
  }
};

const InterestImageSmallList = ({ interests }: InterestImageProps) => {
  return (
    <S.InterestsContainer>
      {interests?.map((interest, index) => (
        <S.RoundedTextViewContainer key={index}>
          <S.InterestImageRoundSmall source={getInterestImageUrl(interest.id)} />
          <S.WhiteTextInfo>{interest.title}</S.WhiteTextInfo>
        </S.RoundedTextViewContainer>
      ))}
    </S.InterestsContainer>
  );
};

export default InterestImageSmallList;

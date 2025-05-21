import {components} from '@invited-only/invited-only-api';
import * as S from './InterestImge.style';
import Sports from 'assets/images/interests/sports.png';
import Festivals from 'assets/images/interests/festivals.png';
import Yachts from 'assets/images/interests/yachts.png';
import VipTables from 'assets/images/interests/vip-tables.png';
import Concerts from 'assets/images/interests/concerts.png';
import Fashion from 'assets/images/interests/fashion.png';
import Bars from 'assets/images/interests/bars.png';
import Business from 'assets/images/interests/business.png';
import Restaurants from 'assets/images/interests/restaurants.png';
import PoolParties from 'assets/images/interests/pool-parties.png';
import Private from 'assets/images/interests/private.png';
import Exclusive from 'assets/images/interests/exclusive.png';
import BeachParties from 'assets/images/interests/beach-parties.png';
import Nightclubs from 'assets/images/interests/nightclubs.png';
import LiveShows from 'assets/images/interests/live-shows.png';
import Brunches from 'assets/images/interests/brunches.png';

interface InterestImageProps {
  interests: components['schemas']['Interest'][];
}

const getInterestInfo = (interestId: number) => {
  switch (interestId) {
    case 0:
      return {
        icon: Sports,
        title: 'Sports',
      };
    case 1:
      return {
        icon: Festivals,
        title: 'Festivals',
      };
    case 2:
      return {
        icon: Yachts,
        title: 'Yachts',
      };
    case 3:
      return {
        icon: VipTables,
        title: 'Vip Tables',
      };
    case 4:
      return {
        icon: Concerts,
        title: 'Concerts',
      };
    case 5:
      return {
        icon: Fashion,
        title: 'Fashion',
      };
    case 6:
      return {
        icon: Bars,
        title: 'Bars',
      };
    case 7:
      return {
        icon: Business,
        title: 'Business',
      };
    case 8:
      return {
        icon: Restaurants,
        title: 'Restaurants',
      };
    case 9:
      return {
        icon: PoolParties,
        title: 'Pool Parties',
      };
    case 10:
      return {
        icon: Private,
        title: 'Private',
      };
    case 11:
      return {
        icon: Exclusive,
        title: 'Exclusive',
      };
    case 12:
      return {
        icon: BeachParties,
        title: 'Beach Parties',
      };
    case 13:
      return {
        icon: Nightclubs,
        title: 'Nightclubs',
      };
    case 14:
      return {
        icon: LiveShows,
        title: 'Live Shows',
      };
    case 15:
      return {
        icon: Brunches,
        title: 'Brunches',
      };
    default:
      return null;
  }
};

const InterestImageSmallList = ({interests}: InterestImageProps) => {
  return (
    <S.InterestsContainer>
      {interests?.map((interest, index) => (
        <S.RoundedTextViewContainer key={index}>
          <S.InterestImageRoundSmall source={getInterestInfo(interest.id)?.icon} />
          <S.WhiteTextInfo>{getInterestInfo(interest.id)?.title}</S.WhiteTextInfo>
        </S.RoundedTextViewContainer>
      ))}
    </S.InterestsContainer>
  );
};

export default InterestImageSmallList;

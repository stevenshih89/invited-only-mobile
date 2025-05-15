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

const getInterestImageUrl = (interestId: number) => {
  switch (interestId) {
    case 0:
      return Sports;
    case 1:
      return Festivals;
    case 2:
      return Yachts;
    case 3:
      return VipTables;
    case 4:
      return Concerts;
    case 5:
      return Fashion;
    case 6:
      return Bars;
    case 7:
      return Business;
    case 8:
      return Restaurants;
    case 9:
      return PoolParties;
    case 10:
      return Private;
    case 11:
      return Exclusive;
    case 12:
      return BeachParties;
    case 13:
      return Nightclubs;
    case 14:
      return LiveShows;
    case 15:
      return Brunches;
    default:
      return null;
  }
};

const InterestImageSmallList = ({interests}: InterestImageProps) => {
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

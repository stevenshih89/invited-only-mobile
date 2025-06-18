import { useState } from 'react';
import { myEmailPath } from 'constants/pathLocations';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useAuthStore } from 'src/store/authStore';
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
import { useWriteUnfinishedRegistration } from 'screens/Auth/hooks/useUnfinishedRegistration';

export interface InterestState {
  id: number;
  title: string;
  isSelected: boolean;
  image: any;
}

export const useMyInterests = () => {
  const navigation = useAppNavigation();

  const { userMetadata: user, onBoarding, setOnBoarding } = useAuthStore();
  const { writeUnfinishedRegistration } = useWriteUnfinishedRegistration();

  const [listOfInterests, setListOfInterests] = useState<InterestState[]>([
    { id: 0, title: 'Sports', isSelected: false, image: Sports },
    { id: 1, title: 'Festivals', isSelected: false, image: Festivals },
    { id: 2, title: 'Yachts', isSelected: false, image: Yachts },
    { id: 3, title: 'VIP Tables', isSelected: false, image: VipTables },
    { id: 4, title: 'Concerts', isSelected: false, image: Concerts },
    { id: 5, title: 'Fashion', isSelected: false, image: Fashion },
    { id: 6, title: 'Bars', isSelected: false, image: Bars },
    { id: 7, title: 'Business', isSelected: false, image: Business },
    { id: 8, title: 'Restaurants', isSelected: false, image: Restaurants },
    { id: 9, title: 'Pool Parties', isSelected: false, image: PoolParties },
    { id: 10, title: 'Private', isSelected: false, image: Private },
    { id: 11, title: 'Exclusive', isSelected: false, image: Exclusive },
    { id: 12, title: 'Beach Parties', isSelected: false, image: BeachParties },
    { id: 13, title: 'Nightclubs', isSelected: false, image: Nightclubs },
    { id: 14, title: 'Live Shows', isSelected: false, image: LiveShows },
    { id: 15, title: 'Brunches', isSelected: false, image: Brunches },
  ]);



  const handleSelectInterest = (id: number) => {
    const updatedInterests = listOfInterests.map(interest =>
      interest.id === id ? { ...interest, isSelected: !interest.isSelected } : interest,
    );
    setListOfInterests(updatedInterests);
  };

  const handleNext = () => {
    const reqInterests = listOfInterests.reduce((acc: any[], curr) => {
      if (curr.isSelected) {
        acc.push({ id: curr.id, title: curr.title });
      }
      return acc;
    }, []);
    setOnBoarding({
      ...onBoarding,
      registrationDetails: {
        ...onBoarding.registrationDetails,
        interests: reqInterests,
      },
    });
    writeUnfinishedRegistration({ ...onBoarding.registrationDetails, interests: reqInterests, uid: user.uid, phoneNumber: user.phoneNumber });
    navigation.navigate(myEmailPath as never);
  };

  const accountType = onBoarding.registrationDetails?.accountType;

  return { listOfInterests, handleSelectInterest, handleNext, accountType, navigation };
};

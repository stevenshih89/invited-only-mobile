import {useContext, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import {myEmailPath} from 'constants/pathLocations';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {useAuthStore} from 'src/store/authStore';
import {AuthContext} from 'contexts/AuthContext';
import BirthdayParty from 'assets/images/auth/interests/birthday-party.png';
import Exclusive from 'assets/images/auth/interests/exclusive.png';
import PoolParty from 'assets/images/auth/interests/pool-party.png';
import Private from 'assets/images/auth/interests/private.png';
import Restaurant from 'assets/images/auth/interests/restaurant.png';
import VipTables from 'assets/images/auth/interests/vip-tables.png';
import YachtParty from 'assets/images/auth/interests/yacht-party.png';
import Concert from 'assets/images/auth/interests/concerts.png';

export const useMyInterests = () => {
  const navigation = useAppNavigation();

  const {userMetadata: user} = useAuthStore();
  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const [listOfInterests, setListOfInterests] = useState([
    {id: 0, title: 'Vip Tables', isSelected: false, image: VipTables},
    {id: 1, title: 'Concerts', isSelected: false, image: Concert},
    {id: 2, title: 'Exclusive', isSelected: false, image: Exclusive},
    {id: 3, title: 'Yacht Party', isSelected: false, image: YachtParty},
    {id: 4, title: 'Pool Party', isSelected: false, image: PoolParty},
    {id: 5, title: 'Private', isSelected: false, image: Private},
    {id: 6, title: 'Birthday Party', isSelected: false, image: BirthdayParty},
    {id: 7, title: 'Restaurant', isSelected: false, image: Restaurant},
  ]);

  useEffect(() => {
    let subscription: any;

    const name = onBoarding.find((item: any) => item.name)?.name;
    const accountType = onBoarding.find((item: any) => item.accountType)?.accountType;
    const date = onBoarding.find((item: any) => item.date)?.date;
    const gender = onBoarding.find((item: {gender: string}) => item?.gender)?.gender;
    const photos = onBoarding.find((item: any) => item.photos)?.photos;
    const handleAppClose = async () => {
      try {
        await firestore()
          .collection('unfinishedRegistrationUsers')
          .doc(user?.uid)
          .set({
            name,
            accountType,
            date,
            gender,
            photos,
            phoneNumber: user?.phoneNumber,
            createdAt: moment().format('YYYY-MM-DD'),
            screen: 'my-interests',
          });
        analytics().logEvent('my_interests_app_closed', {
          name,
          accountType,
          date,
          gender,
          photos,
          phoneNumber: user?.phoneNumber,
          createdAt: moment().format('YYYY-MM-DD'),
          screen: 'my-interests',
        });
      } catch (e) {
        console.error(e);
        logErrorToSentry(e);
      }
    };

    subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        handleAppClose();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [onBoarding, user]);

  const handleSelectInterest = (id: number) => {
    const updatedInterests = listOfInterests.map(interest => {
      const selectedInterestsCount = listOfInterests.filter(item => item.isSelected).length;
      return interest.id === id ? {...interest, isSelected: selectedInterestsCount === 3 ? false : !interest.isSelected} : interest;
    });
    setListOfInterests(updatedInterests);
  };

  const handleNext = () => {
    const reqInterests = listOfInterests.reduce((acc: any[], curr) => {
      if (curr.isSelected) {
        acc.push({id: curr.id, title: curr.title});
      }
      return acc;
    }, []);
    setOnBoarding([
      ...onBoarding,
      {
        interests: reqInterests,
      },
    ]);
    navigation.navigate(myEmailPath as never);
  };

  const accountType = onBoarding.find((item: {accountType: string}) => item.accountType)?.accountType;

  return {listOfInterests, handleSelectInterest, handleNext, accountType, navigation};
};

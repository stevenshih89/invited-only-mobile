import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {useContext, useEffect} from 'react';
import {AppState} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import {AuthContext} from 'contexts/AuthContext';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {useAuthStore} from 'src/store/authStore';
import SheildRulesIcon from 'assets/images/icons/shield-rules.svg';
import HandRulesIcon from 'assets/images/icons/hand-rules.svg';
import MessageRulesIcon from 'assets/images/icons/message-rules.svg';
import LockRulesIcon from 'assets/images/icons/lock-rules.svg';

export const usePrivacy = () => {
  const {userMetadata: user} = useAuthStore();
  const navigation = useAppNavigation();
  const {onBoarding} = useContext(AuthContext);
  const objWithAccountType = onBoarding.find((obj: any) => obj.accountType);
  const route = useRoute();
  const routeParams = route.params as Readonly<{screen: string; accountType: string}>;
  const privaciesList = [
    {
      id: 0,
      title: 'Be Respectful',
      subtitle: 'Treat your guests or hosts with courtesy and professionalism at all times.',
      icon: HandRulesIcon,
    },
    {
      id: 1,
      title: 'Ensure Safety',
      subtitle: 'Maintain a safe environment and report inappropriate behavior immediately.',
      icon: SheildRulesIcon,
    },
    {
      id: 2,
      title: 'Honesty is Key',
      subtitle: 'Be clear about your table or event and its purpose—no misleading details.',
      icon: MessageRulesIcon,
    },
    {
      id: 3,
      title: 'Respect Privacy',
      subtitle: 'Do not share personal information or media without consent.',
      icon: LockRulesIcon,
    },
  ];

  useEffect(() => {
    let subscription: any;

    const name = onBoarding.find((item: any) => item.name)?.name;
    const email = onBoarding.find((item: any) => item.email)?.email;
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
            email,
            accountType,
            date,
            gender,
            photos,
            phoneNumber: user?.phoneNumber,
            createdAt: moment().format('YYYY-MM-DD'),
            screen: 'house-rules',
          });
        analytics().logEvent('house_rules_app_closed', {
          name,
          email,
          accountType,
          date,
          gender,
          photos,
          phoneNumber: user?.phoneNumber,
          createdAt: moment().format('YYYY-MM-DD'),
          screen: 'house-rules',
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
  }, []);

  return {
    objWithAccountType,
    accountType: routeParams?.accountType,
    privaciesList,
    navigation,
    screen: routeParams?.screen,
  };
};

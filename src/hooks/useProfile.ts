import { useState, useCallback, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { useAdminActions } from 'src/store/adminActions';
import { useUser } from 'src/store/userStore';
import { myProfileViewPath } from 'constants/pathLocations';
import { calculateAge } from 'helpers/calculateAge';
import { getEventsIJoining } from 'helpers/getEventsIJoining';
import Config from 'react-native-config';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import { useAppNavigation } from 'hooks/useAppNavigation';

const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';

export const useProfile = () => {
  const [activeTabId, setActiveTabId] = useState(0);  
  const [totalGuests, setTotalGuests] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);

  const {user: userInfo} = useUser();

  const rejectModalVisible = useAdminActions((i: any) => i?.rejectModalVisible);
  const acceptModalVisible = useAdminActions((i: any) => i?.acceptModalVisible);
  const setAcceptModalVisible = useAdminActions((i: any) => i?.setAcceptModalVisible);
  const changeAccountTypeModalVisible = useAdminActions((i: any) => i?.changeAccountTypeModalVisible);
  const setChangeAccountModalVisible = useAdminActions((i: any) => i?.setChangeAccountModalVisible);
  const isHost = userInfo?.accountType === 'host';
  const tabList = [
    {id: 0, title: 'My plan'},
    {id: 1, title: 'Safety'},
    {id: 2, title: 'App Invitations'},
  ];

  const calculateCompleteness = (profile: any) => {
    if (!profile) {
      return 0;
    }
    const requiredFields = ['chooseGuest', 'date', 'email', 'gender', 'homeAddress', 'interests', 'work', 'imageUser', 'bio', 'photos'];
    let presentFields = 0;

    for (const field of requiredFields) {
      if (profile?.hasOwnProperty(field) && profile?.[field] !== null && profile?.[field] !== undefined) {
        presentFields++;
      }
    }

    const completenessPercentage = (presentFields / requiredFields.length) * 100;

    if (completenessPercentage === 100) {
      return 100;
    } else {
      const missingFields = requiredFields.length - presentFields;
      const deductionPercentage = (missingFields / requiredFields.length) * 100;
      return completenessPercentage - deductionPercentage;
    }
  };

  const percentage = Math.floor(calculateCompleteness(userInfo));

  const navigation = useAppNavigation();  

  const goToMyProfileView = () => {
    // @ts-ignore
    navigation.navigate(myProfileViewPath, {
      isShowEditButton: true,
      isPreview: false,
    });
  };

  const getGuestList = async () => {
    let totalParticipants = 0;
    try {
      for (const eventId of userInfo?.eventsList) {
        const eventDoc = await firestore().collection(apiEventsCollection).doc(eventId).get();
        if (eventDoc.exists) {
          const data = eventDoc.data();
          totalParticipants += data?.male || 0 + data?.female || 0;
        }
      }
      console.log('totalParticipants before set:', totalParticipants);
      setTotalGuests(totalParticipants);
    } catch (error) {
      logErrorToSentry(error);
      console.error('error fetching guest list: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let eventsJoiningSubscriber: any;
      if (!isHost) {
        try {
          eventsJoiningSubscriber = firestore()
          .collection(apiEventsCollection)
          .onSnapshot(async querySnapshot => {
            const count = await getEventsIJoining(querySnapshot, userInfo?.uid);
            setEventsCount(count);
          });
        } catch (error) {
          logErrorToSentry(error);
        }
      }
      return () => {
        console.warn('unsubscribe 213123');
        if (eventsJoiningSubscriber) {
          eventsJoiningSubscriber();
        }
      };
    }, [userInfo]),
  );

  useEffect(() => {
    if (userInfo?.uid && isHost) {
      getGuestList();
    }
  }, [userInfo?.uid]);

  const userAge = calculateAge(userInfo?.date);

  return {
    activeTabId,
    setActiveTabId,
    percentage,
    userInfo,
    userAge,
    totalGuests,
    eventsCount,
    rejectModalVisible,
    acceptModalVisible,
    setAcceptModalVisible,
    changeAccountTypeModalVisible,
    setChangeAccountModalVisible,
    tabList,
    goToMyProfileView,
  };
};

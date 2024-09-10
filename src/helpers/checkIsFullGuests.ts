import firestore from '@react-native-firebase/firestore';

export const checkIsFullGuests = async (idEvent: string) => { 
    const getEventData = (await firestore().collection('Events').doc(idEvent).get()).data();
    const allGuests = getEventData?.male + getEventData?.female;
    const findAcceptedGuest = getEventData?.usersList.filter(item => item.status === 'invite_match');
    return {
        allGuests, 
        findAcceptedGuest: findAcceptedGuest.length, 
        totalRequestsGuests: getEventData?.requestsList.length,
    }
  }
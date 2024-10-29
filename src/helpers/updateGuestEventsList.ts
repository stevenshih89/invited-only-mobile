import firestore from '@react-native-firebase/firestore';

export const updateGuestEventsList = async (eventId: string, forUserUid: string) => {
    try {
      const docData = firestore().collection('userInfo').doc(forUserUid)
    const dataUser = await docData.get()
    const eventsList = dataUser?.data()?.eventsList
    await docData.update({
      eventsListVisit: eventsList? [...eventsList, eventId]: [eventId]
    })
    } catch (error) {
      
    }
  }
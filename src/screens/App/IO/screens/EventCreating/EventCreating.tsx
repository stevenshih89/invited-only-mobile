import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Platform, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import TrashCanIcon from 'assets/images/icons/trash.svg';
import useStyles from 'screens/App/IO/screens/EventCreating/styles.ts';
import {blackColor, grayScale700, lightGray2Color, whiteColor} from 'constants/colors.ts';
import InvitedOnly from 'screens/App/IO/screens/EventCreating/components/InvitedOnly/InvitedOnly.tsx';
import EventDetails from 'screens/App/IO/screens/EventCreating/components/EventDetails/EventDetails.tsx';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useAppNavigation} from 'hooks/useAppNavigation';
import ModalSaveEventChanges from 'screens/App/MyEvents/EventEditing/ModalSaveEventChanges';
import ModalCancelEvent from 'screens/App/MyEvents/EventEditing/ModalCancelEvent';
import {showToast} from 'helpers/showToast.ts';
import auth from '@react-native-firebase/auth';
import {ACCEPTED_STATUS, screenWidth} from 'constants/common';
import {Satoshi500} from 'constants/fonts';
import EventPreview from 'components/TouchingSlider/components/EventPreview';
import Check from 'src/assets/images/icons/Check-black.svg';
import uuid from 'react-native-uuid';
import {useUser} from 'src/store/userStore';
// import {uploadImage} from 'helpers/uploadImage.ts';
import {commonStackPath, demoFlowStackPath, demoIOPath, eventActiveInfoPath, IOPath} from 'constants/pathLocations';
import storage from '@react-native-firebase/storage';
import {createEvent} from 'src/api/event';
import {eventTypes} from 'src/mocks/eventTypes';
import {Event, EventData} from 'src/types/event';
import moment from 'moment';
import {sendNotification} from 'helpers/fcmHelper';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import HintCard from 'components/HintCard';
import {hostHintSteps} from 'constants/hints.ts';
import {useDemoFlowStore} from '../../../../../store/demoFlowStore';
import functions from '@react-native-firebase/functions';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';

const EventCreating = () => {
  const INVITED_ONLY = 'invitedOnly';
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';

  const {hintStep, setHintStep, setIsVisibleSwipeGuide, setEvent} = useDemoFlowStore();
  const [tabState, setTabState] = useState<string>(INVITED_ONLY);
  const [isVisibleSaveModal, setIsVisibleSaveModal] = useState<boolean>(false);
  const [isVisibleCancelModal, setIsVisibleCancelModal] = useState<boolean>(false);
  const styles = useStyles();

  const [female, setFemale] = useState<number>(0);
  const [male, setMale] = useState<number>(0);
  const [femaleFriend, setFemaleFriend] = useState<number>(0);
  const [maleFriend, setMaleFriend] = useState<number>(0);
  const [loaderVisible, setLoaderVisible] = useState<boolean>(false);
  const {user} = useUser();

  const [myEvents, setMyEvents] = useState();

  const [mainImage, setMainImage] = useState<any>();
  const [currentCreateStep, setCurrentCreateStap] = useState<number>(1);

  const [activeType, setActiveType] = useState(eventTypes[0].id);
  const [placeName, setPlaceName] = useState(hintStep > 4 ? 'Irisol Dubai' : '');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [datePicker, setDatePicker] = useState(new Date());
  const [hourPicker, setHourPicker] = useState(new Date());
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [address, setAddress] = useState(hintStep > 4 ? 'Nad AJ Sheba 1 - Dubai' : '');
  const [meetingSpot, setMeetingSpot] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [openHour, setOpenHour] = useState(false);
  const userHost = useUser((i: any) => i?.user);

  const [photos, setImages] = useState<Event.Photo[]>([
    {
      id: 0,
      image:
        'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2Fevent_preview.png?alt=media&token=0de5918d-5690-48fb-9b0a-018c73948805',
    },
    {
      id: 1,
      image:
        'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2Fevent_preview.png?alt=media&token=0de5918d-5690-48fb-9b0a-018c73948805',
    },
    {
      id: 2,
      image:
        'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2Fevent_preview.png?alt=media&token=0de5918d-5690-48fb-9b0a-018c73948805',
    },
  ]);

  const navigation = useAppNavigation();

  const handleSetTabState = (type: string): void => {
    setTabState(type);
  };

  const route = useRoute();

  const isDemo = (route?.params as {isDemo?: boolean})?.isDemo;
  const isEditing = (route?.params as {isEditing?: boolean})?.isEditing;
  const isEditingItem = (route?.params as {isEditingItems?: any})?.isEditingItems;

  useEffect(() => {
    if (isEditing) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setIsVisibleCancelModal(true)}>
            <TrashCanIcon style={{marginHorizontal: 20, marginVertical: 10}} />
          </TouchableOpacity>
        ),
      });
    }
  }, []);

  useEffect(() => {
    if (hintStep === 3) {
      setPlaceName('Irisol Dubai');
      setAddress('Nad AJ Sheba 1 - Dubai');
      setName('Red Mirage');
      setDescription('A night of elegance and excitement');
      setDate('07.02.2025');
      setHour('21:30');
      setMeetingSpot('Main Entrance');
      setImages([
        {
          id: 0,
          image:
            'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2FImage.png?alt=media&token=14b8e084-7280-4e49-abd4-0aeb3503c133',
        },
      ]);
    }
  }, [hintStep]);

  const editingItems = {
    prevImages: isEditingItem?.photos ? [...isEditingItem?.photos] : [],
    prevActiveType: isEditingItem?.activeType,
    prevPlaceName: isEditingItem?.placeName,
    prevName: isEditingItem?.name,
    prevDescription: isEditingItem?.description,
    prevDate: isEditingItem?.date,
    prevHour: isEditingItem?.hour,
    prevAddress: isEditingItem?.address,
    prevMeetingSpot: isEditingItem?.meetingSpot,
    prevFemale: isEditingItem?.female,
    prevMale: isEditingItem?.male,
    prevFemaleFriend: isEditingItem?.femaleFriend,
    prevMaleFriend: isEditingItem?.maleFriend,
  };

  const generateRandomId = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const getFcmTokens = async (usersList: []) => {
    let users: Object[] = [];

    const promises = usersList.map(async item => {
      const userInfo = await firestore().collection(apiUserInfoCollection).doc(item?.uid).get();
      // console.log(apiUserInfoCollection, userInfo);
      return {uid: userInfo?.data()?.uid, token: userInfo?.data()?.fcmToken};
    });

    users = await Promise.all(promises);

    // console.log('users', users);

    return users;
  };

  interface usersListI {
    status: string;
  }

  const getUsersListAccepted = (usersList: usersListI[]) => {
    const filter = usersList?.filter(item => item.status === ACCEPTED_STATUS);
    return filter;
  };

  const sendNotificationAcceptedUser = async () => {
    const usersAccepted = getUsersListAccepted(isEditingItem?.usersList);
    for (const user of usersAccepted) {
      try {
        await sendNotification(
          user.uid,
          'Event update',
          `${isEditingItem?.name} event has been updated`,
          'Event Reminders',
          'Event',
          userHost,
        );
      } catch (error) {
        console.error('error sendNotificationAcceptedUser', error);
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const id = isEditingItem?.id;
      await firestore().collection(apiEventsCollection).doc(id).update({
        female,
        male,
        femaleFriend,
        maleFriend,
        eventTypes,
        placeName,
        name,
        description,
        date,
        hour,
        address,
        meetingSpot,
        photos,
      });
      analytics().logEvent('event_saved_changes', {
        eventId: id,
      });
      const getDoc = await firestore().collection(apiEventsCollection).doc(id).get();
      const data = getDoc.data();
      navigation.navigate(commonStackPath, {
        screen: eventActiveInfoPath,
        params: {list: data},
      } as never);
      showToast('inviteMatch', 'Continue invite👋', 'Event updated');
      await sendNotificationAcceptedUser();
      // sendNotification(`${isEditingItem?.name} has been updated`, 'Click here to see details', 'update');
    } catch (e) {
      showToast('inviteMatch', 'Something went wrong while updating the event. Please try again later.', 'Error');
      logErrorToSentry(e)
      console.log('error update event', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchMyEvents = async () => {
        const user = auth().currentUser;
        if (user) {
          try {
            const querySnapshot = await firestore().collection(apiEventsCollection).where('uid', '==', user.uid).get();

            if (querySnapshot.empty) {
              setMyEvents([]);
              return;
            }
            const data = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMyEvents(data);
          } catch (error: any) {
            showToast('inviteMatch', 'Failed to load your events. Please try again later.', 'Error');
            logErrorToSentry(error);
            // Alert.alert('Error', error.message || 'Something went wrong');
          }
        }
      };
      fetchMyEvents();
    }, []),
  );

  const updatePhotosImage = async (userId: string | null, imageUrl: any[]) => {
    const filteredImages = imageUrl.filter(item => item.image !== undefined && item.image !== null);
    const sortedPhotos = filteredImages.sort((a, b) => a.id - b.id);

    try {
      await firestore().collection(apiEventsCollection).doc(userId).update({
        photos: sortedPhotos,
      });
    } catch (e) {
      console.error('Error updating events image: ', e);
    }
  };

  const uploadImage = async (imagePath: string, userId: string | null) => {
    if (imagePath) {
      if (imagePath.includes('https://')) {
        return imagePath;
      } else {
        const uploadUri = Platform.OS === 'ios' ? imagePath : `file://${imagePath}`;
        const filename = `${userId}_${new Date().getTime()}`;
        const storageRef = storage().ref(`images/${filename}`);
        try {
          await storageRef.putFile(uploadUri);
          const url = await storageRef.getDownloadURL();
          return url;
        } catch (e) {
          console.error('Error uploading image:', e);
          return null;
        }
      }
    }
  };

  const handleCreateEvent = async () => {
    setLoaderVisible(true);
    try {
      setLoading(true);
      const uid: string = uuid.v4() as string;
      const user = auth().currentUser;
      if (!user) {
        return;
      }
      if (photos[0] === null) {
        Alert.alert('Please add the main picture');
      }

      let imagesUri: any[] = [];

      const event: EventData = {
        activeType: activeType,
        female: female,
        name: name,
        description: description,
        date: date,
        hour: hour,
        address: address,
        meetingSpot: meetingSpot,
        male: male,
        femaleFriend: femaleFriend,
        maleFriend: maleFriend,
        placeName: placeName,
        id: uid,
        uid: user?.uid,
        rejectsList: [],
        requestsList: [],
        usersList: [],
        statusEvent: false,
        eventReviewed: false,
        hostImage: userHost?.photos[0]?.image,
        hostName: userHost?.name,
        photos: imagesUri,
        isCancelled: false,
        createdAt: moment().format('YYYY-MM-DD'),
      };

      showToast('inviteMatch', 'Go to my events >', 'Event successfully created ');
      showToast('inviteMatch', 'Your event in review.', 'Estimate time review 2h');

      isEditing ? setIsVisibleSaveModal(true) : null;

      for (const i of photos) {
        const img = await uploadImage(i?.image, userHost.uid);
        imagesUri.push({id: i?.id, image: img});
      }

      await createEvent(uid, event);

      await firestore()
        .collection(apiUserInfoCollection)
        .doc(user?.uid)
        .update({
          eventsList: firestore.FieldValue.arrayUnion(uid),
        });

        const getFcmTokensFromUsers = async () => {
          const userInfoDocs = await firestore()
            .collection(apiUserInfoCollection)
            .where('isInvitedOnlyAdmin', '==', true)
            .get();
        
          const tokens: string[] = [];
          
          userInfoDocs.forEach((doc) => {
            const data = doc.data();
            if (data.fcmToken) {
              tokens.push(data.fcmToken);
            }
          });
        
          return tokens;
        };
      
        const tokens = await getFcmTokensFromUsers();        

        for (const token of tokens) {
            const result = await functions().httpsCallable('sendNotification')({
              token: token,
              priority: 'high',
              notification: {
                title: 'Invited Only',
                body: 'A new event was created!',
              },
            });
        }
        

      setLoading(false);
      setLoaderVisible(false);

      navigation.navigate(IOPath as never);
    } catch (e) {
      setLoading(false);
      setLoaderVisible(false);
      showToast('inviteMatch', 'Something went wrong while creating the event. Please try again later.', 'Error');
      logErrorToSentry(e);
    }
  };

  const handleSkipHints = () => {
    if (hintStep === 1) {
      navigation.goBack();
    } else {
      const uid: string = uuid.v4() as string;
      const demoEvent = {
        name: 'Red Mirage',
        date: '07.02.2025',
        hour: '21:30',
        address: 'Nad AJ Sheba 1 - Dubai',
        male: 50,
        placeName: 'Irisol Dubai',
        id: uid,
        uid: user?.uid,
        rejectsList: [],
        requestsList: [],
        usersList: [],
        statusEvent: false,
        eventReviewed: false,
        hostImage: user?.photos?.[0]?.image,
        hostName: user?.name,
        photos: [
          {
            id: 0,
            image:
              'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2FImage.png?alt=media&token=14b8e084-7280-4e49-abd4-0aeb3503c133',
          },
        ],
        isCancelled: false,
        createdAt: moment().format('YYYY-MM-DD'),
      };
      setEvent(demoEvent);
      navigation.navigate(demoFlowStackPath, {screen: demoIOPath} as never);
      setHintStep(8);
      setIsVisibleSwipeGuide(true);
    }
  };

  const handlePreviousStep = () => {
    if (hintStep === 3) {
      setTabState('invitedOnly');
      setCurrentCreateStap(1);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {isDemo && <View style={styles.overlayContainer} />}
        <View
          style={{
            ...styles.wrapperTabSelections,
            zIndex: isDemo && (hintStep === 1 || hintStep === 3) ? 1111 : 1,
          }}>
          <View style={{width: '100%', marginVertical: 24}}>
            <View style={{position: 'relative', alignItems: 'center', width: '100%'}}>
              <View
                style={{
                  height: 2,
                  width: screenWidth - 48 - 32,
                  backgroundColor: grayScale700,
                  position: 'absolute',
                  top: 16,
                }}
              />
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      height: 32,
                      width: 32,
                      backgroundColor: whiteColor,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {currentCreateStep === 1 ? (
                      <Text style={{fontSize: 16, fontFamily: Satoshi500, textAlign: 'center'}}>1</Text>
                    ) : (
                      <Check />
                    )}
                  </View>
                  <Text
                    style={{
                      color: currentCreateStep === 1 ? whiteColor : grayScale700,
                      fontFamily: Satoshi500,
                      fontSize: 12,
                      marginTop: 8,
                    }}>
                    Guests
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      height: 32,
                      width: 32,
                      backgroundColor: currentCreateStep === 2 || currentCreateStep > 2 ? whiteColor : lightGray2Color,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {currentCreateStep === 2 || currentCreateStep < 2 ? (
                      <Text
                        style={{
                          color: currentCreateStep === 2 ? blackColor : whiteColor,
                          fontSize: 16,
                          fontFamily: Satoshi500,
                          textAlign: 'center',
                        }}>
                        2
                      </Text>
                    ) : (
                      <Check />
                    )}
                  </View>
                  <Text
                    style={{
                      color: currentCreateStep === 2 ? whiteColor : grayScale700,
                      fontFamily: Satoshi500,
                      fontSize: 12,
                      marginTop: 8,
                    }}>
                    Place
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      height: 32,
                      width: 32,
                      backgroundColor: currentCreateStep === 3 ? whiteColor : lightGray2Color,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: currentCreateStep === 3 ? blackColor : whiteColor,
                        fontSize: 16,
                        fontFamily: Satoshi500,
                        textAlign: 'center',
                      }}>
                      3
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: currentCreateStep === 3 ? whiteColor : grayScale700,
                      fontFamily: Satoshi500,
                      fontSize: 12,
                      marginTop: 8,
                    }}>
                    Preview
                  </Text>
                </View>
              </View>
              {isDemo && (hintStep === 1 || hintStep === 3) && (
                <View style={styles.step1HintContainer}>
                  <HintCard
                    currentStep={hintStep}
                    description={hostHintSteps[hintStep - 1]?.description}
                    onSkipAction={handleSkipHints}
                    onStepChange={setHintStep}
                    onPreviousAction={handlePreviousStep}
                    totalSteps={hostHintSteps.length}
                    directionHorizontal={hintStep === 3 ? 'center' : 'start'}
                    title={hostHintSteps[hintStep - 1]?.title}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        {tabState === 'invitedOnly' && (
          <InvitedOnly
            setMaleFriend={setMaleFriend}
            setFemaleFriend={setFemaleFriend}
            female={female}
            femaleFriend={femaleFriend}
            male={male}
            maleFriend={maleFriend}
            setMale={setMale}
            setFemale={setFemale}
            setTabState={setTabState}
            isEditing={isEditing}
            {...editingItems}
            setIsVisibleSaveModal={setIsVisibleSaveModal}
            setCurrentCreateStap={setCurrentCreateStap}
          />
        )}
        {tabState === 'eventDetails' && (
          <EventDetails
            female={female}
            femaleFriend={femaleFriend}
            male={male}
            maleFriend={maleFriend}
            isEditing={isEditing}
            id={isEditingItem?.id}
            {...editingItems}
            setIsVisibleSaveModal={setIsVisibleSaveModal}
            setTabState={setTabState}
            setMainImage={setMainImage}
            setCurrentCreateStap={setCurrentCreateStap}
            photos={photos}
            setImages={setImages}
            activeType={activeType}
            setActiveType={setActiveType}
            placeName={placeName}
            setPlaceName={setPlaceName}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            datePicker={datePicker}
            setDatePicker={setDatePicker}
            hourPicker={hourPicker}
            setHourPicker={setHourPicker}
            date={date}
            setDate={setDate}
            hour={hour}
            setHour={setHour}
            address={address}
            setAddress={setAddress}
            meetingSpot={meetingSpot}
            setMeetingSpot={setMeetingSpot}
            loading={loading}
            setLoading={setLoading}
            open={open}
            setOpen={setOpen}
            openHour={openHour}
            setOpenHour={setOpenHour}
            userHost={userHost}
          />
        )}
        {tabState === 'eventPreview' && (
          <EventPreview
            isEditing={isEditing}
            id={isEditingItem?.id}
            eventTypes={eventTypes}
            description={description}
            hour={hour}
            address={address}
            meetingSpot={meetingSpot}
            photos={photos}
            date={date}
            girls={female}
            male={male}
            placeName={placeName}
            setCurrentCreateStap={setCurrentCreateStap}
            setTabState={setTabState}
            handleCreateEvent={handleCreateEvent}
            name={name}
            setIsVisibleSaveModal={setIsVisibleSaveModal}
            loaderVisible={loaderVisible}
            isReview={isEditingItem?.eventReviewed}
          />
        )}
      </View>
      <ModalSaveEventChanges
        handleSaveChanges={handleSaveChanges}
        isVisible={isVisibleSaveModal}
        onClose={() => setIsVisibleSaveModal(false)}
      />
      <ModalCancelEvent
        id={isEditingItem?.id}
        image={isEditingItem?.photos[0]?.image}
        isVisible={isVisibleCancelModal}
        onClose={() => setIsVisibleCancelModal(false)}
      />
    </>
  );
};

export default EventCreating;

import React, {FC, useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Platform} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import TrashCanIcon from 'assets/images/icons/trash.svg';
import EventPreviewImage from 'assets/images/app/event-preview.png';
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
import {screenWidth} from 'constants/common';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import EventPreview from 'components/TouchingSlider/components/EventPreview';
import Check from 'src/assets/images/icons/Check-black.svg';
import uuid from 'react-native-uuid';
import {useUser} from 'src/store/userStore';
import {uploadImage} from 'helpers/uploadImage.ts';
import {IOPath} from 'constants/pathLocations';
import storage from '@react-native-firebase/storage';
import {CLOUD_MESSAGING_SERVER_KEY} from '@env';

const eventTypes = [
  {id: 0, label: 'Custom'},
  {id: 1, label: 'Table'},
  {id: 2, label: 'Club'},
  {id: 3, label: 'Restaurant'},
];

const EventCreating: FC = () => {
  const INVITED_ONLY = 'invitedOnly';
  const EVENT_DETAILS = 'eventDetails';

  const [tabState, setTabState] = useState<string>(INVITED_ONLY);
  const [isVisibleSaveModal, setIsVisibleSaveModal] = useState<boolean>(false);
  const [isVisibleCancelModal, setIsVisibleCancelModal] = useState<boolean>(false);
  const styles = useStyles();

  const [female, setFemale] = useState<number>(0);
  const [male, setMale] = useState<number>(0);
  const [femaleFriend, setFemaleFriend] = useState<number>(0);
  const [maleFriend, setMaleFriend] = useState<number>(0);

  const [myEvents, setMyEvents] = useState();

  const [mainImage, setMainImage] = useState<any>();
  const [currentCreateStep, setCurrentCreateStap] = useState<number>(1);

  ////////////////////
  const [activeType, setActiveType] = useState(eventTypes[0].id);
  const [placeName, setPlaceName] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [datePicker, setDatePicker] = useState(new Date());
  const [hourPicker, setHourPicker] = useState(new Date());
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [address, setAddress] = useState('');
  const [meetingSpot, setMeetingSpot] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [openHour, setOpenHour] = useState(false);
  const userHost = useUser((i: any) => i?.user);

  const [photos, setImages] = useState<{image: null | string; id: number}[]>([
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
    {
      id: 3,
      image: null,
    },
    {
      id: 4,
      image: null,
    },
  ]);

  // console.log('photos', photos);

  const navigation = useAppNavigation();

  const handleSetTabState = (type: string): void => {
    setTabState(type);
  };

  const route = useRoute();

  const isEditing = (route?.params as {isEditing?: boolean})?.isEditing;
  const isEditingItem = (route?.params as {isEditingItems?: any})?.isEditingItems;

  // console.log('isEditingItem', isEditingItem);

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
      const userInfo = await firestore().collection('userInfo').doc(item?.uid).get();
      // console.log('userInfo', userInfo);
      return {uid: userInfo?.data()?.uid, token: userInfo?.data()?.fcmToken};
    });

    users = await Promise.all(promises);

    // console.log('users', users);

    return users;
  };

  const sendNotification = async (title: string, body: string, mark: string) => {
    const users = await getFcmTokens(isEditingItem?.usersList);

    for (const user of users) {
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=${CLOUD_MESSAGING_SERVER_KEY}`,
        },
        body: JSON.stringify({
          to: user.token,
          notification: {
            title: title,
            body: body,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        // console.error('error sending notification:', error);
      } else {
        const data = await response.json();
        const userDoc = await firestore().collection('userInfo').doc(user.uid).get();
        const userNotifications = userDoc.data()?.notifications || [];
        const id = generateRandomId(8);
        const notification = {
          id,
          title: title,
          body: body,
          mark: mark,
          uid: userHost?.uid,
        };

        try {
          await firestore()
            .collection('userInfo')
            .doc(user.uid)
            .update({
              notifications: [...userNotifications, notification],
            });
        } catch (error) {
          // console.log('error update notifications', error);
        }
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const id = isEditingItem?.id;
      await firestore().collection('Events').doc(id).update({
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
      navigation?.goBack();
      showToast('inviteMatch', 'Continue swiping👋', 'Event updated');
      sendNotification(`${isEditingItem?.name} has been updated`, 'Click here to see details', 'update');
    } catch (e) {
      // console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchMyEvents = async () => {
        const user = auth().currentUser;
        if (user) {
          try {
            const querySnapshot = await firestore().collection('Events').where('uid', '==', user.uid).get();

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
            Alert.alert('Error', error.message || 'Something went wrong');
          }
        }
      };
      fetchMyEvents();
    }, []),
  );

  const updatePhotosImage = async (userId: string | null, imageUrl: any[]) => {

    const filteredImages = imageUrl.filter((item) => item.image !== undefined && item.image !== null);
    const sortedPhotos = filteredImages.sort((a, b) => a.id - b.id);

    
    try {
      await firestore().collection('Events').doc(userId).update({
        photos: sortedPhotos,
      });
    } catch (e) {
      console.error('Error updating events image: ', e);
    }
  };
  

  const uploadImage = async (imagePath: string, userId: string | null) => {
    if(imagePath) {
      if(imagePath === 'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2Fevent_preview.png?alt=media&token=0de5918d-5690-48fb-9b0a-018c73948805') {
        return imagePath
      } else {
        const uploadUri = Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath;
      const filename = `${userId}_${new Date().getTime()}`; // or another unique naming convention
      const storageRef = storage().ref(`images/${filename}`);
      const task = storageRef.putFile(uploadUri);
      try {
        await task;
      // Get the URL to the uploaded image
        const url = await storageRef.getDownloadURL();        
        return url;
      } catch (e) {
        // console.error(e);
        return null;
      }
      }
    }
  };

  const handleCreateEvent = async () => {
    try {
      setLoading(true);
      const uid: string | number[] = uuid.v4();
      const user = auth().currentUser;

      if (photos[0] === null) {
        Alert.alert('Please add the main picture');
      }

      let imagesUri: any[] = [];

      // // console.log('imagesUri', imagesUri);
      // // console.log('images', photos);
      // @ts-ignore
      await firestore()
        .collection('Events')
        .doc(uid)
        .set({
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
          requestsList: [],
          usersList: [],
          statusEvent: false,
          eventReviewed: false,
          hostImage: userHost?.photos[0]?.image,
          hostName: userHost?.name,
          photos: photos,
          hostFcmToken: userHost?.fcmToken,
        })
        .then(async () => {
          showToast('inviteMatch', 'Go to my events >', 'Event successfully created ');
          showToast('inviteMatch', 'Your event in review.', 'Estimate time review 2h');
          isEditing ? setIsVisibleSaveModal(true) : null;
          setLoading(false);
          navigation.navigate(IOPath as never);
          photos?.map(async (i, index) => {      
            await uploadImage(i?.image, userHost.uid)
            .then(img => imagesUri.push({id: index, image: img}))
            .catch(e => console.log('error uploadImage', e))
            await updatePhotosImage(uid, imagesUri)
          })
          await firestore()
            .collection('userInfo')
            .doc(user?.uid)
            .update({
              eventsList: firestore.FieldValue.arrayUnion(uid),
            });
        });
    } catch (e) {
      setLoading(false);
      // console.log(e);
      showToast('inviteMatch', '', `${e}`);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapperTabSelections}>
          <View style={{width: '100%', marginVertical: 24}}>
            <View style={{position: 'relative', alignItems: 'center', width: '100%'}}>
              <View style={{height: 2, width: screenWidth - 48 - 32, backgroundColor: grayScale700, position: 'absolute', top: 16}} />
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
                    Prewiev
                  </Text>
                </View>
              </View>
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
            placeName={placeName}
            setCurrentCreateStap={setCurrentCreateStap}
            setTabState={setTabState}
            handleCreateEvent={handleCreateEvent}
            name={name}
            setIsVisibleSaveModal={setIsVisibleSaveModal}
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

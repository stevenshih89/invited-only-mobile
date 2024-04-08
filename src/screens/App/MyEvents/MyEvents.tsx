import React, {FC, useCallback, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

//import components
import useStyles from 'screens/App/MyEvents/styles.ts';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard.tsx';

//import images
import AddIcon from 'assets/images/icons/add.svg';
import JoiningEventsCard from 'components/Cards/JoiningEventsCard/JoiningEventsCard';
import {FlatList} from 'react-native';
import {blackColor, lightGray2Color, whiteColor} from 'constants/colors';
import ModalCancelAttending from './ModalCancelAttending';
import {showToast} from 'helpers/showToast.ts';
import ModalAcceptInvitation from './ModalAcceptInvitation';
import {useUser} from '../../../store/userStore';
import {useFocusEffect} from '@react-navigation/native';
import {screenHeight} from 'constants/common.ts';

const MyEvents: FC = () => {
  const styles = useStyles();
  const MY_EVENTS = 'my_events';
  const EVENTS_JOINING = 'events_joining';

  const [isVisibleCancelAttendingModal, setIsVisibleCancelAttendingModal] = useState<boolean>(false);
  const [isVisibleAcceptInvitationModal, setIsVisibleAcceptInvitationModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(MY_EVENTS);
  const [activeModalEvent, setActiveModalEvent] = useState<any>({
    id: 0,
    image: '',
    textCityName: '',
    date: '',
    numberOfGirlsInvited: 0,
    host: {
      name: '',
      image: '',
    },
  });
  const [myEventsData, setMyEventsData] = useState([]);

  const user = useUser((i: any) => i?.user);

  const handleOpenCancelAttendingModal = (eventInfo: {image: string; textCityName: string; date: string; numberOfGirlsInvited: string}) => {
    setActiveModalEvent(eventInfo);
    setIsVisibleCancelAttendingModal(true);
  };

  const handleOpenAcceptInvitationModal = (eventInfo: {image: string; textCityName: string; date: string; numberOfGirlsInvited: string}) => {
    setActiveModalEvent(eventInfo);
    setIsVisibleAcceptInvitationModal(true);
  };

  const handleAcceptInvitation = () => {
    setIsVisibleAcceptInvitationModal(false);
  };

  const handleRejectInvitation = () => {
    setIsVisibleAcceptInvitationModal(false);
  };

  const handleCancelAttending = () => {
    setIsVisibleCancelAttendingModal(false);
    showToast('cancel', 'Go to my events', `You canceled ${activeModalEvent.textCityName} event`);
  };

  const eventsJoiningData = [
    {
      id: 0,
      activeState: true,
      allPeople: 10,
      date: '10.12.2024',
      textCityName: 'Amazonico Dubai',
      estimeTime: '2h',
      numberOfGirlsInvited: '2',
      joinedPeopleCount: 4,
      isAcceptedInvitation: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
      host: {
        id: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        name: 'Frank',
      },
    },
    {
      id: 1,
      activeState: true,
      allPeople: 10,
      date: '10.12.2024',
      textCityName: 'Amazonico Dubai',
      estimeTime: '2h',
      numberOfGirlsInvited: '2',
      joinedPeopleCount: 4,
      isAcceptedInvitation: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
      host: {
        id: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        name: 'Frank',
      },
    },
  ];

  const getMyEvents = async () => {
    try {
      if (user) {
        const querySnapshot = await firestore().collection('Events').where('uid', '==', `${user?.uid}`).get();
        const data = querySnapshot?.docs?.map(i => i?.data());
        console.log('querySnapshot my events', data);
        setMyEventsData(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMyEvents();
    }, []),
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapperHeaderButtonMyEvents}>
          <TouchableOpacity
            style={[styles.buttonMyEvents, {backgroundColor: activeTab === MY_EVENTS ? whiteColor : lightGray2Color}]}
            onPress={() => setActiveTab(MY_EVENTS)}>
            <Text style={[styles.textMyEvents, {color: activeTab === MY_EVENTS ? blackColor : whiteColor}]}>My events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonEventsJoining, {backgroundColor: activeTab === EVENTS_JOINING ? whiteColor : lightGray2Color}]}
            onPress={() => setActiveTab(EVENTS_JOINING)}>
            <Text style={[styles.textEventsJoining, {color: activeTab === EVENTS_JOINING ? blackColor : whiteColor}]}>Events I'm Joining</Text>
            <View style={styles.rowTextCountEvents}>
              <Text style={styles.textCountEvents}>21</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addEventButton}>
            <View style={styles.addEventView}>
              <AddIcon width={19} height={19} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, height: '100%'}}>
          {activeTab === MY_EVENTS ? (
            <FlatList
              style={{flex: 1, height: '100%', marginBottom: screenHeight / 10}}
              showsVerticalScrollIndicator={false}
              data={myEventsData}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <MyEventsCard
                  imageBg={item?.photos[0]?.image}
                  activeState={item?.statusEvent}
                  allPeople={item?.female + item?.femaleFriend + item?.male + item?.maleFriend}
                  date={item?.date}
                  textCityName={item?.address}
                  estimeTime={item?.hour}
                  numberOfGirlsInvited={item?.female + item?.femaleFriend}
                  invitingPeople={item?.usersList?.filter(i => i?.status !== 'notAccepted')}
                />
              )}
            />
          ) : (
            <FlatList
              data={eventsJoiningData}
              style={{flex: 1, backgroundColor: 'transparent'}}
              renderItem={({item}) => (
                <JoiningEventsCard
                  activeState={item.activeState}
                  allPeople={item.allPeople}
                  date={item.date}
                  image={item.image}
                  textCityName={item.textCityName}
                  estimeTime={item.estimeTime}
                  numberOfGirlsInvited={item.numberOfGirlsInvited}
                  host={item.host}
                  joinedPeopleCount={item.joinedPeopleCount}
                  isAcceptedInvitation={item.isAcceptedInvitation}
                  handleOpenCancelAttendingModal={handleOpenCancelAttendingModal}
                  handleOpenAcceptInvitationModal={handleOpenAcceptInvitationModal}
                />
              )}
            />
          )}
        </View>
      </View>
      <ModalCancelAttending
        handleCancelAttending={handleCancelAttending}
        isVisible={isVisibleCancelAttendingModal}
        onClose={() => setIsVisibleCancelAttendingModal(false)}
        eventInfo={activeModalEvent}
      />
      <ModalAcceptInvitation
        handleRejectInvitation={handleRejectInvitation}
        handleAcceptInvitation={handleAcceptInvitation}
        isVisible={isVisibleAcceptInvitationModal}
        onClose={() => setIsVisibleAcceptInvitationModal(false)}
        eventInfo={activeModalEvent}
      />
    </>
  );
};

export default MyEvents;

import React, {FC, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

//import components
import useStyles from 'screens/App/MyEvents/styles.ts';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard.tsx';

//import images
import AddIcon from 'assets/images/icons/add.svg';
import FakeGirl1 from 'assets/images/app/fake-girl-1.png';
import FakeGirl2 from 'assets/images/app/fake-girl-2.png';
import JoiningEventsCard from 'components/Cards/JoiningEventsCard/JoiningEventsCard';
import {FlatList} from 'react-native';
import {blackColor, lightGray2Color, whiteColor} from 'constants/colors';
import ModalCancelAttending from './ModalCancelAttending';
import {showToast} from 'helpers/helpers';
import ModalAcceptInvitation from './ModalAcceptInvitation';

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

  const myEventsData = [
    {
      id: 0,
      activeState: true,
      allPeople: 10,
      date: '10.12.2024',
      textCityName: 'Amazonico Dubai',
      estimeTime: '2h',
      numberOfGirlsInvited: '2',
      invitingPeople: [
        {
          image: FakeGirl1,
          state: true,
        },
        {
          image: FakeGirl2,
          state: false,
        },
      ],
    },
  ];

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
        <View style={{flex: 1}}>
          {activeTab === MY_EVENTS ? (
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={myEventsData}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <MyEventsCard
                  activeState={item.activeState}
                  allPeople={item.allPeople}
                  date={item.date}
                  textCityName={item.textCityName}
                  estimeTime={item.estimeTime}
                  numberOfGirlsInvited={item.numberOfGirlsInvited}
                  invitingPeople={item.invitingPeople}
                />
              )}
            />
          ) : (
            <FlatList
              data={eventsJoiningData}
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

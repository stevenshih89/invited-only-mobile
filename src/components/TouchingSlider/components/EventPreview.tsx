import React, {Dispatch, FC, ReactElement, SetStateAction, useCallback, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
// import components
import {black60Color, grayScale700, lightGray20Color, transparent60Color, transparentGray90Color, whiteColor} from 'constants/colors.ts';
import User from 'assets/images/icons/user.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import IOIcon from 'assets/images/icons/io-logo.svg';
import {screenWidth} from 'constants/common.ts';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import moment from 'moment/moment';
import Button from 'components/Button/Button';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {showToast} from 'helpers/showToast';
import SuperJoin from 'components/Modal/ModalSuperJoin/SuperJoin';
import FastImage from 'react-native-fast-image';
import {useCounterSuperEvents} from 'src/store/counterSuperInvites';
import Loader from 'components/Modal/ModalLoader/Loader';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import {useDemoFlowStore} from '../../../store/demoFlowStore';
import HintCard from 'components/HintCard';
import {hostHintSteps} from 'constants/hints.ts';
import {demoFlowStackPath, demoIntroPath, demoIOPath} from 'constants/pathLocations.ts';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {useUser} from '../../../store/userStore';
import uuid from 'react-native-uuid';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';

const EventPreview: FC<{
  photos: any;
  isEditing: boolean | undefined;
  id: string;
  eventTypes: {};
  description: string;
  hour: string;
  address: string;
  meetingSpot: string;
  date: string;
  girls: number;
  male: number;
  placeName: string;
  name: string;
  setCurrentCreateStap: Dispatch<SetStateAction<number>>;
  setTabState: Dispatch<SetStateAction<string>>;
  setIsVisibleSaveModal: Dispatch<SetStateAction<boolean>>;
  handleCreateEvent: any;
  fromJoinEventsScreen: boolean;
  onInvite: () => void;
  superJoin: () => void;
  handleAutoSwipeRight: () => void;
  loaderVisible: boolean;
  isReview?: boolean;
}> = ({
  photos,
  date,
  girls,
  placeName,
  setCurrentCreateStap,
  setTabState,
  handleCreateEvent,
  name,
  isEditing,
  fromJoinEventsScreen,
  setIsVisibleSaveModal,
  onInvite,
  superJoin,
  handleAutoSwipeRight,
  loaderVisible,
  male,
  address,
  hour,
  id,
  isReview,
}): ReactElement => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const [active, setActive] = useState<number>(0);
  const styles = useStyles();
  const navigation = useAppNavigation();
  const [imagesUser, setImagesUser] = useState();
  const [nameUser, setNameUser] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAccountType, setUserAccountType] = useState('');
  const [visibleModalSuperJoin, setVisibleModalSuperJoin] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const route = useRoute();
  const {hintStep, setHintStep, setEvent, setIsVisibleSwipeGuide} = useDemoFlowStore();
  const isDemo = (route?.params as {isDemo?: boolean})?.isDemo;
  const numberPhotos = imagesUser?.length;
  const {user} = useUser();

  function calculateAge(birthDateString: string) {
    const parts = birthDateString.split('.');
    const birthDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const getUserPhotos = async () => {
    try {
      const user = auth().currentUser;
      const userInfoDoc = await firestore().collection(apiUserInfoCollection).doc(user?.uid).get();

      if (!userInfoDoc.exists) {
        return;
      }
      setUserAccountType(userInfoDoc.data()?.accountType);
      const dataName = userInfoDoc.data()?.name;
      const dataAge = userInfoDoc.data()?.date;
      setNameUser(dataName);
      const resultAge = calculateAge(dataAge);
      setUserAge(`${resultAge}`);
      const userImage = userInfoDoc.data()?.photos?.find((item: {id: number}) => item.id === 0);
      if (userImage) {
        setImagesUser(userImage);
      }
    } catch (error) {
      showToast('inviteMatch', 'An error occurred while retrieving user photos. Please try again', 'Error');
      logErrorToSentry(error);
      // console.log('errorGetUserPhotos', error);
    }
  };

  const getUsersList = async () => {
    try {
      const eventInfoDoc = await firestore().collection(apiEventsCollection).doc(id).get();
      if (!eventInfoDoc.exists) {
        return;
      }
      const usersListData = eventInfoDoc.data()?.usersList;
      setUsersList(usersListData);
    } catch (error) {
      showToast('inviteMatch', 'An error occurred while retrieving the user list. Please try again later.');
      logErrorToSentry(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserPhotos();
      if (isEditing) {
        getUsersList();
      }
      try {
        analytics().logScreenView({
          screen_name: 'event_creating_event_preview_screen',
        });
      } catch (e) {
        console.error(e);
      }
    }, []),
  );

  const handleNext = (): void => {
    if (active === numberPhotos - 1) {
      return setActive(0);
    } else {
      setActive(p => p + 1);
    }
  };

  const handleBack = (): void => {
    if (active === 0) {
      return setActive(numberPhotos - 1);
    }
    setActive(p => p - 1);
  };

  const {counterSuperInvites} = useCounterSuperEvents();

  const handleSuperJoin = () => {
    if (counterSuperInvites > 0) {
      setVisibleModalSuperJoin(true);
      setTimeout(() => {
        superJoin();
      }, 2000);
      setTimeout(() => {
        setVisibleModalSuperJoin(false);
      }, 4000);
    } else {
      showToast('inviteMatch', "You don't have Super Joins", 'Super Join');
    }
  };

  const handleSkipHints = () => {
    navigation.navigate(demoFlowStackPath, {screen: demoIOPath} as never);
    setHintStep(8);
    setIsVisibleSwipeGuide(true);
  };

  const customButton = () => {
    return (
      <TouchableOpacity
        disabled
        style={{
          height: 65,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 18,
          backgroundColor: lightGray20Color,
          marginTop: 25,
        }}>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi700,
            fontSize: RFValue(16, 812),
          }}>
          Join
        </Text>
      </TouchableOpacity>
    );
  };

  const handlePreviousStep = () => {
    setCurrentCreateStap(2);
    setTabState('eventDetails');
  };

  const handleNextStep = () => {
    const uid: string = uuid.v4() as string;
    const demoEvent = {
      name: name,
      date: date,
      hour: hour,
      address: address,
      male: male,
      placeName: placeName,
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
            'https://firebasestorage.googleapis.com/v0/b/invited-only-app.appspot.com/o/event_placeholder%2Fevent_preview.png?alt=media&token=0de5918d-5690-48fb-9b0a-018c73948805',
        },
      ],
      isCancelled: false,
      createdAt: moment().format('YYYY-MM-DD'),
    };
    setEvent(demoEvent);
    navigation.navigate(demoFlowStackPath, {screen: demoIOPath} as never);
  };

  if (userAccountType === 'host' && !fromJoinEventsScreen) {
    return (
      // @ts-ignore
      <SafeAreaView style={{flex: 1, zIndex: isDemo ? 111 : -1}}>
        <View style={styles.container}>
          {isDemo && <View style={styles.overlayContainer} />}
          <ScrollView
            style={{
              zIndex: isDemo ? 1111 : -1,
            }}>
            {isDemo && (
              <View style={styles.stepHintContainer}>
                <HintCard
                  currentStep={hintStep}
                  description={hostHintSteps[hintStep - 1]?.description}
                  onStepChange={setHintStep}
                  onPreviousAction={handlePreviousStep}
                  onNextAction={handleNextStep}
                  onSkipAction={handleSkipHints}
                  directionVertical={'bottom'}
                  totalSteps={hostHintSteps.length}
                  title={hostHintSteps[hintStep - 1]?.title}
                />
              </View>
            )}
            <MyEventsCard
              imageBg={photos}
              statusEvent={true}
              eventReviewed={true}
              allPeople={girls + male}
              date={date}
              placeName={placeName}
              accountConfirmed={true}
              findAcceptedGuest={[]}
              item={{
                usersList: usersList,
                photos,
                date,
                address,
                hour,
                male: male,
                female: girls,
                name: name,
                placeName,
              }}
              showGuestList={true}
              styleContainer={{marginTop: 0}}
              customButton={customButton()}
              isReview={isReview}
            />
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 28,
              width: '100%',
              paddingHorizontal: 16,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setCurrentCreateStap(2);
                  setTabState('eventDetails');
                }}>
                <Text style={{color: whiteColor, fontSize: RFValue(20, 812), fontFamily: Satoshi500}}>Back</Text>
              </TouchableOpacity>
            </View>
            <Button
              buttonStyle={styles.button}
              onPress={() => {
                isEditing ? setIsVisibleSaveModal(true) : handleCreateEvent();
              }}
              title={isEditing ? 'Save changes' : 'Create event'}
            />
          </View>
        </View>
        <Loader isVisible={loaderVisible} successfulPay={false} />
      </SafeAreaView>
    );
  }

  if (userAccountType === 'guest' || fromJoinEventsScreen) {
    return (
      <View style={[styles.container, {backgroundColor: transparentGray90Color, padding: 16, borderRadius: 16}]}>
        <FastImage
          source={{uri: photos?.[active]?.image ? photos?.[active]?.image : photos?.[active]}}
          style={styles.imageBackground}
          resizeMode="cover">
          <View style={styles.wrapperButtons}>
            <TouchableOpacity onPress={handleBack} style={styles.button} />
            <TouchableOpacity onPress={handleNext} style={styles.button} />
          </View>
        </FastImage>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{placeName}</Text>
          <View style={styles.rowContainer}>
            <View style={styles.row}>
              <User />
              <Text style={styles.subText}>{girls} x Guest invitation</Text>
            </View>
            <View style={[styles.row, styles.marginLeft]}>
              <Calendar />
              <Text style={styles.subText}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD.MM.YYYY')}</Text>
            </View>
          </View>
        </View>
        <View style={styles.centerContainer}>
          <TouchableOpacity onPress={handleSuperJoin} activeOpacity={0.7} style={[styles.iconButton, styles.marginRight]}>
            <FlashIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAutoSwipeRight} activeOpacity={0.7} style={[styles.iconButton, styles.marginLeft]}>
            <IOIcon />
          </TouchableOpacity>
        </View>
        <SuperJoin isVisibleMatch={visibleModalSuperJoin} nameEvent={name} imageEvent={photos ? photos[0]?.image : ''} />
      </View>
    );
  }
  return <></>;
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    overlayContainer: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1111,
      backgroundColor: black60Color,
    },
    stepHintContainer: {
      zIndex: 111,
      marginBottom: 20,
    },
    containerInfo: {
      // position: 'absolute',
      borderWidth: 1,
      borderColor: grayScale700,
      backgroundColor: transparentGray90Color,
      width: '100%',
      borderRadius: 15,
      padding: 10,
      zIndex: 10000,
      overflow: 'hidden',
    },
    imageBackground: {
      height: 150,
      overflow: 'hidden',
      borderRadius: 10,
    },
    imageStyle: {
      borderRadius: 10,
    },
    wrapperBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginHorizontal: 10,
    },
    bar: {
      flex: 1,
      height: 3,
      marginHorizontal: screenWidth / 130,
      borderRadius: 30,
    },
    wrapperButtons: {
      flexDirection: 'row',
      height: '100%',
      position: 'absolute',
      zIndex: 10000,
    },
    button: {
      width: '80%',
    },
    textContainer: {
      marginTop: 9,
    },
    text: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(15, 812),
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    subText: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(10, 812),
      marginLeft: 4,
    },
    marginLeft: {
      marginLeft: 12,
    },
    centerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    iconButton: {
      width: 56,
      height: 56,
      borderRadius: 50,
      backgroundColor: transparent60Color,
      justifyContent: 'center',
      alignItems: 'center',
    },
    marginRight: {
      marginRight: 12,
    },
  });
};

export default EventPreview;

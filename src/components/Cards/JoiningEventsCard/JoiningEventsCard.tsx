import React, {FC, useState, useEffect} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

//import components
import useStyles from 'components/Cards/JoiningEventsCard/styles.ts';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import CalendarBlank from 'assets/images/icons/CalendarBlank.svg';
import ProfileTwoUser from 'assets/images/icons/profile-2user.svg';
import Users from 'assets/images/icons/Users.svg';
import LoadingLoop from 'assets/images/icons/loading-loop.svg';
import Clock from 'assets/images/icons/clock-white.svg';
import {blackColor, lightGray2Color, lightGreenColor, whiteColor} from 'constants/colors.ts';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, eventInfoPath} from 'constants/pathLocations';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight} from 'constants/common';
import ModalEventRemindes from 'components/Modal/ModalEventRemindes/ModalEventRemindes.tsx';

interface JoiningEventsCard {
  estimeTime: string;
  activeState: boolean;
  host: {image: string; name: string};
  image: string;
  list: any;
  allPeople: number;
  textCityName: string;
  numberOfGirlsInvited: string;
  placeName: string;
  date: string;
  hour: string;
  joinedPeopleCount: number;
  isAcceptedInvitation: boolean;
  handleAcceptInvitation: any;
  handleGetEventsIJoining: any;
  handleOpenCancelAttendingModal: (eventInfo: {
    list: any;
    host: any;
    image: string;
    textCityName: string;
    date: string;
    numberOfGirlsInvited: string;
  }) => void;
  handleOpenAcceptInvitationModal: (eventInfo: {
    list: any;
    host: any;
    image: string;
    textCityName: string;
    date: string;
    numberOfGirlsInvited: string;
  }) => void;
}

const JoiningEventsCard: FC<JoiningEventsCard> = ({
  activeState,
  estimeTime,
  date,
  image,
  list,
  hour,
  host,
  numberOfGirlsInvited,
  allPeople,
  textCityName,
  placeName,
  joinedPeopleCount,
  isAcceptedInvitation,
  handleOpenCancelAttendingModal,
  handleOpenAcceptInvitationModal,
  handleAcceptInvitation,
  handleGetEventsIJoining,
}) => {
  const [eventStarting, setEventStarting] = useState<boolean>(false);
  const [eventData, setEventData] = useState({
    time: '',
    image: '',
    city: '',
    placeName: '',
    date: '',
    girlInvitatio: '',
  });
  const styles = useStyles();
  const navigation = useAppNavigation();

  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
  // const currentTime = `00:50`;

  console.log('currentTime', currentTime);
  const EventInReviewView = () => (
    <View style={styles.eventInReviewView}>
      <LoadingLoop />
      <Text style={styles.textEventInReview}>Event in review</Text>
      <View style={styles.rowEventInReview}>
        <Clock width={12} height={12} />
        <Text style={styles.textEstimeTime}>Estime time {estimeTime}</Text>
      </View>
    </View>
  );

  const calculateTimeDifference = (start: string, end: string) => {
    let startTime = start.split(':');
    let endTime = end.split(':');

    let startHour = parseInt(startTime[0], 10);
    let startMinute = parseInt(startTime[1], 10);
    let endHour = parseInt(endTime[0], 10);
    let endMinute = parseInt(endTime[1], 10);

    let startTotalMinutes = startHour * 60 + startMinute;
    let endTotalMinutes = endHour * 60 + endMinute;

    if (endTotalMinutes < startTotalMinutes) {
      endTotalMinutes += 24 * 60;
    }

    let differenceInMinutes = endTotalMinutes - startTotalMinutes;

    let hours = Math.floor(differenceInMinutes / 60);
    let minutes = differenceInMinutes % 60;

    return hours;
    // return hours + ':' + (minutes < 10 ? '0' : '') + minutes;
  };

  useEffect(() => {
    if (
      (calculateTimeDifference(currentTime, hour) === 0 && !isAcceptedInvitation) ||
      (calculateTimeDifference(currentTime, hour) >= 2 && !isAcceptedInvitation) ||
      (calculateTimeDifference(currentTime, hour) >= 12 && !isAcceptedInvitation) ||
      (calculateTimeDifference(currentTime, hour) >= 24 && !isAcceptedInvitation)
    ) {
      setEventData({
        time: calculateTimeDifference(currentTime, hour).toString(),
        image: image,
        city: textCityName,
        date: moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD.MM.YYYY'),
        girlInvitatio: numberOfGirlsInvited,
        placeName: placeName,
      });
      setEventStarting(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground borderRadius={14} imageStyle={{borderRadius: 14, overflow: 'hidden'}} source={{uri: image}} style={styles.imageBackground}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={styles.linearGradientCard}>
          {activeState ? (
            <TouchableOpacity
              style={styles.header}
              onPress={() =>
                navigation.navigate(commonStackPath, {
                  screen: eventInfoPath,
                  params: {list: list, isAcceptedInvitation: isAcceptedInvitation},
                } as never)
              }>
              {host?.image && <Image style={{borderRadius: 100, width: 40, height: 40}} source={{uri: host.image}} />}
              <View style={styles.wrapperTextStartInviting}>
                <Text style={styles.textStartInviting}>{host?.name}</Text>
                <ArrowRight style={styles.arrowRightIcon} width={14} height={14} />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.wrapperEventInReviewView}>
              <EventInReviewView />
            </View>
          )}
          <View>
            <View style={styles.footer}>
              <View style={styles.wrapperFooterInfo}>
                <View style={[styles.rowActiveStatus, {backgroundColor: activeState ? lightGreenColor : lightGray2Color}]}>
                  <Text style={styles.textFooter}>{activeState ? 'Active' : 'Pending'}</Text>
                </View>
                <View style={styles.rowCountPeople}>
                  <Users />
                  <Text style={styles.textFooter}>
                    {joinedPeopleCount}/{allPeople}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {!isAcceptedInvitation ? (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      handleOpenCancelAttendingModal({
                        image,
                        textCityName,
                        date,
                        numberOfGirlsInvited,
                        host,
                        list,
                      })
                    }
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      paddingVertical: screenHeight / 150,
                      marginRight: 6,
                      borderColor: whiteColor,
                      borderStyle: 'solid',
                      borderWidth: 1,
                    }}>
                    <Text style={{fontFamily: Satoshi400, fontSize: RFValue(16, 812), color: whiteColor}}>Cancel invitation</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      handleOpenAcceptInvitationModal({
                        image,
                        textCityName,
                        date,
                        numberOfGirlsInvited,
                        host,
                        list,
                      })
                    }
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      paddingVertical: screenHeight / 150,
                      marginLeft: 6,
                      backgroundColor: whiteColor,
                      borderWidth: 1,
                      borderColor: whiteColor,
                    }}>
                    <Text style={{fontFamily: Satoshi400, fontSize: RFValue(16, 812), color: blackColor}}>Accept invitation</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    handleOpenCancelAttendingModal({
                      image,
                      textCityName,
                      date,
                      numberOfGirlsInvited,
                      host,
                      list,
                    })
                  }
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    paddingVertical: screenHeight / 150,
                    marginRight: 6,
                    borderColor: whiteColor,
                    borderStyle: 'solid',
                    borderWidth: 1,
                  }}>
                  <Text style={{fontFamily: Satoshi400, fontSize: RFValue(16, 812), color: whiteColor}}>Cancel attending</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.wrapperTextUnderCard}>
        <Text style={styles.textCityName}>{textCityName}</Text>
        <View style={styles.rowTextUnderFooter}>
          <ProfileTwoUser />
          <Text style={styles.textUnderFooter}>{numberOfGirlsInvited} x Girl invitation</Text>
        </View>
        <View style={styles.rowTextUnderFooter}>
          <CalendarBlank />
          <Text style={styles.textUnderFooter}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD.MM.YYYY')}</Text>
        </View>
      </View>
      <ModalEventRemindes
        eventStarting={eventStarting}
        setEventStarting={setEventStarting}
        time={eventData.time}
        image={eventData.image}
        placeName={eventData.placeName}
        city={eventData.city}
        date={eventData.date}
        girlInvitation={eventData.girlInvitatio}
        handleAcceptInvitation={handleAcceptInvitation}
        handleGetEventsIJoining={handleGetEventsIJoining}
      />
    </View>
  );
};

export default JoiningEventsCard;

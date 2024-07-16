import React, {FC, useEffect, useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';

//import components
import useStyles from 'components/Cards/MyEventsCard/styles.ts';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import IconPending from 'assets/images/icons/pending-clock.svg';
import IconAccepted from 'assets/images/icons/tick-circle.svg';
import IconEdit from 'assets/images/icons/edit.svg';
import IconEditBlack from 'assets/images/icons/edit-black.svg';
import IconMore from 'assets/images/icons/more.svg';
import CalendarBlank from 'assets/images/icons/CalendarBlank.svg';
import ProfileTwoUser from 'assets/images/icons/profile-2user.svg';
import Users from 'assets/images/icons/Users.svg';
import LoadingLoop from 'assets/images/icons/loading-loop.svg';
import Clock from 'assets/images/icons/clock-white.svg';
import {lightGray2Color, lightGreenColor} from 'constants/colors.ts';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, eventActiveInfoPath, eventEditingPath} from 'constants/pathLocations';
import {screenWidth} from 'constants/common.ts';
import ModalEventRemindes from 'components/Modal/ModalEventRemindes/ModalEventRemindes';

interface MyEventsCard {
  estimeTime?: string;
  activeState: boolean;
  invitingPeople?: any[];
  list?: any;
  allPeople?: number;
  textCityName?: string;
  numberOfGirlsInvited?: string;
  date?: string;
  imageBg?: string;
  placeName?: string
  isAcceptedInvitation: boolean;
}

const MyEventsCard: FC<MyEventsCard> = props => {
  const {list, placeName, imageBg, isAcceptedInvitation, activeState, estimeTime, date, invitingPeople, numberOfGirlsInvited, allPeople, textCityName} = props;
  const styles = useStyles();

  const [eventStarting, setEventStarting] = useState<boolean>(false);
  const [eventDate, setEventDate] = useState<string>('');
  

  const navigation = useAppNavigation();

  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;

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
      (calculateTimeDifference(currentTime, estimeTime) === 0) ||
      (calculateTimeDifference(currentTime, estimeTime) >= 2) ||
      (calculateTimeDifference(currentTime, estimeTime) >= 12) ||
      (calculateTimeDifference(currentTime, estimeTime) >= 24)
    ) {
      setEventDate(calculateTimeDifference(currentTime, estimeTime).toString());
      setEventStarting(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground borderRadius={14} source={{uri: imageBg}} style={styles.imageBackground}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={styles.linearGradientCard}>
          {activeState ? (
            <TouchableOpacity
              style={styles.header}
              onPress={() => navigation.navigate(commonStackPath, {screen: eventActiveInfoPath, params: {list: list}} as never)}>
              <View style={styles.userWrapper}>
                {invitingPeople?.map((i: any | boolean, index: number) => {
                  const indexRight: number = 18 * (index + 1);
                  if (index >= 3) return;
                  return (
                    <View key={index} style={[styles.userItemWrapper, {position: 'relative', right: indexRight}]}>
                      <Image style={styles.imageFakeGirl} source={{uri: i?.userPhoto}} />
                      {i?.status === 'accepted' ? (
                        <IconAccepted style={styles.iconStatus} width={21} height={21} />
                      ) : (
                        <IconPending style={styles.iconStatus} width={21} height={21} />
                      )}
                    </View>
                  );
                })}
              </View>
              <View style={styles.wrapperTextStartInviting}>
                <Text style={styles.textStartInviting}>{allPeople === invitingPeople?.length ? 'Guest list is full' : 'Start inviting'}</Text>
                <ArrowRight style={styles.arrowRightIcon} width={14} height={14} />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.wrapperEventInReviewView}>
              <EventInReviewView />
            </View>
          )}
          <View style={styles.footer}>
            <View style={styles.wrapperFooterInfo}>
              <View style={[styles.rowActiveStatus, {backgroundColor: activeState ? lightGreenColor : lightGray2Color}]}>
                <Text style={styles.textFooter}>{activeState ? 'Active' : 'Pending'}</Text>
              </View>
              <View style={styles.rowCountPeople}>
                <Users />
                <Text style={styles.textFooter}>
                  {invitingPeople?.length}/{allPeople}
                </Text>
              </View>
            </View>
            <View style={styles.wrapperFooterButtons}>
              <TouchableOpacity
                onPress={() => navigation.navigate(commonStackPath, {screen: eventEditingPath, params: {isEditingItems: list, isEditing: true}})}
                style={[styles.buttonEdit, activeState && {marginRight: screenWidth / 40}]}>
                <IconEditBlack width={16} height={16} />
              </TouchableOpacity>
              {/*{activeState && (*/}
              {/*  <TouchableOpacity style={styles.buttonMore}>*/}
              {/*    <IconMore />*/}
              {/*  </TouchableOpacity>*/}
              {/*)}*/}
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
        activeState={activeState}
        setEventStarting={setEventStarting}
        time={estimeTime}
        image={imageBg}
        placeName={placeName}
        joinedPeopleCount={invitingPeople?.length}
        date={eventDate}
        girlInvitation={numberOfGirlsInvited}
        // handleAcceptInvitation={handleAcceptInvitation}
        // handleGetEventsIJoining={handleGetEventsIJoining}
        allPeople={allPeople}
      />
    </View>
  );
};

export default MyEventsCard;

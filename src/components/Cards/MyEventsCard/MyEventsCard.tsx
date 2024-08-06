import React, {FC, useEffect, useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';

//import components
import useStyles from 'components/Cards/MyEventsCard/styles.ts';
import ClockWhiteFill from 'assets/images/icons/clock-white-fill.svg';
import CheckCircle from 'assets/images/icons/check-circle.svg';
import CalendarBlank from 'assets/images/icons/CalendarBlank.svg';
import ProfileTwoUser from 'assets/images/icons/profile-2user.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import Clock from 'assets/images/icons/clock-white.svg';
import UsersIcon from 'assets/images/icons/Users.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import ModalEventRemindes from 'components/Modal/ModalEventRemindes/ModalEventRemindes';
import {commonStackPath, eventActiveInfoPath} from 'constants/pathLocations';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {errorColor, lightGray10Color, lightGreenColor, transparent60Color, whiteColor} from 'constants/colors';
import FastImage from 'react-native-fast-image';

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
  placeName?: string;
  accountConfirmed: boolean;
}

const MyEventsCard: FC<MyEventsCard> = props => {
  const {
    list,
    accountConfirmed,
    placeName,
    imageBg,
    activeState,
    estimeTime,
    date,
    invitingPeople,
    numberOfGirlsInvited,
    allPeople,
    textCityName,
  } = props;

  const styles = useStyles();

  const [eventStarting, setEventStarting] = useState<boolean>(true);
  const [eventDate, setEventDate] = useState<string>('');
  const [mainImageEvent, setMainImageEvent] = useState('');

  useEffect(() => {
    const filterImage = imageBg.filter(item => item.id < 1);
    setMainImageEvent(filterImage[0].image);
  }, [imageBg]);

  const navigation = useAppNavigation();

  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;

  const EventInReviewView = () => (
    <View style={styles.eventInReviewView}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}}>
        <Clock width={24} height={24} style={{marginRight: 8}} />
        <Text style={styles.textEventInReview}>Event in review</Text>
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
      // calculateTimeDifference(currentTime, estimeTime) === 0 ||
      calculateTimeDifference(currentTime, estimeTime) >= 2 ||
      calculateTimeDifference(currentTime, estimeTime) >= 12 ||
      calculateTimeDifference(currentTime, estimeTime) >= 24
    ) {
      setEventDate(calculateTimeDifference(currentTime, estimeTime).toString());
      setEventStarting(true);
    }
  }, []);

  const approvedPeople = invitingPeople?.filter(i => i?.status === 'accepted');

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          console.log('some');

          navigation.navigate(commonStackPath, {screen: eventActiveInfoPath, params: {list: list}} as never);
        }}
        style={styles.container}>
        <FastImage
          style={styles.imageBackground}
          source={{
            uri: mainImageEvent,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.linearGradientCard}>
            {activeState ? (
              <View
                style={{
                  backgroundColor: approvedPeople?.length === allPeople ? errorColor : lightGray10Color,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 6,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                }}>
                <View style={styles.userWrapper}>
                  {invitingPeople?.map((i: any | boolean, index: number) => {
                    const indexRight: number = 10 * (index + 1);
                    if (index >= 3) {
                      return;
                    }
                    return (
                      <View key={index} style={[styles.userItemWrapper, {position: 'relative', right: indexRight}]}>
                        <Image style={styles.imageFakeGirl} source={{uri: i?.userPhoto}} />
                        {i?.status === 'accepted' ? (
                          <CheckCircle style={styles.iconStatus} width={18} height={18} />
                        ) : (
                          <ClockWhiteFill style={styles.iconStatus} width={18} height={18} />
                        )}
                      </View>
                    );
                  })}
                  <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: -16}}>
                    {approvedPeople?.length === allPeople ? (
                      <Text style={{color: whiteColor}}>
                        {`Event is full: ${approvedPeople?.length}/${allPeople} guests invited ${approvedPeople?.length}/${allPeople}`}
                      </Text>
                    ) : (
                      <>
                        <UsersIcon width={16} height={16} />
                        <Text style={{color: whiteColor}}>
                          {approvedPeople?.length}/{allPeople}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
                <View style={styles.wrapperTextStartInviting}>
                  <View style={{backgroundColor: lightGreenColor, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 5}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(11, 812)}}>Active</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
                <EventInReviewView />
              </View>
            )}
            <View style={{marginTop: 'auto'}}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                <Text style={{fontFamily: Satoshi700, fontSize: RFValue(19, 812), color: whiteColor, marginRight: 8}}>{placeName}</Text>
                {accountConfirmed && <CheckStarIcon />}
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: transparent60Color,
                    borderRadius: 50,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 2,
                  }}>
                  <ProfileTwoUser />
                  <Text style={styles.textUnderFooter}>{numberOfGirlsInvited} x Girl invitation</Text>
                </View>
                <View
                  style={{
                    backgroundColor: transparent60Color,
                    borderRadius: 50,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CalendarBlank />
                  <Text style={styles.textUnderFooter}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD MMMM YYYY')}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </FastImage>
        {/* <ImageBackground borderRadius={14} source={{uri: mainImageEvent}} style={styles.imageBackground}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.linearGradientCard}>
          {activeState ? (
            <View
              style={{
                backgroundColor: approvedPeople?.length === allPeople ? errorColor : lightGray10Color,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 10,
              }}>
              <View style={styles.userWrapper}>
                {invitingPeople?.map((i: any | boolean, index: number) => {
                  const indexRight: number = 10 * (index + 1);
                  if (index >= 3) {
                    return;
                  }
                  return (
                    <View key={index} style={[styles.userItemWrapper, {position: 'relative', right: indexRight}]}>
                      <Image style={styles.imageFakeGirl} source={{uri: i?.userPhoto}} />
                      {i?.status === 'accepted' ? (
                        <CheckCircle style={styles.iconStatus} width={18} height={18} />
                      ) : (
                        <ClockWhiteFill style={styles.iconStatus} width={18} height={18} />
                      )}
                    </View>
                  );
                })}
                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: -16}}>
                  {approvedPeople?.length === allPeople ? (
                    <Text style={{color: whiteColor}}>
                      {`Event is full: ${approvedPeople?.length}/${allPeople} guests invited ${approvedPeople?.length}/${allPeople}`}
                    </Text>
                  ) : (
                    <>
                      <UsersIcon width={16} height={16} />
                      <Text style={{color: whiteColor}}>
                        {approvedPeople?.length}/{allPeople}
                      </Text>
                    </>
                  )}
                </View>
              </View>
              <View style={styles.wrapperTextStartInviting}>
                <View style={{backgroundColor: lightGreenColor, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 5}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(11, 812)}}>Active</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
              <EventInReviewView />
            </View>
          )}
          <View style={{marginTop: 'auto'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
              <Text style={{fontFamily: Satoshi700, fontSize: RFValue(19, 812), color: whiteColor, marginRight: 8}}>{placeName}</Text>
              {accountConfirmed && <CheckStarIcon />}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: transparent60Color,
                  borderRadius: 50,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 2,
                }}>
                <ProfileTwoUser />
                <Text style={styles.textUnderFooter}>{numberOfGirlsInvited} x Girl invitation</Text>
              </View>
              <View
                style={{
                  backgroundColor: transparent60Color,
                  borderRadius: 50,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CalendarBlank />
                <Text style={styles.textUnderFooter}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD MMMM YYYY')}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground> */}
      </TouchableOpacity>
      {/* <ModalEventRemindes
      eventStarting={eventStarting}
      activeState={activeState}
      setEventStarting={setEventStarting}
      time={estimeTime}
      image={mainImageEvent}
      placeName={placeName}
      joinedPeopleCount={invitingPeople?.length}
      date={eventDate}
      girlInvitation={numberOfGirlsInvited}
      // handleAcceptInvitation={handleAcceptInvitation}
      // handleGetEventsIJoining={handleGetEventsIJoining}
      allPeople={allPeople}
  /> */}
    </>
  );
};

export default MyEventsCard;

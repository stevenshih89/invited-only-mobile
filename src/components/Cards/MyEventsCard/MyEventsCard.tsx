import React, {FC, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//import components
import useStyles from 'components/Cards/MyEventsCard/styles.ts';
import Clock from 'assets/images/icons/clock-white.svg';
import Bing from 'assets/images/icons/notification-bing.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, eventActiveInfoPath} from 'constants/pathLocations';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {black4Color, blackColor, grayScale600, lightGray18Color, lightGray20Color, lightGreenColor, whiteColor} from 'constants/colors';
import FastImage from 'react-native-fast-image';
import FullEvent from 'components/FullEvent';
import {ACCEPTED_STATUS, LIKED, NOT_ACCEPTED_STATUS, screenHeight, screenWidth} from 'constants/common';
import {convertToPmAmFormat} from 'helpers/convertToPmAmFormat';
import {formateDateAbbreviated} from 'helpers/formateDateAbbreviated';
import LineImage from 'assets/images/app/Line.png';
import moment from 'moment';
import {Event} from '../../../types/event';
import firestore from '@react-native-firebase/firestore';
import {calculateAge} from 'helpers/calculateAge';
import { eventTypes } from 'src/mocks/eventTypes';

interface MyEventsCard {
  statusEvent: boolean;
  eventReviewed: boolean;
  allPeople?: number;
  date?: string;
  imageBg?: string;
  accountConfirmed: boolean;
  findAcceptedGuest?: any[];
  item: any;
  showGuestList: boolean;
  customButton?: React.ReactNode;
  styleContainer?: any;
  showInfoTop?: boolean;
  showDotLine?: boolean;
  showEventType?: boolean;
}

const MyEventsCard: FC<MyEventsCard> = props => {
  const {
    styleContainer,
    imageBg,
    statusEvent,
    eventReviewed,
    allPeople,
    findAcceptedGuest,
    item,
    showGuestList,
    customButton,
    showInfoTop = false,
    showDotLine = true,
    showEventType = false
  } = props;

  const styles = useStyles();
  const [userHostInfo, setUserHostInfo] = useState();

  const [mainImageEvent, setMainImageEvent] = useState('');

  const getUserHostInfo = async () => {
    const getDoc = await firestore().collection('userInfo').doc(item?.uid).get();
    setUserHostInfo(getDoc.data());
  };

  useEffect(() => {
    getUserHostInfo();
  }, [item]);

  useEffect(() => {
    const filterImage = imageBg?.filter(item => item.id < 1);

    const cover = filterImage[0]?.image ?? '';

    setMainImageEvent(cover);
  }, [imageBg]);

  const eventIsFull = item?.usersList?.filter(i => i?.status === ACCEPTED_STATUS)?.length === allPeople;

  const EventInReviewView = () => (
    <View style={styles.eventInReviewView}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Clock width={28} height={28} style={{marginRight: 8}} />
        <Text style={styles.textEventInReview}>Event in review</Text>
      </View>
    </View>
  );

  const EventRejectedView = () => (
    <View style={styles.eventInReviewView}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: screenHeight / 15}}>
        <Bing width={28} height={28} style={{marginRight: 8}} />
        <Text style={styles.textEventInReview}>Event rejected by Admin</Text>
      </View>
    </View>
  );

  const getUsersListAccepted = () => {
    const filter = item?.usersList.filter((user: Event.User) => user.status === ACCEPTED_STATUS);
    return filter.length;
  };

  const getEventStatus = () => {
    if (item?.isCancelled) {
      return {
        plateTitle: 'Cancelled',
        plateBackgroundColor: grayScale600,
      };
    }

    if (item?.date && item?.hour) {
      const adjustedDate = moment(`${item.date}, ${item.hour}`, 'DD.MM.YYYY, HH:mm').add(12, 'hours');
      if (adjustedDate.isBefore(moment())) {
        return {
          plateTitle: 'Expired',
          plateBackgroundColor: grayScale600,
        };
      }
    }

    if (eventIsFull) {
      return {plateTitle: 'Full', plateBackgroundColor: lightGreenColor};
    }

    if (item?.statusEvent) {
      return {
        plateTitle: 'Active',
        plateBackgroundColor: lightGreenColor,
      };
    }
    return null;
  };

  return (
    <>
      <View style={[styles.container, styleContainer]}>
        <FastImage
          style={styles.imageBackground}
          source={{
            uri: mainImageEvent,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          {showInfoTop && (
            <View style={{flexDirection: 'row', position: 'absolute', top: 16, left: 16}}>
              <View style={{alignSelf: 'flex-start'}}>
                <FastImage style={{width: 50, height: 50, borderRadius: 50}} source={{uri: userHostInfo?.photos?.[0]?.image || ''}} />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    right: 0,
                    width: 12,
                    height: 12,
                    borderRadius: 12,
                    borderWidth: 1.25,
                    borderColor: blackColor,
                    backgroundColor: lightGreenColor,
                  }}
                />
              </View>
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: blackColor,
                      borderRadius: 5,
                      paddingHorizontal: 12,
                      paddingVertical: 2,
                      alignSelf: 'flex-start',
                      borderWidth: 1,
                      borderColor: whiteColor,
                    }}>
                    {userHostInfo?.accountType === 'guest' && (
                      <Text style={{color: whiteColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                        Guest
                      </Text>
                    )}
                    {userHostInfo?.accountType === 'host' && (
                      <Text style={{color: whiteColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                        Host
                      </Text>
                    )}
                  </View>
                  {(userHostInfo?.accountPremium || userHostInfo?.accountType === 'guest') && (
                    <LinearGradient
                      colors={['#977B4A', '#E5D291', '#A28453']}
                      style={{
                        marginLeft: 6,
                        alignSelf: 'flex-start',
                        borderRadius: 4,
                        paddingHorizontal: 12,
                        paddingVertical: 2,
                        backgroundColor: blackColor,
                      }}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}>
                      {
                        <Text
                          style={{
                            color: blackColor,
                            fontSize: RFValue(10, 812),
                            fontFamily: Satoshi700,
                          }}>
                          Premium
                        </Text>
                      }
                    </LinearGradient>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi700,
                      fontSize: RFValue(16, 812),
                      marginTop: 4,
                    }}>
                    {userHostInfo?.name}
                    {userHostInfo?.showAge ? <Text>,</Text> : null}
                  </Text>
                  {userHostInfo?.showAge && (
                    <Text
                      style={{
                        color: whiteColor,
                        fontFamily: Satoshi700,
                        fontSize: RFValue(13, 812),
                        marginTop: 5,
                      }}>
                      {' '}
                      {calculateAge(userHostInfo?.date)}
                    </Text>
                  )}
                  <View style={{marginLeft: 8}}>{userHostInfo?.accountConfirmed && <CheckStarWhite width={14} height={14} />}</View>
                </View>
              </View>
            </View>
          )}
          {findAcceptedGuest?.length >= allPeople && (
            <FullEvent
              activeEvent={item}
              text={`Event is full: ${findAcceptedGuest?.length}/${allPeople} guests invited`}
              totalQuantityGuests={allPeople}
              acceptQuantityGuest={findAcceptedGuest?.length}
              rightComponent={
                <TouchableOpacity style={{backgroundColor: lightGreenColor, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 5}}>
                  <Text style={{fontSize: RFValue(12, 812), color: whiteColor, fontFamily: Satoshi500}}>Active</Text>
                </TouchableOpacity>
              }
              styleContainer={{position: 'absolute', top: 14}}
            />
          )}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.linearGradientCard}>
            {!eventReviewed && (
              <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
                <EventInReviewView />
              </View>
            )}
            {eventReviewed && !statusEvent && (
              <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
                <EventRejectedView />
              </View>
            )}
            {getEventStatus() && (
              <View
                style={{
                  backgroundColor: getEventStatus()?.plateBackgroundColor,
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 5,
                  alignSelf: 'flex-start',
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                }}>
                <Text style={{fontSize: RFValue(12, 812), color: whiteColor, fontFamily: Satoshi500}}>{getEventStatus()?.plateTitle}</Text>
              </View>
            )}
          </LinearGradient>
        </FastImage>
        <View style={{paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 14, alignItems: 'flex-end'}}>
          <View style={{}}>
            <View style={{}}>
              <Text
                style={{
                  color: lightGray18Color,
                  fontSize: RFValue(16, 812),
                  fontFamily: Satoshi400,
                }}>
                Name
              </Text>
              <Text
                style={{
                  color: black4Color,
                  fontSize: RFValue(21, 812),
                  fontFamily: Satoshi700,
                  marginTop: 5,
                }}>
                {item?.name}
              </Text>
            </View>
            <View style={{marginVertical: 28}}>
              <Text
                style={{
                  color: lightGray18Color,
                  fontSize: RFValue(16, 812),
                  fontFamily: Satoshi400,
                }}>
                Date
              </Text>
              <Text
                style={{
                  color: black4Color,
                  fontSize: RFValue(21, 812),
                  fontFamily: Satoshi700,
                  marginTop: 5,
                }}>
                {formateDateAbbreviated(item?.date)}
              </Text>
            </View>
            <View>
                <Text
                  style={{
                    color: lightGray18Color,
                    fontSize: RFValue(16, 812),
                    fontFamily: Satoshi400,
                  }}>
                  Location
                </Text>
                <Text
                  style={{
                    color: black4Color,
                    fontSize: RFValue(21, 812),
                    fontFamily: Satoshi500,
                    marginTop: 5,
                  }}>
                  {item?.placeName}
                </Text>
              </View>
          </View>
          <View style={{}}>
          {showEventType && (
            <View style={{}}>
            <Text
              style={{
                color: lightGray18Color,
                fontSize: RFValue(16, 812),
                fontFamily: Satoshi400,
              }}>
              Event type
            </Text>
            <Text
              style={{
                color: black4Color,
                fontSize: RFValue(21, 812),
                fontFamily: Satoshi700,
                marginTop: 5,
              }}>
              {eventTypes[item?.activeType].label}
            </Text>
          </View>
          )}
            {showGuestList && (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: blackColor,
                  borderRadius: 10,
                  flexDirection: 'row',
                  paddingHorizontal: 16,
                  paddingVertical: 7,
                  alignItems: 'center',
                }}>
                <FastImage
                  style={{width: 40, height: 40, borderRadius: 40}}
                  source={{uri: item?.photos[0]?.image ? item?.photos[0]?.image : ''}}
                />
                <View style={{marginLeft: 10, alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(26, 812),
                      color: blackColor,
                      fontFamily: Satoshi700,
                    }}>
                    {getUsersListAccepted()}/{item?.male + item?.female}
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(12, 812),
                      color: blackColor,
                      fontFamily: Satoshi500,
                    }}>
                    Guest List
                  </Text>
                </View>
              </View>
            )}
            <View style={{alignSelf: showGuestList? 'flex-end': 'flex-start'}}>
            <View style={{marginVertical: 28}}>
                <Text
                  style={{
                    color: lightGray18Color,
                    fontSize: RFValue(16, 812),
                    fontFamily: Satoshi400,
                  }}>
                  Time
                </Text>
                <Text
                  style={{
                    color: black4Color,
                    fontSize: RFValue(21, 812),
                    fontFamily: Satoshi700,
                    marginTop: 5,
                  }}>
                  {convertToPmAmFormat(item?.hour)}
                </Text>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    color: lightGray18Color,
                    fontSize: RFValue(16, 812),
                    fontFamily: Satoshi400,
                  }}>
                  Invitations
                </Text>
                <Text
                  style={{
                    color: black4Color,
                    fontSize: RFValue(21, 812),
                    fontFamily: Satoshi500,
                    marginTop: 5,
                  }}>
                  {item?.male + item?.female}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {showDotLine && <View style={{width: '100%', alignItems: 'center', paddingHorizontal: 20, marginTop: 9}}>
            <Image style={{width: screenWidth - 48 - 48}} source={LineImage} />
          </View>}
          <View style={{marginBottom: 20, paddingHorizontal: 24}}>{customButton ? customButton : null}</View>
      </View>
    </>
  );
};

export default MyEventsCard;

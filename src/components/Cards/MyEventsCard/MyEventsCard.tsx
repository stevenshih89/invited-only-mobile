import React, {FC, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//import components
import useStyles from 'components/Cards/MyEventsCard/styles.ts';
import Clock from 'assets/images/icons/clock-white.svg';
import Bing from 'assets/images/icons/notification-bing.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, eventActiveInfoPath} from 'constants/pathLocations';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {black4Color, blackColor, lightGray18Color, lightGray20Color, lightGreenColor, whiteColor} from 'constants/colors';
import FastImage from 'react-native-fast-image';
import FullEvent from 'components/FullEvent';
import {screenHeight, screenWidth} from 'constants/common';
import {convertToPmAmFormat} from 'helpers/convertToPmAmFormat';
import {formateDateAbbreviated} from 'helpers/formateDateAbbreviated';
import LineImage from 'assets/images/app/Line.png';

interface MyEventsCard {
  statusEvent: boolean;
  eventReviewed: boolean;
  allPeople?: number;
  date?: string;
  imageBg?: string;
  placeName?: string;
  accountConfirmed: boolean;
  findAcceptedGuest?: any[];
  item: any;
  showGuestList: boolean;
  customButton?: React.ReactNode;
  styleContainer?: any;
}

const MyEventsCard: FC<MyEventsCard> = props => {
  const {placeName, styleContainer, imageBg, statusEvent, eventReviewed, allPeople, findAcceptedGuest, item, showGuestList, customButton} = props;

  const styles = useStyles();

  const [mainImageEvent, setMainImageEvent] = useState('');

  useEffect(() => {
    const filterImage = imageBg.filter(item => item.id < 1);

    const cover = filterImage[0]?.image ?? '';

    setMainImageEvent(cover);
  }, [imageBg]);

  const navigation = useAppNavigation();

  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;

  const EventInReviewView = () => (
    <View style={styles.eventInReviewView}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}}>
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
    const filter = item?.usersList.filter(item => item.status === 'invite_match');
    return filter.length;
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
            <View
              style={{
                backgroundColor: lightGreenColor,
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 5,
                alignSelf: 'flex-start',
                position: 'absolute',
                bottom: 16,
                left: 16,
              }}>
              <Text style={{fontSize: RFValue(12, 812), color: whiteColor, fontFamily: Satoshi500}}>Active</Text>
            </View>
          </LinearGradient>
        </FastImage>
        <View style={{paddingHorizontal: 18}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 28}}>
            <View style={{alignSelf: 'flex-end'}}>
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
                {placeName}
              </Text>
            </View>
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
                    {getUsersListAccepted()}/{item?.usersList.length}
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
          </View>
          <View style={{flexDirection: 'row', marginTop: 28, justifyContent: 'space-between'}}>
            <View style={{}}>
              <View style={{marginBottom: 28}}>
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
                  {item?.address}
                </Text>
              </View>
            </View>
            <View style={{}}>
              <View style={{marginBottom: 28}}>
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
              <View>
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
                  {item?.usersList.length}
                </Text>
              </View>
            </View>
          </View>
          <View style={{width: '100%', alignItems: 'center', marginTop: 22, paddingHorizontal: 23}}>
            <Image style={{width: screenWidth - 48 - 48}} source={LineImage} />
          </View>
          <View style={{marginBottom: 23}}>
          {customButton ? customButton : null}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate(commonStackPath, {screen: eventActiveInfoPath, params: {list: list}} as never)}
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
                  color: blackColor,
                  fontFamily: Satoshi700,
                  fontSize: RFValue(16, 812),
                }}>
                Manage Event
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </>
  );
};

export default MyEventsCard;

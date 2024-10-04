import React, {FC, useCallback, useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';

//import components
import useStyles from 'components/Modal/ModalEventRemindes/styles.ts';
import Button from 'components/Button/Button.tsx';

//import icons
import CalendarIcon from 'assets/images/icons/calendar.svg';
import UserIcon from 'assets/images/icons/user.svg';
import UsersIcon from 'assets/images/icons/Users.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import moment from 'moment/moment';
import {blackColor, lightGreenColor, whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import FullEvent from 'components/FullEvent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {commonStackPath, eventEditingPath} from 'constants/pathLocations';
import {ACCEPTED_STATUS} from 'constants/common';
import {SafeAreaProvider} from 'react-native-safe-area-context';

interface ModalFullEvent {
  isVisible: boolean;
  idEvent: string;
  setIsVisibleModalFullEvent: any;
  actualActiveEventDataProps?: any;
  totalQuantityGuestsProps?: any;
  acceptQuantityGuestProps?: any;
  totalRequestsGuestsProps?: any;
}

const ModalFullEvent: FC<ModalFullEvent> = ({
  idEvent,
  isVisible,
  setIsVisibleModalFullEvent,
  actualActiveEventDataProps,
  totalQuantityGuestsProps,
  acceptQuantityGuestProps,
  totalRequestsGuestsProps,
}) => {
  const [actualActiveEventData, setActualActiveEventData] = useState([]);
  const [totalQuantityGuests, setTotalQuantityGuests] = useState<number>(0);
  const [acceptQuantityGuest, setAcceptQuantityGuest] = useState<number>(0);
  const [totalRequestsGuests, setTotalRequestsGuests] = useState<number>(0);

  const styles = useStyles();

  const navigation = useNavigation();

  const getActiveEventData = async () => {
    const getEventData = await firestore().collection('Events').doc(idEvent).get();
    if (!getEventData.exists) {
      return;
    }
    const data = getEventData.data();
    setActualActiveEventData(data);
    setTotalQuantityGuests(data?.male + data?.female);
    setAcceptQuantityGuest(data?.usersList.filter(item => item.status === ACCEPTED_STATUS).length);
  };

  useFocusEffect(
    useCallback(() => {
      getActiveEventData();
    }, []),
  );

  return (
    <View>
      <Modal
        isVisible={isVisible}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={blackColor}
        backdropOpacity={1}
        onBackdropPress={() => setIsVisibleModalFullEvent(false)}
        onSwipeComplete={() => setIsVisibleModalFullEvent(false)}
        testID={'bottom-half-modal-open-button'}
        style={styles.modalStyles}
        swipeDirection={['down']}>
        <View style={styles.wrapper}>
          <View style={styles.whiteLine} />
          <View>
            <ImageBackground
              resizeMode="cover"
              source={{
                uri: actualActiveEventDataProps
                  ? actualActiveEventDataProps?.photos?.[0]?.image
                  : actualActiveEventData?.photos?.[0]?.image,
              }}
              style={[styles.eventImage, {justifyContent: 'space-between'}]}>
              <FullEvent
                text={`Event is full: ${acceptQuantityGuestProps ? acceptQuantityGuestProps : acceptQuantityGuest}/${
                  totalQuantityGuestsProps ? totalQuantityGuestsProps : totalQuantityGuests
                } guests envited`}
                activeEvent={actualActiveEventDataProps ? actualActiveEventDataProps : actualActiveEventData}
                totalQuantityGuests={totalQuantityGuestsProps ? totalQuantityGuestsProps : totalQuantityGuests}
                totalRequestsGuests={totalRequestsGuestsProps ? totalRequestsGuestsProps : totalRequestsGuests}
                acceptQuantityGuest={acceptQuantityGuestProps ? acceptQuantityGuestProps : acceptQuantityGuest}
              />
              <View>
                <View style={{marginBottom: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center'}}>
                  {actualActiveEventDataProps
                    ? actualActiveEventDataProps
                    : actualActiveEventData?.statusEvent && (
                        <View style={{backgroundColor: lightGreenColor, borderRadius: 5, paddingVertical: 4, paddingHorizontal: 6}}>
                          <Text style={{fontSize: RFValue(12, 812), fontFamily: Satoshi500, color: whiteColor}}>Active</Text>
                        </View>
                      )}
                  <Text
                    style={{
                      fontSize: RFValue(20, 812),
                      marginHorizontal: 8,
                      fontWeight: 'bold',
                      fontFamily: Satoshi400,
                      color: whiteColor,
                    }}>
                    {actualActiveEventDataProps ? actualActiveEventDataProps : actualActiveEventData?.placeName}
                  </Text>
                  <CheckStarIcon />
                </View>
                <View style={styles.main}>
                  <View style={styles.fdr}>
                    <UserIcon />
                    <Text style={styles.textGirlInvitation}>
                      {actualActiveEventDataProps ? actualActiveEventDataProps : actualActiveEventData?.female} x Guest invitation{' '}
                    </Text>
                  </View>
                  <View style={styles.fdr}>
                    <CalendarIcon width={19} height={19} />
                    <Text style={styles.textDate}>
                      {moment(
                        `${actualActiveEventDataProps ? actualActiveEventDataProps : actualActiveEventData?.date}`,
                        'D/M/YYYY, HH:mm:ss',
                      ).format('DD.MM.YYYY')}
                    </Text>
                  </View>
                  <View style={styles.fdr}>
                    <UsersIcon width={19} height={19} />
                    <Text style={styles.textCity}>
                      {`${acceptQuantityGuestProps ? acceptQuantityGuestProps : acceptQuantityGuest}`}/
                      {`${totalQuantityGuestsProps ? totalQuantityGuestsProps : totalQuantityGuests}`}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <Text
            style={{
              color: whiteColor,
              fontFamily: Satoshi500,
              fontSize: RFValue(30, 812),
              textAlign: 'center',
            }}>{`Change guest list from ${totalQuantityGuestsProps ? totalQuantityGuestsProps : totalQuantityGuests} to ${
            totalQuantityGuestsProps ? totalQuantityGuestsProps : totalQuantityGuests + 1
          }?`}</Text>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Button
            onPress={() => {
              navigation.navigate(commonStackPath, {
                screen: eventEditingPath,
                params: {
                  isEditingItems: actualActiveEventDataProps ? actualActiveEventDataProps : actualActiveEventData,
                  isEditing: true,
                },
              });
              setIsVisibleModalFullEvent(false);
            }}
            title="Yes, change my guest list"
            buttonStyle={styles.button}
          />
          <TouchableOpacity onPress={() => setIsVisibleModalFullEvent(false)}>
            <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812), textAlign: 'center'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ModalFullEvent;

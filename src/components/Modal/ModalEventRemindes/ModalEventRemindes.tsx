import React, {FC, useEffect, useState} from 'react';
import {View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';

//import components
import useStyles from 'components/Modal/ModalEventRemindes/styles.ts';
import Button from 'components/Button/Button.tsx';
import {showToast} from 'helpers/showToast.ts';

//import icons
import CalendarIcon from 'assets/images/icons/calendar.svg';
import UserIcon from 'assets/images/icons/user.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import UsersIcon from 'assets/images/icons/Users.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import CalendarWhiteIcon from 'assets/images/icons/calendar-white.svg';
import ArrowRightIcon from 'assets/images/icons/arrow-right.svg';
import ClockIcon from 'assets/images/icons/clock-white.svg';
import moment from 'moment/moment';
import {blackColor, lightGreenColor, transparent60Color, whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {calculateAge} from 'helpers/calculateAge';
import auth from '@react-native-firebase/auth';

interface HostI {
  name: string;
  image: string;
}

interface ModalEventRemindeProps {
  eventStarting?: boolean;
  updateEvent?: string | null;
  uid: string;
  id: string;
  userDelete: null | string;
  deleteUserFromCanceled: () => void;
  activeState: boolean;
  checkUpdate: () => void;
  setEventStarting?: boolean | any;
  setUpdateEvent?: any;
  host?: HostI;
  setVisibleUserDelete: any;
  visibleUserDelete: any;
  time: string;
  hour: string;
  image: any;
  joinedPeopleCount: number;
  city?: string;
  date: string;
  placeName: string;
  allPeople: number;
  girlInvitation: number | string;
  handleAcceptInvitation?: any;
  handleGetEventsIJoining?: any;
  currentEvent: any;
  hoursUntilEvent: number;
  countMyEvent: any;
}

const ModalEventRemindes: FC<ModalEventRemindeProps> = ({
  handleAcceptInvitation = null,
  uid = null,
  handleGetEventsIJoining = null,
  deleteUserFromCanceled,
  placeName = '',
  updateEvent,
  userDelete,
  activeState = null,
  checkUpdate,
  setVisibleUserDelete,
  visibleUserDelete,
  id,
  hour,
  allPeople = 0,
  joinedPeopleCount = 0,
  girlInvitation = 0,
  date = '',
  city,
  setEventStarting = null,
  eventStarting = null,
  time = '',
  image = '',
  currentEvent,
  hoursUntilEvent,
  countMyEvent,
}) => {
  const [chahModal, setChatModal] = useState<boolean>(false);
  const [onTheWayState, setOnTheWayState] = useState<boolean>(false);
  const [nameUser, setNameUser] = useState('');
  const [ageUser, setAgeUser] = useState('');
  const [photoUser, setPhotoUser] = useState('');
  const [isPremium, setIsPremium] = useState();

  const styles = useStyles();
  
  const getUserInfo = async () => {
    try {
      const uid = auth().currentUser?.uid;
      const userInfoDoc = await firestore().collection('userInfo').doc(uid).get();
      setNameUser(userInfoDoc?.data()?.name);
      const age = calculateAge(userInfoDoc?.data()?.date);
      const photo = userInfoDoc?.data()?.photos[0].image;
      setAgeUser(age);
      setPhotoUser(photo);
      setIsPremium(userInfoDoc?.data()?.accountPremium);
    } catch (error) {
      console.log('error get user info', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [uid]);

  const OnTheWayModal = () => {
    return (
      <Modal
        isVisible={chahModal}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={() => setChatModal(false)}
        onSwipeComplete={() => setChatModal(false)}
        style={styles.modalStyles}
        swipeDirection={['down']}>
        <View style={styles.wrapperCancelEvent}>
          <View style={styles.whiteLine} />
          <View>
            <Image resizeMode="contain" source={{uri: image}} style={styles.eventImage} />
          </View>
          <View style={styles.main}>
            <Text style={styles.textCity}>{city}</Text>
            <View style={styles.fdr}>
              <UserIcon />
              <Text style={styles.textGirlInvitation}>{girlInvitation} x Girl invitation </Text>
            </View>
            <View style={styles.fdr}>
              <CalendarIcon width={19} height={19} />
              <Text style={styles.textDate}>{date}</Text>
            </View>
          </View>
          <View style={[styles.fdr, {alignItems: 'center'}]}>
            <Text style={styles.textAreYouSure}>Are you on the way?</Text>
          </View>
          <Button
            onPress={() => {
              showToast('inviteMatch', 'Go to my events!');
              setChatModal(false);
              setEventStarting(false);
            }}
            title="Im on my way"
            buttonStyle={styles.button}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setChatModal(false);
            }}
            title="Go to my event"
            buttonStyle={{width: '100%'}}
          />
        </View>
      </Modal>
    );
  };

  const OpenChatModal = () => {
    return (
      <Modal
        isVisible={onTheWayState}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={() => setOnTheWayState(false)}
        onSwipeComplete={() => setOnTheWayState(false)}
        style={styles.modalStyles}
        swipeDirection={['down']}>
        <View style={styles.wrapperOnTheWay}>
          <View style={styles.whiteLine} />
          <View>
            <Image source={{uri: image}} style={styles.userPhoto} />
            {/*{online && <View style={styles.greenCircle} />}*/}
            <View style={styles.greenCircle} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text style={styles.title}>Alexa</Text>
            <FlashIcon width={19} height={19} />
          </View>
          <Text style={styles.textAreYouSure}>Are you sure you want to remove Alexf?</Text>
          <Text style={styles.textDescription}>Nammos Dubai place?</Text>
          <Button
            onPress={() => {
              setOnTheWayState(false);
              setChatModal(false);
              setEventStarting(false);
            }}
            title="Chat"
            buttonStyle={styles.button}
          />
          <Button
            variant="transparent"
            onPress={() => {
              setOnTheWayState(false);
            }}
            title="Close"
            buttonStyle={{width: '100%'}}
          />
        </View>
      </Modal>
    );
  };

  const updateViewedNewData = async () => {
    const userUid = auth().currentUser?.uid;
    const userEvent = await firestore().collection('Events').doc(id).get();
    const dateNewViewed = userEvent.data()?.dateNewViewed;
    const hourNewViewed = userEvent.data()?.hourNewViewed;
    const nameNewViewed = userEvent.data()?.nameNewViewed;

    if (updateEvent === 'date') {
      try {
        await firestore()
          .collection('Events')
          .doc(id)
          .update({
            dateNewViewed: [...dateNewViewed, userUid],
          });
      } catch (error) {
        console.log('error update dateNewViewed', error);
      }
    }
    if (updateEvent === 'hour') {
      try {
        await firestore()
          .collection('Events')
          .doc(id)
          .update({
            hourNewViewed: [...hourNewViewed, userUid],
          });
      } catch (error) {
        console.log('error update hourNewViewed', error);
      }
    }
    if (updateEvent === 'name') {
      try {
        await firestore()
          .collection('Events')
          .doc(id)
          .update({
            nameNewViewed: [...nameNewViewed, userUid],
          });
      } catch (error) {
        console.log('error update nameNewViewed', error);
      }
    }
  };

  if (eventStarting && !userDelete) {
    return (
      <Modal
        isVisible={eventStarting}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={() => {
          setEventStarting(false);
          countMyEvent.current = countMyEvent.current + 1;
        }}
        onSwipeComplete={() => {
          setEventStarting(false);
          countMyEvent.current = countMyEvent.current + 1;
        }}
        style={styles.modalStyles}
        swipeDirection={['down']}>
        <View style={styles.wrapper}>
          <View style={styles.whiteLine} />
          <View>
            <ImageBackground
              resizeMode="cover"
              source={{uri: currentEvent?.photos?.[0]?.image}}
              style={[styles.eventImage, {justifyContent: !uid ? 'flex-end' : 'space-between'}]}>
              {uid && (
                <TouchableOpacity
                  style={{
                    backgroundColor: transparent60Color,
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: 20,
                    flexDirection: 'row',
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{height: 40, width: 40, borderRadius: 40}} source={{uri: photoUser}} />
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            backgroundColor: blackColor,
                            marginLeft: 10,
                            borderWidth: 1,
                            borderRadius: 4.5,
                            borderColor: whiteColor,
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                          }}>
                          <Text style={{fontSize: RFValue(10, 812), color: whiteColor, fontFamily: Satoshi500}}>Host</Text>
                        </View>
                        {isPremium && (
                          <LinearGradient
                            colors={['#977B4A', '#E5D291', '#A28453']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={{borderRadius: 4.5, paddingHorizontal: 10, paddingVertical: 2, marginLeft: 5}}>
                            <Text style={{fontSize: RFValue(10, 812), color: blackColor, fontFamily: Satoshi500}}>Premium</Text>
                          </LinearGradient>
                        )}
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: RFValue(20, 812),
                            marginLeft: 10,
                            marginRight: 8,
                            color: whiteColor,
                            fontFamily: Satoshi400,
                            fontWeight: 'bold',
                          }}>
                          {nameUser}, {ageUser}
                        </Text>
                        <CheckStarIcon />
                      </View>
                    </View>
                  </View>
                  <ArrowRightIcon />
                </TouchableOpacity>
              )}
              <View>
                <View style={{marginBottom: 12, flexDirection: 'row', alignItems: 'center'}}>
                  {currentEvent?.activeState && (
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
                    {currentEvent?.placeName}
                  </Text>
                  <CheckStarIcon />
                </View>
                <View style={styles.main}>
                  <View style={styles.fdr}>
                    <UserIcon />
                    <Text style={styles.textGirlInvitation}>{currentEvent?.female} x Girl invitation </Text>
                  </View>
                  <View style={styles.fdr}>
                    <CalendarIcon width={19} height={19} />
                    <Text style={styles.textDate}>{moment(`${currentEvent?.date}`, 'D/M/YYYY, HH:mm:ss').format('DD.MM.YYYY')}</Text>
                  </View>
                  <View style={styles.fdr}>
                    <UsersIcon width={19} height={19} />
                    <Text style={styles.textCity}>
                      {joinedPeopleCount}/{currentEvent?.female + currentEvent?.male}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          {
            <Text style={styles.textAreYouSure}>{time === '0' ? 'Are you on the way?' : `Event starting in ${hoursUntilEvent}h!`}</Text>
          }
          {/* {hoursUntilEvent === 12 && (
            <Text style={styles.textAreYouSure}>{time === '0' ? 'Are you on the way?' : 'Event starting in 12h!'}</Text>
          )}
          {hoursUntilEvent === 2 && (
            <Text style={styles.textAreYouSure}>{time === '0' ? 'Are you on the way?' : 'Event starting in 2h!'}</Text>
          )} */}
          <Button
            onPress={async () => {
              if (time === '0') {
                setEventStarting(false);
              } else {
                // await handleAcceptInvitation();
                // await handleGetEventsIJoining();
                // showToast('success', 'Go to my events', `You confirmed ${currentEvent?.placeName} event`);
                setEventStarting(false);
                countMyEvent.current = countMyEvent.current + 1;
                // setModalVisible(false);
              }
            }}
            title={time === '0' ? 'Im on my way' : 'Confirm'}
            buttonStyle={styles.button}
          />
          {/* <Button
            variant="transparent"
            onPress={() => {
              setEventStarting(false);
              // setChatModal(true);
              // setOnTheWayState(true);
            }}
            title="Go to my event"
            buttonStyle={{width: '100%'}}
          /> */}
        </View>
        <OnTheWayModal />
        <OpenChatModal />
      </Modal>
    );
  }

  if (updateEvent) {
    return (
      <Modal
        isVisible={!!updateEvent}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={async () => {
          await updateViewedNewData();
          checkUpdate();
        }}
        onSwipeComplete={async () => {
          await updateViewedNewData();
          checkUpdate();
        }}
        style={styles.modalStyles}
        swipeDirection={['down']}>
        <View style={styles.wrapper}>
          <View style={styles.whiteLine} />
          <View>
            <ImageBackground
              resizeMode="cover"
              source={{uri: image}}
              style={[styles.eventImage, {justifyContent: !uid ? 'flex-end' : 'space-between'}]}>
              {uid && (
                <TouchableOpacity
                  style={{
                    backgroundColor: transparent60Color,
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: 20,
                    flexDirection: 'row',
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{height: 40, width: 40, borderRadius: 40}} source={{uri: photoUser}} />
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            backgroundColor: blackColor,
                            marginLeft: 10,
                            borderWidth: 1,
                            borderRadius: 4.5,
                            borderColor: whiteColor,
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                          }}>
                          <Text style={{fontSize: RFValue(10, 812), color: whiteColor, fontFamily: Satoshi500}}>Host</Text>
                        </View>
                        {false && (
                          <LinearGradient
                            colors={['#977B4A', '#E5D291', '#A28453']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={{borderRadius: 4.5, paddingHorizontal: 10, paddingVertical: 2, marginLeft: 5}}>
                            <Text style={{fontSize: RFValue(10, 812), color: blackColor, fontFamily: Satoshi500}}>Premium</Text>
                          </LinearGradient>
                        )}
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: RFValue(20, 812),
                            marginLeft: 10,
                            marginRight: 8,
                            color: whiteColor,
                            fontFamily: Satoshi400,
                            fontWeight: 'bold',
                          }}>
                          {nameUser}, {ageUser}
                        </Text>
                        <CheckStarIcon />
                      </View>
                    </View>
                  </View>
                  <ArrowRightIcon />
                </TouchableOpacity>
              )}
              <View>
                <View style={{marginBottom: 12, flexDirection: 'row', alignItems: 'center'}}>
                  {activeState && (
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
                    {placeName}
                  </Text>
                  <CheckStarIcon />
                </View>
                <View style={styles.main}>
                  <View style={styles.fdr}>
                    <UserIcon />
                    <Text style={styles.textGirlInvitation}>{girlInvitation} x Girl invitation </Text>
                  </View>
                  <View style={styles.fdr}>
                    <CalendarIcon width={19} height={19} />
                    <Text style={styles.textDate}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD.MM.YYYY')}</Text>
                  </View>
                  <View style={styles.fdr}>
                    <UsersIcon width={19} height={19} />
                    <Text style={styles.textCity}>
                      {joinedPeopleCount}/{allPeople}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          <Text style={styles.textAreYouSure}>{nameUser} has updated the event!</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            {updateEvent === 'date' && (
              <Text style={{fontSize: RFValue(14, 812), fontFamily: Satoshi400, color: whiteColor}}>New event date: </Text>
            )}
            {updateEvent === 'name' && (
              <Text style={{fontSize: RFValue(14, 812), fontFamily: Satoshi400, color: whiteColor}}>New event name: </Text>
            )}
            {updateEvent === 'hour' && (
              <Text style={{fontSize: RFValue(14, 812), fontFamily: Satoshi400, color: whiteColor}}>New event hour: </Text>
            )}
            {updateEvent === 'date' && <CalendarWhiteIcon />}
            {updateEvent === 'hour' && <ClockIcon />}
            {updateEvent === 'date' && <Text style={{fontSize: RFValue(14, 812), fontFamily: Satoshi400, color: whiteColor}}> {date}</Text>}
            {updateEvent === 'name' && (
              <Text style={{fontSize: RFValue(14, 812), fontFamily: Satoshi400, color: whiteColor}}> {placeName}</Text>
            )}
            {updateEvent === 'hour' && <Text style={{fontSize: RFValue(14, 812), fontFamily: Satoshi400, color: whiteColor}}> {hour}</Text>}
          </View>
          <Button
            onPress={async () => {
              await handleAcceptInvitation();
              await handleGetEventsIJoining();
              showToast('inviteMatch', `You confirmed ${placeName} event`);
              await updateViewedNewData();
              checkUpdate();
            }}
            title={'Confirm'}
            buttonStyle={styles.button}
          />
          <TouchableOpacity
            onPress={async () => {
              await updateViewedNewData();
              checkUpdate();
            }}
            style={{marginVertical: 25}}>
            <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi500}}>Reject invitation</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  if (userDelete) {
    return (
      <Modal
        isVisible={visibleUserDelete}
        useNativeDriver={false}
        propagateSwipe={true}
        backdropColor={'rgba(0, 0, 0, 0.94)'}
        testID={'bottom-half-modal-open-button'}
        onBackdropPress={async () => {
          setVisibleUserDelete(false);
          deleteUserFromCanceled();
        }}
        onSwipeComplete={async () => {
          setVisibleUserDelete(false);
          deleteUserFromCanceled();
        }}
        style={styles.modalStyles}
        swipeDirection={['down']}>
        <View style={styles.wrapper}>
          <View style={styles.whiteLine} />
          <View>
            <ImageBackground
              resizeMode="cover"
              source={{uri: image}}
              style={[styles.eventImage, {justifyContent: !uid ? 'flex-end' : 'space-between'}]}>
              {uid && (
                <TouchableOpacity
                  style={{
                    backgroundColor: transparent60Color,
                    alignItems: 'center',
                    width: '100%',
                    borderRadius: 20,
                    flexDirection: 'row',
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{height: 40, width: 40, borderRadius: 40}} source={{uri: photoUser}} />
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            backgroundColor: blackColor,
                            marginLeft: 10,
                            borderWidth: 1,
                            borderRadius: 4.5,
                            borderColor: whiteColor,
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                          }}>
                          <Text style={{fontSize: RFValue(10, 812), color: whiteColor, fontFamily: Satoshi500}}>Host</Text>
                        </View>
                        {false && (
                          <LinearGradient
                            colors={['#977B4A', '#E5D291', '#A28453']}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={{borderRadius: 4.5, paddingHorizontal: 10, paddingVertical: 2, marginLeft: 5}}>
                            <Text style={{fontSize: RFValue(10, 812), color: blackColor, fontFamily: Satoshi500}}>Premium</Text>
                          </LinearGradient>
                        )}
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: RFValue(20, 812),
                            marginLeft: 10,
                            marginRight: 8,
                            color: whiteColor,
                            fontFamily: Satoshi400,
                            fontWeight: 'bold',
                          }}>
                          {nameUser}, {ageUser}
                        </Text>
                        <CheckStarIcon />
                      </View>
                    </View>
                  </View>
                  <ArrowRightIcon />
                </TouchableOpacity>
              )}
              <View>
                <View style={{marginBottom: 12, flexDirection: 'row', alignItems: 'center'}}>
                  {activeState && (
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
                    {placeName}
                  </Text>
                  <CheckStarIcon />
                </View>
                <View style={styles.main}>
                  <View style={styles.fdr}>
                    <UserIcon />
                    <Text style={styles.textGirlInvitation}>{girlInvitation} x Girl invitation </Text>
                  </View>
                  <View style={styles.fdr}>
                    <CalendarIcon width={19} height={19} />
                    <Text style={styles.textDate}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD.MM.YYYY')}</Text>
                  </View>
                  <View style={styles.fdr}>
                    <UsersIcon width={19} height={19} />
                    <Text style={styles.textCity}>
                      {joinedPeopleCount}/{allPeople}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          <Text style={styles.textAreYouSure}>Simon has canceled your invitation</Text>
          <Button
            onPress={async () => {
              setVisibleUserDelete(false);
              deleteUserFromCanceled();
            }}
            title={'Ok, got itrm'}
            buttonStyle={styles.button}
          />
        </View>
      </Modal>
    );
  }
};

export default ModalEventRemindes;

import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native';
// import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';

//import components
import useStyles from 'screens/App/MyEvents/styles.ts';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard.tsx';
// import {useMyEvents} from '../../../store/myEvents';
// import {showToast} from 'helpers/showToast.ts';
import {blackColor, lightGray13Color, lightGray20Color, lightGray2Color, lightGreenColor, whiteColor} from 'constants/colors';
import JoiningEventsCard from 'components/Cards/JoiningEventsCard/JoiningEventsCard';
import ModalCancelAttending from './ModalCancelAttending';
import ModalAcceptInvitation from './ModalAcceptInvitation';
// import {useUser} from '../../../store/userStore';
import {
  ACCEPTED_STATUS,
  APPROVED_STATUS,
  CANCEL_STATUS,
  INVITE_MATCH_STATUS,
  NOT_ACCEPTED_STATUS,
  screenHeight,
  screenWidth,
} from 'constants/common.ts';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts.ts';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
// import {useAdminActions} from 'src/store/adminActions';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';

//import images
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import AddIcon from 'assets/images/icons/add.svg';
import Button from 'components/Button/Button';
import {
  commonStackPath,
  eventActiveInfoPath,
  // eventCreatingStackPath,
  // IOPath,
  // markAttendancePath,
  // paymentPath,
} from 'constants/pathLocations';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import ModalEventRemindes from 'components/Modal/ModalEventRemindes/ModalEventRemindes';
// import {sendNotification} from 'helpers/fcmHelper';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {calculateAge} from 'helpers/calculateAge';
// import moment from 'moment';
// import analytics from '@react-native-firebase/analytics';
// import Config from 'react-native-config';
import ModalEventMarkAttendance from 'components/Modal/ModalEventMarkAttendance';
// import {Event, EventData} from 'src/types/event';
// import {cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import ModalChangeAccountType from 'components/Modal/ModalChangeAccountType';
import ModalEventRemindersStarting from 'components/Modal/ModalEventRemindersStarting';
import Loading from 'components/Loading/Loading';
import { useMyEventsScreen } from 'hooks/useMyEvents';
// import { logErrorToSentry } from 'helpers/logErrorsToSentry';

const MyEvents: FC<any> = ({navigation}) => {
  const styles = useStyles();

  const {
    userInfo,
    changeStatusGuestUsersList,
    loadingEvents,
    acceptModalVisible,
    rejectModalVisible,
    setAcceptModalVisible,
    changeAccountTypeModalVisible,
    setChangeAccountModalVisible,
    isHost,
    activeTab,
    MY_EVENTS,
    setActiveTab,
    goToCreateEvent,
    myEventsData,
    eventsJoiningData,
    goToIOStack,
    handleCancelAttending,
    isVisibleCancelAttendingModal,
    setIsVisibleCancelAttendingModal,
    activeModalEvent,
    activeUserInfo,
    hostInfo,
    handleRejectInvitation,
    handleAcceptInvitation,
    isVisibleAcceptInvitationModal,
    loading,
    hoursUntilEvent,
    currentEvent,
    visibleModalEventRemindes,
    setVisibleModalEventRemindes,
    countMyEvent,
    isVisibleMarkAttendance,
    eventDataMarkAttendance,
    setIsVisibleMarkAttendance,
    goToMarkAttendance,
    handleMarkAttendance,
    incrementCount,
  } = useMyEventsScreen(navigation);
  
  const customButton = (item: any[]) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(commonStackPath, {screen: eventActiveInfoPath, params: {list: item}} as never)}
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
      </TouchableOpacity>
    );
  };

  const customButtonsGuest = (
    id: string,
    usersList: any[],
    date: string,
    uidHost: string,
    placeName: string,
    hostPhoto: string,
    item: any,
  ) => {
    const findUser = usersList.find(item => item.uid === userInfo?.uid);
    const status = findUser?.status;

    return (
      <>
        {status !== ACCEPTED_STATUS && status !== APPROVED_STATUS && (
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
                color: blackColor,
                fontFamily: Satoshi700,
                fontSize: RFValue(16, 812),
              }}>
              Waiting for invitation approval
            </Text>
          </TouchableOpacity>
        )}
        {status === ACCEPTED_STATUS && (
          <TouchableOpacity
            onPress={() => changeStatusGuestUsersList(CANCEL_STATUS, id, uidHost, placeName, date, hostPhoto)}
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
              Cancel attending
            </Text>
          </TouchableOpacity>
        )}
        {status === APPROVED_STATUS && (
          <>
            <TouchableOpacity
              onPress={() => changeStatusGuestUsersList(ACCEPTED_STATUS, id, uidHost, placeName, date, hostPhoto, item)}
              style={{
                height: 65,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 18,
                backgroundColor: blackColor,
                marginTop: 25,
              }}>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi700,
                  fontSize: RFValue(16, 812),
                }}>
                Accept invitation
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeStatusGuestUsersList(NOT_ACCEPTED_STATUS, id, uidHost, placeName, date, hostPhoto)}
              style={{
                height: 65,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 18,
                backgroundColor: lightGray20Color,
                marginTop: 12,
              }}>
              <Text
                style={{
                  color: blackColor,
                  fontFamily: Satoshi700,
                  fontSize: RFValue(16, 812),
                }}>
                Reject invitation
              </Text>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  };

  const UserInfoTop = ({showTotalEvents = true}: {showTotalEvents?: boolean}) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{alignSelf: 'flex-start'}}>
            <FastImage style={{width: 50, height: 50, borderRadius: 50}} source={{uri: userInfo?.photos?.[0]?.image || ''}} />
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
                {userInfo?.accountType === 'guest' && (
                  <Text style={{color: whiteColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                    Guest
                  </Text>
                )}
                {userInfo?.accountType === 'host' && (
                  <Text style={{color: whiteColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                    Host
                  </Text>
                )}
              </View>
              {userInfo?.accountPremium && (
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
                {userInfo?.name}
                {userInfo?.date ? <Text>,</Text> : null}
              </Text>
              {userInfo?.date && (
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(13, 812),
                    marginTop: 5,
                  }}>
                  {' '}
                  {calculateAge(userInfo?.date)}
                </Text>
              )}
              <View style={{marginLeft: 8}}>{userInfo?.accountConfirmed && <CheckStarWhite width={14} height={14} />}</View>
            </View>
          </View>
        </View>
        {showTotalEvents && (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: whiteColor,
                fontFamily: Satoshi700,
                fontSize: RFValue(26, 812),
              }}>
              {userInfo?.eventsList?.length ? userInfo?.eventsList?.length : eventsJoiningData.length}
            </Text>
            <Text
              style={{
                color: whiteColor,
                fontFamily: Satoshi500,
                fontSize: RFValue(12, 812),
              }}>
              Total events
            </Text>
          </View>
        )}
      </View>
    );
  };

  if (loadingEvents) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: blackColor,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: screenHeight / 9,
        }}>
        <Loading wrapperText={false} text={'Looking for your events.\nAlmost ready to go!'} userInfo={userInfo} />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {userInfo?.photos?.length > 0 && <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo.photos[0].image} />}
        {acceptModalVisible && (
          <ModalAcceptedAccount isVisible={acceptModalVisible} userInfo={userInfo} setIsVisible={setAcceptModalVisible} />
        )}
        {changeAccountTypeModalVisible && !acceptModalVisible && (
          <ModalChangeAccountType
            isVisible={changeAccountTypeModalVisible}
            userInfo={userInfo}
            setIsVisible={setChangeAccountModalVisible}
          />
        )}
        {isHost ? (
          <View style={styles.wrapperHeaderButtonMyEvents}>
            <TouchableOpacity
              style={[
                styles.buttonMyEvents,
                {flex: 1, alignItems: 'center', backgroundColor: activeTab === MY_EVENTS ? whiteColor : lightGray2Color},
              ]}
              onPress={() => setActiveTab(MY_EVENTS)}>
              <Text style={[styles.textMyEvents, {color: activeTab === MY_EVENTS ? blackColor : whiteColor}]}>My events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: screenWidth / 60,
                paddingHorizontal: screenHeight / 70,
                borderRadius: 8,
                flex: 1,
                alignItems: 'center',
                marginLeft: 10,
                borderWidth: 1,
                borderColor: lightGray13Color,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={goToCreateEvent}>
              <AddIcon width={16} height={16} />
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(16, 812),
                  marginLeft: 10,
                }}>
                Create event
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.buttonMyEvents,
              {alignItems: 'center', marginVertical: 20, backgroundColor: activeTab === MY_EVENTS ? whiteColor : lightGray2Color},
            ]}
            onPress={() => setActiveTab(MY_EVENTS)}>
            <Text style={[styles.textMyEvents, {color: activeTab === MY_EVENTS ? blackColor : whiteColor}]}>My events</Text>
          </TouchableOpacity>
        )}
        <View style={{flex: 1, height: '100%'}}>
          {isHost ? (
            activeTab === MY_EVENTS ? (
              <>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{flex: 1, height: '100%', marginBottom: screenHeight / 10}}
                  data={myEventsData}
                  keyExtractor={item => item.id.toString()}
                  ListHeaderComponent={<UserInfoTop showTotalEvents={true} />}
                  ListEmptyComponent={() => (
                    <>
                      {userInfo?.accountConfirmed && (
                        <View style={{marginTop: screenHeight / 6}}>
                          <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
                            Share a Table or Event
                          </Text>
                          <Text
                            style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), opacity: 0.8, marginBottom: 34}}>
                            Get started by creating an event to begin inviting guests.
                          </Text>
                          <Button title="Create event" onPress={goToCreateEvent} />
                        </View>
                      )}
                    </>
                  )}
                  renderItem={({item}) => (
                    <MyEventsCard
                      imageBg={item?.photos}
                      statusEvent={item?.statusEvent}
                      eventReviewed={item?.eventReviewed}
                      allPeople={item?.female + item?.male}
                      date={item?.date}
                      accountConfirmed={userInfo?.accountConfirmed}
                      findAcceptedGuest={item?.usersList?.filter(item => item.status === INVITE_MATCH_STATUS)}
                      item={item}
                      showGuestList={true}
                      isMyEvents={true}
                      customButton={customButton(item)}
                    />
                  )}
                />
              </>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={eventsJoiningData}
                style={{flex: 1, backgroundColor: 'transparent', height: '100%', marginBottom: screenHeight / 10}}
                ListEmptyComponent={() => (
                  <View style={{marginTop: screenHeight / 6}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
                      You need to join an event
                    </Text>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), opacity: 0.8, marginBottom: 34}}>
                      You don't have any active event.
                    </Text>
                    <Button title="Join event" onPress={goToIOStack} />
                  </View>
                )}
                renderItem={({item}) => (
                  <JoiningEventsCard
                    id={item?.id}
                    uid={item?.uid}
                    activeState={item.statusEvent}
                    allPeople={item?.female + item?.femaleFriend + item?.male + item?.maleFriend}
                    date={item.date}
                    deleteUsers={item.deleteUsers}
                    oldDate={item.oldDate}
                    oldName={item.oldName}
                    oldHour={item.oldHour}
                    dateNewViewed={item.dateNewViewed}
                    nameNewViewed={item.nameNewViewed}
                    hourNewViewed={item.hourNewViewed}
                    hour={item?.hour}
                    placeName={item?.placeName}
                    list={item}
                    image={item?.photos[0]?.image}
                    textCityName={item.name}
                    estimeTime={item.hour}
                    numberOfGirlsInvited={item?.female + item?.femaleFriend}
                    host={{name: item?.name, image: item?.hostImage, hostUid: item?.uid}}
                    joinedPeopleCount={item?.usersList?.filter(i => i?.status === ACCEPTED_STATUS)?.length}
                    status={item?.usersList?.filter(j => j?.uid === userInfo?.uid)[0]?.status}
                    isAcceptedInvitation={item?.usersList?.filter(j => j?.uid === userInfo?.uid)[0]?.status === ACCEPTED_STATUS}
                    handleOpenCancelAttendingModal={handleOpenCancelAttendingModal}
                    handleOpenAcceptInvitationModal={handleOpenAcceptInvitationModal}
                    handleAcceptInvitation={handleAcceptInvitation}
                    handleGetEventsIJoining={handleGetEventsIJoining}
                  />
                )}
              />
            )
          ) : (
            <View style={{flex: 1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={eventsJoiningData}
                style={{flex: 1, backgroundColor: 'transparent', height: '100%', marginBottom: screenHeight / 10}}
                ListHeaderComponent={<UserInfoTop showTotalEvents={true} />}
                ListEmptyComponent={() => (
                  <View style={{marginTop: screenHeight / 6}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
                      You need to join an event
                    </Text>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), opacity: 0.8, marginBottom: 34}}>
                      You don't have any active event.
                    </Text>
                    <Button title="Join event" onPress={goToIOStack} />
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                renderItem={({item}) => (
                  <MyEventsCard
                    imageBg={item?.photos}
                    list={item}
                    statusEvent={item?.statusEvent}
                    eventReviewed={item?.eventReviewed}
                    allPeople={item?.female + item?.male}
                    date={item?.date}
                    textCityName={item?.name}
                    placeName={item?.placeName}
                    estimeTime={item?.hour}
                    numberOfGirlsInvited={item?.female}
                    placeName={item?.placeName}
                    invitingPeople={item?.usersList?.filter(i => i?.status !== NOT_ACCEPTED_STATUS)}
                    accountConfirmed={userInfo?.accountConfirmed}
                    findAcceptedGuest={item?.usersList?.filter(item => item.status === INVITE_MATCH_STATUS)}
                    totalRequestsGuests={item?.requestsList?.length}
                    item={item}
                    showGuestList={false}
                    customButton={customButtonsGuest(
                      item?.id,
                      item?.usersList,
                      item?.date,
                      item?.uid,
                      item?.placeName,
                      item?.hostImage,
                      item,
                    )}
                    showInfoTop={true}
                  />
                )}
              />
            </View>
          )}
        </View>
      </View>
      <ModalCancelAttending
        handleCancelAttending={handleCancelAttending}
        isVisible={isVisibleCancelAttendingModal}
        onClose={() => setIsVisibleCancelAttendingModal(false)}
        eventInfo={activeModalEvent}
        userInfo={activeUserInfo}
        hostInfo={hostInfo}
      />
      <ModalAcceptInvitation
        handleRejectInvitation={handleRejectInvitation}
        handleAcceptInvitation={handleAcceptInvitation}
        isVisible={isVisibleAcceptInvitationModal}
        onClose={() => setIsVisibleAcceptInvitationModal(false)}
        userInfo={activeUserInfo}
        eventInfo={activeModalEvent}
        hostInfo={hostInfo}
      />
      {!userInfo?.accountConfirmed && !loading && (
        <ModalLockAccount
          wrapperStyle={{marginTop: 100}}
          isVisibleButton={true}
          isPremium={userInfo?.accountPremium}
          accountType={userInfo?.accountType}
        />
      )}
      {hoursUntilEvent < 25 && hoursUntilEvent > 0 && isHost && (
        <ModalEventRemindes
          currentEvent={currentEvent}
          uid={userInfo?.uid}
          eventStarting={visibleModalEventRemindes}
          setEventStarting={setVisibleModalEventRemindes}
          hoursUntilEvent={hoursUntilEvent}
          countMyEvent={countMyEvent}
        />
      )}
      <ModalEventMarkAttendance
        isVisible={isVisibleMarkAttendance}
        setIsVisible={setIsVisibleMarkAttendance}
        eventInfo={eventDataMarkAttendance}
        goToMarkAttendance={() => goToMarkAttendance(eventDataMarkAttendance?.id)}
        handleMarkAttendance={handleMarkAttendance}
      />
      {hoursUntilEvent < 25 && hoursUntilEvent > 0 && !isHost && (
        <ModalEventRemindersStarting
          currentEvent={currentEvent}
          incrementCount={incrementCount}
          isModalVisible={visibleModalEventRemindes}
          setEventStarting={setVisibleModalEventRemindes}
          hoursUntilEvent={hoursUntilEvent}
          countMyEvent={countMyEvent}
        />
      )}
    </>
  );
};

export default MyEvents;

import React, {FC} from 'react';
import {Text, View} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native';
// import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';

//import components
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard.tsx';
// import {useMyEvents} from '../../../store/myEvents';
// import {showToast} from 'helpers/showToast.ts';
import {blackColor, lightGray2Color, whiteColor} from 'constants/colors';
import JoiningEventsCard from 'components/Cards/JoiningEventsCard/JoiningEventsCard';
import ModalCancelAttending from './ModalCancelAttending';
import ModalAcceptInvitation from './ModalAcceptInvitation';
// import {useUser} from '../../../store/userStore';
import {ACCEPTED_STATUS, APPROVED_STATUS, CANCEL_STATUS, INVITE_MATCH_STATUS, NOT_ACCEPTED_STATUS, screenHeight} from 'constants/common.ts';
import {Satoshi500, Satoshi700} from 'constants/fonts.ts';
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
import {useMyEventsScreen} from 'hooks/useMyEvents';
// import { logErrorToSentry } from 'helpers/logErrorsToSentry';
import * as S from './MyEvents.style';

const MyEvents: FC<any> = ({navigation}) => {
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
      <S.ManageEventButton
        onPress={() => navigation.navigate(commonStackPath, {screen: eventActiveInfoPath, params: {list: item}} as never)}>
        <S.ManageEventButtonText>Manage Event</S.ManageEventButtonText>
      </S.ManageEventButton>
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
    const findUser = usersList.find(user => user.uid === userInfo?.uid);
    const status = findUser?.status;

    return (
      <>
        {status !== ACCEPTED_STATUS && status !== APPROVED_STATUS && (
          <S.ButtonEvent disabled>
            <S.InnerButtonText>Waiting for invitation approval</S.InnerButtonText>
          </S.ButtonEvent>
        )}
        {status === ACCEPTED_STATUS && (
          <S.ButtonEvent onPress={() => changeStatusGuestUsersList(CANCEL_STATUS, id, uidHost, placeName, date, hostPhoto, item)}>
            <S.InnerButtonText>Cancel attending</S.InnerButtonText>
          </S.ButtonEvent>
        )}
        {status === APPROVED_STATUS && (
          <>
            <S.ButtonEvent
              style={{backgroundColor: blackColor}}
              onPress={() => changeStatusGuestUsersList(ACCEPTED_STATUS, id, uidHost, placeName, date, hostPhoto, item)}>
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi700,
                  fontSize: RFValue(16, 812),
                }}>
                Accept invitation
              </Text>
            </S.ButtonEvent>
            <S.ButtonEvent onPress={() => changeStatusGuestUsersList(NOT_ACCEPTED_STATUS, id, uidHost, placeName, date, hostPhoto, item)}>
              <S.InnerButtonText>Reject invitation</S.InnerButtonText>
            </S.ButtonEvent>
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
            <S.OnlineStatus />
          </View>
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <S.WrapperAccountType>
                {userInfo?.accountType === 'guest' && <S.AccountTypeTextStyled>Guest</S.AccountTypeTextStyled>}
                {userInfo?.accountType === 'host' && <S.AccountTypeTextStyled>Host</S.AccountTypeTextStyled>}
              </S.WrapperAccountType>
              {userInfo?.accountPremium && (
                <S.GradientContainer colors={['#977B4A', '#E5D291', '#A28453']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
                  {<S.GradientContainerTextStyled>Premium</S.GradientContainerTextStyled>}
                </S.GradientContainer>
              )}
            </View>
            <S.WrapperUserInfo>
              <S.UserInfoStyledText>
                {userInfo?.name}
                {userInfo?.date ? <Text>,</Text> : null}
              </S.UserInfoStyledText>
              {userInfo?.date && <S.UserInfoAgeStyledText> {calculateAge(userInfo?.date)}</S.UserInfoAgeStyledText>}
              <View style={{marginLeft: 8}}>{userInfo?.accountConfirmed && <CheckStarWhite width={14} height={14} />}</View>
            </S.WrapperUserInfo>
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
      <S.WrapperLoadingEvent>
        <Loading wrapperText={false} text={'Looking for your events.\nAlmost ready to go!'} userInfo={userInfo} />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </S.WrapperLoadingEvent>
    );
  }

  return (
    <>
      <S.Container>
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
          <S.WrapperHeaderButtonMyEvents>
            <S.ButtonMyEvents
              style={[{flex: 1, alignItems: 'center', backgroundColor: activeTab === MY_EVENTS ? whiteColor : lightGray2Color}]}
              onPress={() => setActiveTab(MY_EVENTS)}>
              <S.TextMyEvents style={{color: activeTab === MY_EVENTS ? blackColor : whiteColor}}>My events</S.TextMyEvents>
            </S.ButtonMyEvents>
            <S.WrapperButtonCreateEvent onPress={goToCreateEvent}>
              <AddIcon width={16} height={16} />
              <S.ButtonCreateEventTextStyle>Create event</S.ButtonCreateEventTextStyle>
            </S.WrapperButtonCreateEvent>
          </S.WrapperHeaderButtonMyEvents>
        ) : (
          <S.ButtonMyEvents
            style={[{alignItems: 'center', marginVertical: 20, backgroundColor: activeTab === MY_EVENTS ? whiteColor : lightGray2Color}]}
            onPress={() => setActiveTab(MY_EVENTS)}>
            <S.TextMyEvents style={{color: activeTab === MY_EVENTS ? blackColor : whiteColor}}>My events</S.TextMyEvents>
          </S.ButtonMyEvents>
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
                          <S.StyledTextLarge>Share a Table or Event</S.StyledTextLarge>
                          <S.StyledTextSecondary>Get started by creating an event to begin inviting guests.</S.StyledTextSecondary>
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
                    <S.StyledTextLarge>You need to join an event</S.StyledTextLarge>
                    <S.StyledTextSecondary>You don't have any active event.</S.StyledTextSecondary>
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
                    <S.StyledTextLarge>You need to join an event</S.StyledTextLarge>
                    <S.StyledTextSecondary>You don't have any active event.</S.StyledTextSecondary>
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
      </S.Container>
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

import {FlatList, Text, View} from 'react-native';
import {FC, ReactElement} from 'react';
//import components
import useStyles from './styles';
import {transparentGray70Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import PersoneIcon from 'assets/images/icons/Users.svg';
import Clock from 'assets/images/icons/clock-white.svg';
import ItemRequestGuest from './ItemRequestGuest';
import ItemRequestHost from './ItemRequestHost';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {IOPath} from 'constants/pathLocations';
import {useUser} from '../../../store/userStore';
import ModalLockAccount from 'components/Modal/ModalLockAccoun/ModalLockAccount';
import Match from '../IO/screens/Match/Match';
import FullEvent from 'components/FullEvent';
import ModalFullEvent from 'components/Modal/ModalFullEvent';
import ModalRejectAccount from 'components/Modal/ModalRejectAccount';
import ModalAcceptedAccount from 'components/Modal/ModalAcceptedAccount';
import FastImage from 'react-native-fast-image';
import {screenHeight} from 'constants/common';
import {Event} from 'src/types/event';
import {useMyEvents} from 'src/store/myEvents';
import ModalChangeAccountType from 'components/Modal/ModalChangeAccountType';
import Loading from 'components/Loading/Loading';
import {useCreateEvent} from 'hooks/useCreateEvent';
import {useRequests} from 'hooks/useRequests';

const Requests: FC = (): ReactElement => {
  const styles = useStyles();

  const goToCreateEvent = useCreateEvent();

  const navigation = useAppNavigation();
  const userInfo = useUser((i: any) => i?.user);

  const {activeEvent, myEvents, loadingMyEvents} = useMyEvents(state => state);

  const {
    isHost,
    handleAddCountRequestItems,
    setRequestsForHost,
    handleOpenMatch,
    setIsVisibleModalFullEvent,
    fetchHostRequests,
    setDataForGuest,
    loadingRequestItems,
    list,
    isVisibleMatch,
    rejectModalVisible,
    acceptModalVisible,
    totalRequestsGuests,
    acceptQuantityGuest,
    totalQuantityGuests,
    setAcceptModalVisible,
    changeAccountTypeModalVisible,
    setChangeAccountModalVisible,
    isVisibleModalFullEvent,
    matchData,
    handleCloseMatch,
  } = useRequests();

  const getEventListItem = () => {
    switch (isHost) {
      case true:
        return (
          <View style={{flex: 1}}>
            <FlatList
              // @ts-ignore
              data={list}
              numColumns={2}
              key={'2'}
              showsVerticalScrollIndicator={false}
              onEndReached={handleAddCountRequestItems}
              keyExtractor={({uid, name}) => `${uid}${name}`}
              contentContainerStyle={styles.listContentContainer}
              extraData={list}
              style={{
                width: '100%',
              }}
              ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
              renderItem={({item, index}) => {
                return isHost ? (
                  <ItemRequestHost
                    item={item}
                    setRequestsForHost={setRequestsForHost}
                    handleOpenMatch={handleOpenMatch}
                    setIsVisibleModalFullEvent={() => setIsVisibleModalFullEvent(true)}
                    fetchHostRequests={fetchHostRequests}
                  />
                ) : (
                  <ItemRequestGuest
                    // @ts-ignore
                    list={item}
                    item={item?.usersList?.filter((i: Event.User) => i?.uid === userInfo?.uid)}
                    setDataForGuest={setDataForGuest}
                    handleOpenMatch={handleOpenMatch}
                    index={index}
                  />
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 16}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 932), marginBottom: 18}}>
                      You don't have any requests
                    </Text>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 932), marginBottom: 34}}>
                      Get started to {isHost ? 'invite guests' : 'join events and begin receiving event requests.'}
                    </Text>
                    <Button title={isHost ? 'Invite guests' : 'Join events'} onPress={() => navigation.navigate(IOPath as never)} />
                  </View>
                );
              }}
            />
          </View>
        );
      case false:
        return (
          <View style={{flex: 1}}>
            <FlatList
              // @ts-ignore
              data={list}
              numColumns={1}
              key={'1'}
              showsVerticalScrollIndicator={false}
              keyExtractor={({uid, name}) => `${uid}${name}`}
              contentContainerStyle={styles.listContentContainer}
              extraData={list}
              style={{
                width: '100%',
              }}
              ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
              renderItem={({item, index}) => {
                return isHost ? (
                  <ItemRequestHost
                    item={item}
                    setRequestsForHost={setRequestsForHost}
                    handleOpenMatch={handleOpenMatch}
                    setIsVisibleModalFullEvent={() => setIsVisibleModalFullEvent(true)}
                    fetchHostRequests={fetchHostRequests}
                  />
                ) : (
                  // @ts-ignore
                  <ItemRequestGuest
                    // @ts-ignore
                    list={item}
                    item={item?.usersList?.filter((i: Event.User) => i?.uid === userInfo?.uid)}
                    setDataForGuest={setDataForGuest}
                    handleOpenMatch={handleOpenMatch}
                    index={index}
                  />
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 16}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 932), marginBottom: 18}}>
                      You don't have any requests
                    </Text>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 932), marginBottom: 34}}>
                      Get started to {isHost ? 'invite guests' : 'join events and begin receiving event requests.'}
                    </Text>
                    <Button title={isHost ? 'Invite guests' : 'Join events'} onPress={() => navigation.navigate(IOPath as never)} />
                  </View>
                );
              }}
            />
          </View>
        );
    }
  };

  if (loadingRequestItems && !list.length && !isVisibleMatch) {
    return (
      <>
        <Loading
          wrapperText={false}
          text={`Fetching the latest ${isHost ? 'guest' : 'event'} requests for you. This may take a second!`}
          userInfo={userInfo}
        />
        {!userInfo?.accountReviewed && !userInfo?.accountConfirmed && (
          <ModalLockAccount haveCode isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} isVisibleButton={true} />
        )}
      </>
    );
  }

  if (userInfo?.uid && !userInfo?.accountConfirmed && !rejectModalVisible && !acceptModalVisible) {
    return (
      <View style={styles.container}>
        <ModalLockAccount isVisibleButton isPremium={userInfo?.accountPremium} accountType={userInfo?.accountType} />
      </View>
    );
  }

  if (!!userInfo?.accountConfirmed && isHost && !myEvents?.length && !loadingMyEvents) {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 70}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(48, 812), marginBottom: 18}}>
            Share a Table or Event
          </Text>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), marginBottom: 34}}>
            Get started by creating an event to begin inviting guests.
          </Text>
          <Button title="Create event" onPress={goToCreateEvent} />
        </View>
      </View>
    );
  }

  const headerInfoEvent = () => {
    return (
      <>
        {userInfo?.accountType === 'host' && !!activeEvent?.id && (
          <View
            style={{
              width: '100%',
              paddingHorizontal: 24,
            }}>
            <View
              style={{
                height: 65,
                // width: '100%',
                borderWidth: 1,
                borderColor: whiteColor,
                borderRadius: 12,
                marginBottom: 18,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: RFValue(16, 812), color: whiteColor, fontFamily: Satoshi500}}>
                Join Requests: {totalRequestsGuests}
              </Text>
              <View>
                <View style={{width: 1.25, height: 6, borderRadius: 2, backgroundColor: whiteColor}} />
                <View style={{width: 1.25, height: 10, borderRadius: 2, backgroundColor: whiteColor, marginTop: 5}} />
                <View style={{width: 1.25, height: 10, borderRadius: 2, backgroundColor: whiteColor, marginTop: 5}} />
                <View style={{width: 1.25, height: 6, borderRadius: 2, backgroundColor: whiteColor, marginTop: 4}} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <FastImage
                  source={{uri: activeEvent?.photos?.[0].image}}
                  style={{width: 39, height: 39, borderRadius: 39, borderWidth: 1, borderColor: whiteColor, alignSelf: 'center'}}
                />
                <View style={{marginLeft: 10, alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(26, 812),
                      color: whiteColor,
                      fontFamily: Satoshi700,
                    }}>
                    {acceptQuantityGuest}/{totalQuantityGuests}
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(12, 812),
                      color: whiteColor,
                      fontFamily: Satoshi500,
                    }}>
                    Guest List
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </>
    );
  };

  if (isHost && !activeEvent?.eventReviewed && myEvents?.length && !loadingMyEvents) {
    return (
      <View style={styles.container}>
        {headerInfoEvent()}
        <View style={{paddingHorizontal: 30}}>
          <FastImage
            style={{
              width: '100%',
              height: screenHeight * 0.22,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            source={{uri: activeEvent?.photos?.[0].image}}>
            <View style={{width: '100%', height: '100%', backgroundColor: transparentGray70Color, position: 'absolute'}} />
            <View style={{flexDirection: 'row'}}>
              <Clock width={32} height={32} />
              <Text
                style={{
                  color: whiteColor,
                  fontFamily: Satoshi500,
                  fontSize: RFValue(26, 812),
                  marginLeft: 10,
                }}>
                Event in review
              </Text>
            </View>
          </FastImage>
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {userInfo?.photos?.length && <ModalRejectAccount isVisible={rejectModalVisible} image={userInfo?.photos?.[0].image} />}
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
        <ModalFullEvent
          isVisible={isVisibleModalFullEvent}
          idEvent={activeEvent.id}
          setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}
        />
        {headerInfoEvent()}
        {isHost && activeEvent?.id && acceptQuantityGuest >= totalQuantityGuests && totalQuantityGuests > 0 && acceptQuantityGuest > 0 && (
          <FullEvent
            text={`Event is full: ${acceptQuantityGuest}/${totalQuantityGuests} Guests Accepted`}
            activeEvent={activeEvent}
            totalQuantityGuests={totalQuantityGuests}
            totalRequestsGuests={totalRequestsGuests}
            acceptQuantityGuest={acceptQuantityGuest}
            rightComponent={
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <PersoneIcon width={16} height={16} />
                <Text
                  style={{
                    fontFamily: Satoshi700,
                    fontSize: RFValue(12, 812),
                    color: whiteColor,
                    marginLeft: 2,
                  }}>{`${acceptQuantityGuest}/${totalQuantityGuests}`}</Text>
              </View>
            }
          />
        )}
        {getEventListItem()}
      </View>
      <Match isVisibleMatch={isVisibleMatch} matchData={matchData} onCloseMatch={handleCloseMatch} />
    </>
  );
};

export default Requests;

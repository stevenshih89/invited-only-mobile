import {
  blackColor,
  lightGray2Color,
  lightGreen2Color,
  lightGreenColor,
  lightRedColor,
  transparentWhite16Color,
  whiteColor,
} from 'constants/colors';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ClockIcon from 'assets/images/icons/clock-white.svg';
import TrashRed from 'assets/images/icons/trash-red.svg';
import CheckIcon from 'assets/images/icons/check-circle.svg';
import InfoCircleGray from 'assets/images/icons/info-circle-white.svg';
import PeopleIcon from 'assets/images/icons/Users.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import MoreIcon from 'assets/images/icons/more-white.svg';
import ClockFilledIcon from 'assets/images/icons/clock-white-fill.svg';
import AcceptIcon from 'assets/images/icons/accept.svg';
import CloseCircleFillIcon from 'assets/images/icons/close-circle-fill.svg';
import {FlatList, Image, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {ScrollView, View} from 'react-native';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {commonStackPath, eventEditingPath} from 'constants/pathLocations';
import React, {FC, useCallback, useEffect, useState} from 'react';
import ModalCancelEvent from 'screens/App/MyEvents/EventEditing/ModalCancelEvent';
import ModalUserProfileEvent from 'components/Modal/ModalUserProfileEvent/ModalUserProfileEvent.tsx';
import {ACCEPTED_STATUS, APPROVED_STATUS, INVITE_MATCH_STATUS, NOT_ACCEPTED_STATUS, screenHeight, screenWidth} from 'constants/common';
import {checkIsFullGuests} from 'helpers/checkIsFullGuests';
import ModalFullEvent from 'components/Modal/ModalFullEvent';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {Event, EventData} from 'src/types/event';
import FastImage from 'react-native-fast-image';
import {getUsersListAccepted} from 'helpers/getUsersListAccepted';

const EventActiveInfo: FC<any> = ({navigation, route}) => {
  const GUEST_LIST = 'GUEST_LIST';
  const EVENT_INFO = 'EVENT_INFO';
  const {list} = route?.params;
  const {usersList, photos, placeName, description, hour, date, female, femaleFriend, male, name, id} = list as EventData;

  const [usersListData, setUsersListsData] = useState<any>(usersList);
  const [activeTab, setActiveTab] = useState(GUEST_LIST);

  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState<Event.User | null>(null);
  const [modalReport, setModalReport] = useState(false);
  const [totalQuantityGuests, setTotalQuantityGuests] = useState<number>(0);
  const [acceptQuantityGuest, setAcceptQuantityGuest] = useState<number>(0);
  const [totalRequestsGuests, setTotalRequestsGuests] = useState<number>(0);
  const [isVisibleModalFullEvent, setIsVisibleModalFullEvent] = useState<boolean>(false);

  const invitedGuests = usersListData?.filter((i: Event.User) => i?.status === INVITE_MATCH_STATUS);
  const approvedGuests = usersListData?.filter((i: Event.User) => i?.status === APPROVED_STATUS);
  const acceptedGuests = usersListData?.filter((i: Event.User) => i?.status === ACCEPTED_STATUS);
  const rejectedGuests = usersListData?.filter((i: Event.User) => i?.status === NOT_ACCEPTED_STATUS);

  const maxGuests = female + male;

  const [isVisibleCancelModal, setIsVisibleCancelModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = firestore()
        .collection('Events')
        .doc(id)
        .onSnapshot(querySnapshot => {
          if (querySnapshot.exists) {
            const data = querySnapshot.data();
            setUsersListsData(data?.usersList);
          }
        });

      return () => unsubscribe();
    }, [list]),
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsVisibleCancelModal(true)}>
          <TrashRed style={{marginHorizontal: 20, marginVertical: 10}} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const checkIsFullGuestsFun = async () => {
    const {allGuests, findAcceptedGuest, totalRequestsGuests} = await checkIsFullGuests(id);
    if (findAcceptedGuest >= allGuests) {
      setTotalQuantityGuests(allGuests);
    }
    setTotalRequestsGuests(totalRequestsGuests);
    setAcceptQuantityGuest(findAcceptedGuest);
    return findAcceptedGuest >= allGuests;
  };

  const renderEventContent = () => {
    switch (activeTab) {
      case GUEST_LIST:
        return (
          <>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 7,
                borderWidth: 1,
                borderColor: whiteColor,
                borderRadius: 12,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <FastImage
                source={{uri: photos[0]?.image}}
                style={{width: 40, height: 40, borderRadius: 40, borderWidth: 1, borderColor: whiteColor}}
              />
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(28, 812),
                  }}>
                  {getUsersListAccepted(usersList)}/{male + female}
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(12, 812),
                  }}>
                  Guest List
                </Text>
              </View>
            </View>
            {!!invitedGuests.length && (
              <View
                style={{
                  paddingBottom: 16,
                  marginTop: 14,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(15, 812)}}>New Connection </Text>
                  <View style={{paddingHorizontal: 12, paddingVertical: 7, backgroundColor: lightGray2Color, borderRadius: 10}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812)}}>{invitedGuests.length}</Text>
                  </View>
                </View>
                <FlatList
                  scrollEnabled={false}
                  data={invitedGuests}
                  ItemSeparatorComponent={() => <View style={{height: 16}} />}
                  renderItem={({item}) => (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                          <ImageBackground
                            source={{uri: item?.userPhoto}}
                            style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}
                            imageStyle={{width: 50, height: 50, borderRadius: 200}}
                            resizeMode="cover"
                          />
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: blackColor,
                              width: 10,
                              height: 10,
                              borderRadius: 10,
                              backgroundColor: lightGreenColor,
                              position: 'absolute',
                              right: 0,
                              bottom: 5,
                            }}
                          />
                        </View>
                        <Text
                          style={{color: whiteColor, marginRight: 8, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
                          {item?.name}
                        </Text>
                        <View
                          style={{paddingVertical: 4, paddingHorizontal: 7, backgroundColor: whiteColor, borderRadius: 10, marginLeft: 8}}>
                          <Text
                            style={{
                              color: blackColor,
                              fontFamily: Satoshi500,
                              fontSize: RFValue(10, 812),
                            }}>
                            New
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: whiteColor,
                          paddingVertical: 8,
                          paddingHorizontal: 12,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          setModalVisible(true);
                          setUser(item);
                        }}>
                        <Text
                          style={{
                            color: blackColor,
                            fontFamily: Satoshi500,
                            fontSize: RFValue(14, 812),
                          }}>
                          Manage
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
            {!!approvedGuests.length && (
              <View
                style={{
                  paddingBottom: 16,
                  marginTop: 14,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(15, 812)}}>Approved - Pending</Text>
                  <View style={{paddingHorizontal: 12, paddingVertical: 7, backgroundColor: lightGray2Color, borderRadius: 10}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812)}}>{invitedGuests.length}</Text>
                  </View>
                </View>
                <FlatList
                  scrollEnabled={false}
                  data={approvedGuests}
                  ItemSeparatorComponent={() => <View style={{height: 16}} />}
                  renderItem={({item}) => (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                          <ImageBackground
                            source={{uri: item?.userPhoto}}
                            style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}
                            imageStyle={{width: 50, height: 50, borderRadius: 200}}
                            resizeMode="cover"
                          />
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: blackColor,
                              width: 10,
                              height: 10,
                              borderRadius: 10,
                              backgroundColor: lightGreenColor,
                              position: 'absolute',
                              right: 0,
                              bottom: 5,
                            }}
                          />
                        </View>
                        <Text
                          style={{color: whiteColor, marginRight: 8, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
                          {item?.name}
                        </Text>
                        <ClockFilledIcon width={20} height={20} />
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: whiteColor,
                          paddingVertical: 8,
                          paddingHorizontal: 12,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          setModalVisible(true);
                          setUser(item);
                        }}>
                        <Text
                          style={{
                            color: blackColor,
                            fontFamily: Satoshi500,
                            fontSize: RFValue(14, 812),
                          }}>
                          Manage
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
            {!!acceptedGuests.length && (
              <View
                style={{
                  borderTopWidth: 1,
                  borderStyle: 'solid',
                  borderTopColor: transparentWhite16Color,
                  paddingTop: 16,
                  marginTop: 14,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(15, 812)}}>Accepted</Text>
                  <View style={{paddingHorizontal: 12, paddingVertical: 7, backgroundColor: lightGray2Color, borderRadius: 10}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812)}}>{acceptedGuests.length}</Text>
                  </View>
                </View>
                <FlatList
                  scrollEnabled={false}
                  data={acceptedGuests}
                  ItemSeparatorComponent={() => <View style={{height: 16}} />}
                  renderItem={({item}) => (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                          <ImageBackground
                            source={{uri: item?.userPhoto}}
                            style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}
                            imageStyle={{width: 50, height: 50, borderRadius: 200}}
                            resizeMode="cover"
                          />
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: blackColor,
                              width: 10,
                              height: 10,
                              borderRadius: 10,
                              backgroundColor: lightGreenColor,
                              position: 'absolute',
                              right: 0,
                              bottom: 5,
                            }}
                          />
                        </View>
                        <Text
                          style={{color: whiteColor, marginRight: 8, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
                          {item?.name}
                        </Text>
                        <AcceptIcon />
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: whiteColor,
                          paddingVertical: 8,
                          paddingHorizontal: 12,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          setModalVisible(true);
                          setUser(item);
                        }}>
                        <Text
                          style={{
                            color: blackColor,
                            fontFamily: Satoshi500,
                            fontSize: RFValue(14, 812),
                          }}>
                          Manage
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
            {!!rejectedGuests.length && (
              <View
                style={{
                  borderTopWidth: 1,
                  borderStyle: 'solid',
                  borderTopColor: transparentWhite16Color,
                  paddingTop: 16,
                  marginTop: 14,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(15, 812)}}>Not accepted</Text>
                  <View style={{paddingHorizontal: 12, paddingVertical: 7, backgroundColor: lightGray2Color, borderRadius: 10}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812)}}>{rejectedGuests.length}</Text>
                  </View>
                </View>
                <FlatList
                  scrollEnabled={false}
                  data={rejectedGuests}
                  ItemSeparatorComponent={() => <View style={{height: 16}} />}
                  renderItem={({item}) => (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                          <ImageBackground
                            source={{uri: item?.userPhoto}}
                            style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}
                            imageStyle={{width: 50, height: 50, borderRadius: 200}}
                            resizeMode="cover"
                          />
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: blackColor,
                              width: 10,
                              height: 10,
                              borderRadius: 10,
                              backgroundColor: lightGreenColor,
                              position: 'absolute',
                              right: 0,
                              bottom: 5,
                            }}
                          />
                        </View>
                        <Text
                          style={{color: whiteColor, marginRight: 8, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
                          {item?.name}
                        </Text>
                        <CloseCircleFillIcon />
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: whiteColor,
                          paddingVertical: 8,
                          paddingHorizontal: 12,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          setModalVisible(true);
                          setUser(item);
                        }}>
                        <Text
                          style={{
                            color: blackColor,
                            fontFamily: Satoshi500,
                            fontSize: RFValue(14, 812),
                          }}>
                          Manage
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
            <Button
              title="Edit event"
              buttonStyle={{marginVertical: 34}}
              onPress={() =>
                navigation.navigate(commonStackPath, {screen: eventEditingPath, params: {isEditingItems: list, isEditing: true}})
              }
            />
          </>
        );
      case EVENT_INFO:
        return (
          <View style={{backgroundColor: blackColor, borderRadius: 10, paddingBottom: 20}}>
            <View style={{paddingTop: 0}}>
              <View>
                {photos.length > 0 && (
                  <Image
                    source={{
                      uri: photos[0].image,
                    }}
                    style={{width: '100%', height: 216, borderRadius: 20}}
                    resizeMode="cover"
                  />
                )}
                {/* {photos?.map((i: any, index: number) => (
                  <Image
                    source={{
                      uri: i?.image,
                    }}
                    style={{width: '100%', height: 178, marginTop: index !== 0 ? 28 : 0, borderRadius: 20}}
                    resizeMode="cover"
                  />
                ))} */}
              </View>
              <Text style={[{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812), marginTop: 20}]}>Event details</Text>
              <Text style={{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812)}}>Place name</Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>{placeName}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812)}, {marginTop: 20}]}>
                Event name
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>{name}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812)}, {marginTop: 20}]}>
                Event description
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>{description}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: whiteColor, opacity: 0.3, marginTop: 14}} />
              <View style={{marginTop: 28}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                  <CalendarIcon width={16} height={16} />
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>{date}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                  <ClockIcon width={16} height={16} />
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>{hour}</Text>
                </View>
                {/* <Button
                  title="Edit event"
                  buttonStyle={{marginBottom: 4}}
                  onPress={() =>
                    navigation.navigate(commonStackPath, {screen: eventEditingPath, params: {isEditingItems: list, isEditing: true}})
                  }
                /> */}
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                  <PeopleIcon width={16} height={16} />
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>
                    {female + femaleFriend}x girl
                  </Text>
                </View>
              </View>
              {photos?.map((i, index) => {
                if (photos[index].image) {
                  return (
                    <Image
                      key={index}
                      source={{uri: i?.image}}
                      style={{width: '100%', height: 216, borderRadius: 20, marginBottom: 34}}
                      resizeMode="cover"
                    />
                  );
                }
              })}
            </View>
            <TouchableOpacity
              onPress={() => setIsVisibleCancelModal(true)}
              activeOpacity={0.7}
              style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingTop: 34}}
              hitSlop={{bottom: 15}}>
              <TrashRed />
              <Text style={{color: lightRedColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 6}}>Cancel event</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <>
      <View style={{backgroundColor: blackColor, flex: 1, paddingHorizontal: 20}}>
        <ModalFullEvent isVisible={isVisibleModalFullEvent} idEvent={id} setIsVisibleModalFullEvent={setIsVisibleModalFullEvent} />
        <View
          style={{
            marginTop: screenHeight / 43,
            marginBottom: screenHeight / 30,
            alignItems: 'center',
            flexDirection: 'row',
            borderTopColor: transparentWhite16Color,
            borderTopWidth: 1,
            borderStyle: 'solid',
            paddingTop: 20,
          }}>
          <TouchableOpacity
            style={[
              {backgroundColor: whiteColor, paddingVertical: screenWidth / 60, paddingHorizontal: screenHeight / 70, borderRadius: 8},
              {flex: 1, alignItems: 'center', backgroundColor: activeTab === GUEST_LIST ? whiteColor : lightGray2Color},
            ]}
            onPress={() => setActiveTab(GUEST_LIST)}>
            <Text
              style={[
                {
                  fontFamily: Satoshi500,
                  fontSize: RFValue(16, 812),
                  color: activeTab === GUEST_LIST ? blackColor : whiteColor,
                },
              ]}>
              Guests list
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                paddingVertical: screenHeight / 130,
                paddingHorizontal: screenWidth / 32,
                borderRadius: 8,
                marginLeft: screenWidth / 65,
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: activeTab === EVENT_INFO ? whiteColor : lightGray2Color,
              },
            ]}
            onPress={() => setActiveTab(EVENT_INFO)}>
            <Text
              style={[
                {
                  fontFamily: Satoshi400,
                  fontSize: RFValue(16, 812),
                  color: activeTab === EVENT_INFO ? blackColor : whiteColor,
                },
              ]}>
              Event info
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop: 20, paddingBottom: 50}} style={{flex: 1}}>
          {renderEventContent()}
        </ScrollView>
        {activeTab === 'EVENT_INFO' && (
          <Button
            title="Edit event"
            buttonStyle={{marginBottom: 28}}
            onPress={() =>
              navigation.navigate(commonStackPath, {screen: eventEditingPath, params: {isEditingItems: list, isEditing: true}})
            }
          />
        )}
      </View>
      <ModalUserProfileEvent
        uid={user?.uid}
        list={list}
        usersList={usersListData}
        title={user?.name}
        image={user?.userPhoto}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        setUsersListsData={setUsersListsData}
        modalReport={modalReport}
        setModalReport={setModalReport}
        checkIsFullGuestsFun={checkIsFullGuestsFun}
        setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}
      />
      <ModalCancelEvent
        id={list?.id}
        image={photos[0]?.image}
        isVisible={isVisibleCancelModal}
        onClose={() => setIsVisibleCancelModal(false)}
        nameEvent={list?.name}
      />
    </>
  );
};

export default EventActiveInfo;

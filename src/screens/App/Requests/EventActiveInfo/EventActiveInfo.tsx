import {FlatList, Image, ImageBackground, Text, TouchableOpacity,ScrollView, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import React, {FC, useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import MyEventsCard from 'components/Cards/MyEventsCard/MyEventsCard';
import Config from 'react-native-config';
import ModalCancelEvent from 'screens/App/MyEvents/EventEditing/ModalCancelEvent';
import {black3Color, blackColor, lightGray2Color, lightGreenColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import TrashRed from 'assets/images/icons/trash-red.svg';
import ClockFilledIcon from 'assets/images/icons/clock-white-fill.svg';
import AcceptIcon from 'assets/images/icons/accept.svg';
import CloseCircleFillIcon from 'assets/images/icons/close-circle-fill.svg';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import Button from 'components/Button/Button';
import {commonStackPath, eventEditingPath} from 'constants/pathLocations';
import ModalUserProfileEvent from 'components/Modal/ModalUserProfileEvent/ModalUserProfileEvent.tsx';
import {ACCEPTED_STATUS, APPROVED_STATUS, INVITE_MATCH_STATUS, NOT_ACCEPTED_STATUS, screenHeight, screenWidth} from 'constants/common';
import {checkIsFullGuests} from 'helpers/checkIsFullGuests';
import ModalFullEvent from 'components/Modal/ModalFullEvent';
import {Event, EventData} from 'src/types/event';
import {useUser} from 'src/store/userStore';

const EventActiveInfo: FC<any> = ({navigation, route}) => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const GUEST_LIST = 'GUEST_LIST';
  const EVENT_INFO = 'EVENT_INFO';
  const {list, isGuest} = route?.params;

  const {
    usersList,
    photos,
    placeName,
    description,
    hour,
    date,
    female,
    femaleFriend,
    male,
    name,
    id,
    isCancelled,
    statusEvent,
    eventReviewed,
    requestsList,
    address,
  } = list as EventData;

  const [usersListData, setUsersListsData] = useState<any>(usersList);
  const [activeTab, setActiveTab] = useState(isGuest ? EVENT_INFO : GUEST_LIST);

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

  const userInfo = useUser((i: any) => i?.user);

  const [isVisibleCancelModal, setIsVisibleCancelModal] = useState(false);

  useEffect(() => {
    if (!isCancelled && !isGuest) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setIsVisibleCancelModal(true)}>
            <TrashRed style={{marginHorizontal: 20, marginVertical: 10}} />
          </TouchableOpacity>
        ),
      });
    }
  }, [isCancelled]);

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
          <View style={{backgroundColor: black3Color, padding: 20, borderRadius: 10}}>
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
                  {acceptedGuests.length}/{male + female}
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
            <View
              style={{
                marginTop: 26,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: invitedGuests.length ? 16 : 0,
                }}>
                <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(15, 812)}}>New Connection</Text>
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
                      <Text style={{color: whiteColor, marginRight: 8, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
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
            <View
              style={{
                borderTopWidth: 1,
                borderStyle: 'solid',
                borderTopColor: transparentWhite16Color,
                paddingTop: 14,
                marginTop: 14,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: approvedGuests.length ? 16 : 0,
                }}>
                <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(15, 812)}}>Approved - Pending</Text>
                <View style={{paddingHorizontal: 12, paddingVertical: 7, backgroundColor: lightGray2Color, borderRadius: 10}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812)}}>{approvedGuests.length}</Text>
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
                      <Text style={{color: whiteColor, marginRight: 8, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
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
            <View
              style={{
                borderTopWidth: 1,
                borderStyle: 'solid',
                borderTopColor: transparentWhite16Color,
                paddingTop: 14,
                marginTop: 14,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: acceptedGuests.length ? 16 : 0,
                }}>
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
                      <Text style={{color: whiteColor, marginRight: 8, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
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
            <View
              style={{
                borderTopWidth: 1,
                borderStyle: 'solid',
                borderTopColor: transparentWhite16Color,
                paddingTop: 14,
                marginTop: 14,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: rejectedGuests.length ? 16 : 0,
                }}>
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
                      <Text style={{color: whiteColor, marginRight: 8, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
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
          </View>
        );
      case EVENT_INFO:
        return (
          <View style={{backgroundColor: blackColor, borderRadius: 10, paddingBottom: 34}}>
            <View
              style={{
                paddingTop: isGuest ? 17 : 0,
                marginTop: isGuest ? 17 : 0,
                borderTopWidth: isGuest ? 1 : 0,
                borderTopColor: transparentWhite16Color,
              }}>
              <Text
                style={{
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(18, 812),
                    marginBottom: 17,
                  }}>
                Event details
              </Text>
              <MyEventsCard
                imageBg={photos}
                statusEvent={statusEvent}
                eventReviewed={eventReviewed}
                allPeople={female + male}
                date={date}
                textCityName={name}
                placeName={placeName}
                estimeTime={hour}
                numberOfGirlsInvited={female}
                accountConfirmed={userInfo?.accountConfirmed}
                findAcceptedGuest={usersList?.filter(item => item.status === INVITE_MATCH_STATUS)}
                totalRequestsGuests={requestsList?.length}
                item={list}
                showGuestList={false}
                showDotLine={false}
                showEventType={true}
                styleContainer={{marginTop: 0, marginBottom: 0}}
              />
              <Text style={{marginTop: 17, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}>Place name</Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>{placeName}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}, {marginTop: 20}]}>
                Event name
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>{name}</Text>
              <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
              {description && (
                <>
                  <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}, {marginTop: 20}]}>
                    Event description
                  </Text>
                  <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>{description}</Text>
                  <View style={{width: '100%', height: 1, backgroundColor: transparentWhite16Color, marginTop: 14}} />
                </>
              )}
              <Text style={[{marginTop: 14, color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}, {marginTop: 34}]}>
                Address
              </Text>
              <Text style={{marginTop: 6, color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>{address}</Text>
              {photos?.map((i, index) => {
                if (photos[index].image && index > 0) {
                  return (
                    <Image
                      key={index}
                      source={{uri: i?.image}}
                      style={{width: '100%', height: 216, borderRadius: 20, marginTop: 34}}
                      resizeMode="cover"
                    />
                  );
                }
              })}
            </View>
          </View>
        );
    }
  };

  return (
    <>
      <View style={{backgroundColor: blackColor, flex: 1, paddingHorizontal: 20}}>
        <ModalFullEvent isVisible={isVisibleModalFullEvent} idEvent={id} setIsVisibleModalFullEvent={setIsVisibleModalFullEvent} />
        {!isGuest && (
          <View
            style={{
              marginTop: screenHeight / 43,
              alignItems: 'center',
              flexDirection: 'row',
              borderTopColor: transparentWhite16Color,
              borderTopWidth: 1,
              borderStyle: 'solid',
              paddingVertical: 17,
            }}>
            <TouchableOpacity
              style={[
                {backgroundColor: whiteColor, paddingVertical: screenWidth / 60, paddingHorizontal: screenHeight / 70, borderRadius: 8},
                {flex: 1, alignItems: 'center', backgroundColor: activeTab === GUEST_LIST ? whiteColor : lightGray2Color},
              ]}
              onPress={() => setActiveTab(GUEST_LIST)}>
              <Text
                style={{
                    fontFamily: Satoshi500,
                    fontSize: RFValue(16, 812),
                    color: activeTab === GUEST_LIST ? blackColor : whiteColor,
                  }}>
                Guests list
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                  paddingVertical: screenHeight / 130,
                  paddingHorizontal: screenWidth / 32,
                  borderRadius: 8,
                  marginLeft: screenWidth / 65,
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: activeTab === EVENT_INFO ? whiteColor : lightGray2Color,
                }}
              onPress={() => setActiveTab(EVENT_INFO)}>
              <Text
                style={{
                    fontFamily: Satoshi400,
                    fontSize: RFValue(16, 812),
                    color: activeTab === EVENT_INFO ? blackColor : whiteColor,
                  }}>
                Event info
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {renderEventContent()}
        </ScrollView>
        {activeTab === 'EVENT_INFO' && !isCancelled && !isGuest && (
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

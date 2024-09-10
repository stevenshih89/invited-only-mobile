import {blackColor, lightGray2Color, lightRedColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ClockIcon from 'assets/images/icons/clock-white.svg';
import TrashRed from 'assets/images/icons/trash-red.svg';
import CheckIcon from 'assets/images/icons/check-circle.svg';
import InfoCircleGray from 'assets/images/icons/info-circle-white.svg';
import PeopleIcon from 'assets/images/icons/Users.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import MoreIcon from 'assets/images/icons/more-white.svg';
import ClockFilledIcon from 'assets/images/icons/clock-white-fill.svg';
import {FlatList, Image, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {ScrollView, View} from 'react-native';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {commonStackPath, eventEditingPath} from 'constants/pathLocations';
import React, {FC, useEffect, useState} from 'react';
import ModalCancelEvent from 'screens/App/MyEvents/EventEditing/ModalCancelEvent';
import ModalUserProfileEvent from 'components/Modal/ModalUserProfileEvent/ModalUserProfileEvent.tsx';
import {screenHeight, screenWidth} from 'constants/common';
import { checkIsFullGuests } from 'helpers/checkIsFullGuests';
import ModalFullEvent from 'components/Modal/ModalFullEvent';

const EventActiveInfo: FC<any> = ({navigation, route}) => {
  const GUEST_LIST = 'GUEST_LIST';
  const EVENT_INFO = 'EVENT_INFO';
  const {list} = route?.params;
  const {usersList, photos, placeName, description, hour, date, female, femaleFriend, male, name, id} = list;

  const [usersListData, setUsersListsData] = useState<any>(usersList);
  const [activeTab, setActiveTab] = useState(GUEST_LIST);

  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [modalReport, setModalReport] = useState(false);
  const [totalQuantityGuests, setTotalQuantityGuests] = useState<number>(0);
  const [acceptQuantityGuest, setAcceptQuantityGuest] = useState<number>(0);
  const [totalRequestsGuests, setTotalRequestsGuests] = useState<number>(0);
  const [isVisibleModalFullEvent, setIsVisibleModalFullEvent] = useState<boolean>(false);

  const invitedGuests = usersListData?.filter(i => i?.status === 'invite_match');
  const approvedGuests = usersListData?.filter(i => i?.status === 'approved');
  const acceptedGuests = usersListData?.filter(i => i?.status === 'accepted');
  const rejectedGuests = usersListData?.filter(i => i?.status === 'notAccepted');

  const maxGuests = female + male;

  const [isVisibleCancelModal, setIsVisibleCancelModal] = useState(false);

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
    if(findAcceptedGuest >= allGuests) {
      setTotalQuantityGuests(allGuests)
    }
    setTotalRequestsGuests(totalRequestsGuests);
    setAcceptQuantityGuest(findAcceptedGuest);
    return findAcceptedGuest >= allGuests
  }


  const renderEventContent = () => {
    switch (activeTab) {
      case GUEST_LIST:
        return (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{color: whiteColor, fontSize: RFValue(17, 812), fontFamily: Satoshi700}}>Your guests</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                }}>
                <PeopleIcon />
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(12, 812),
                    marginLeft: 4,
                  }}>{`${acceptedGuests.length}/${maxGuests}`}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 6}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: whiteColor, marginRight: 6, fontFamily: Satoshi500, fontSize: RFValue(15, 812)}}>Women</Text>
                <View style={{backgroundColor: lightGray2Color, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(15, 812)}}>{female}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 24}}>
                <Text style={{color: whiteColor, marginRight: 6, fontFamily: Satoshi500, fontSize: RFValue(15, 812)}}>Men</Text>
                <View style={{backgroundColor: lightGray2Color, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(15, 812)}}>{male}</Text>
                </View>
              </View>
            </View>
            {!!invitedGuests.length && (
              <View
                style={{
                  paddingBottom: 16,
                  marginTop: 14,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(15, 812)}}>Invite Match</Text>
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
                        <ImageBackground
                          source={{uri: item?.userPhoto}}
                          style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}
                          imageStyle={{width: 50, height: 50, borderRadius: 200}}
                          resizeMode="cover">
                          <ClockFilledIcon width={20} height={20} />
                        </ImageBackground>

                        <Text
                          style={{color: whiteColor, marginRight: 4, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
                          {item?.name}
                        </Text>
                        <FlashIcon width={13} height={13} />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(true);
                          setUser(item);
                        }}>
                        <MoreIcon />
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
                  <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(15, 812)}}>Approved</Text>
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
                        <ImageBackground
                          source={{uri: item?.userPhoto}}
                          style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}
                          imageStyle={{width: 50, height: 50, borderRadius: 200}}
                          resizeMode="cover">
                          <ClockFilledIcon width={20} height={20} />
                        </ImageBackground>

                        <Text
                          style={{color: whiteColor, marginRight: 4, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
                          {item?.name}
                        </Text>
                        <FlashIcon width={13} height={13} />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(true);
                          setUser(item);
                        }}>
                        <MoreIcon />
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
                        <ImageBackground
                          source={{uri: item?.userPhoto}}
                          style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}
                          imageStyle={{width: 50, height: 50, borderRadius: 200}}
                          resizeMode="cover">
                          <CheckIcon width={20} height={20} />
                        </ImageBackground>
                        <Text
                          style={{color: whiteColor, marginRight: 4, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
                          {item?.name}
                        </Text>
                        <FlashIcon width={13} height={13} />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(true);
                          setUser(item);
                        }}>
                        <MoreIcon />
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
                        <ImageBackground
                          source={{uri: item?.userPhoto}}
                          style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}
                          imageStyle={{width: 50, height: 50, borderRadius: 200}}
                          resizeMode="cover">
                          <InfoCircleGray width={20} height={20} />
                        </ImageBackground>
                        <Text
                          style={{color: whiteColor, marginRight: 4, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
                          {item?.name}
                        </Text>
                        <FlashIcon width={13} height={13} />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(true);
                          setUser(item);
                        }}>
                        <MoreIcon />
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
                <Button
                  title="Edit event"
                  buttonStyle={{marginBottom: 4}}
                  onPress={() =>
                    navigation.navigate(commonStackPath, {screen: eventEditingPath, params: {isEditingItems: list, isEditing: true}})
                  }
                />
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
      <ModalFullEvent isVisible={isVisibleModalFullEvent} idEvent={id} setIsVisibleModalFullEvent={setIsVisibleModalFullEvent}/>
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
      </View>
      <ModalUserProfileEvent
        uid={user?.uid}
        list={list}
        usersList={usersList}
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

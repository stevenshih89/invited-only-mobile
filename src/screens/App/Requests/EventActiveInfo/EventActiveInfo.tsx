import {lightGray2Color, lightGray5Color, lightGray6Color, lightRedColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import CalendarIcon from 'assets/images/icons/calendar.svg';
import ClockIcon from 'assets/images/icons/clock-white.svg';
import TrashRed from 'assets/images/icons/trash-red.svg';
import MapIcon from 'assets/images/icons/location.svg';
import EventBcg from 'assets/images/app/join-event-bg.png';
import TickCircleIcon from 'assets/images/icons/tick-circle.svg';
import InfoCircleGray from 'assets/images/icons/info-circle-gray.svg';
import PeopleIcon from 'assets/images/icons/Users.svg';
import FakePhoto from 'assets/images/app/fake-photo.png';
import FlashIcon from 'assets/images/icons/flash.svg';
import MoreIcon from 'assets/images/icons/more-white.svg';
import PendingClockIcon from 'assets/images/icons/pending-clock.svg';
import {FlatList, Image, ImageBackground, Text, TouchableOpacity} from 'react-native';
import {ScrollView, View} from 'react-native';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';

const EventActiveInfo = () => {
  const maxGuests = 10;
  const currentGuests = 5;
  const invitedGuests = [
    {id: 0, name: 'Simon', image: FakePhoto},
    {id: 1, name: 'Frank', image: FakePhoto},
    {id: 2, name: 'Lola', image: FakePhoto},
  ];
  const acceptedGuests = [
    {id: 0, name: 'Simon', image: FakePhoto},
    {id: 1, name: 'Frank', image: FakePhoto},
  ];
  const rejectedGuests = [{id: 1, name: 'Frank', image: FakePhoto}];

  return (
    <View style={{backgroundColor: lightGray6Color, flex: 1, paddingHorizontal: 20}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 20, paddingBottom: 50}}
        style={{flex: 1, borderTopColor: transparentWhite16Color, borderTopWidth: 1, borderStyle: 'solid'}}>
        <View style={{backgroundColor: lightGray5Color, borderRadius: 10, padding: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: whiteColor, fontSize: RFValue(24, 812), fontFamily: Satoshi400}}>All guests</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: lightGray2Color,
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
                }}>{`${currentGuests}/${maxGuests}`}</Text>
            </View>
          </View>
          {!!invitedGuests.length && (
            <View style={{borderBottomWidth: 1, borderStyle: 'solid', borderBottomColor: transparentWhite16Color, paddingBottom: 16, marginTop: 14}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Invited</Text>
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
                        source={item.image}
                        style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}
                        imageStyle={{width: 50, height: 50, borderRadius: 200}}
                        resizeMode="cover">
                        <PendingClockIcon width={20} height={20} />
                      </ImageBackground>

                      <Text style={{color: whiteColor, marginRight: 4, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
                        {item.name}
                      </Text>
                      <FlashIcon width={13} height={13} />
                    </View>
                    <View>
                      <MoreIcon />
                    </View>
                  </View>
                )}
              />
            </View>
          )}
          {!!acceptedGuests.length && (
            <View style={{borderBottomWidth: 1, borderStyle: 'solid', borderBottomColor: transparentWhite16Color, paddingBottom: 16, marginTop: 14}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Accepted</Text>
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
                        source={item.image}
                        style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}
                        imageStyle={{width: 50, height: 50, borderRadius: 200}}
                        resizeMode="cover">
                        <TickCircleIcon width={20} height={20} />
                      </ImageBackground>
                      <Text style={{color: whiteColor, marginRight: 4, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
                        {item.name}
                      </Text>
                      <FlashIcon width={13} height={13} />
                    </View>
                    <TouchableOpacity activeOpacity={0.7}>
                      <MoreIcon />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
          {!!rejectedGuests.length && (
            <View style={{borderBottomWidth: 1, borderStyle: 'solid', borderBottomColor: transparentWhite16Color, paddingBottom: 16, marginTop: 14}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Not accepted</Text>
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
                        source={item.image}
                        style={{justifyContent: 'center', alignItems: 'center', width: 50, height: 50}}
                        imageStyle={{width: 50, height: 50, borderRadius: 200}}
                        resizeMode="cover">
                        <InfoCircleGray width={20} height={20} />
                      </ImageBackground>
                      <Text style={{color: whiteColor, marginRight: 4, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginLeft: 14}}>
                        {item.name}
                      </Text>
                      <FlashIcon width={13} height={13} />
                    </View>
                    <TouchableOpacity activeOpacity={0.7}>
                      <MoreIcon />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
          <Button title="Edit" buttonStyle={{marginVertical: 34}} />
          <View style={{borderTopColor: transparentWhite16Color, borderStyle: 'solid', borderTopWidth: 1, paddingTop: 34}}>
            <Image source={EventBcg} style={{width: '100%', borderRadius: 20}} resizeMode="cover" />
            <Text style={{fontFamily: Satoshi400, fontSize: RFValue(24, 812), color: whiteColor, marginBottom: 14, marginTop: 34}}>
              Event details
            </Text>
            <View style={{flex: 1, marginBottom: 20}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812), marginBottom: 6}}>Place name</Text>
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>Amazonio</Text>
            </View>
            <View style={{flex: 1, marginBottom: 20}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812), marginBottom: 6}}>Event name</Text>
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>Dubai state</Text>
            </View>
            <View style={{flex: 1, marginBottom: 20}}>
              <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812), marginBottom: 6}}>Event description</Text>
              <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812)}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
              </Text>
            </View>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <CalendarIcon width={16} height={16} />
                <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>12.11.2023</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <ClockIcon width={16} height={16} />
                <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>12:00</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <MapIcon width={16} height={16} />
                <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>123 ASd12vfsdf</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <PeopleIcon width={16} height={16} />
                <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 812), marginLeft: 6}}>2x Girl</Text>
              </View>
            </View>
            <Image source={EventBcg} style={{width: '100%', borderRadius: 20, marginBottom: 34}} resizeMode="cover" />
            <Image source={EventBcg} style={{width: '100%', borderRadius: 20}} resizeMode="cover" />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingTop: 34}}
            hitSlop={{bottom: 15}}>
            <TrashRed />
            <Text style={{color: lightRedColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Cancel event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventActiveInfo;

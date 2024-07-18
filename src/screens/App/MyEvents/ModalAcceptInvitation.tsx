import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, lightGreenColor, transparent60Color, whiteColor} from 'constants/colors';
import CalendarBlank from 'assets/images/icons/CalendarBlank.svg';
import ProfileTwoUser from 'assets/images/icons/profile-2user.svg';
import Users from 'assets/images/icons/Users.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import {FC} from 'react';
import Button from 'components/Button/Button';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {Image} from 'react-native';
import {screenHeight} from 'constants/common';
import moment from 'moment';
import {commonStackPath, eventInfoPath} from 'constants/pathLocations';
import {useNavigation} from '@react-navigation/native';
import {calculateAge} from 'helpers/calculateAge';

const ModalAcceptInvitation: FC<{
  isVisible: boolean;
  onClose: () => void;
  handleAcceptInvitation: () => void;
  handleRejectInvitation: () => void;
  eventInfo: {host: any; id: number; image: string; textCityName: string; numberOfGirlsInvited: number; date: string};
  userInfo: any;
}> = ({isVisible, onClose, eventInfo, handleAcceptInvitation, handleRejectInvitation, userInfo}) => {
  const navigation = useNavigation();
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <View
        style={{
          backgroundColor: blackColor,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: 40,
          paddingTop: 16,
          paddingHorizontal: 30,
        }}>
        <View style={{backgroundColor: whiteColor, height: 2, borderRadius: 10, width: 40, alignSelf: 'center', marginBottom: 22}} />
        <ImageBackground
          source={{uri: eventInfo?.image}}
          resizeMode="cover"
          style={{height: screenHeight / 5, paddingTop: screenHeight / 100}}
          borderRadius={20}>
          <TouchableOpacity
            style={{
              backgroundColor: transparent60Color,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 14,
              paddingVertical: 6,
              paddingHorizontal: 12,
            }}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(commonStackPath, {
                screen: eventInfoPath,
                params: {list: eventInfo?.list, isAcceptedInvitation: eventInfo?.isAcceptedInvitation},
              } as never)
            }>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {eventInfo?.host?.image && <Image style={{borderRadius: 100, width: 40, height: 40}} source={{uri: eventInfo?.host.image}} />}
              <View style={{marginLeft: 6}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {userInfo?.accountType && (
                    <View
                      style={{
                        borderColor: whiteColor,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderRadius: 5,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                      }}>
                      <Text style={{textTransform: 'capitalize', color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(9, 812)}}>
                        {userInfo.accountType}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>
                    {userInfo?.name}
                    {userInfo?.date && `, ${calculateAge(userInfo.date)}`}
                  </Text>
                  {userInfo?.accountConfirmed && <CheckStarIcon width={12} height={12} style={{marginLeft: 4}} />}
                </View>
              </View>
            </View>
            <ArrowRight
              style={{
                marginTop: 5,
              }}
              width={14}
              height={14}
            />
          </TouchableOpacity>
          <View style={{marginTop: 'auto'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: 16}}>
              <View style={{backgroundColor: lightGreenColor, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 5, marginRight: 10}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(11, 812)}}>Active</Text>
              </View>
              <Text style={{fontFamily: Satoshi700, fontSize: RFValue(19, 812), color: whiteColor, marginRight: 8}}>
                {eventInfo?.placeName}
              </Text>
              {userInfo?.accountConfirmed && <CheckStarIcon />}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenHeight / 70, marginBottom: 10}}>
              <View
                style={{
                  backgroundColor: transparent60Color,
                  borderRadius: 50,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 2,
                }}>
                <ProfileTwoUser />
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(10, 812),
                    marginLeft: 6,
                  }}>
                  {eventInfo?.numberOfGirlsInvited} x Women invitation
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: transparent60Color,
                  borderRadius: 50,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CalendarBlank />
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(10, 812),
                    marginLeft: 6,
                  }}>
                  {moment(`${eventInfo?.date}`, 'D/M/YYYY, HH:mm:ss').format('DD MMMM YYYY')}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: transparent60Color,
                  borderRadius: 50,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Users />
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(10, 812),
                    marginLeft: 6,
                  }}>
                  {eventInfo?.joinedPeopleCount}/{eventInfo?.allPeople}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi500,
            fontSize: RFValue(20, 812),
            marginBottom: screenHeight / 18,
            textAlign: 'center',
          }}>
          {`${eventInfo?.host.name} has approved your invitation! Confirm?`}
        </Text>
        <Button title="Yes, confirm invitation" onPress={handleAcceptInvitation} />
        <Button title="No, reject invitation" variant="transparent" onPress={handleRejectInvitation} />
      </View>
    </Modal>
  );
};

export default ModalAcceptInvitation;

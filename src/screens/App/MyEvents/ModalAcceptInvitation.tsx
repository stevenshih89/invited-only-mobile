import {ImageBackground, Text, TouchableOpacity, View,Image} from 'react-native';
import Modal from 'react-native-modal';
import {FC} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  blackColor,
  lightGreenColor,
  transparent10Color,
  transparent60Color,
  transparent80Color,
  transparentGray90Color,
  whiteColor,
} from 'constants/colors';
import CalendarBlank from 'assets/images/icons/CalendarBlank.svg';
import Users from 'assets/images/icons/Users.svg';
import UserIcon from 'assets/images/icons/user.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import ArrowRightIcon from 'assets/images/icons/arrow-right.svg';
import Button from 'components/Button/Button';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {screenHeight} from 'constants/common';
import {commonStackPath, eventInfoPath} from 'constants/pathLocations';
import {calculateAge} from 'helpers/calculateAge';

const ModalAcceptInvitation: FC<{
  isVisible: boolean;
  onClose: () => void;
  handleAcceptInvitation: () => void;
  handleRejectInvitation: () => void;
  eventInfo: {list: any; host: any; id: number; image: string; textCityName: string; numberOfGirlsInvited: number; date: string};
  userInfo: any;
  hostInfo: any;
}> = ({isVisible, onClose, eventInfo, handleAcceptInvitation, handleRejectInvitation, hostInfo}) => {
  const navigation = useNavigation();
  const approvedCount = eventInfo?.list?.usersList.filter((i: {status: string}) => i?.status === 'accepted')?.length;
  const totalGuests = eventInfo?.list?.female + eventInfo?.list?.male;

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
          backgroundColor: transparentGray90Color,
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
          style={{height: screenHeight / 4, paddingTop: screenHeight / 100}}
          borderRadius={20}>
          <TouchableOpacity
            style={{
              backgroundColor: transparent60Color,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 14,
              paddingHorizontal: 14,
              paddingVertical: 10,
            }}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(commonStackPath, {
                screen: eventInfoPath,
                params: {list: eventInfo?.list, isAcceptedInvitation: eventInfo?.isAcceptedInvitation},
              } as never)
            }>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
              <View style={{flexDirection: 'row'}}>
                {eventInfo?.host?.image && (
                  <Image style={{borderRadius: 100, width: 40, height: 40}} source={{uri: eventInfo?.host.image}} />
                )}
                <View style={{gap: 4, marginLeft: 10}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {hostInfo?.accountType && (
                      <View
                        style={{
                          borderColor: whiteColor,
                          borderWidth: 1,
                          borderStyle: 'solid',
                          borderRadius: 4,
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          backgroundColor: blackColor,
                        }}>
                        <Text style={{textTransform: 'capitalize', color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(10, 812)}}>
                          {hostInfo?.accountType}
                        </Text>
                      </View>
                    )}
                    {hostInfo?.accountPremium && (
                      <LinearGradient
                        colors={['#977B4A', '#E5D291', '#A28453']}
                        style={{
                          marginLeft: 5,
                          borderRadius: 4,
                          paddingHorizontal: 12,
                          paddingVertical: 3,
                          backgroundColor: blackColor,
                        }}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                        {true && (
                          <Text
                            style={{
                              color: blackColor,
                              fontSize: RFValue(10, 812),
                              fontFamily: Satoshi400,
                              fontWeight: 'bold',
                            }}>
                            Premium
                          </Text>
                        )}
                      </LinearGradient>
                    )}
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontFamily: Satoshi700, fontSize: RFValue(20, 812), color: whiteColor}}>
                      {hostInfo?.name}
                      {hostInfo?.date && `, ${calculateAge(hostInfo.date)}`}
                    </Text>
                    {hostInfo?.accountConfirmed && <CheckStarIcon width={15} height={15} style={{marginLeft: 8}} />}
                  </View>
                </View>
              </View>
              <ArrowRightIcon />
            </View>
          </TouchableOpacity>
          <View style={{marginTop: 'auto'}}>
            <LinearGradient
              colors={[transparent10Color, transparent60Color, transparent80Color]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={{borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: 16, marginTop: 30}}>
                <View
                  style={{backgroundColor: lightGreenColor, paddingHorizontal: 6, paddingVertical: 4, borderRadius: 5, marginRight: 10}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(12, 812)}}>Active</Text>
                </View>
                <Text style={{fontFamily: Satoshi700, fontSize: RFValue(20, 812), color: whiteColor, marginRight: 8}}>
                  {eventInfo?.host.name}
                </Text>
                {hostInfo?.accountConfirmed && <CheckStarIcon />}
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenHeight / 70, marginBottom: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
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
                    <UserIcon width={12} height={12} />
                    <Text
                      style={{
                        color: whiteColor,
                        fontFamily: Satoshi400,
                        fontSize: RFValue(10, 812),
                        marginLeft: 6,
                      }}>
                      {eventInfo?.numberOfGirlsInvited} x Guest invitation
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
                    <CalendarBlank width={12} height={12} />
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
                      {approvedCount}/{totalGuests}
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </ImageBackground>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi500,
            fontSize: RFValue(30, 812),
            marginVertical: 20,
            textAlign: 'center',
          }}>
          {`${hostInfo?.name} approved you as a guest!`}
        </Text>
        <Button title="Accept Invitation" onPress={handleAcceptInvitation} />
        <Button buttonContatinerStyle={{marginTop: 14}} title="Reject Invitation" variant="transparent" onPress={handleRejectInvitation} />
      </View>
    </Modal>
  );
};

export default ModalAcceptInvitation;

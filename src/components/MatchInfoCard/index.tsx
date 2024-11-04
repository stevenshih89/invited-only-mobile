import {FC} from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//import components
import {black4Color, blackColor, lightGreenColor, whiteColor} from 'constants/colors.ts';

//import icons
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import CheckStarBlackIcon from 'assets/images/icons/check-star.svg';
import CalendarCheckBlackIcon from 'assets/images/icons/calendar-check-black.svg';
import LocationBlackIcon from 'assets/images/icons/location-black.svg';
import {Satoshi500, Satoshi700} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import { screenHeight, screenWidth } from 'constants/common';

interface MatchInfoCardI {
  isProfile: boolean;
  usersList: [];
  image: string | undefined;
  online: boolean;
  accountType: string;
  premium: boolean;
  name: string | undefined;
  age: string;
  confirmedAccount: boolean;
  joinEvents?: number;
  location?: string | null;
  styleContainer?: any;
  showHeaderInfo?: boolean;
  imageEvent?: string;
  guestsInvited: number;
  isGuest: boolean;
}

const MatchInfoCard: FC<MatchInfoCardI> = ({
  isProfile,
  usersList,
  image,
  online,
  accountType,
  premium,
  name,
  age,
  confirmedAccount,
  joinEvents,
  location,
  styleContainer,
  showHeaderInfo,
  imageEvent,
  guestsInvited,
  isGuest,
}) => {
  const getUsersListAccepted = () => {
    const filter = usersList?.filter(item => item.status === 'invite_match');
    return filter?.length ? filter.length : 0;
  };

  return (
    <FastImage
      style={[
        {
          width: screenWidth * 0.53,
          height: screenHeight * 0.42,
          borderRadius: 22,
          justifyContent: showHeaderInfo ? 'space-between' : 'flex-end',
        },
        styleContainer,
      ]}
      source={{uri: imageEvent && !isGuest ? imageEvent : image}}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
        style={{
          position: 'absolute',
          bottom: 68,
          left: 0,
          right: 0,
          height: 40,
          zIndex: 1,
        }}
      />
      {showHeaderInfo && (
        <View style={{flexDirection: 'row', padding: 15}}>
          <View style={{alignSelf: 'flex-start'}}>
            <FastImage style={{width: 30, height: 30, borderRadius: 30}} source={{uri: image}} />
            {online && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 0,
                  width: 7,
                  height: 7,
                  borderRadius: 7,
                  borderWidth: 1.25,
                  borderColor: blackColor,
                  backgroundColor: lightGreenColor,
                }}></View>
            )}
          </View>
          <View style={{marginLeft: 6, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: blackColor,
                  borderRadius: 3,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  alignSelf: 'flex-start',
                }}>
                {accountType === 'guest' && (
                  <Text style={{color: whiteColor, fontSize: RFValue(6, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                    Guest
                  </Text>
                )}
                {accountType === 'host' && (
                  <Text style={{color: whiteColor, fontSize: RFValue(6, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                    Host
                  </Text>
                )}
              </View>
              {premium && (
                <LinearGradient
                  colors={['#977B4A', '#E5D291', '#A28453']}
                  style={{
                    marginLeft: 6,
                    alignSelf: 'flex-start',
                    borderRadius: 3,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    backgroundColor: blackColor,
                  }}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  {(premium || accountType === 'guest') && (
                    <Text
                      style={{
                        color: blackColor,
                        fontSize: RFValue(6, 812),
                        fontFamily: Satoshi700,
                      }}>
                      Premium
                    </Text>
                  )}
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
                  fontSize: RFValue(12, 812),
                }}>
                {name}
                <Text>,</Text>
              </Text>
              {!isProfile && (
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(12, 812),
                  }}>
                  {' '}
                  {age}
                </Text>
              )}
              <View style={{marginLeft: 5}}>{confirmedAccount && <CheckStarWhite width={12} height={12} />}</View>
            </View>
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginLeft: 10,
          marginBottom: 40,
        }}>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi700,
            fontSize: RFValue(20, 812),
          }}>
          {name}
        </Text>
        <View style={{marginLeft: 5}}>{confirmedAccount && <CheckStarWhite width={15} height={15} />}</View>
      </View>
      <View
        style={{
          height: 68,
          width: '100%',
          backgroundColor: whiteColor,
          paddingHorizontal: 10,
          paddingVertical: 8,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignSelf: 'flex-start'}}>
              <FastImage style={{width: 30, height: 30, borderRadius: 30}} source={{uri: image}} />
              {online && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    right: 0,
                    width: 7,
                    height: 7,
                    borderRadius: 7,
                    borderWidth: 1.25,
                    borderColor: blackColor,
                    backgroundColor: lightGreenColor,
                  }}></View>
              )}
            </View>
            <View style={{marginLeft: 6, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: blackColor,
                    borderRadius: 3,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    alignSelf: 'flex-start',
                  }}>
                  {accountType === 'guest' && (
                    <Text style={{color: whiteColor, fontSize: RFValue(6, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                      Guest
                    </Text>
                  )}
                  {accountType === 'host' && (
                    <Text style={{color: whiteColor, fontSize: RFValue(6, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                      Host
                    </Text>
                  )}
                </View>
                {premium && (
                  <LinearGradient
                    colors={['#977B4A', '#E5D291', '#A28453']}
                    style={{
                      marginLeft: 6,
                      alignSelf: 'flex-start',
                      borderRadius: 3,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      backgroundColor: blackColor,
                    }}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    {(premium || accountType === 'guest') && (
                      <Text
                        style={{
                          color: blackColor,
                          fontSize: RFValue(6, 812),
                          fontFamily: Satoshi700,
                        }}>
                        Premium
                      </Text>
                    )}
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
                    color: blackColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(12, 812),
                  }}>
                  {name}
                  {!isProfile && age && <Text>,</Text>}
                </Text>
                {!isProfile && age && (
                  <Text
                    style={{
                      color: blackColor,
                      fontFamily: Satoshi700,
                      fontSize: RFValue(12, 812),
                    }}>
                    {' '}
                    {age}
                  </Text>
                )}
                <View style={{marginLeft: 5}}>{confirmedAccount && <CheckStarBlackIcon width={12} height={12} />}</View>
              </View>
            </View>
          </View>
          {isGuest && (
            <View
              style={{
                borderWidth: 1,
                borderColor: blackColor,
                borderRadius: 6,
                flexDirection: 'row',
                paddingHorizontal: screenWidth > 400 ? 8 : 4,
                paddingVertical: screenWidth > 400 ? 4 : 2,
                alignItems: 'center',
              }}>
              <FastImage style={{width: 20, height: 20, borderRadius: 20}} source={{uri: imageEvent}} />
              <View style={{marginLeft: 6, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: RFValue(14, 812),
                    color: blackColor,
                    fontFamily: Satoshi700,
                  }}>
                  {getUsersListAccepted()}/{guestsInvited}
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(6, 812),
                    color: blackColor,
                    fontFamily: Satoshi500,
                  }}>
                  Guest List
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CalendarCheckBlackIcon width={12} height={12} />
          <Text
            style={{
              fontSize: RFValue(10, 812),
              color: black4Color,
              fontFamily: Satoshi500,
              marginLeft: 5,
              marginRight: 10,
            }}>
            Join Events: {joinEvents ? joinEvents : 0}
          </Text>
          {location && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <LocationBlackIcon width={12} height={12} />
              <Text
                style={{
                  fontSize: RFValue(10, 812),
                  color: black4Color,
                  fontFamily: Satoshi500,
                  marginLeft: 5,
                }}>
                {location}
              </Text>
            </View>
          )}
        </View>
      </View>
    </FastImage>
  );
};

export default MatchInfoCard;

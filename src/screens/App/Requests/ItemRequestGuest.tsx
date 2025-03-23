import {black4Color, blackColor, grayColor, lightGreenColor, lightRed1Color, transparent60Color, whiteColor} from 'constants/colors';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import useStyles from './styles';
import FlashFillBlack from 'assets/images/icons/flash-filled-black.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import {ActivityIndicator} from '@ant-design/react-native';
import {useUser} from '../../../store/userStore';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {screenHeight} from 'constants/common';
import {calculateAge} from 'helpers/calculateAge';
import {convertToPmAmFormat} from 'helpers/convertToPmAmFormat';
import Button from 'components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {commonStackPath, eventActiveInfoPath, myProfileViewPath, userProfilePath} from 'constants/pathLocations';
import {useItemRequestGuest} from 'hooks/useItemRequestGuest';
import {eventTypes} from 'src/mocks/eventTypes';
import {Event} from 'src/types/event';
import {User} from 'src/types/userInfo';
import {MatchData} from '../IO/screens/Match/Match';

interface Props {
  list: {
    photos: Event.Photo[];
    uid: string;
    hour: any;
    date: any;
    name: string;
    usersList: Partial<User.Info>[];
    activeType: number;
    placeName: string;
  };
  item: Event.User;
  handleOpenMatch: (matchData: MatchData) => void;
  index: number;
}

const ItemRequestGuest = ({list, item, handleOpenMatch, index}: Props) => {
  const {photos, uid, hour, date, name, usersList, activeType, placeName} = list;

  const styles = useStyles();
  const user = useUser((i: any) => i?.user);

  const {loading, heightAnim, cardRef, handleInvite, handleReject, hostInfo, getMonth} = useItemRequestGuest({list, handleOpenMatch});

  const OverlayRight = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          zIndex: 1000,
          alignItems: 'center',
        }}>
        <View style={{borderRadius: 5, paddingHorizontal: 13, paddingVertical: 6, borderWidth: 2, borderColor: whiteColor}}>
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>ACCEPT</Text>
        </View>
      </View>
    );
  };

  const OverlayLeft = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          right: 0,
          left: 0,
          zIndex: 1000,
          alignItems: 'center',
        }}>
        <View style={{borderRadius: 5, paddingHorizontal: 13, paddingVertical: 6, borderWidth: 2, borderColor: lightRed1Color}}>
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: lightRed1Color}}>REJECT</Text>
        </View>
      </View>
    );
  };

  const navigation = useNavigation();

  if (item?.uid !== user?.uid) {
    return null;
  }

  return (
    <>
      {loading ? (
        <View style={{flex: 1}}>
          <ActivityIndicator color={whiteColor} size="small" />
        </View>
      ) : (
        <Animated.View style={[styles.itemContainer, {height: heightAnim, marginTop: index ? 30 : 0}]}>
          <TouchableOpacity
            onPress={() => navigation.navigate(commonStackPath, {screen: eventActiveInfoPath, params: {list, isGuest: true}} as never)}>
            <TinderCard
              ref={cardRef}
              // @ts-ignore
              cardWidth="100%"
              // @ts-ignore
              cardHeight="100%"
              onSwipedRight={() => handleInvite({userItem: item, withSwipeAnimation: false})}
              onSwipedLeft={() => handleReject({userItem: item, withSwipeAnimation: false})}
              OverlayLabelRight={OverlayRight}
              OverlayLabelLeft={OverlayLeft}
              disableBottomSwipe={true}
              disableVerticalSwipe={true}
              inputOverlayLabelRightOpacityRange={[0, 40]}
              inputOverlayLabelLeftOpacityRange={[0, -40]}
              translateXRange={[-70, 0, 70]}
              disableTopSwipe={true}
              cardStyle={{height: '100%', borderRadius: 22, zIndex: 999}}>
              <FastImage
                style={styles.imageBackground}
                source={{
                  uri: photos[0]?.image,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}>
                <View style={[styles.itemContentContainer, {justifyContent: item?.isSuperInvite ? 'space-between' : 'flex-end'}]}>
                  {item?.isSuperInvite && (
                    <View
                      style={{
                        zIndex: 1000,
                        position: 'absolute',
                        top: screenHeight * 0.2 - 40,
                        left: 17,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: whiteColor,
                          borderRadius: 5,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          marginBottom: 'auto',
                        }}>
                        <FlashFillBlack />
                        <Text style={{color: blackColor, fontSize: 10, fontFamily: Satoshi700, marginLeft: 6}}>Super invite you</Text>
                      </View>
                    </View>
                  )}
                  <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} style={styles.linearGradient}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate(userProfilePath, {screen: myProfileViewPath, params: {uid}})}
                        style={{flexDirection: 'row'}}>
                        <View style={{alignSelf: 'flex-start'}}>
                          <FastImage style={{width: 50, height: 50, borderRadius: 50}} source={{uri: hostInfo?.photos?.[0]?.image || ''}} />
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
                              {hostInfo?.accountType === 'guest' && (
                                <Text
                                  style={{
                                    color: whiteColor,
                                    fontSize: RFValue(10, 812),
                                    fontFamily: Satoshi700,
                                    textTransform: 'capitalize',
                                  }}>
                                  Guest
                                </Text>
                              )}
                              {hostInfo?.accountType === 'host' && (
                                <Text
                                  style={{
                                    color: whiteColor,
                                    fontSize: RFValue(10, 812),
                                    fontFamily: Satoshi700,
                                    textTransform: 'capitalize',
                                  }}>
                                  Host
                                </Text>
                              )}
                            </View>
                            {hostInfo?.accountPremium && (
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
                              {hostInfo?.name}
                              {hostInfo?.showAge ? <Text>,</Text> : null}
                            </Text>
                            {hostInfo?.showAge && (
                              <Text
                                style={{
                                  color: whiteColor,
                                  fontFamily: Satoshi700,
                                  fontSize: RFValue(13, 812),
                                  marginTop: 5,
                                }}>
                                {' '}
                                {calculateAge(hostInfo?.date)}
                              </Text>
                            )}
                            <View style={{marginLeft: 8}}>{hostInfo?.accountConfirmed && <CheckStarWhite width={14} height={14} />}</View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleReject({userItem: item[0], withSwipeAnimation: true})}
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: transparent60Color,
                          borderRadius: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 5000,
                        }}>
                        <CloseIcon width={27} height={27} />
                      </TouchableOpacity>
                    </View>
                    {item[0]?.superInvite && (
                      <View
                        style={{
                          marginTop: 'auto',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: whiteColor,
                          alignSelf: 'flex-start',
                          borderRadius: 5,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: 20,
                            padding: 4,
                            marginRight: 6,
                          }}>
                          <FlashFillBlack />
                        </View>
                        <Text style={{fontFamily: Satoshi700, fontSize: RFValue(10, 812), color: blackColor}}>Super invite you</Text>
                      </View>
                    )}
                  </LinearGradient>
                  <View
                    style={{
                      backgroundColor: whiteColor,
                      height: screenHeight * 0.18,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          width: 54,
                          height: 54,
                          borderWidth: 1,
                          borderColor: blackColor,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: blackColor,
                            fontSize: RFValue(22, 812),
                            fontFamily: Satoshi700,
                          }}>
                          {date.split('.')[0]}
                        </Text>
                        <Text
                          style={{
                            color: blackColor,
                            fontSize: RFValue(10, 812),
                            fontFamily: Satoshi500,
                          }}>
                          {getMonth()}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginLeft: 27,
                        }}>
                        <Text
                          style={{
                            color: black4Color,
                            fontSize: RFValue(16, 812),
                            fontFamily: Satoshi700,
                          }}>
                          {name || placeName} - {eventTypes[activeType].label}
                        </Text>
                        {hour && (
                          <Text
                            style={{
                              color: grayColor,
                              fontSize: RFValue(16, 812),
                              fontFamily: Satoshi500,
                              marginVertical: 4,
                            }}>
                            {date.split('.')[0]} {getMonth()} - {convertToPmAmFormat(hour)}{' '}
                          </Text>
                        )}
                        <Text
                          style={{
                            color: black4Color,
                            fontSize: RFValue(14, 812),
                            fontFamily: Satoshi500,
                          }}>
                          Guest Invitation : {usersList.length}
                        </Text>
                      </View>
                    </View>
                    <Button
                      onPress={() => handleInvite({userItem: item[0], withSwipeAnimation: true})}
                      title="Join"
                      buttonStyle={{backgroundColor: blackColor, height: 50}}
                      buttonTitleStyle={{color: whiteColor}}
                    />
                  </View>
                </View>
              </FastImage>
            </TinderCard>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};

export default ItemRequestGuest;

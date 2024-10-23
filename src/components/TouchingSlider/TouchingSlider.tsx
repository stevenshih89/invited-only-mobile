import {FC, ReactElement, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//import components
import useStyles from 'components/TouchingSlider/styles.ts';
import {
  black4Color,
  blackColor,
  gray1Color,
  grayColor,
  lightGreenColor,
  transparent60Color,
  transparentWhite56Color,
  whiteColor,
} from 'constants/colors.ts';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, invitationCodePath} from 'constants/pathLocations';

//import icons
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import CheckStarBlackIcon from 'assets/images/icons/check-star.svg';
import CalendarCheckBlackIcon from 'assets/images/icons/calendar-check-black.svg';
import LocationBlackIcon from 'assets/images/icons/location-fill-black.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import CloseIcon from 'assets/images/icons/close.svg';
import FlashBlackIcon from 'assets/images/icons/flash-black.svg';
import FlashFilledBlackIcon from 'assets/images/icons/flash-filled-black.svg';
import Lock from 'assets/images/icons/lock.svg';
import {Satoshi500, Satoshi700} from 'constants/fonts.ts';
import {calculateAge} from 'helpers/calculateAge.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import {useCounterSuperEvents} from 'src/store/counterSuperInvites/index.ts';
import firestore from '@react-native-firebase/firestore';
import {showToast} from 'helpers/showToast.ts';
import SuperJoin from 'components/Modal/ModalSuperJoin/SuperJoin.tsx';
import {convertToPmAmFormat} from 'helpers/convertToPmAmFormat.ts';
import {getUsersListAccepted} from 'helpers/getUsersListAccepted.ts';
import {useScrollPosition} from 'src/store/scrollPosition/index.ts';
import {eventTypes} from 'src/mocks/eventTypes.ts';

interface Photo {
  url: string;
}

interface TouchingSliderProps {
  photos: Photo[];
  handleOpenSuperInvite?: () => void;
  onInvite?: () => void;
  handleAutoSwipeRight?: () => void;
  superJoin?: () => void;
  isShowCardButtons?: boolean;
  isShowLocation?: boolean;
  isShowWantsJoin?: boolean;
  isShowInvitesTooltip?: boolean;
  isShowEventPreview?: boolean;
  isShowAccountInfo?: boolean;
  isLocked?: boolean;
  hostInfo?: any;
  name?: string;
  age?: string | number;
  homeAddress?: string;
  date?: string;
  girls?: string;
  placeName?: string;
  eventPhotos?: any[];
  confirmedAccount?: boolean;
  confirmedEvent?: boolean;
  accountType?: string;
  isPremium?: string;
  fromJoinEventsScreen?: boolean;
  isProfile?: boolean;
  userInfo?: any;
  activeEvent?: any;
  location?: string;
  joinEvents?: number;
  online?: boolean;
  uidUserEvent?: string;
  hourEvent?: string;
  usersListLength?: number;
  usersList?: any[];
  handleAutoSwipeLeft: () => void;
  item: any;
  activeType: number;
  scrollPositionPreview: number;
  isPreview: boolean;
  eventsCreated: number
}

const TouchingSlider: FC<TouchingSliderProps> = ({
  photos,
  handleOpenSuperInvite,
  onInvite,
  handleAutoSwipeRight,
  handleAutoSwipeLeft,
  isShowCardButtons = true,
  isShowLocation = false,
  isShowAccountInfo = true,
  isShowWantsJoin = false,
  isShowInvitesTooltip = true,
  isLocked = false,
  name = '',
  age = '',
  location,
  date = '',
  placeName = '',
  eventPhotos,
  confirmedAccount = false,
  confirmedEvent = false,
  accountType,
  userInfo,
  isPremium,
  isProfile,
  superJoin,
  activeEvent,
  joinEvents,
  online,
  uidUserEvent,
  hourEvent,
  usersListLength,
  usersList,
  activeType,
  scrollPositionPreview,
  isPreview = true,
  eventsCreated,
}): ReactElement => {
  const [active, setActive] = useState<number>(0);
  const numberPhotos = photos?.length;
  
  const styles = useStyles();
  const navigation = useAppNavigation();
  
  const {counterSuperInvites} = useCounterSuperEvents();

  const [visibleModalSuperJoin, setVisibleModalSuperJoin] = useState(false);

  const [userEventInfo, setUserEventInfo] = useState();

  const scrollPosition = useScrollPosition((i: any) => i?.scrollPosition);

  function getMonth() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [day, month, year] = date.split('.');
    const monthName = months[parseInt(month) - 1];
    return `${monthName}`;
  }

  const getUserEventInfo = async () => {
    try {
      const getDoc = await firestore().collection('userInfo').doc(uidUserEvent).get();
      setUserEventInfo(getDoc?.data());
    } catch (error) {
      console.log('error getUserEventInfo', error);
    }
  };

  useEffect(() => {
    uidUserEvent ? getUserEventInfo() : null;
  }, [uidUserEvent]);

  const handleSuperInvite = () => {
    if (counterSuperInvites - 1 >= 0) {
      handleOpenSuperInvite && handleOpenSuperInvite();
    } else {
      navigation.navigate('/super-invite-pay');
    }
  };

  const goToCodeConfirmation = (): void => {
    // @ts-ignore
    navigation.navigate(commonStackPath, {screen: invitationCodePath});
  };

  const handleNext = (): void => {
    if (active === numberPhotos - 1) {
      return setActive(0);
    } else {
      setActive(p => p + 1);
    }
  };

  const handleBack = (): void => {
    if (active === 0) {
      return setActive(numberPhotos - 1);
    }
    setActive(p => p - 1);
  };

  const handleSuperJoin = () => {
    if (counterSuperInvites > 0) {
      setVisibleModalSuperJoin(true);
      setTimeout(() => {
        superJoin && superJoin();
      }, 2000);
      setTimeout(() => {
        setVisibleModalSuperJoin(false);
      }, 4000);
    } else {
      showToast('inviteMatch', "You don't have Super Joins", 'Super Join');
    }
  };
    
  return (
    // @ts-ignore
    <FastImage
      style={[styles.imageStyle, styles.container]}
      source={{
        uri:
          userInfo?.accountType === 'guest'
            ? eventPhotos && eventPhotos[active]?.image
            : photos?.[active]?.image
            ? photos?.[active]?.image
            : photos?.[active],
        headers: {Authorization: 'someAuthToken'},
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}>
      {(!isProfile || isPreview)&& (
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
          style={{
            position: 'absolute',
            bottom: !isProfile? 170: 107,
            left: 0,
            right: 0,
            height: !isProfile? 40: 136,
            zIndex: 1,
          }}
        />
      )}
      {(!isProfile || isPreview) && (
        <View
          style={{
            height: 90,
            width: 5,
            backgroundColor: transparentWhite56Color,
            borderRadius: 35,
            position: 'absolute',
            right: 16,
            top: 180,
            padding: 1.25,
          }}>
          {!isProfile ? <View
            style={{
              height: 45,
              width: 2.5,
              backgroundColor: whiteColor,
              borderRadius: 35,
              transform: [{translateY: scrollPosition > 0 && scrollPosition < 270 ? scrollPosition / 7 : 0}],
            }}
          />: <View
          style={{
            height: 45,
            width: 2.5,
            backgroundColor: whiteColor,
            borderRadius: 35,
            transform: [{translateY: scrollPositionPreview > 0 && scrollPositionPreview < 270 ? scrollPositionPreview / 7 : 0}],
          }}
        />}
        </View>
      )}
      {accountType === 'guest' && !isProfile && (
        <TouchableOpacity
          onPress={() => handleAutoSwipeLeft()}
          style={{
            width: 50,
            height: 50,
            backgroundColor: transparent60Color,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 16,
            top: 16,
            zIndex: 5000,
          }}>
          <CloseIcon width={27} height={27} />
        </TouchableOpacity>
      )}
      {accountType === 'host' && !isProfile && (
        <TouchableOpacity
          onPress={() => handleAutoSwipeLeft()}
          style={{
            width: 50,
            height: 50,
            backgroundColor: transparent60Color,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 16,
            top: 46,
            zIndex: 1000,
          }}>
          <CloseIcon width={27} height={27} />
        </TouchableOpacity>
      )}
      <SuperJoin isVisibleMatch={visibleModalSuperJoin} nameEvent={name} imageEvent={eventPhotos ? eventPhotos[0].image : ''} />
      {accountType === 'host' && (
        <View style={styles.wrapperBar}>
          {numberPhotos > 1
            ? [...Array(numberPhotos)].map((_, index) => (
                <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
              ))
            : null}
        </View>
      )}
      <View style={styles.wrapperButtons}>
        <TouchableOpacity onPress={handleBack} style={styles.button} />
        <TouchableOpacity onPress={handleNext} style={styles.button} />
      </View>
      {!isShowCardButtons && isShowAccountInfo && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginTop: 16,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignSelf: 'flex-start'}}>
              <FastImage
                style={{width: 50, height: 50, borderRadius: 50}}
                source={{uri: photos?.[active]?.image ? photos?.[active]?.image : photos?.[active]}}
              />
              {userEventInfo?.online && (
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
              )}
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
                  {userEventInfo?.accountType === 'guest' && (
                    <Text style={{color: whiteColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                      Guest
                    </Text>
                  )}
                  {userEventInfo?.accountType === 'host' && (
                    <Text style={{color: whiteColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                      Host
                    </Text>
                  )}
                </View>
                {(userEventInfo?.accountPremium || accountType === 'guest') && (
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
              <View style={styles.rowBioInfo}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(16, 812),
                    marginTop: 4,
                  }}>
                  {userEventInfo?.name}
                  {userEventInfo?.showAge ? <Text>,</Text> : null}
                </Text>
                {!isProfile && userEventInfo?.showAge && (
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi700,
                      fontSize: RFValue(13, 812),
                      marginTop: 5,
                    }}>
                    {' '}
                    {calculateAge(userEventInfo?.date)}
                  </Text>
                )}
                <View style={{marginLeft: 8}}>{userEventInfo?.accountConfirmed && <CheckStarWhite width={14} height={14} />}</View>
              </View>
            </View>
          </View>
        </View>
      )}
      {isLocked && (
        <View style={styles.lockedWrapper}>
          <View style={styles.lockIconWr}>
            <Lock width={24} height={24} />
          </View>
          <View style={styles.lockDescWr}>
            <Text style={styles.lockedTitle}>Locked</Text>
            <Text style={styles.lockedSubtitle}>
              Your account is under review. Thank you for your patience. You will be notified if your account is accepted
            </Text>
            <View style={styles.lockedHaveCodeWr}>
              <Text style={styles.lockedHaveCodeTitle}>Have a code?</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={goToCodeConfirmation}>
                <Text style={styles.lockedHaveCodePressableText}>Click here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View style={[styles.wrapperBio, {position: 'absolute', zIndex: 1000, bottom: isProfile ? 120 : 200}]}>
        <View style={styles.rowBioInfo}>
          <Text style={styles.textName}>{name}</Text>
          <View style={{marginLeft: 10}}>{(confirmedEvent || confirmedAccount) && <CheckStarWhite width={25} height={25} />}</View>
        </View>
      </View>
      {isShowAccountInfo && (
        <View
          style={{
            height: 170,
            width: '100%',
            backgroundColor: whiteColor,
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: 16,
            paddingVertical: 14,
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
                {placeName} - {eventTypes[activeType] && eventTypes[activeType].label}
              </Text>
              {hourEvent && (
                <Text
                  style={{
                    color: grayColor,
                    fontSize: RFValue(16, 812),
                    fontFamily: Satoshi500,
                    marginVertical: 4,
                  }}>
                  {date.split('.')[0]} {getMonth()} - {convertToPmAmFormat(hourEvent)}{' '}
                </Text>
              )}
              <Text
                style={{
                  color: black4Color,
                  fontSize: RFValue(14, 812),
                  fontFamily: Satoshi500,
                }}>
                Guest Invitation : {usersListLength}
              </Text>
            </View>
            {usersListLength > 0 && (
              <View style={{flexDirection: 'row', alignSelf: 'flex-end', position: 'absolute', right: 0}}>
                <FastImage
                  source={{uri: usersList && usersList[0]?.userPhoto}}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    borderWidth: 2,
                    borderColor: whiteColor,
                  }}
                />
                {usersListLength > 1 && (
                  <FastImage
                    source={{uri: usersList && usersList[1]?.userPhoto}}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30,
                      borderWidth: 2,
                      borderColor: whiteColor,
                      transform: [{translateX: -10}],
                    }}
                  />
                )}
                {usersListLength > 2 && (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: blackColor,
                      borderRadius: 30,
                      borderWidth: 2,
                      borderColor: whiteColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: [{translateX: -20}],
                    }}>
                    <Text
                      style={{
                        color: whiteColor,
                        fontSize: RFValue(12, 812),
                        fontFamily: Satoshi700,
                      }}>
                      {usersListLength}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                handleSuperJoin();
              }}
              style={{
                flex: 1,
                height: 44,
                backgroundColor: blackColor,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(13, 812),
                  color: whiteColor,
                  fontFamily: Satoshi500,
                  margin: 7,
                }}>
                Super Join
              </Text>
              <FlashIcon width={14} height={14} />
            </TouchableOpacity>
            <View style={{width: 16}} />
            <TouchableOpacity
              onPress={() => {
                handleAutoSwipeRight && handleAutoSwipeRight();
                onInvite && onInvite();
              }}
              style={{
                flex: 1,
                height: 44,
                backgroundColor: blackColor,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(13, 812),
                  color: whiteColor,
                  fontFamily: Satoshi500,
                }}>
                Join
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* Host */}
      <View style={styles.wrapperButtons}>
        <TouchableOpacity onPress={handleBack} style={styles.button} />
        <TouchableOpacity onPress={handleNext} style={styles.button} />
      </View>
      {isPreview && (
        <View
        style={{
          height: 107,
          width: '100%',
          backgroundColor: whiteColor,
          position: 'absolute',
          bottom: 0,
          paddingHorizontal: 16,
          paddingVertical: 14,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignSelf: 'flex-start'}}>
              <FastImage
                style={{width: 50, height: 50, borderRadius: 50}}
                source={{uri: photos?.[0]? photos?.[0]: ''}}
              />
              {online && (
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
              )}
            </View>
            <View style={{marginLeft: 10, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: blackColor,
                    paddingHorizontal: 12,
                    paddingVertical: 2,
                    alignSelf: 'flex-start',
                  }}>
                  {accountType === 'guest' && (
                    <Text style={{color: blackColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                      Guest
                    </Text>
                  )}
                  {accountType === 'host' && (
                    <Text style={{color: whiteColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                      Host
                    </Text>
                  )}
                </View>
                {(isPremium || accountType === 'guest') && (
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
                    {(isPremium || accountType === 'guest') && (
                      <Text
                        style={{
                          color: blackColor,
                          fontSize: RFValue(10, 812),
                          fontFamily: Satoshi700,
                        }}>
                        Premium
                      </Text>
                    )}
                  </LinearGradient>
                )}
              </View>
              <View style={styles.rowBioInfo}>
                <Text
                  style={{
                    color: blackColor,
                    fontFamily: Satoshi700,
                    fontSize: RFValue(16, 812),
                    marginTop: 4,
                  }}>
                  {name}
                  {age ? <Text>,</Text> : null}
                </Text>
                {(!isProfile || isPreview) && (
                  <Text
                    style={{
                      color: blackColor,
                      fontFamily: Satoshi700,
                      fontSize: RFValue(14, 812),
                      marginTop: 4,
                    }}>
                    {' '}
                    {age}
                  </Text>
                )}
                <View style={{marginLeft: 8}}>{confirmedAccount && <CheckStarBlackIcon width={14} height={14} />}</View>
              </View>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <CalendarCheckBlackIcon width={15} height={15} />
          <Text
            style={{
              fontSize: RFValue(14, 812),
              color: black4Color,
              fontFamily: Satoshi500,
              marginLeft: 10,
              marginRight: 15,
            }}>
            {accountType === 'host'? `Events created: ${eventsCreated? eventsCreated: 0}`: `Join Events: ${joinEvents? joinEvents: 0}`}
          </Text>
          {isShowLocation && location && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <LocationBlackIcon width={15} height={15} />
              <Text
                style={{
                  fontSize: RFValue(14, 812),
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
      )}
      {isShowCardButtons && (
        <View
          style={{
            height: 170,
            width: '100%',
            backgroundColor: whiteColor,
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: 16,
            paddingVertical: 14,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{alignSelf: 'flex-start'}}>
                <FastImage
                  style={{width: 50, height: 50, borderRadius: 50}}
                  source={{uri: photos?.[active]?.image ? photos?.[active]?.image : photos?.[active]}}
                />
                {online && (
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
                )}
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
                    }}>
                    {accountType === 'guest' && (
                      <Text style={{color: whiteColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                        Guest
                      </Text>
                    )}
                    {accountType === 'host' && (
                      <Text style={{color: whiteColor, fontSize: RFValue(10, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                        Host
                      </Text>
                    )}
                  </View>
                  {(isPremium || accountType === 'guest') && (
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
                      {(isPremium || accountType === 'guest') && (
                        <Text
                          style={{
                            color: blackColor,
                            fontSize: RFValue(10, 812),
                            fontFamily: Satoshi700,
                          }}>
                          Premium
                        </Text>
                      )}
                    </LinearGradient>
                  )}
                </View>
                <View style={styles.rowBioInfo}>
                  <Text
                    style={{
                      color: blackColor,
                      fontFamily: Satoshi700,
                      fontSize: RFValue(16, 812),
                      marginTop: 4,
                    }}>
                    {name}
                    {age ? <Text>,</Text> : null}
                  </Text>
                  {!isProfile && (
                    <Text
                      style={{
                        color: blackColor,
                        fontFamily: Satoshi700,
                        fontSize: RFValue(14, 812),
                        marginTop: 4,
                      }}>
                      {' '}
                      {age}
                    </Text>
                  )}
                  <View style={{marginLeft: 8}}>{confirmedAccount && <CheckStarBlackIcon width={14} height={14} />}</View>
                </View>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: blackColor,
                borderRadius: 10,
                flexDirection: 'row',
                paddingHorizontal: 14,
                paddingVertical: 6,
                alignItems: 'center',
              }}>
              <FastImage
                style={{width: 34, height: 34, borderRadius: 34}}
                source={{uri: activeEvent?.photos[0].image ? activeEvent?.photos[0].image : ''}}
              />
              <View style={{marginLeft: 10, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: RFValue(22, 812),
                    color: blackColor,
                    fontFamily: Satoshi700,
                  }}>
                  {getUsersListAccepted(activeEvent?.usersList)}/{activeEvent?.female + activeEvent?.male}
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(10, 812),
                    color: blackColor,
                    fontFamily: Satoshi500,
                  }}>
                  Guest List
                </Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CalendarCheckBlackIcon width={15} height={15} />
            <Text
              style={{
                fontSize: RFValue(14, 812),
                color: black4Color,
                fontFamily: Satoshi500,
                marginLeft: 10,
                marginRight: 15,
              }}>
              Join Events: {joinEvents ? joinEvents : 0}
            </Text>
            {isShowLocation && location && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <LocationBlackIcon width={15} height={15} />
                <Text
                  style={{
                    fontSize: RFValue(14, 812),
                    color: black4Color,
                    fontFamily: Satoshi500,
                    marginLeft: 5,
                  }}>
                  {location}
                </Text>
              </View>
            )}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                handleSuperInvite();
              }}
              style={{
                flex: 1,
                height: 44,
                backgroundColor: blackColor,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(13, 812),
                  color: whiteColor,
                  fontFamily: Satoshi500,
                  margin: 7,
                }}>
                Super Invite
              </Text>
              <FlashIcon width={14} height={14} />
            </TouchableOpacity>
            <View style={{width: 16}} />
            <TouchableOpacity
              onPress={() => {
                handleAutoSwipeRight && handleAutoSwipeRight();
                onInvite && onInvite();
              }}
              style={{
                flex: 1,
                height: 44,
                backgroundColor: blackColor,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(13, 812),
                  color: whiteColor,
                  fontFamily: Satoshi500,
                }}>
                Invite
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isShowWantsJoin && (
        <View style={styles.wantToJoinWr}>
          <View style={styles.wantToJoinImage}>
            <FlashFilledBlackIcon width={14} height={14} />
          </View>
          <Text style={styles.wantToJoinText}>{name} super wants to join you</Text>
        </View>
      )}
      {isShowInvitesTooltip && (
        <View style={styles.inviteTooltipWr}>
          <FlashBlackIcon />
          <Text style={styles.inviteTooltipText}>You've got 5 Super Invites</Text>
          <View style={styles.inviteBottomCircleFigure} />
        </View>
      )}
    </FastImage>
  );
};

export default TouchingSlider;

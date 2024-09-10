import {FC, ReactElement, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//import components
import useStyles from 'components/TouchingSlider/styles.ts';
import {blackColor, gray1Color, transparentWhite56Color, whiteColor} from 'constants/colors.ts';
import {screenHeight} from 'constants/common.ts';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, invitationCodePath, superInvitePayPath} from 'constants/pathLocations';
import EventPreview from './components/EventPreview.tsx';

//import icons
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import HomeIcon from 'assets/images/icons/home.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import FlashBlackIcon from 'assets/images/icons/flash-black.svg';
import FlashFilledBlackIcon from 'assets/images/icons/flash-filled-black.svg';
import IOIcon from 'assets/images/icons/io-logo.svg';
import Lock from 'assets/images/icons/lock.svg';
import {Satoshi700} from 'constants/fonts.ts';
import Animated, {useAnimatedStyle, useSharedValue, withTiming, Easing} from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {calculateAge} from 'helpers/calculateAge.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import {useCounterSuperEvents} from 'src/store/counterSuperInvites/index.ts';

interface Photo {
  url: string;
}

const superInvites = 1;

interface TouchingSliderProps {
  photos: Photo[];
  handleOpenSuperInvite?: () => void;
  handleOpenMatch?: () => void;
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
  accountType?: string;
  isPremium?: string;
  fromJoinEventsScreen?: boolean;
  changeEventList: () => void;
  isProfile?: boolean;
}

const TouchingSlider: FC<TouchingSliderProps> = ({
  photos,
  handleOpenSuperInvite,
  onInvite,
  handleAutoSwipeRight,
  isShowCardButtons = true,
  isShowLocation = false,
  isShowAccountInfo = true,
  isShowWantsJoin = false,
  isShowInvitesTooltip = true,
  isLocked = false,
  isShowEventPreview = false,
  name = '',
  age = '',
  homeAddress = '',
  date = '',
  girls = '',
  placeName = '',
  eventPhotos,
  confirmedAccount = false,
  accountType,
  hostInfo,
  isPremium,
  fromJoinEventsScreen = false,
  isProfile,
  changeEventList,
  superJoin
}): ReactElement => {
  const [active, setActive] = useState<number>(0);
  const numberPhotos = photos?.length;
  const styles = useStyles();
  const navigation = useAppNavigation();
  
  const {counterSuperInvites} = useCounterSuperEvents();

  const handleSuperInvite = () => {
    if (counterSuperInvites - 1 >= 0) {
      flipCoin();
      changeEventList();
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

  const goToMyProfileView = () => {
    // @ts-ignore
    navigation.navigate(superInvitePayPath);
  };

  //animation
  const rotation = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);

  const flipCoin = () => {
    rotation.value = withTiming(flipped ? 0 : 180, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    setFlipped(prev => !prev);
    if (superInvites) {
      handleOpenSuperInvite && handleOpenSuperInvite();
    } else {
      goToMyProfileView();
    }
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotation.value}deg`}],
      opacity: rotation.value >= 90 && rotation.value <= 270 ? 0 : 1,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotation.value}deg`}],
      opacity: rotation.value >= 90 && rotation.value <= 270 ? 1 : 0,
    };
  });

  return (
    // @ts-ignore
    <FastImage
      style={[styles.imageStyle, styles.container]}
      source={{
        uri: photos?.[active]?.image ? photos?.[active]?.image : photos?.[active],
        headers: {Authorization: 'someAuthToken'},
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.linearGradientHeader}>
        <View style={styles.wrapperBar}>
          {numberPhotos > 1
            ? [...Array(numberPhotos)].map((_, index) => (
                <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
              ))
            : null}
        </View>
      </LinearGradient>
      {hostInfo?.name && (
        <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 60, left: 16}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(18, 812)}}>{hostInfo.name}</Text>
          {hostInfo?.date && (
            <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812), marginRight: 10}}>
              , {calculateAge(hostInfo?.date)}
            </Text>
          )}
          {hostInfo?.accountConfirmed && <CheckStarWhite width={18} height={18} />}
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
      {isShowEventPreview ? (
        <View style={styles.eventPreviewWr}>
          <EventPreview
            placeName={placeName}
            date={date}
            girls={girls}
            photos={eventPhotos}
            name={name}
            flipCoin={flipCoin}
            fromJoinEventsScreen={fromJoinEventsScreen}
            onInvite={onInvite}
            superJoin={superJoin}
          />
        </View>
      ) : (
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
          style={[styles.linearGradientFooter, {height: isShowEventPreview ? 'auto' : 201}]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <View style={styles.wrapperBio}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: whiteColor,
                  borderRadius: 5,
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  alignSelf: 'flex-start',
                }}>
                {accountType === 'guest' && (
                  <Text style={{color: blackColor, fontSize: RFValue(14, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                    Guest
                  </Text>
                )}
                {accountType === 'host' && (
                  <Text style={{color: blackColor, fontSize: RFValue(14, 812), fontFamily: Satoshi700, textTransform: 'capitalize'}}>
                    Host
                  </Text>
                )}
              </View>
              {true && (
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
                  {isPremium && (
                    <Text
                      style={{
                        color: blackColor,
                        fontSize: RFValue(14, 812),
                        fontFamily: Satoshi700,
                      }}>
                      Premium
                    </Text>
                  )}
                </LinearGradient>
              )}
            </View>
            <View style={styles.rowBioInfo}>
              <Text style={styles.textName}>
                {name}
                {age ? <Text>,</Text> : null}
              </Text>
              {!isProfile && <Text style={styles.textYears}>{age}</Text>}
              <View style={{marginLeft: 10}}>{confirmedAccount && <CheckStarWhite width={22} height={22} />}</View>
            </View>
            <View style={styles.wrapperFooterCard}>
              <View>
                {homeAddress && (
                  <View style={[styles.infoTags, {marginTop: screenHeight / 37}]}>
                    <HomeIcon />
                    <Text style={styles.textInfoTags}>From {homeAddress}</Text>
                  </View>
                )}
                {/* {isShowLocation && (
                  <View style={[styles.infoTags, {marginTop: 5}]}>
                    <Location />
                    <Text style={styles.textInfoTags}>2 kilometers away</Text>
                  </View>
                )} */}
              </View>
              {isShowCardButtons && (
                <View style={styles.wrapperRightButton}>
                  <TouchableOpacity style={styles.buttonFlash} onPress={() => {
                    onInvite()
                    handleAutoSwipeRight()
                  }}>
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        top: -1,
                        left: -1,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: blackColor,
                        borderRadius: 50,
                        zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IOIcon />
                    </View>
                  </TouchableOpacity>
                  <TouchableWithoutFeedback style={[styles.buttonFlash, {marginTop: screenHeight / 70}]} onPress={handleSuperInvite}>
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        top: -1,
                        left: -1,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: transparentWhite56Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <Animated.View
                      style={[
                        {
                          width: '100%',
                          height: '100%',
                          backgroundColor: blackColor,
                          borderRadius: 50,
                          zIndex: 10,
                          justifyContent: 'center',
                          position: 'absolute',
                          alignItems: 'center',
                        },
                        frontAnimatedStyle,
                      ]}>
                      <FlashIcon />
                    </Animated.View>
                    <Animated.View
                      style={[
                        {
                          width: '100%',
                          height: '100%',
                          backgroundColor: blackColor,
                          borderRadius: 50,
                          zIndex: 10,
                          position: 'absolute',
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                        backAnimatedStyle,
                      ]}>
                      <Text style={{color: whiteColor, fontSize: 24, fontWeight: '500', transform: [{rotateY: '180deg'}]}}>
                        {counterSuperInvites}
                      </Text>
                    </Animated.View>
                  </TouchableWithoutFeedback>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>
      )}
      <View style={styles.wrapperButtons}>
        <TouchableOpacity onPress={handleBack} style={styles.button} />
        <TouchableOpacity onPress={handleNext} style={styles.button} />
      </View>
      {isShowWantsJoin && (
        <View style={styles.wantToJoinWr}>
          <View style={styles.wantToJoinImage}>
            <FlashFilledBlackIcon width={14} height={14}/>
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
    // <ImageBackground
    //   source={{uri: photos?.[active]?.image ? photos?.[active]?.image : photos?.[active]}}
    //   resizeMode="cover"
    //   imageStyle={styles.imageStyle}
    //   style={styles.container}>
    //   <LinearGradient
    //     colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
    //     start={{x: 0, y: 1}}
    //     end={{x: 0, y: 0}}
    //     style={styles.linearGradientHeader}>
    //     <View style={styles.wrapperBar}>
    //       {[...Array(numberPhotos)].map((_, index) => (
    //         <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
    //       ))}
    //     </View>
    //   </LinearGradient>
    //   {hostInfo?.name && (
    //     <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 60, left: 16}}>
    //       <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(18, 812)}}>{hostInfo.name}</Text>
    //       {hostInfo?.date && (
    //         <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 812), marginRight: 10}}>
    //           , {calculateAge(hostInfo?.date)}
    //         </Text>
    //       )}
    //       {hostInfo?.accountConfirmed && <CheckStarWhite width={18} height={18} />}
    //     </View>
    //   )}
    //   {isLocked && (
    //     <View style={styles.lockedWrapper}>
    //       <View style={styles.lockIconWr}>
    //         <Lock width={24} height={24} />
    //       </View>
    //       <View style={styles.lockDescWr}>
    //         <Text style={styles.lockedTitle}>Locked</Text>
    //         <Text style={styles.lockedSubtitle}>
    //         Your account is under review. Thank you for your patience. You will be notified if your account is accepted
    //         </Text>
    //         <View style={styles.lockedHaveCodeWr}>
    //           <Text style={styles.lockedHaveCodeTitle}>Have a code?</Text>
    //           <TouchableOpacity activeOpacity={0.7} onPress={goToCodeConfirmation}>
    //             <Text style={styles.lockedHaveCodePressableText}>Click here</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View>
    //   )}
    //   {isShowEventPreview ? (
    //     <View style={styles.eventPreviewWr}>
    //       <EventPreview placeName={placeName} date={date} girls={girls} photos={eventPhotos} name={name} flipCoin={flipCoin} />
    //     </View>
    //   ) : (
    //     <LinearGradient
    //       colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
    //       style={[styles.linearGradientFooter, {height: isShowEventPreview ? 'auto' : 201}]}
    //       start={{x: 0, y: 0}}
    //       end={{x: 0, y: 1}}>
    //       <View style={styles.wrapperBio}>
    //         <View style={{flexDirection: 'row'}}>
    //           {isShowAccountInfo && (
    //             <View
    //               style={{
    //                 backgroundColor: blackColor,
    //                 borderRadius: 5,
    //                 borderWidth: 2,
    //                 borderColor: whiteColor,
    //                 paddingHorizontal: 12,
    //                 paddingVertical: 2,
    //                 alignSelf: 'flex-start',
    //               }}>
    //               <Text style={{color: whiteColor, fontSize: 14, fontFamily: Satoshi700, textTransform: 'capitalize'}}>{accountType}</Text>
    //             </View>
    //           )}
    //           {true && isShowAccountInfo && (
    //             <LinearGradient
    //               colors={['#977B4A', '#E5D291', '#A28453']}
    //               style={{
    //                 marginLeft: 6,
    //                 alignSelf: 'flex-start',
    //                 borderRadius: 4,
    //                 paddingHorizontal: 12,
    //                 paddingVertical: 2,
    //                 backgroundColor: blackColor,
    //               }}
    //               start={{x: 0, y: 0}}
    //               end={{x: 1, y: 0}}>
    //               {true && (
    //                 <Text
    //                   style={{
    //                     color: blackColor,
    //                     fontSize: RFValue(14, 812),
    //                     fontFamily: Satoshi400,
    //                     fontWeight: 'bold',
    //                   }}>
    //                   Premium
    //                 </Text>
    //               )}
    //             </LinearGradient>
    //           )}
    //         </View>
    //         <View style={styles.rowBioInfo}>
    //           <Text style={styles.textName}>{name},</Text>
    //           <Text style={styles.textYears}>{age}</Text>
    //           <View style={{marginLeft: 10}}>{confirmedAccount && <CheckStarWhite width={22} height={22} />}</View>
    //         </View>
    //         <View style={styles.wrapperFooterCard}>
    //           <View>
    //             {homeAddress && (
    //               <View style={[styles.infoTags, {marginTop: screenHeight / 37}]}>
    //                 <HomeIcon />
    //                 <Text style={styles.textInfoTags}>From {homeAddress}</Text>
    //               </View>
    //             )}
    //             {/* {isShowLocation && (
    //               <View style={[styles.infoTags, {marginTop: 5}]}>
    //                 <Location />
    //                 <Text style={styles.textInfoTags}>2 kilometers away</Text>
    //               </View>
    //             )} */}
    //           </View>
    //           {isShowCardButtons && (
    //             <View style={styles.wrapperRightButton}>
    //               <TouchableOpacity style={styles.buttonFlash} onPress={onInvite}>
    //                 <View
    //                   style={{
    //                     backgroundColor: transparentWhite56Color,
    //                     width: '100%',
    //                     height: '100%',
    //                     borderRadius: 50,
    //                     position: 'absolute',
    //                     top: -1,
    //                     left: -1,
    //                   }}
    //                 />
    //                 <View
    //                   style={{
    //                     backgroundColor: transparentWhite56Color,
    //                     width: '100%',
    //                     height: '100%',
    //                     borderRadius: 50,
    //                     position: 'absolute',
    //                     right: -1,
    //                     bottom: -1,
    //                   }}
    //                 />
    //                 <View
    //                   style={{
    //                     width: '100%',
    //                     height: '100%',
    //                     backgroundColor: blackColor,
    //                     borderRadius: 50,
    //                     zIndex: 10,
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                   }}>
    //                   <IOIcon />
    //                 </View>
    //               </TouchableOpacity>
    //               <TouchableWithoutFeedback style={[styles.buttonFlash, {marginTop: screenHeight / 70}]} onPress={flipCoin}>
    //                 <View
    //                   style={{
    //                     backgroundColor: transparentWhite56Color,
    //                     width: '100%',
    //                     height: '100%',
    //                     borderRadius: 50,
    //                     position: 'absolute',
    //                     top: -1,
    //                     left: -1,
    //                   }}
    //                 />
    //                 <View
    //                   style={{
    //                     backgroundColor: transparentWhite56Color,
    //                     width: '100%',
    //                     height: '100%',
    //                     borderRadius: 50,
    //                     position: 'absolute',
    //                     right: -1,
    //                     bottom: -1,
    //                   }}
    //                 />
    //                 <Animated.View
    //                   style={[
    //                     {
    //                       width: '100%',
    //                       height: '100%',
    //                       backgroundColor: blackColor,
    //                       borderRadius: 50,
    //                       zIndex: 10,
    //                       justifyContent: 'center',
    //                       position: 'absolute',
    //                       alignItems: 'center',
    //                     },
    //                     frontAnimatedStyle,
    //                   ]}>
    //                   <FlashIcon />
    //                 </Animated.View>
    //                 <Animated.View
    //                   style={[
    //                     {
    //                       width: '100%',
    //                       height: '100%',
    //                       backgroundColor: blackColor,
    //                       borderRadius: 50,
    //                       zIndex: 10,
    //                       position: 'absolute',
    //                       justifyContent: 'center',
    //                       alignItems: 'center',
    //                     },
    //                     backAnimatedStyle,
    //                   ]}>
    //                   <Text style={{color: whiteColor, fontSize: 24, fontWeight: '500', transform: [{rotateY: '180deg'}]}}>4</Text>
    //                 </Animated.View>
    //               </TouchableWithoutFeedback>
    //             </View>
    //           )}
    //         </View>
    //       </View>
    //     </LinearGradient>
    //   )}
    //   <View style={styles.wrapperButtons}>
    //     <TouchableOpacity onPress={handleBack} style={styles.button} />
    //     <TouchableOpacity onPress={handleNext} style={styles.button} />
    //   </View>
    //   {isShowWantsJoin && (
    //     <View style={styles.wantToJoinWr}>
    //       <View style={styles.wantToJoinImage}>
    //         <Heart />
    //       </View>
    //       <Text style={styles.wantToJoinText}>{name} Super wants Join you!</Text>
    //     </View>
    //   )}
    //   {isShowInvitesTooltip && (
    //     <View style={styles.inviteTooltipWr}>
    //       <FlashBlackIcon />
    //       <Text style={styles.inviteTooltipText}>You've got 5 Super Invites</Text>
    //       <View style={styles.inviteBottomCircleFigure} />
    //     </View>
    //   )}
    // </ImageBackground>
  );
};

export default TouchingSlider;

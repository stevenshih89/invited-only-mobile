import {FC, ReactElement, useState} from 'react';
import {View, ImageBackground, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//import components
import useStyles from 'components/TouchingSlider/styles.ts';
import {blackColor, gray1Color, transparentGray60Color, whiteColor} from 'constants/colors.ts';
import {screenHeight} from 'constants/common.ts';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, invitationCodePath} from 'constants/pathLocations';
import EventPreview from './components/EventPreview.tsx';

//import icons
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import HomeIcon from 'assets/images/icons/home.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import FlashBlackIcon from 'assets/images/icons/flash-black.svg';
import IOIcon from 'assets/images/icons/io-logo.svg';
import Lock from 'assets/images/icons/lock.svg';
import Heart from 'assets/images/icons/heart.svg';
import {Satoshi700} from 'constants/fonts.ts';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing} from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Photo {
  url: string;
}

interface TouchingSliderProps {
  photos: Photo[];
  handleOpenSuperInvite?: () => void;
  handleOpenMatch?: () => void;
  isShowCardButtons?: boolean;
  isShowWantsJoin?: boolean;
  isShowInvitesTooltip?: boolean;
  isShowEventPreview?: boolean;
  isLocked?: boolean;
  name?: string;
  age?: string | number;
  homeAddress?: string;
  date?: string;
  girls?: string;
  placeName?: string;
  eventPhotos?: any[];
  confirmedAccount?: boolean;
  accountType?: string;
}

const TouchingSlider: FC<TouchingSliderProps> = ({
  photos,
  handleOpenSuperInvite,
  handleOpenMatch,
  isShowCardButtons = true,
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
}): ReactElement => {
  const [active, setActive] = useState<number>(0);
  const numberPhotos = photos?.length;
  const styles = useStyles();
  const navigation = useAppNavigation();

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

  //animation
  const rotation = useSharedValue(0);
  const [flipped, setFlipped] = useState(false);

  const flipCoin = () => {
    rotation.value = withTiming(flipped ? 0 : 180, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
    setFlipped(!flipped);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${rotation.value}deg` },
      ],
      opacity: rotation.value >= 90 && rotation.value <= 270 ? 0 : 1,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${rotation.value}deg` },
      ],
      opacity: rotation.value >= 90 && rotation.value <= 270 ? 1 : 0,
    };
  });

  return (
    // @ts-ignore
    <ImageBackground
      source={{uri: photos?.[active]?.image ? photos?.[active]?.image : photos?.[active]}}
      resizeMode="cover"
      imageStyle={styles.imageStyle}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.linearGradientHeader}>
        <View style={styles.wrapperBar}>
          {[...Array(numberPhotos)].map((_, index) => (
            <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
          ))}
        </View>
      </LinearGradient>
      {isLocked && (
        <View style={styles.lockedWrapper}>
          <View style={styles.lockIconWr}>
            <Lock width={24} height={24} />
          </View>
          <View style={styles.lockDescWr}>
            <Text style={styles.lockedTitle}>Locked</Text>
            <Text style={styles.lockedSubtitle}>Your account on review</Text>
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
          <EventPreview placeName={placeName} date={date} girls={girls} photos={eventPhotos} />
        </View>
      ) : (
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
          style={[styles.linearGradientFooter, {height: isShowEventPreview ? 'auto' : 201}]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <View style={styles.wrapperBio}>
            <View
              style={{backgroundColor: whiteColor, borderRadius: 5, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start'}}>
              <Text style={{color: blackColor, fontSize: 14, fontFamily: Satoshi700, textTransform: 'capitalize'}}>{accountType}</Text>
            </View>
            <View style={styles.rowBioInfo}>
              <Text style={styles.textName}>{name},</Text>
              <Text style={styles.textYears}>{age}</Text>
              <View style={{marginLeft: 10}}>{confirmedAccount && <CheckStarWhite width={22} height={22} />}</View>
            </View>
            <View style={styles.wrapperFooterCard}>
              <View>
                {homeAddress && (
                  <View style={[styles.infoTags, {marginTop: screenHeight / 37, width: 130}]}>
                    <HomeIcon />
                    <Text style={styles.textInfoTags}>From {homeAddress}</Text>
                  </View>
                )}
              </View>
              {isShowCardButtons && (
                <View style={styles.wrapperRightButton}>
                  <TouchableOpacity style={styles.buttonFlash} onPress={handleOpenMatch}>
                    <View
                      style={{
                        backgroundColor: transparentGray60Color,
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
                        backgroundColor: transparentGray60Color,
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
                  <TouchableWithoutFeedback style={[styles.buttonFlash, {marginTop: screenHeight / 70}]} onPress={flipCoin}>
                    <View
                      style={{
                        backgroundColor: transparentGray60Color,
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
                        backgroundColor: transparentGray60Color,
                        width: '100%',
                        height: '100%',
                        borderRadius: 50,
                        position: 'absolute',
                        right: -1,
                        bottom: -1,
                      }}
                    />
                    <Animated.View
                      style={[{
                        width: '100%',
                        height: '100%',
                        backgroundColor: blackColor,
                        borderRadius: 50,
                        zIndex: 10,
                        justifyContent: 'center',
                        position: 'absolute',
                        alignItems: 'center',
                      },
                      frontAnimatedStyle
                      ]}>
                      <FlashIcon />
                    </Animated.View>
                    <Animated.View
                      style={[{
                        width: '100%',
                        height: '100%',
                        backgroundColor: blackColor,
                        borderRadius: 50,
                        zIndex: 10,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                      backAnimatedStyle
                      ]}>
                      <Text style={{color: whiteColor, fontSize: 24, fontWeight: '500', transform: [{rotateY: '180deg'}]}}>4</Text>
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
            <Heart />
          </View>
          <Text style={styles.wantToJoinText}>{name} Super wants Join you!</Text>
        </View>
      )}
      {isShowInvitesTooltip && (
        <View style={styles.inviteTooltipWr}>
          <FlashBlackIcon />
          <Text style={styles.inviteTooltipText}>You've got 5 Super Invites</Text>
          <View style={styles.inviteBottomCircleFigure} />
        </View>
      )}
    </ImageBackground>
  );
};

export default TouchingSlider;

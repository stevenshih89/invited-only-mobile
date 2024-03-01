import {FC, ReactElement, useState} from 'react';
import {View, ImageBackground, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//import components
import useStyles from 'components/TouchingSlider/styles.ts';
import {blackColor, darkRed2Color, darkRedColor, gray1Color, whiteColor} from 'constants/colors.ts';
import HomeIcon from 'assets/images/icons/home.svg';
import LocationIcon from 'assets/images/icons/location.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import FlashBlackIcon from 'assets/images/icons/flash-black.svg';
import IOIcon from 'assets/images/icons/io-logo.svg';
import Lock from 'assets/images/icons/lock.svg';
import Heart from 'assets/images/icons/heart.svg';
import {screenHeight} from 'constants/common.ts';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, invitationCodePath} from 'constants/pathLocations';
import {Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

interface Photo {
  url: string;
}

interface TouchingSliderProps {
  photos: Photo[];
  handleOpenSuperInvite: () => void;
  handleOpenMatch: () => void;
}

const TouchingSlider: FC<TouchingSliderProps> = ({photos, handleOpenSuperInvite, handleOpenMatch}): ReactElement => {
  const [active, setActive] = useState<number>(0);
  const numberPhotos = photos?.length;
  const styles = useStyles();
  const navigation = useAppNavigation();
  const isLocked = false;
  const name = 'Alexa';

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
      return;
    }
    setActive(p => p - 1);
  };

  return (
    // @ts-ignore
    <ImageBackground source={photos[active]} resizeMode="cover" imageStyle={styles.imageStyle} style={styles.container}>
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
      <View style={styles.wrapperButtons}>
        <TouchableOpacity onPress={handleBack} style={styles.button} />
        <TouchableOpacity onPress={handleNext} style={styles.button} />
      </View>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
        style={styles.linearGradientFooter}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <View style={styles.wrapperBio}>
          <View style={styles.rowBioInfo}>
            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.textYears}>29</Text>
          </View>
          <View style={styles.wrapperFooterCard}>
            <View>
              <View style={[styles.infoTags, {marginTop: screenHeight / 37, width: 130}]}>
                <HomeIcon />
                <Text style={styles.textInfoTags}>From Miami</Text>
              </View>
              <View style={[styles.infoTags, {marginTop: screenHeight / 190}]}>
                <LocationIcon />
                <Text style={styles.textInfoTags}>2 kilometers away</Text>
              </View>
            </View>
            <View style={styles.wrapperRightButton}>
              <TouchableOpacity style={styles.buttonFlash} onPress={handleOpenMatch}>
                <IOIcon />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonFlash, {marginTop: screenHeight / 70}]} onPress={handleOpenSuperInvite}>
                <FlashIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View
        style={{
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: darkRedColor,
          paddingVertical: 5,
          paddingHorizontal: 5,
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          flex: 1,
        }}>
        <View
          style={{
            borderRadius: 30,
            backgroundColor: darkRed2Color,
            width: 29,
            height: 29,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Heart />
        </View>
        <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(14, 812)}}>{name} Super wants Join you!</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: whiteColor,
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
          position: 'absolute',
          right: 30,
          top: screenHeight / 2.1,
        }}>
        <FlashBlackIcon />
        <Text style={{color: blackColor, fontFamily: Satoshi500, fontSize: RFValue(14, 812), marginLeft: 10}}>You've got 5 Super Invites</Text>
        <View
          style={{
            backgroundColor: whiteColor,
            width: 6,
            height: 6,
            borderRadius: 10,
            position: 'absolute',
            bottom: -3,
            right: 10,
            transform: [{rotate: '180deg'}],
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default TouchingSlider;

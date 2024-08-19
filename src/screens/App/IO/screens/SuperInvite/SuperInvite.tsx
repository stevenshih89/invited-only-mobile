import {Image, Text, TouchableOpacity, View} from 'react-native';
import FlashIcon from 'assets/images/icons/flash-filled.svg';
import {blackColor, lightGray10Color, transparentGray60Color, whiteColor} from 'constants/colors';
import Modal from 'react-native-modal';
import {Outfit500, Satoshi700Italic} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {FC, useEffect} from 'react';
import {screenHeight} from 'constants/common';
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle} from 'react-native-reanimated';
import Close from 'assets/images/icons/close.svg';

const SuperInvite: FC<{isVisibleSuperInvite: boolean; onCloseSuperInvite: () => void; activeSuperInviteUser: any}> = ({
  isVisibleSuperInvite,
  onCloseSuperInvite,
  activeSuperInviteUser,
}) => {
  const imageIndex = activeSuperInviteUser?.photos?.findIndex((photo: {id: number; image: string}) => photo.id === 0);
  const image = activeSuperInviteUser?.photos?.[imageIndex]?.image;

  // animation
  const figureTopPosition = useSharedValue(-screenHeight / 4.2);
  const figureBottomPosition = useSharedValue(screenHeight / 4.2);

  const animateFigure = () => {
    figureTopPosition.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.cubic)
    });
    figureBottomPosition.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.cubic)
    });
  };

  const figureTopStyle = useAnimatedStyle(() => ({
    transform: [{
      translateY: figureTopPosition.value
    }]
  }));

  const figureBottomStyle = useAnimatedStyle(() => ({
    transform: [{
      translateY: figureBottomPosition.value
    }]
  }));

  useEffect(() => {
    if (isVisibleSuperInvite) {
      animateFigure();
    }
  }, [isVisibleSuperInvite]);

  return (
    <Modal
      isVisible={isVisibleSuperInvite}
      coverScreen
      animationInTiming={1}
      backdropColor={lightGray10Color}
      backdropOpacity={1}
      style={{margin: 0}}
      onBackdropPress={onCloseSuperInvite}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onCloseSuperInvite}
        style={{backgroundColor: blackColor, width: '100%', height: '100%', justifyContent: 'space-between'}}>
        <Animated.View
          style={[{
            backgroundColor: whiteColor,
            height: screenHeight / 4.2,
            width: 140,
            marginLeft: 20,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 30,
          }, figureTopStyle]}>
          <View style={{backgroundColor: blackColor, width: 100, height: 100, borderRadius: 100}} />
        </Animated.View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={onCloseSuperInvite}
            activeOpacity={0.7}
            style={{
            borderRadius: 100,
            backgroundColor: transparentGray60Color,
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            alignSelf: 'flex-end',
            marginRight: 20,
            transform: [{translateY: -120}]
            }}>
                <Close />
              </TouchableOpacity>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={{color: whiteColor, fontFamily: Outfit500, fontSize: RFValue(54, 812)}}>{activeSuperInviteUser?.name}</Text>
            <Text style={{color: whiteColor, fontFamily: Outfit500, fontSize: RFValue(10, 812), textTransform: 'capitalize'}}>
              {activeSuperInviteUser?.accountType}
            </Text>
            {image && (
              <Image
                source={{uri: image}}
                style={{width: screenHeight / 4.5, height: screenHeight / 4.5, borderRadius: 100, marginTop: -8}}
              />
            )}
          </View>
          <View
            style={{
              width: 70,
              height: 70,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <FlashIcon width={70} height={70} />
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 6, borderRadius: 100}}>
            <Text style={{color: whiteColor, fontFamily: Satoshi700Italic, fontSize: RFValue(30, 812)}}>Super Invite</Text>
          </View>
        </View>
        <Animated.View
          style={[{
            backgroundColor: whiteColor,
            height: screenHeight / 4.2,
            width: 140,
            marginLeft: 'auto',
            marginRight: 20,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 30,
          }, figureBottomStyle]}>
          <View style={{backgroundColor: blackColor, width: 100, height: 100, borderRadius: 100}} />
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default SuperInvite;


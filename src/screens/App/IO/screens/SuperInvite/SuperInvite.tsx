import {Image, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import FlashIcon from 'assets/images/icons/flash-filled.svg';
import {blackColor, lightGray10Color, whiteColor} from 'constants/colors';
import Modal from 'react-native-modal';
import {Outfit500, Satoshi700Italic} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {FC} from 'react';
import {screenHeight} from 'constants/common';

const SuperInvite: FC<{isVisibleSuperInvite: boolean; onCloseSuperInvite: () => void; activeSuperInviteUser: any}> = ({
  isVisibleSuperInvite,
  onCloseSuperInvite,
  activeSuperInviteUser,
}) => {
  const imageIndex = activeSuperInviteUser?.photos?.findIndex((photo: {id: number; image: string}) => photo.id === 0);
  const image = activeSuperInviteUser?.photos?.[imageIndex]?.image;

  return (
    <Modal
      isVisible={isVisibleSuperInvite}
      coverScreen
      backdropColor={lightGray10Color}
      backdropOpacity={1}
      style={{margin: 0}}
      onBackdropPress={onCloseSuperInvite}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onCloseSuperInvite}
        style={{backgroundColor: blackColor, width: '100%', height: '100%', justifyContent: 'space-between'}}>
        <View
          style={{
            backgroundColor: whiteColor,
            height: screenHeight / 4.2,
            width: 140,
            marginLeft: 20,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 30,
          }}>
          <View style={{backgroundColor: blackColor, width: 100, height: 100, borderRadius: 100}} />
        </View>
        <View style={{alignItems: 'center'}}>
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
        <View
          style={{
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
          }}>
          <View style={{backgroundColor: blackColor, width: 100, height: 100, borderRadius: 100}} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default SuperInvite;

import {ImageBackground, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, whiteColor} from 'constants/colors';
import LogoutBlackIcon from 'assets/images/icons/logout-black.svg';
import CheckStarIcon from 'assets/images/icons/check-star-white.svg';
import {FC} from 'react';
import Button from 'components/Button/Button';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useLogout} from 'hooks/useLogout';

const ModalLogout: FC<{isVisible: boolean; onClose: () => void}> = ({isVisible, onClose}) => {
  const {userHost, userAge, handleLogout} = useLogout(onClose);

  return (
    <Modal
      testID='modal-log-out'
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
        {!!userHost?.photos?.length && (
          <ImageBackground
            source={{uri: userHost?.photos?.[0]?.image}}
            style={{width: 84, height: 84, alignSelf: 'center', marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}
            imageStyle={{borderRadius: 160}}
            resizeMode="cover">
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: whiteColor,
                borderRadius: 160,
                zIndex: 1000,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LogoutBlackIcon width={22} height={22} />
            </View>
          </ImageBackground>
        )}
        <View
          style={{
            backgroundColor: blackColor,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: whiteColor,
            paddingHorizontal: 12,
            paddingVertical: 2,
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 6,
          }}>
          <Text style={{color: whiteColor, fontSize: 14, fontFamily: Satoshi700, textTransform: 'capitalize'}}>
            {userHost?.accountType}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
          <Text style={{color: whiteColor, marginRight: 6, fontFamily: Satoshi500, fontSize: RFValue(20, 812), textAlign: 'center'}}>
            {userHost?.name}, {userAge}
          </Text>
          <CheckStarIcon />
        </View>
        <Text
          style={{
            color: whiteColor,
            fontFamily: Satoshi400,
            fontSize: RFValue(24, 812),
            marginBottom: 40,
            marginTop: 30,
            textAlign: 'center',
          }}>
          Are you sure you want to log out?
        </Text>
        <Button title="Yes, log out" onPress={() => handleLogout()} />
        <Button title="Cancel" variant="transparent" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default ModalLogout;

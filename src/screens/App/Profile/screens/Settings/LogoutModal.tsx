import {ImageBackground, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import Man from 'assets/images/app/man-rectangle.png';
import LogoutIcon from 'assets/images/icons/logout.svg';
import {FC, useContext} from 'react';
import Button from 'components/Button/Button';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../../../../contexts/AuthContext.tsx';

const ModalLogout: FC<{isVisible: boolean; onClose: () => void}> = ({isVisible, onClose}) => {
  const {setUser} = useContext(AuthContext);

  const handleLogout = () => {
    onClose();
    auth()
      .signOut()
      .then(() => {
        setUser([]);
      });
  };
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
          backgroundColor: blackColor,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: 40,
          paddingTop: 16,
          paddingHorizontal: 30,
        }}>
        <View style={{backgroundColor: whiteColor, height: 2, borderRadius: 10, width: 40, alignSelf: 'center', marginBottom: 22}} />
        <ImageBackground
          source={Man}
          style={{width: 84, height: 84, alignSelf: 'center', marginBottom: 10}}
          imageStyle={{borderRadius: 160}}
          resizeMode="cover">
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: transparentWhite16Color,
              borderRadius: 160,
              zIndex: 1000,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LogoutIcon width={22} height={22} />
          </View>
        </ImageBackground>
        <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(20, 812), marginBottom: 30, textAlign: 'center'}}>
          Jameson, 29
        </Text>
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), marginBottom: 40, textAlign: 'center'}}>
          Are you sure you want to log out?
        </Text>
        <Button title="Yes, log out" onPress={() => handleLogout()} />
        <Button title="Cancel" variant="transparent" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default ModalLogout;

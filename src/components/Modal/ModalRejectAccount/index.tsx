import React, {FC, useContext} from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import { blackColor, whiteColor } from 'constants/colors';
import Logo from 'assets/images/icons/logo.svg'
import SafetyAndWellbeing from 'screens/App/Profile/screens/SafetyAndWellbeing/SafetyAndWellbeing';
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi400, Satoshi500, Satoshi700 } from 'constants/fonts';
import auth from '@react-native-firebase/auth';
import { AuthContext } from 'contexts/AuthContext';
import { useUser } from 'src/store/userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from 'helpers/showToast';

interface RejectAccount {
  isVisible?: boolean;
  setIsVisible?: any;
  image: any;
}

const ModalRejectAccount: FC<RejectAccount> = ({isVisible, setIsVisible, image}) => {

  const {setUser} = useContext(AuthContext);
  const userHost = useUser((i: any) => i?.user);
  const setHookUser = useUser((i: any) => i?.setUser);
  
  const handleLogout = async () => {
    await auth().signOut();
    setUser([]);
    setHookUser(null);
    await AsyncStorage.removeItem('uid');
    showToast('inviteMatch', '', 'You logged out from your account', {ownerPhoto: userHost?.photos[0].image, status:'SUCCESSFULY'})
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropOpacity={1}
      animationInTiming={1} 
      animationOutTiming={1}
      backdropColor={blackColor}
      style={{
        margin: 0,
        zIndex: 999,
      }}>
      <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 24}}>
        <Logo />
        <View>
          <Image style={{width: 68, height: 68, borderRadius: 68, marginBottom: 24}} source={{uri: image}}/>
          <Text style={{color: whiteColor, fontSize: RFValue(42, 812), fontFamily: Satoshi500, marginBottom: 24}}>Your Account is Not Approved</Text>
          <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi400, marginBottom: 24}}>
            We're sorry, but it seems your account has not been approved for use at the moment.
            Our team is working diligently to review all accounts, and yours will be evaluated shortly.
            If you believe this is an error or have any questions, please feel free to contact our support team.
          </Text>
          <SafetyAndWellbeing wellbeingShow={false}/>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{color: whiteColor, fontSize: RFValue(20, 812), fontFamily: Satoshi500}}>Logout</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalRejectAccount;

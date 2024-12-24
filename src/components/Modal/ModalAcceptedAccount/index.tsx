import React, {FC} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import {blackColor, whiteColor} from 'constants/colors';
import Logo from 'assets/images/icons/logo.svg';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import Loading from 'components/Loading/Loading';
import Button from 'components/Button/Button';
import {commonStackPath, earlyAccessPath} from 'constants/pathLocations';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';

interface RejectAccount {
  isVisible?: boolean;
  setIsVisible?: any;
  userInfo: any;
  // image: any;
}

const ModalAcceptedAccount: FC<RejectAccount> = ({isVisible, setIsVisible, userInfo}) => {
  const apiUserInfoCollection = Config.API_USERINFO_COLLECTION || 'userInfo';
  const navigation = useNavigation();

  const handleContinue = async () => {
    navigation.navigate(commonStackPath, {screen: earlyAccessPath} as never);

    setIsVisible(false);
    try {
      await firestore().collection(apiUserInfoCollection).doc(userInfo?.uid).update({
        showModalAccept: false,
      });
    } catch (error) {
      console.log('error showModalAccept', error);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropOpacity={1}
      backdropColor={blackColor}
      animationInTiming={1}
      animationOutTiming={1}
      style={{
        margin: 0,
        zIndex: 999,
      }}>
      <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 24}}>
          <Logo />
          <Text style={{color: whiteColor, fontSize: RFValue(48, 812), fontFamily: Satoshi500, marginTop: 35}}>Accepted!</Text>
          <View style={{}}>
            <Loading
              topPosition={false}
              userInfo={userInfo}
              text={userInfo?.name}
              styleContainer={{height: 490, flex: 0}}
              showCheckIcon={true}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 24}}>
          <Text style={{color: whiteColor, textAlign: 'center', fontSize: RFValue(20, 812), fontFamily: Satoshi400, marginBottom: 30}}>
            Congratulations! Join invitation accepted. Welcome aboard!
          </Text>
          <Button onPress={handleContinue} title="Continue" buttonStyle={{width: '100%'}} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalAcceptedAccount;

import {SafeAreaView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {FC} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, whiteColor} from 'constants/colors';
import CheckIcon from 'src/assets/images/icons/Check-black.svg';
import LogoIcon from 'assets/images/icons/logo.svg';
import {Satoshi400} from 'constants/fonts';

interface LoaderProps {
  isVisible: boolean;
}

const ModalUpgradeSuccessful: FC<LoaderProps> = ({isVisible}) => {
  return (
    <Modal isVisible={isVisible} coverScreen animationInTiming={1} backdropColor={blackColor} backdropOpacity={1} style={{margin: 0}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <LogoIcon />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: whiteColor,
                width: 125,
                height: 125,
                borderRadius: 125,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CheckIcon width={68} height={68} />
            </View>
            <Text style={{fontFamily: Satoshi400, marginTop: 12, fontSize: RFValue(20, 812), color: whiteColor, textAlign: 'center'}}>
              Upgrade Successful!
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalUpgradeSuccessful;

import {Text, View} from 'react-native';
import FlashIcon from 'assets/images/icons/flash.svg';
import {lightGray10Color, lightGray8Color, whiteColor} from 'constants/colors';
import Modal from 'react-native-modal';
import {Satoshi700Italic} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {FC} from 'react';

const SuperInvite: FC<{isVisibleSuperInvite: boolean; onCloseSuperInvite: () => void}> = ({isVisibleSuperInvite, onCloseSuperInvite}) => {
  return (
    <Modal isVisible={isVisibleSuperInvite} coverScreen backdropColor={lightGray10Color} backdropOpacity={0.97} onBackdropPress={onCloseSuperInvite}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: 62, height: 62, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: lightGray8Color}}>
          <FlashIcon />
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 16, borderRadius: 100, backgroundColor: lightGray8Color, marginTop: 8}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi700Italic, fontSize: RFValue(20, 812)}}>Super Invite</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SuperInvite;

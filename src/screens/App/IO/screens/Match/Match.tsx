import {lightGray10Color, transparentGray60Color, whiteColor} from 'constants/colors';
import {Text, TouchableOpacity, View, Image, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import FakeGirlCircle from 'assets/images/app/fake-girl-circle.png';
import FakePlaceCircle from 'assets/images/app/fake-place-circle.png';
import LogoPrimary from 'assets/images/auth/logo-primary.svg';
import Close from 'assets/images/icons/close.svg';
import Button from 'components/Button/Button';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight} from 'constants/common';
import {FC} from 'react';

const Match: FC<{isVisibleMatch: boolean; onCloseMatch: () => void; name: string}> = ({isVisibleMatch, onCloseMatch, name}) => {
  return (
    <Modal isVisible={isVisibleMatch} coverScreen backdropColor={lightGray10Color} backdropOpacity={0.97} onBackdropPress={onCloseMatch}>
      <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onCloseMatch}
            style={{
              borderRadius: 100,
              backgroundColor: transparentGray60Color,
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              alignSelf: 'flex-end',
            }}>
            <Close />
          </TouchableOpacity>
          <LogoPrimary width={200} style={{alignSelf: 'center', marginTop: screenHeight / 30}} />
        </View>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Image source={FakePlaceCircle} style={{width: 200, height: 200}} />
          <Image source={FakeGirlCircle} style={{width: 200, height: 200, position: 'absolute', right: 0}} />
        </View>
        <View>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(34, 812), textAlign: 'center', marginBottom: screenHeight / 30}}>
            New invite match!
          </Text>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812), textAlign: 'center', marginBottom: screenHeight / 20}}>
            {name} wants to join you!
          </Text>
          <Button onPress={onCloseMatch} title="Approve invitation" />
          <Button onPress={onCloseMatch} title="Continue swiping" variant="transparent" />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Match;

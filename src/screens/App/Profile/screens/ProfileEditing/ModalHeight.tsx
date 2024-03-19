import {Switch} from '@ant-design/react-native';
import {blackColor, grayColor, lightGray2Color, toggleColor, transparentGray90Color, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import Height from 'assets/images/icons/arrow-3.svg';
import {Dispatch, FC, SetStateAction} from 'react';
import {Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';

interface ModalHeightProps {
  isVisible: boolean;
  onClose: () => void;
  showHeight: boolean;
  setShowHeight: Dispatch<SetStateAction<boolean>>;
  height: string | null;
  setHeight: Dispatch<SetStateAction<string | null>>;
  heightsList: {id: number; value: number; label: string}[];
}

const ModalHeight: FC<ModalHeightProps> = ({isVisible, onClose, showHeight, setShowHeight, height, setHeight, heightsList}) => {
  2;
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      coverScreen
      backdropColor={'rgba(0, 0, 0, 0.99)'}
      backdropOpacity={0.8}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}>
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
        <View
          style={{
            borderRadius: 100,
            backgroundColor: transparentGray90Color,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          <Height />
        </View>
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), textAlign: 'center', marginBottom: 10}}>
          What is your height?
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Show in my profile</Text>
          <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showHeight} onChange={val => setShowHeight(val)} />
        </View>
        <View style={{paddingVertical: 16, paddingHorizontal: 20, backgroundColor: lightGray2Color, borderRadius: 10, alignItems: 'center'}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>{height} cm</Text>
        </View>
        <Picker selectedValue={height} onValueChange={val => setHeight(val)}>
          {heightsList.map(({id, value, label}) => (
            <Picker.Item value={value} key={id} label={label} color={whiteColor} />
          ))}
        </Picker>
      </View>
    </Modal>
  );
};

export default ModalHeight;

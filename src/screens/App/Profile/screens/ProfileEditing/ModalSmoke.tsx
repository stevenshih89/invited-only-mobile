import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Smoke from 'assets/images/icons/smoke.svg';
import {blackColor, grayColor, lightGray15Color, toggleColor, transparentGray90Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400} from 'constants/fonts';
import Button from 'components/Button/Button';

interface ModalSmokeProps {
  isVisible: boolean;
  onClose: () => void;
  showSmoke: boolean;
  setShowSmoke: Dispatch<SetStateAction<boolean>>;
  activeSmokeItem: {id: number; title: string} | null;
  setActiveSmokeItem: Dispatch<SetStateAction<{id: number; title: string} | null>>;
  listOfSmokes: {id: number; title: string}[];
  saveUserInfo: any;
}

const ModalSmoke: FC<ModalSmokeProps> = ({isVisible, onClose, showSmoke, setShowSmoke, activeSmokeItem, setActiveSmokeItem, listOfSmokes, saveUserInfo}) => {
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
        <View
          style={{
            borderRadius: 100,
            backgroundColor: transparentGray90Color,
            height: 84,
            width: 84,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          <Smoke width={32} height={32} />
        </View>
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), textAlign: 'center', marginBottom: 10}}>
          Do you smoke?
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Show in my profile</Text>
          <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showSmoke} onChange={val => setShowSmoke(val)} />
        </View>
        <FlatList
          data={listOfSmokes}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          renderItem={({item}) => {
            const isActive = activeSmokeItem?.id === item.id;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveSmokeItem(item)}
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderRadius: isActive ? 10 : 0,
                  borderBottomColor: isActive ? 'transparent' : transparentWhite16Color,
                  backgroundColor: isActive ? lightGray15Color : 'transparent',
                  paddingHorizontal: 20,
                  paddingVertical: 16
                  // alignItems: 'center',
                }}>
                <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi400}}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <Button onPress={() => {
          saveUserInfo('Smoke')
          onClose()
          }} title="Save" buttonStyle={{marginTop: 20}} />
      </View>
    </Modal>
  );
};

export default ModalSmoke;

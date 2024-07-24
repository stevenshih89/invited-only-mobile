import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Сhampagne from 'assets/images/icons/champagne.svg';
import {blackColor, grayColor, lightGray15Color, toggleColor, transparentGray90Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400} from 'constants/fonts';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../../../../store/userStore';
import Button from 'components/Button/Button';

interface ModalAlcoholProps {
  isVisible: boolean;
  onClose: () => void;
  showAlcohol: boolean;
  setShowAlcohol: Dispatch<SetStateAction<boolean>>;
  activeAlcoholItem: {title: string} | null;
  setActiveAlcoholItem: Dispatch<SetStateAction<{title: string} | null>>;
  listOfAlcohols: any[];
  saveUserInfo: any;
}

const ModalAlcohol: FC<ModalAlcoholProps> = ({
  isVisible,
  onClose,
  showAlcohol,
  setShowAlcohol,
  activeAlcoholItem,
  setActiveAlcoholItem,
  listOfAlcohols,
  saveUserInfo
}) => {
  const userHost = useUser((i: any) => i?.user);
  const setUserInfo = useUser((i: any) => i?.setUser);

  const handleUpdateShowInMyProfile = async (state: string): Promise<void> => {
    try {
      const uid = userHost?.uid;
      setShowAlcohol(state);
      await firestore().collection('userInfo').doc(uid).update({
        showAlcohol: state,
      });
      const userInfoDoc = await firestore().collection('userInfo').doc(uid).get();

      if (userInfoDoc?.exists) {
        setUserInfo(userInfoDoc.data());
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdateAlcohol = async (gender: string): Promise<void> => {
    try {
      const uid = userHost?.uid;
      setActiveAlcoholItem(gender);
      await firestore().collection('userInfo').doc(uid).update({
        alcohol: gender,
      });
      const userInfoDoc = await firestore().collection('userInfo').doc(uid).get();

      if (userInfoDoc?.exists) {
        setUserInfo(userInfoDoc.data());
      }
    } catch (e) {
      console.log(e);
    }
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
          <Сhampagne width={32} height={32} />
        </View>
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), textAlign: 'center', marginBottom: 10}}>
          Do you drink alcohol?
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Show in my profile</Text>
          <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showAlcohol} onChange={val => handleUpdateShowInMyProfile(val)} />
        </View>
        <FlatList
          data={listOfAlcohols}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            const isActive = activeAlcoholItem === item.title;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleUpdateAlcohol(item?.title)}
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderRadius: isActive ? 10 : 0,
                  borderBottomColor: isActive ? 'transparent' : transparentWhite16Color,
                  backgroundColor: isActive ? lightGray15Color : 'transparent',
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  // alignItems: 'center',
                }}>
                <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi400}}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <Button onPress={() => {
          saveUserInfo('Alcohol')
          onClose()
        }} title="Save" buttonStyle={{marginTop: 20}} />
      </View>
    </Modal>
  );
};

export default ModalAlcohol;

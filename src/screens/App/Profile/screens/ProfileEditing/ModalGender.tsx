import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Gender from 'assets/images/icons/tabler_gender-bigender.svg';
import {blackColor, grayColor, lightGray15Color, toggleColor, transparentGray90Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400} from 'constants/fonts';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../../../../store/userStore';
import Button from 'components/Button/Button';

interface ModalGenderProps {
  isVisible: boolean;
  onClose: () => void;
  showGender: boolean;
  setShowGender: Dispatch<SetStateAction<boolean>>;
  activeGenderItem: {title: string} | null;
  setActiveGenderItem: Dispatch<SetStateAction<{title: string} | null>>;
  listOfGenders: any[];
}

const ModalGender: FC<ModalGenderProps> = ({isVisible, onClose, showGender, setShowGender, activeGenderItem, setActiveGenderItem, listOfGenders}) => {
  const userHost = useUser((i: any) => i?.user);
  const setUserInfo = useUser((i: any) => i?.setUser);

  const handleUpdateShowInMyProfile = async (state: string): Promise<void> => {
    try {
      const uid = userHost?.uid;
      setShowGender(state);
      await firestore().collection('userInfo').doc(uid).update({
        showGender: state,
      });
      const userInfoDoc = await firestore().collection('userInfo').doc(uid).get();

      if (userInfoDoc?.exists) {
        setUserInfo(userInfoDoc.data());
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateGender = async (gender: string): Promise<void> => {
    try {
      const uid = userHost?.uid;
      setActiveGenderItem(gender);
      await firestore().collection('userInfo').doc(uid).update({
        gender: gender,
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
          <Gender width={32} height={32} />
        </View>
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), textAlign: 'center', marginBottom: 10}}>
          What is your gender?
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Show in my profile</Text>
          <Switch
            trackColor={{false: grayColor, true: toggleColor}}
            checked={showGender}
            onChange={val => {
              handleUpdateShowInMyProfile(val);
            }}
          />
        </View>
        <FlatList
          data={listOfGenders}
          scrollEnabled={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            const isActive = activeGenderItem === item.title;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleUpdateGender(item?.title)}
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderRadius: isActive ? 10 : 0,
                  borderBottomColor: isActive ? 'transparent' : transparentWhite16Color,
                  backgroundColor: isActive ? lightGray15Color : 'transparent',
                  padding: 16,
                  // alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: isActive ? whiteColor : whiteColor,
                    fontSize: RFValue(18, 812),
                    fontFamily: Satoshi400,
                    textTransform: 'capitalize',
                  }}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <Button title="Save" buttonStyle={{marginTop: 20}} />
      </View>
    </Modal>
  );
};

export default ModalGender;

import React, {FC} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';

//import components
import useStyles from './styles.ts';

//import icons
import IconCheckBoxSelected from './../../../assets/images/icons/checkbox-selected.svg';
import {blackColor, grayColor, lightGray14Color, lightGray2Color, toggleColor, whiteColor} from 'constants/colors.ts';
import {Satoshi400} from 'constants/fonts.ts';
import {RFValue} from 'react-native-responsive-fontsize';
import {Switch} from '@ant-design/react-native';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../../store/userStore';

interface ModalSelectLanguagesProps {
  modalLanguages: boolean;
  showLanguages: boolean;
  setModalLanguages: any;
  setShowLanguages: any;
}

const ModalSelectLanguages: FC<ModalSelectLanguagesProps> = ({setShowLanguages, showLanguages, modalLanguages, setModalLanguages}) => {
  const styles = useStyles();
  const userHost = useUser((i: any) => i?.user);
  const setUserData = useUser((i: any) => i?.setUser);
  const languagesTitle = userHost?.languages?.title;
  const uid = userHost?.uid;

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'English',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Arabic',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Spanish',
    },
    {
      id: 'bd7acbe2a-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Russian',
    },
    {
      id: '3ac68af3c-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Ukranian',
    },
    {
      id: '58694a40f-3da1-471f-bd96-145571e29d72',
      title: 'French',
    },
    {
      id: 'bd7acb5ea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Hebrew',
    },
    {
      id: '3ac68a6fc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Portugese',
    },
    {
      id: '58694a70f-3da1-471f-bd96-145571e29d72',
      title: 'German',
    },
    {
      id: '3ac688afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Italian',
    },
    {
      id: '58694fa0f-3da1-471f-bd96-145571e29d72',
      title: 'Korean',
    },
  ];

  const handleSetShowInMyProfile = async (state: boolean): Promise<void> => {
    try {
      setShowLanguages(state);
      await firestore().collection('userInfo').doc(uid).update({
        showLanguages: state,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetLanguages = async (item: string): Promise<void> => {
    try {
      await firestore().collection('userInfo').doc(uid).update({
        languages: item,
      });
      await firestore()
        .collection('userInfo')
        .doc(uid)
        .get()
        .then(res => {
          setUserData(res.data());
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      isVisible={modalLanguages}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.94)'}
      testID={'bottom-half-modal-open-button'}
      onBackdropPress={() => setModalLanguages(false)}
      onSwipeComplete={() => setModalLanguages(false)}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <View style={styles.wrapper}>
        <View style={styles.whiteLine} />
        <Text style={styles.textReport}>Select the languages</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34, width: '100%'}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Show in my profile</Text>
          <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showLanguages} onChange={val => handleSetShowInMyProfile(val)} />
        </View>
        <View style={{height: '70%', width: '100%'}}>
          <FlatList
            data={DATA}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              const isActive = languagesTitle === item?.title;
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSetLanguages(item)}
                  style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 10,
                    borderColor: isActive ? whiteColor : 'transparent',
                    backgroundColor: isActive ? lightGray14Color : lightGray2Color,
                    paddingVertical: 18,
                    marginVertical: 4,
                    alignItems: 'flex-start',
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi400}}>{item.title}</Text>
                  {isActive ? (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        borderColor: whiteColor,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <IconCheckBoxSelected />
                    </View>
                  ) : (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        borderColor: '#323232',
                        borderRadius: 5,
                      }}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalSelectLanguages;

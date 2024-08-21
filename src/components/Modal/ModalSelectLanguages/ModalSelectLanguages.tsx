import React, {FC, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
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

import CloseCircle from 'src/assets/images/icons/close-circle.svg'
import Search from 'src/assets/images/icons/search.svg'
import US from 'src/assets/images/flags/us.svg'
import AE from 'src/assets/images/flags/ae.svg'
import ES from 'src/assets/images/flags/es.svg'
import UA from 'src/assets/images/flags/ua.svg'
import FR from 'src/assets/images/flags/fr.svg'
import PL from 'src/assets/images/flags/pl.svg'
import IL from 'src/assets/images/flags/il.svg'
import PT from 'src/assets/images/flags/pt.svg'
import DE from 'src/assets/images/flags/de.svg'
import IT from 'src/assets/images/flags/it.svg'
import KR from 'src/assets/images/flags/kr.svg'
import Button from 'components/Button/Button.tsx';
import { showToast } from 'helpers/showToast.ts';

interface ModalSelectLanguagesProps {
  modalLanguages: boolean;
  showLanguages: boolean;
  setModalLanguages: any;
  setShowLanguages: any;
}

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'English',
    flag: US
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Arabic',
    flag: AE
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Spanish',
    flag: ES
  },
  // {
  //   id: 'bd7acbe2a-c1b1-46c2-aed5-3ad53abb28ba',
  //   title: 'Russian',
  //   flag: AE
  // },
  {
    id: '3ac68af3c-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Ukranian',
    flag: UA
  },
  {
    id: '58694a40f-3da1-471f-bd96-145571e29d72',
    title: 'French',
    flag: FR
  },
  {
    id: '12145a90f-1dа1-431f-b436-096771e29d72',
    title: 'Polish',
    flag: PL
  },
  {
    id: 'bd7acb5ea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Hebrew',
    flag: IL
  },
  {
    id: '3ac68a6fc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Portugese',
    flag: PT
  },
  {
    id: '58694a70f-3da1-471f-bd96-145571e29d72',
    title: 'German',
    flag: DE
  },
  {
    id: '3ac688afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Italian',
    flag: IT
  },
  {
    id: '58694fa0f-3da1-471f-bd96-145571e29d72',
    title: 'Korean',
    flag: KR
  },
];

const ModalSelectLanguages: FC<ModalSelectLanguagesProps> = ({setShowLanguages, showLanguages, modalLanguages, setModalLanguages}) => {
  const styles = useStyles();
  const userHost = useUser((i: any) => i?.user);
  
  const setUserData = useUser((i: any) => i?.setUser);
  const languagesTitle = userHost?.languages?.title;
  const uid = userHost?.uid;
  const [selectLanguage, setSelectLanguage] = useState<Object>();

  useEffect(() => {
    setSelectLanguage(userHost.languages)
  },[])

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

  const handleSetLanguages = async (): Promise<void> => {
    try {
      await firestore().collection('userInfo').doc(uid).update({
        languages: selectLanguage,
      });
      await firestore()
        .collection('userInfo')
        .doc(uid)
        .get()
        .then(res => {
          setUserData(res.data());
        }).then(() => showToast('inviteMatch', 'Your profile is updated', 'Languages successfully changed!', {ownerPhoto: userHost.image, status: 'UPDATED'}));
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
        <View style={{width: '100%', marginBottom: 34, alignItems: 'center'}}>
          <View style={{position: 'absolute', zIndex: 20, left: 20, top: 22}}>
            <Search width={16} height={16}/>
          </View>
          <TouchableOpacity style={{position: 'absolute', zIndex: 20, right: 20, top: 22}}>
            <CloseCircle width={16} height={16}/>
          </TouchableOpacity>
          <TextInput
          style={{
            paddingVertical: 16, 
            paddingLeft: 44,
            paddingRight: 44,
            backgroundColor: lightGray2Color, 
            borderRadius: 10, 
            width: '100%', 
            fontSize: RFValue(18, 812), 
            fontFamily: Satoshi400, 
            color: whiteColor}}
          placeholder='English'
          placeholderTextColor={whiteColor}
          />
        </View>
        <View style={{height: '70%', width: '100%'}}>
          <FlatList
            data={DATA}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              const isActive = selectLanguage?.title === item?.title;
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelectLanguage(item)}
                  // onPress={() => handleSetLanguages(item)}
                  style={{
                    // borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 10,
                    borderColor: isActive ? whiteColor : 'transparent',
                    backgroundColor: isActive ? lightGray14Color : lightGray2Color,
                    paddingVertical: 16,
                    marginVertical: 4,
                    alignItems: 'flex-start',
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <item.flag />
                    <Text style={{color: whiteColor, fontSize: RFValue(18, 812), marginLeft: 10, fontFamily: Satoshi400}}>{item.title}</Text>
                  </View>
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
          <Button onPress={() => {
            handleSetLanguages()
            setModalLanguages(false)
          }} title="Save" buttonStyle={{marginTop: 20, marginBottom: 20,}} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalSelectLanguages;

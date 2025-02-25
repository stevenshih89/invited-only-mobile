import {FlatList, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Job from 'assets/images/icons/job.svg';
import {blackColor, grayColor, grayScale600, lightGray2Color, toggleColor, transparentGray90Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Switch} from '@ant-design/react-native';
import {Dispatch, FC, SetStateAction, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {isIos, screenHeight} from 'constants/common';
import Button from 'components/Button/Button';

interface ModalWorkProps {
  isVisible: boolean;
  onClose: () => void;
  showWork: boolean;
  setShowWork: Dispatch<SetStateAction<boolean>>;
  // activeWorkItem: {id: number; title: string} | null;
  // setActiveWorkItem: (val: any) => void;
  saveUserInfo: any;
  textNameWork: string;
  setTextNameWork: Dispatch<SetStateAction<string>>;
  textDescription: string;
  setTextDescription: Dispatch<SetStateAction<string>>;
}

const ModalWork: FC<ModalWorkProps> = ({
  isVisible, 
  onClose, 
  saveUserInfo, 
  showWork, 
  setShowWork, 
  textNameWork, 
  setTextNameWork,
  textDescription,
  setTextDescription
}) => {
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
        // marginTop: screenHeight / 2,
        justifyContent: 'flex-end',
        zIndex: 999,
      }}
      swipeDirection={['down']}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={0} style={{paddingBottom: 0}}>
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
          <Job width={32} height={32} />
        </View>
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), textAlign: 'center', marginBottom: 10}}>
          What do you do for living? 
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Show in my profile</Text>
          <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showWork} onChange={val => setShowWork(val)} />
        </View>
        <View>
          <Text style={{fontSize: RFValue(14,812), fontFamily: Satoshi500, color: whiteColor, marginBottom: 8}}>Title</Text>
          <TextInput value={textNameWork} onChangeText={text => setTextNameWork(text)} placeholder='Enter your title' placeholderTextColor={grayScale600} style={{padding: 16, borderRadius: 10, fontSize: RFValue(18, 812), backgroundColor: lightGray2Color, color: whiteColor}}/>
        </View>
        <View>
          <Text style={{fontSize: RFValue(14,812), fontFamily: Satoshi500, color: whiteColor, marginTop: 14, marginBottom: 8}}>Company or industry</Text>
          <TextInput value={textDescription} onChangeText={text => setTextDescription(text)} placeholder='Enter company (or just industry)' placeholderTextColor={grayScale600} style={{padding: 16, borderRadius: 10, fontSize: RFValue(18, 812), backgroundColor: lightGray2Color, color: whiteColor}}/>
        </View>
        <Button onPress={() => {
          saveUserInfo('Work')
          onClose()
        }} title="Save" buttonStyle={{marginTop: 20}} 
          
          />
        {/* <FlatList
          data={listOfWorks}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            const isActive = activeWorkItem?.id === item.id;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveWorkItem(item)}
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderRadius: isActive ? 10 : 0,
                  borderBottomColor: isActive ? 'transparent' : transparentWhite16Color,
                  backgroundColor: isActive ? whiteColor : 'transparent',
                  paddingVertical: 18,
                  alignItems: 'center',
                }}>
                <Text style={{color: isActive ? blackColor : whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi400}}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        /> */}
      </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalWork;

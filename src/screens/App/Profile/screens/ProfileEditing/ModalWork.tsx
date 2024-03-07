import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Bookmark from 'assets/images/icons/bookmark.svg';
import {blackColor, grayColor, toggleColor, transparentGray90Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Switch} from '@ant-design/react-native';
import {FC, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400} from 'constants/fonts';
import {screenHeight} from 'constants/common';

const ModalWork: FC<{isVisible: boolean; onClose: () => void}> = ({isVisible, onClose}) => {
  const [isChechked, setIsChechked] = useState(false);

  const [activeItemId, setActiveItemId] = useState(0);

  const listOfItems = [
    {
      id: 0,
      title: 'Hospitality and Tourism',
    },
    {
      id: 1,
      title: 'Real Estate & Property Management',
    },
    {
      id: 2,
      title: 'Financial Services',
    },
    {
      id: 3,
      title: 'Retail & E-commerce',
    },
    {
      id: 4,
      title: 'Construction & Engineering',
    },
    {
      id: 5,
      title: 'Information Technology',
    },
    {
      id: 6,
      title: 'Healthcare & Medical Services',
    },
    {
      id: 7,
      title: 'Education & Training',
    },
    {
      id: 8,
      title: 'Oil & Gas Industry',
    },
    {
      id: 9,
      title: 'Media & Entertainment',
    },
    {
      id: 10,
      title: 'Logistics & Transportation',
    },
    {
      id: 11,
      title: 'Legal Services',
    },
    {
      id: 12,
      title: 'Fashion & Luxury Goods',
    },
    {
      id: 13,
      title: 'Advertising & Marketing',
    },
    {
      id: 14,
      title: 'Renewable Energy & Sustainability',
    },
    {
      id: 15,
      title: 'Consulting and Advisory Services',
    },
    {
      id: 16,
      title: 'Telecommunications',
    },
    {
      id: 17,
      title: 'Aerospace & Aviation',
    },
    {
      id: 18,
      title: 'Food & Beverage Industry',
    },
    {
      id: 19,
      title: 'Government & Public Sector',
    },
  ];

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
        marginTop: screenHeight / 2,
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
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          <Bookmark />
        </View>
        <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(24, 812), textAlign: 'center', marginBottom: 10}}>
          What is your work?
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(18, 812)}}>Show in my profile</Text>
          <Switch trackColor={{false: grayColor, true: toggleColor}} checked={isChechked} onChange={val => setIsChechked(val)} />
        </View>
        <FlatList
          data={listOfItems}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            const isActive = activeItemId === item.id;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveItemId(item.id)}
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
        />
      </View>
    </Modal>
  );
};

export default ModalWork;

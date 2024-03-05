import {blackColor, lightGray2Color, lightGray5Color, whiteColor} from 'constants/colors';
import {screenWidth} from 'constants/common';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import ArrowDown from 'assets/images/icons/arrow-down.svg';
import {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const MyInterests = () => {
  const [listOfInterests, setListOfInterests] = useState([
    {id: 0, title: 'Bussiness', isSelected: true},
    {id: 1, title: 'Technology', isSelected: false},
    {id: 2, title: 'Science', isSelected: false},
    {id: 3, title: 'Art', isSelected: false},
    {id: 4, title: 'Music', isSelected: false},
    {id: 5, title: 'Fashion', isSelected: false},
    {id: 6, title: 'Health', isSelected: false},
    {id: 7, title: 'Sport', isSelected: false},
    {id: 8, title: 'Travel', isSelected: false},
    {id: 9, title: 'Food', isSelected: false},
    {id: 10, title: 'Education', isSelected: false},
    {id: 11, title: 'Politics', isSelected: false},
    {id: 12, title: 'Lifestyle', isSelected: false},
    {id: 13, title: 'Entertainment', isSelected: false},
    {id: 14, title: 'Environment', isSelected: false},
    {id: 15, title: 'Culture', isSelected: false},
  ]);

  const handleSelectInterest = (id: number) => {
    const updatedInterests = listOfInterests.map(interest => {
      return interest.id === id ? {...interest, isSelected: !interest.isSelected} : interest;
    });
    setListOfInterests(updatedInterests);
  };

  return (
    <View style={{backgroundColor: lightGray5Color, borderRadius: 10, marginTop: 24, padding: 20}}>
      <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812), marginBottom: 26}}>My interests</Text>
      <View style={{width: '100%'}}>
        <FlatList
          data={listOfInterests.filter(({isSelected}) => isSelected)}
          numColumns={3}
          keyExtractor={({id}) => id.toString()}
          scrollEnabled={false}
          contentContainerStyle={{width: '100%'}}
          ItemSeparatorComponent={() => <View style={{height: 10, width: 10}} />}
          renderItem={({item: {id, title, isSelected}}) => (
            <>
              {isSelected && (
                <View style={{paddingHorizontal: 5, maxWidth: screenWidth / 2 - 40, flex: 1}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleSelectInterest(id)}
                    style={{
                      flex: 1,
                      borderRadius: 30,
                      paddingVertical: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: whiteColor,
                    }}>
                    <Text style={{color: blackColor, fontSize: RFValue(13, 812), fontFamily: Satoshi400}}>{title}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        />
      </View>
      <View style={{width: '100%'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 26}}>
          <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(14, 812)}}>Add more interests</Text>
          <ArrowDown />
        </TouchableOpacity>
        <FlatList
          data={listOfInterests.filter(({isSelected}) => !isSelected)}
          numColumns={3}
          keyExtractor={({id}) => id.toString()}
          scrollEnabled={false}
          contentContainerStyle={{width: '100%'}}
          ItemSeparatorComponent={() => <View style={{height: 10, width: 10}} />}
          renderItem={({item: {id, title, isSelected}}) => (
            <>
              {!isSelected && (
                <View style={{paddingHorizontal: 5, maxWidth: screenWidth / 2 - 40, flex: 1}}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleSelectInterest(id)}
                    style={{
                      flex: 1,
                      borderRadius: 30,
                      paddingVertical: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: lightGray2Color,
                    }}>
                    <Text style={{color: whiteColor, fontSize: RFValue(13, 812), fontFamily: Satoshi400}}>{title}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        />
      </View>
    </View>
  );
};

export default MyInterests;

import {blackColor, lightGray2Color, lightGray5Color, whiteColor} from 'constants/colors';
import {screenWidth} from 'constants/common';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import ArrowDown from 'assets/images/icons/arrow-down.svg';
import {Dispatch, FC, SetStateAction} from 'react';
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

interface MyInterestsProps {
  listOfInterests: {id: number; title: string; isSelected: boolean}[];
  setListOfInterests: Dispatch<SetStateAction<{id: number; title: string; isSelected: boolean}[]>>;
  loading: boolean;
}

const MyInterests: FC<MyInterestsProps> = ({listOfInterests, setListOfInterests, loading}) => {
  const handleSelectInterest = (id: number) => {
    const updatedInterests = listOfInterests.map(interest => (interest.id === id ? {...interest, isSelected: !interest.isSelected} : interest));
    setListOfInterests(updatedInterests);
  };

  if (loading) {
    return <ActivityIndicator style={{backgroundColor: lightGray5Color, borderRadius: 10, marginTop: 24, padding: 20}} />;
  }

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

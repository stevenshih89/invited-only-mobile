import {isIos, screenHeight, screenWidth} from 'constants/common';
import {FC, useContext, useState} from 'react';
import {FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import EightyIcon from 'assets/images/auth/progress/eighty.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import SearchIcon from 'assets/images/icons/search.svg';
import {black1Color, lightGray2Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {myEmailPath} from 'constants/pathLocations';
import {AuthContext} from 'contexts/AuthContext.tsx';
import Input from 'components/Inputs/Input';
import AuthProgress from 'components/AuthProgress';

const MyInterests: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const [search, setSearch] = useState<string>('');
  const [listOfInterests, setListOfInterests] = useState([
    {id: 0, title: 'Bussiness', isSelected: false},
    {id: 1, title: 'Traveling', isSelected: false},
    {id: 2, title: 'Cooking', isSelected: false},
    {id: 3, title: 'Music', isSelected: false},
    {id: 4, title: 'Painitng', isSelected: false},
    {id: 5, title: 'Gaming', isSelected: false},
    {id: 6, title: 'Hiking', isSelected: false},
    {id: 7, title: 'Yoga', isSelected: false},
    {id: 8, title: 'Writing', isSelected: false},
    {id: 9, title: 'Meditation', isSelected: false},
    {id: 10, title: 'Fishing', isSelected: false},
    {id: 11, title: 'Dancing', isSelected: false},
    {id: 12, title: 'Clubs', isSelected: false},
    {id: 13, title: 'Surfing', isSelected: false},
    {id: 14, title: 'Creativity', isSelected: false},
    {id: 15, title: 'Yacht', isSelected: false},
    {id: 16, title: 'Gardering', isSelected: false},
    {id: 17, title: 'Movies', isSelected: false},
    {id: 18, title: 'Restaurans', isSelected: false},
    {id: 19, title: 'Entrepreneur', isSelected: false},
  ]);

  const handleSelectInterest = (id: number) => {
    const updatedInterests = listOfInterests.map(interest => {
      const selectedInterestsCount = listOfInterests.filter(item => item.isSelected).length;
      return interest.id === id ? {...interest, isSelected: selectedInterestsCount === 3 ? false : !interest.isSelected} : interest;
    });
    setListOfInterests(updatedInterests);
  };

  const handleNext = () => {
    const reqInterests = listOfInterests.reduce((acc: any[], curr) => {
      if (curr.isSelected) {
        acc.push({id: curr.id, title: curr.title});
      }
      return acc;
    }, []);
    setOnBoarding([
      ...onBoarding,
      {
        interests: reqInterests,
      },
    ]);
    navigation.navigate(myEmailPath as never);
  };

  const list = search.length
    ? listOfInterests.filter(interest => interest.title.toLowerCase().includes(search.toLowerCase()))
    : listOfInterests;

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      keyboardVerticalOffset={15}
      style={{flex: 1, paddingBottom: 0, backgroundColor: black1Color}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingBottom: 0,
              paddingHorizontal: 24,
            }}>
            <View style={{alignItems: 'center'}}>
              <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.7}
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  style={{
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: transparentWhite30Color,
                  }}>
                  <ArrowLeft />
                </TouchableOpacity>
                <LogoPrimary2 />
                {/* <EightyIcon height={40} /> */}
                <AuthProgress startPercentage={70} endPercentage={80} animationDuration={1000} />
              </View>
              <View
                style={{
                  width: '100%',
                  marginBottom: screenHeight / 40,
                  marginTop: screenHeight / 50,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(34, 812),
                    marginBottom: 18,
                  }}>
                  My interests
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(17, 812),
                  }}>
                  Choose up to <Text style={{fontWeight: '700'}}>3 things</Text> you love. It will help you match with people
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <Input
                  value={search}
                  onChange={val => setSearch(val)}
                  InputIcon={() => <SearchIcon />}
                  containerInnerStyle={{flexDirection: 'row-reverse', height: 48}}
                  placeholder="Search interest"
                />
              </View>
              <View style={{width: '100%', height: screenHeight / 2.3}}>
                <FlatList
                  data={list}
                  numColumns={3}
                  keyExtractor={({id}) => id.toString()}
                  bounces={false}
                  contentContainerStyle={{width: '100%'}}
                  ItemSeparatorComponent={() => <View style={{height: 10, width: 10}} />}
                  renderItem={({item: {id, title, isSelected}}) => (
                    <View style={{paddingHorizontal: 5, maxWidth: screenWidth / 2 - 40, flex: 1}}>
                      <TouchableOpacity
                        onPress={() => handleSelectInterest(id)}
                        activeOpacity={0.7}
                        style={{
                          flex: 1,
                          borderRadius: 30,
                          paddingVertical: 8,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 1,
                          borderStyle: 'solid',
                          borderColor: isSelected ? whiteColor : 'transparent',
                          backgroundColor: lightGray2Color,
                        }}>
                        <Text style={{color: whiteColor, fontSize: RFValue(13, 812), fontFamily: Satoshi400}}>{title}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={{marginBottom: 4}}>
              <Button
                disabled={listOfInterests.filter(interest => interest.isSelected).length < 3}
                title={`Continue (${listOfInterests.filter(interest => interest.isSelected).length}/3)`}
                onPress={() => handleNext()}
              />
              <Button title="Skip" onPress={() => handleNext()} variant="transparent" />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MyInterests;

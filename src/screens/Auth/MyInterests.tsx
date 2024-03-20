import {isIos, screenHeight, screenWidth} from 'constants/common';
import {FC, useContext, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {lightGray2Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {myEmailPath} from 'constants/pathLocations';
import {AuthContext} from 'contexts/AuthContext.tsx';

const MyInterests: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

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
    const updatedInterests = listOfInterests.map(interest => (interest.id === id ? {...interest, isSelected: !interest.isSelected} : interest));
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

  return (
    <ImageBackground source={HalfBackground} resizeMode="cover" style={{flex: 1}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1, paddingBottom: 0}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: 0,
                paddingHorizontal: 38,
              }}>
              <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
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
                  <LogoSecondary />
                  <View style={{height: 40, justifyContent: 'center'}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>7/9</Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginBottom: screenHeight / 26,
                    marginTop: screenHeight / 80,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(34, 812),
                      marginBottom: 18,
                      textAlign: 'center',
                    }}>
                    My interests
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
                    }}>
                    Choose up to 3 things you love. It will help you match with people
                  </Text>
                </View>
                <View style={{width: '100%', height: screenHeight / 2.1}}>
                  <FlatList
                    data={listOfInterests}
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
              <View style={{marginBottom: 4, flexDirection: 'row', alignItems: 'center'}}>
                <Button title="Skip" buttonStyle={{flex: 0.5, marginRight: 2}} onPress={() => handleNext()} variant="transparent" />
                <Button title="Next" buttonStyle={{flex: 1.5, marginLeft: 2}} onPress={() => handleNext()} />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default MyInterests;

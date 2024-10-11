import {isIos, screenHeight, screenWidth} from 'constants/common';
import {FC, useContext, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import CheckIcon from 'assets/images/icons/Check-black.svg';
import BirthdayParty from 'assets/images/auth/interests/birthday-party.jpg';
import Exclusive from 'assets/images/auth/interests/exclusive.jpg';
import PoolParty from 'assets/images/auth/interests/pool-party.jpg';
import Private from 'assets/images/auth/interests/private.jpg';
import Restaurant from 'assets/images/auth/interests/restaurant.jpg';
import VipTables from 'assets/images/auth/interests/vip-tables.jpg';
import YachtParty from 'assets/images/auth/interests/yacht-party.jpg';
import Concert from 'assets/images/auth/interests/concerts.jpg';
import UserOne from 'assets/images/auth/interests/user-one.png';
import UserTwo from 'assets/images/auth/interests/user-two.png';
import {black1Color, blackColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {myEmailPath} from 'constants/pathLocations';
import {AuthContext} from 'contexts/AuthContext.tsx';
import AuthProgress from 'components/AuthProgress';

const MyInterests: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const [listOfInterests, setListOfInterests] = useState([
    {id: 0, title: 'Vip Tabes', isSelected: false, image: VipTables},
    {id: 1, title: 'Concerts', isSelected: false, image: Concert},
    {id: 2, title: 'Exclusive', isSelected: false, image: Exclusive},
    {id: 3, title: 'YachtParty', isSelected: false, image: YachtParty},
    {id: 4, title: 'PoolParty', isSelected: false, image: PoolParty},
    {id: 5, title: 'Private', isSelected: false, image: Private},
    {id: 6, title: 'BirthdayParty', isSelected: false, image: BirthdayParty},
    {id: 7, title: 'Restaurant', isSelected: false, image: Restaurant},
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

  const accountType = onBoarding.find((item: {accountType: string}) => item.accountType)?.accountType;

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
                  Choose interests
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(17, 812),
                  }}>
                  Choose up to <Text style={{fontWeight: '700'}}>3{accountType === 'host' ? 'things' : ' event types'}</Text> you love. It
                  will help you match with people
                </Text>
              </View>
              <View style={{width: '100%', height: screenHeight / 2}}>
                <FlatList
                  data={listOfInterests}
                  numColumns={2}
                  keyExtractor={({id}) => id.toString()}
                  bounces={false}
                  contentContainerStyle={{width: '100%'}}
                  ItemSeparatorComponent={() => <View style={{height: screenHeight * 0.021}} />}
                  renderItem={({item: {id, title, isSelected, image}}) => (
                      <TouchableOpacity
                        onPress={() => handleSelectInterest(id)}
                        activeOpacity={0.7}
                        style={{
                          flex: 1,
                          borderRadius: 12,
                          width: '100%',
                          alignItems: 'center',
                          borderWidth: 1,
                          borderStyle: 'solid',
                          borderColor: isSelected ? whiteColor : blackColor,
                          marginHorizontal: 2,
                        }}>
                        <View style={{width: '100%', height: screenHeight * 0.268, borderRadius: 12, overflow: 'hidden'}}>
                          <ImageBackground source={image} style={{width: '100%', height: '100%', justifyContent: 'space-between'}}>
                            <TouchableOpacity
                              style={{
                                backgroundColor: whiteColor,
                                width: 20,
                                height: 20,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'flex-end',
                                marginRight: 11,
                                marginTop: 16,
                                opacity: isSelected ? 1 : 0.3,
                              }}>
                              <CheckIcon />
                            </TouchableOpacity>
                            <View
                              style={{
                                backgroundColor: whiteColor,
                                height: 40,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                <Text style={{color: blackColor, fontSize: RFValue(14, 812), fontFamily: Satoshi700, marginLeft: 16}}>
                                  {title}
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                  <Image
                                    source={UserOne}
                                    style={{
                                      width: 18,
                                      height: 18,
                                      borderRadius: 18,
                                      borderWidth: 1,
                                      borderColor: whiteColor,
                                    }}
                                  />
                                  <Image
                                    source={UserTwo}
                                    style={{
                                      width: 18,
                                      height: 18,
                                      borderRadius: 18,
                                      borderWidth: 1,
                                      borderColor: whiteColor,
                                      transform: [{translateX: -8}],
                                    }}
                                  />
                                  <View
                                    style={{
                                      width: 18,
                                      height: 18,
                                      backgroundColor: blackColor,
                                      borderRadius: 18,
                                      borderWidth: 1,
                                      borderColor: whiteColor,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      transform: [{translateX: -16}],
                                    }}>
                                    <Text
                                      style={{
                                        color: whiteColor,
                                        fontSize: RFValue(6, 812),
                                        fontFamily: Satoshi500,
                                      }}>
                                      40
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </ImageBackground>
                        </View>
                      </TouchableOpacity>
                  )}
                />
              </View>
            </View>
            <View style={{}}>
              <Button
                buttonStyle={{borderRadius: 18}}
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

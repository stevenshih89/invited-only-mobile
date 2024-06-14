import {isIos, screenHeight} from 'constants/common';
import {FC, useContext, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import SeventyIcon from 'assets/images/auth/progress/seventy.svg';
import {black1Color, lightGray3Color, transparentWhite16Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import CheckCircle from 'assets/images/icons/check-circle.svg';
import CircleGray from 'assets/images/icons/circle-gray.svg';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {myInterestsPath} from 'constants/pathLocations';
import {AuthContext} from 'contexts/AuthContext.tsx';

const GenderPreferences: FC = (): JSX.Element => {
  const MAN = 'man';
  const WOMAN = 'woman';
  const ANY = 'any';
  const [gender, setGender] = useState<string>(MAN);

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const handleNext = (val?: string) => {
    setOnBoarding([
      ...onBoarding,
      {
        chooseGuest: val || gender,
      },
    ]);
    navigation.navigate(myInterestsPath as never);
  };

  const navigation = useAppNavigation();

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
                <SeventyIcon height={40} />
              </View>
              <View
                style={{
                  width: '100%',
                  marginBottom: screenHeight / 26,
                  marginTop: screenHeight / 14,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(38, 812),
                    marginBottom: 18,
                  }}>
                  Choose your guests
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(16, 812),
                  }}>
                  Select who you want to invite
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setGender(MAN)}
                  style={{
                    width: '100%',
                    height: screenHeight / 14,
                    backgroundColor: gender === MAN ? transparentWhite16Color : lightGray3Color,
                    borderRadius: 10,
                    borderColor: whiteColor,
                    borderStyle: 'solid',
                    borderWidth: gender === MAN ? 0.5 : 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginBottom: 8,
                  }}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Man</Text>
                  {gender === MAN ? <CheckCircle /> : <CircleGray />}
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setGender(WOMAN)}
                  style={{
                    width: '100%',
                    height: screenHeight / 14,
                    backgroundColor: gender === WOMAN ? transparentWhite16Color : lightGray3Color,
                    borderRadius: 10,
                    borderColor: whiteColor,
                    borderStyle: 'solid',
                    borderWidth: gender === WOMAN ? 0.5 : 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginBottom: 8,
                  }}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Woman</Text>
                  {gender === WOMAN ? <CheckCircle /> : <CircleGray />}
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setGender(ANY)}
                  style={{
                    width: '100%',
                    height: screenHeight / 14,
                    backgroundColor: gender === ANY ? transparentWhite16Color : lightGray3Color,
                    borderRadius: 10,
                    borderColor: whiteColor,
                    borderStyle: 'solid',
                    borderWidth: gender === ANY ? 0.5 : 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginBottom: 8,
                  }}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 812)}}>Any</Text>
                  {gender === ANY ? <CheckCircle /> : <CircleGray />}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginBottom: 4}}>
              <Button onPress={() => handleNext()} title="Continue" />
              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingVertical: 16, alignItems: 'center', marginTop: 4}}
                onPress={() => handleNext(ANY)}>
                <Text style={{color: whiteColor, fontSize: RFValue(20, 812), fontWeight: '500'}}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default GenderPreferences;

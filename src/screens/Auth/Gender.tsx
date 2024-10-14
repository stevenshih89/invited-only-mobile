import {isIos, screenHeight} from 'constants/common';
import {FC, useContext, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {backgroundGradientColors, lightGray3Color, transparentWhite16Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import CheckCircle from 'assets/images/icons/check-circle.svg';
import CircleGray from 'assets/images/icons/circle-gray.svg';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {genderPreferencesPath, myInterestsPath} from 'constants/pathLocations';
import {AuthContext} from 'contexts/AuthContext.tsx';
import AuthProgress from 'components/AuthProgress';
import LinearGradient from 'react-native-linear-gradient';

const Gender: FC = (): JSX.Element => {
  const MAN = 'man';
  const WOMAN = 'woman';
  const NONBINARY = 'nonbinary';
  const [gender, setGender] = useState<string>(MAN);

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const handleNext = () => {
    const accountType = onBoarding.find((item: {accountType: string}) => item.accountType)?.accountType;
    const isHost = accountType.toLowerCase() === 'host';
    const data = isHost ? {gender: gender} : {gender: gender, chooseGuest: 'any'};
    const nextPath = isHost ? genderPreferencesPath : myInterestsPath;

    setOnBoarding([...onBoarding, data]);
    navigation.navigate(nextPath as never);
  };

  const navigation = useAppNavigation();

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1, paddingBottom: 0}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1, paddingBottom: 0}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: 0,
                paddingHorizontal: 24,
                paddingTop: screenHeight / 29,
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
                  {/* <SixtyIcon height={40} /> */}
                  <AuthProgress startPercentage={50} endPercentage={60} animationDuration={1000} />
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
                      fontSize: RFValue(40, 932),
                      marginBottom: 18,
                    }}>
                    Select your gender
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 932),
                    }}>
                    Choose the gender that best represents you.
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
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 932)}}>Man</Text>
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
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 932)}}>Woman</Text>
                    {gender === WOMAN ? <CheckCircle /> : <CircleGray />}
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setGender(NONBINARY)}
                    style={{
                      width: '100%',
                      height: screenHeight / 14,
                      backgroundColor: gender === NONBINARY ? transparentWhite16Color : lightGray3Color,
                      borderRadius: 10,
                      borderColor: whiteColor,
                      borderStyle: 'solid',
                      borderWidth: gender === NONBINARY ? 0.5 : 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      marginBottom: 8,
                    }}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 932)}}>Nonbinary</Text>
                    {gender === NONBINARY ? <CheckCircle /> : <CircleGray />}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginBottom: 4}}>
                <Button onPress={() => handleNext()} title="Continue" />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Gender;

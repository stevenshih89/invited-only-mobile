import {isIos, screenHeight} from 'constants/common';
import {FC, useContext, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {
  black1Color,
  lightGray3Color,
  transparentWhite16Color,
  transparentWhite30Color,
  transparentWhite56Color,
  whiteColor,
} from 'constants/colors';
import CheckCircle from 'assets/images/icons/check-circle.svg';
import CircleGray from 'assets/images/icons/circle-gray.svg';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {addBuisnessPath, enterNamePath} from 'constants/pathLocations';
import {AuthContext} from 'contexts/AuthContext.tsx';
import AuthProgress from 'components/AuthProgress';

const ChooseAccountType: FC = (): JSX.Element => {
  const HOST = 'host';
  const GUEST = 'guest';
  const [accountType, setAccountType] = useState<string>(HOST);

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const navigation = useAppNavigation();

  const handleNext = async () => {
    const index = onBoarding.findIndex(item => item.accountType !== undefined);
    if (index > -1) {
      const updatedOnBoarding = [...onBoarding];
      updatedOnBoarding[index] = { accountType: accountType };
      setOnBoarding(updatedOnBoarding);
    } else {
      setOnBoarding([...onBoarding, { accountType: accountType }]);
    }
    navigation.navigate(enterNamePath as never);
  };
  
  const handleGoToBusiness = () => {
    navigation.navigate(addBuisnessPath as never);
  };

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
                <AuthProgress startPercentage={0} endPercentage={10} animationDuration={1000} />
              </View>
              <View
                style={{
                  width: '100%',
                  marginBottom: screenHeight / 30,
                  marginTop: screenHeight / 11.5,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(48, 932),
                    marginBottom: 18,
                  }}>
                  Are you Host or Guest?
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(18, 932),
                  }}>
                  Select your account type
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setAccountType(HOST)}
                  style={{
                    width: '100%',
                    height: screenHeight / 14,
                    backgroundColor: accountType === HOST ? transparentWhite16Color : lightGray3Color,
                    borderRadius: 10,
                    borderColor: whiteColor,
                    borderStyle: 'solid',
                    borderWidth: accountType === HOST ? 0.5 : 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginBottom: 8,
                  }}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 932)}}>Host</Text>
                  {accountType === HOST ? <CheckCircle /> : <CircleGray />}
                </TouchableOpacity>
                <Text style={{color: transparentWhite56Color, fontFamily: Satoshi400, fontSize: RFValue(14, 932)}}>
                  You can create events and invite people
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setAccountType(GUEST)}
                  style={{
                    width: '100%',
                    height: screenHeight / 14,
                    backgroundColor: accountType === GUEST ? transparentWhite16Color : lightGray3Color,
                    borderRadius: 10,
                    borderColor: whiteColor,
                    borderStyle: 'solid',
                    borderWidth: accountType === GUEST ? 0.5 : 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginBottom: 8,
                    marginTop: 16,
                  }}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(18, 932)}}>Guest</Text>
                  {accountType === GUEST ? <CheckCircle /> : <CircleGray />}
                </TouchableOpacity>
                <Text style={{color: transparentWhite56Color, fontFamily: Satoshi400, fontSize: RFValue(14, 932)}}>
                  You can join events
                </Text>
              </View>
            </View>
            <View style={{marginBottom: 4}}>
              <Button onPress={() => handleNext()} title="Continue" />
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(14, 932)}}>Are you a bussiness?</Text>
                <TouchableOpacity onPress={handleGoToBusiness} activeOpacity={0.7} style={{marginLeft: 4}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(14, 932), textDecorationLine: 'underline'}}>
                    Click here to join
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChooseAccountType;

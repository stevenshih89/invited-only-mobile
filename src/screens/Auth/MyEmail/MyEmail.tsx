import {isIos, screenHeight} from 'constants/common';
import {FC, useContext, useEffect, useState} from 'react';
import {AppState, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {backgroundGradientColors, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {privacyPath} from 'constants/pathLocations';
import Input from 'components/Inputs/Input';
import {isEmailValid} from 'helpers/regExpValidators';
import {AuthContext} from 'contexts/AuthContext.tsx';
import AuthProgress from 'components/AuthProgress';
import {useUser} from 'src/store/userStore';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';

import {showToast} from 'helpers/showToast';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';

const MyEmail: FC = (): JSX.Element => {
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const {email, setEmail} = useUser();

  const {onBoarding, setOnBoarding} = useContext(AuthContext);
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);

  useEffect(() => {
    let subscription: any;

    const name = onBoarding.find((item: any) => item.name)?.name;
    const accountType = onBoarding.find((item: any) => item.accountType)?.accountType;
    const date = onBoarding.find((item: any) => item.date)?.date;
    const gender = onBoarding.find((item: {gender: string}) => item?.gender)?.gender;
    const photos = onBoarding.find((item: any) => item.photos)?.photos;
    const handleAppClose = async () => {
      try {
        await firestore()
          .collection('unfinishedRegistrationUsers')
          .doc(auth()?.currentUser?.uid)
          .set({
            name,
            email,
            accountType,
            date,
            gender,
            photos,
            phoneNumber: auth()?.currentUser?.phoneNumber,
            createdAt: moment().format('YYYY-MM-DD'),
            screen: 'my-email',
          });
        analytics().logEvent('my_email_app_closed', {
          name,
          email,
          accountType,
          date,
          gender,
          photos,
          phoneNumber: auth()?.currentUser?.phoneNumber,
          createdAt: moment().format('YYYY-MM-DD'),
          screen: 'my-email',
        });
      } catch (e) {
        console.error(e);
        logErrorToSentry(e);
      }
    };

    subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        handleAppClose();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleEmailChange = (value: string) => {
    const truncatedText = value.slice(0, 40);
    if (!isValidEmail) {
      setIsValidEmail(isEmailValid(truncatedText));
    }
    setEmail(truncatedText);
  };

  const handleNext = async () => {
    setIsValidEmail(isEmailValid(email));
    const _isValidEmail = isEmailValid(email);
    if (!email || !_isValidEmail) {
      return;
    }
    setOnBoarding([
      ...onBoarding,
      {
        email: email,
      },
    ]);
    const accountType = onBoarding.find((item: {accountType: string}) => item.accountType)?.accountType;

    const userNumber = await firestore().collection(apiUserInfoCollection).where('email', '==', email).get();
    if (!userNumber.empty) {
      showToast('inviteMatch', 'This Email is already exist', 'Fail');
      return;
    }

    // @ts-ignore
    navigation.navigate(privacyPath, {screen: 'MyEmail', accountType: accountType});
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
                    onPress={() => {
                      navigation.goBack();
                    }}
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
                  <AuthProgress startPercentage={80} endPercentage={90} animationDuration={1000} />
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
                    Your email
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 932),
                      opacity: 0.8,
                    }}>
                    Don’t lose access to your account, verify your email
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <Input
                    testID="input-email"
                    value={email}
                    onChange={handleEmailChange}
                    isError={!isValidEmail}
                    errorText="Incorrect email"
                    containerStyle={{width: '100%'}}
                    placeholder="Enter your email"
                  />
                </View>
              </View>
              <View style={{marginBottom: 4}}>
                <Button testID="continue-button" onPress={handleNext} disabled={email.length < 5 || !isValidEmail} title="Continue" />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default MyEmail;

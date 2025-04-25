import { FC, JSX, useContext, useEffect, useState } from 'react';
import { AppState, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';

import firestore from '@react-native-firebase/firestore';
import { isIos, screenHeight } from 'constants/common';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import { backgroundGradientColors, transparentWhite30Color, whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import Button from 'components/Button/Button';
import { useAppNavigation } from 'hooks/useAppNavigation';
import Input from 'components/Inputs/Input';
import { isEmailValid } from 'helpers/regExpValidators';
import AuthProgress from 'components/AuthProgress';
import useUser from 'hooks/user/useUser';
import { useAuthStore } from 'src/store/authStore';
import { showToast } from 'helpers/showToast';
import { FirebaseCollectionsContext } from 'contexts/FirebaseCollectionNamesContext';
import invitedOnlyBackendApi from 'src/api/backend-api';
import AppLoader from 'screens/App/AppLoader/AppLoader';

const MyEmail: FC = (): JSX.Element => {
  const { mutate: createUser, isPending } = invitedOnlyBackendApi.useMutation('post', '/users');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const { user: userData } = useUser();

  const { onBoarding, setOnBoarding, userMetadata } = useAuthStore();
  const { userInfo: apiUserInfoCollection } = useContext(FirebaseCollectionsContext);

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
    const userNumber = await firestore().collection(apiUserInfoCollection).where('email', '==', email).get();
    if (!userNumber.empty) {
      showToast('inviteMatch', 'This Email is already exist', 'Fail');
      return;
    }

    setOnBoarding({
      ...onBoarding,
      registrationDetails: {
        ...onBoarding.registrationDetails,
        email: email,
      },
      isOnboardingCompleted: true,
    });
    createUser({
      body: {
        ...onBoarding.registrationDetails,
        phoneNumber: userMetadata?.phoneNumber,
        uid: userMetadata?.uid,
      },
    });

  };

  const navigation = useAppNavigation();

  if (isPending) {
    return <AppLoader />;
  }

  return (
    <LinearGradient colors={backgroundGradientColors} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{ flex: 1, paddingBottom: 0 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{ flex: 1, paddingBottom: 0 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: 0,
                paddingHorizontal: 24,
                paddingTop: screenHeight / 29,
              }}>
              <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}
                    activeOpacity={0.7}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
                <View style={{ width: '100%' }}>
                  <Input
                    testID="input-email"
                    value={email}
                    onChange={handleEmailChange}
                    isError={!isValidEmail}
                    errorText="Incorrect email"
                    containerStyle={{ width: '100%' }}
                    placeholder="Enter your email"
                  />
                </View>
              </View>
              <View style={{ marginBottom: 4 }}>
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

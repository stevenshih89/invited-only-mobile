import {isIos, screenHeight} from 'constants/common';
import {FC} from 'react';
import {Image, ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import CheckStar from 'assets/images/icons/check-star.svg';
import Man from 'assets/images/auth/man.png';
import {whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {verifySecondStepPath} from 'constants/pathLocations';

const VerifyFirstStep: FC = (): JSX.Element => {
  const navigation = useAppNavigation();

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
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                  <LogoSecondary />
                </View>
                <View style={{flexDirection: 'column', width: '100%', marginTop: screenHeight / 16}}>
                  <View style={{position: 'relative', width: 180, height: 180, alignSelf: 'center', marginBottom: screenHeight / 20}}>
                    <Image source={Man} style={{borderRadius: 100, width: 180, height: 180}} />
                    <View
                      style={{
                        position: 'absolute',
                        right: 10,
                        bottom: 0,
                        backgroundColor: whiteColor,
                        borderRadius: 7,
                        width: 42,
                        height: 42,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CheckStar />
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{color: whiteColor, fontSize: RFValue(34, 812), fontFamily: Satoshi400, textAlign: 'center'}}>
                      Verify yourself
                    </Text>
                    <Text
                      style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi400, marginTop: 18, textAlign: 'center'}}>
                      Copy the pose in the photo below. If it matches, your profile will be verified, and you can keep using the IO app
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{marginBottom: 4}}>
                <Button onPress={() => navigation.navigate(verifySecondStepPath as never)} title="I agree, continue" />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default VerifyFirstStep;

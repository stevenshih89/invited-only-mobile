import {isIos, screenHeight} from 'constants/common';
import {FC, useState} from 'react';
import {
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
import InstagramIcon from 'assets/images/auth/instagram.svg';
import {lightGray2Color, toggleColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {privacyPath} from 'constants/pathLocations';

const ConnectSocialMedia: FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const [isConnectedInstagram, setIsConnectedInstagram] = useState<boolean>(false);

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
                    <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(16, 812)}}>9/9</Text>
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
                    Connect your Instagram
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
                    }}>
                    It’s only a preview of your photos. no one will have access to see your user profile
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsConnectedInstagram(prev => !prev)}
                  style={{
                    width: '100%',
                    backgroundColor: lightGray2Color,
                    borderRadius: 10,
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <InstagramIcon width={28} height={28} />
                    <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi400, marginLeft: 6}}>
                      {isConnectedInstagram ? 'john.doe' : 'Connect Instagram'}
                    </Text>
                  </View>
                  <Text
                    style={{color: isConnectedInstagram ? toggleColor : whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi700}}>
                    {isConnectedInstagram ? 'Connected' : 'Connect'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: 4, flexDirection: 'row', alignItems: 'center'}}>
                <Button
                  title="Skip"
                  buttonStyle={{flex: 0.5, marginRight: 2}}
                  onPress={() => navigation.navigate(privacyPath as never)}
                  variant="transparent"
                />
                <Button title="Next" buttonStyle={{flex: 1.5, marginLeft: 2}} onPress={() => navigation.navigate(privacyPath as never)} />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ConnectSocialMedia;

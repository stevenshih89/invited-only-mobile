import {isIos, screenHeight} from 'constants/common';
import {FC, useState} from 'react';
import {ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import {grayColor, toggleColor, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {confirmPhonePath} from 'constants/pathLocations';
import {Switch} from '@ant-design/react-native';

const TurnNotifications: FC = (): JSX.Element => {
  const [notifications, setNotifications] = useState<boolean>(false);
  const [location, setLocation] = useState<boolean>(false);

  const navigation = useAppNavigation();

  const handleNotificationsChange = (value: boolean) => {
    setNotifications(value);
  };

  const handleLocationChange = (value: boolean) => {
    setLocation(value);
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
                <LogoSecondary />
                <View
                  style={{
                    alignItems: 'center',

                    marginBottom: screenHeight / 30,
                    marginTop: screenHeight / 80,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(34, 812),
                      marginBottom: 18,
                    }}>
                    Confirm access
                  </Text>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 812),
                      textAlign: 'center',
                    }}>
                    You’ll need to enable your location in order to use invited only.
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: whiteColor,
                        fontFamily: Satoshi400,
                        fontSize: RFValue(20, 812),
                      }}>
                      Notifications
                    </Text>
                    <Switch trackColor={{false: grayColor, true: toggleColor}} checked={notifications} onChange={handleNotificationsChange} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: screenHeight / 30,
                    }}>
                    <Text
                      style={{
                        color: whiteColor,
                        fontFamily: Satoshi400,
                        fontSize: RFValue(20, 812),
                      }}>
                      Location
                    </Text>
                    <Switch trackColor={{false: grayColor, true: toggleColor}} checked={location} onChange={handleLocationChange} />
                  </View>
                </View>
              </View>
              <View style={{marginBottom: 4}}>
                <Button onPress={() => navigation.navigate(confirmPhonePath)} title="Next" />
              </View>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default TurnNotifications;

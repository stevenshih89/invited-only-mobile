import {isIos, screenHeight} from 'constants/common';
import {FC, useContext, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {black1Color, grayColor, lightGray2Color, toggleColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {addPhotosPath} from 'constants/pathLocations';
import {Switch} from '@ant-design/react-native';
import {AuthContext} from 'contexts/AuthContext.tsx';
import {getFcmToken} from 'helpers/fcmHelper';
import AuthProgress from 'components/AuthProgress';

const TurnNotifications: FC = (): JSX.Element => {
  const [notifications, setNotifications] = useState<boolean>(true);
  const [showLocation] = useState<boolean>(false);
  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const navigation = useAppNavigation();

  const handleNext = async () => {
    setOnBoarding([
      ...onBoarding,
      {
        notifications: notifications,
        location: null,
        showLocation: showLocation,
      },
    ]);
    if (notifications) {
      await getFcmToken();
    }
    navigation.navigate(addPhotosPath as never);
  };

  const handleNotificationsChange = (value: boolean): void => {
    setNotifications(value);
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
            <View style={{}}>
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
                <AuthProgress startPercentage={20} endPercentage={30} animationDuration={1000} />
              </View>
              <View
                style={{
                  marginBottom: screenHeight / 30,
                  marginTop: screenHeight / 8,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
                    fontSize: RFValue(48, 932),
                    marginBottom: 8,
                  }}>
                  Confirm access
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(18, 932),
                    opacity: 0.8,
                  }}>
                  To use Invited Only, please enable your notifications.
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: lightGray2Color,
                    padding: 16,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(18, 932),
                    }}>
                    Notifications
                  </Text>
                  <Switch trackColor={{false: grayColor, true: toggleColor}} checked={notifications} onChange={handleNotificationsChange} />
                </View>
              </View>
            </View>
            <View style={{marginBottom: 4}}>
              <Button onPress={() => handleNext()} title="Continue" />
              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingVertical: 16, alignItems: 'center', marginTop: 4}}
                onPress={() => navigation.navigate(addPhotosPath as never)}>
                <Text style={{color: whiteColor, fontSize: RFValue(20, 932), fontWeight: '500'}}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TurnNotifications;

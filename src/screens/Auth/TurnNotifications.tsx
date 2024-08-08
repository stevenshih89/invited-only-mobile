import {isIos, screenHeight} from 'constants/common';
import {FC, useContext, useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ThirtyIcon from 'assets/images/auth/progress/thirty.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import {black1Color, grayColor, lightGray2Color, toggleColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import Geolocation from '@react-native-community/geolocation';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {addPhotosPath} from 'constants/pathLocations';
import {Switch} from '@ant-design/react-native';
import {AuthContext} from 'contexts/AuthContext.tsx';

const TurnNotifications: FC = (): JSX.Element => {
  const [notifications, setNotifications] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const getCurrentLocation = (): void => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
    });
    Geolocation.getCurrentPosition(
      position => console.log('position', position),
      error => console.error(error),
    );
  };

  useEffect(() => {
    if (showLocation) {
      getCurrentLocation();
    }
  }, [showLocation]);

  const navigation = useAppNavigation();

  const handleNext = async () => {
    setOnBoarding([
      ...onBoarding,
      {
        notifications: notifications,
        location: null,
        showLocation: showLocation
      },
    ]);
    navigation.navigate(addPhotosPath as never);
  };

  const handleNotificationsChange = (value: boolean): void => {
    setNotifications(value);
  };

  const handleLocationChange = (value: boolean): void => {
    setShowLocation(value);
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
                <ThirtyIcon height={40} />
              </View>
              <View
                style={{
                  marginBottom: screenHeight / 30,
                  marginTop: screenHeight / 14,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi500,
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
                    opacity: 0.8,
                  }}>
                  To use Invited Only, please enable your location and notifications.
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
                      fontSize: RFValue(20, 812),
                    }}>
                    Notifications
                  </Text>
                  <Switch trackColor={{false: grayColor, true: toggleColor}} checked={notifications} onChange={handleNotificationsChange} />
                </View>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: screenHeight / 90,
                    backgroundColor: lightGray2Color,
                    padding: 16,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontFamily: Satoshi400,
                      fontSize: RFValue(20, 812),
                    }}>
                    Location
                  </Text>
                  <Switch trackColor={{false: grayColor, true: toggleColor}} checked={showLocation} onChange={handleLocationChange} />
                </View> */}
              </View>
            </View>
            <View style={{marginBottom: 4}}>
              <Button onPress={() => handleNext()} title="Continue" />
              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingVertical: 16, alignItems: 'center', marginTop: 4}}
                onPress={() => navigation.navigate(addPhotosPath as never)}>
                <Text style={{color: whiteColor, fontSize: RFValue(20, 812), fontWeight: '500'}}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TurnNotifications;

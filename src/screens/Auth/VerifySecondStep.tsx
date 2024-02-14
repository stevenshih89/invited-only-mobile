import {isIos, screenHeight} from 'constants/common';
import {FC, useState} from 'react';
import {Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View} from 'react-native';
import LogoSecondary from 'assets/images/auth/logo-secondary.svg';
import HalfBackground from 'assets/images/auth/half-background.png';
import ExampleSelfie from 'assets/images/auth/example-selfie.png';
import ManFace from 'assets/images/auth/man-face.png';
import {whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {request, PERMISSIONS} from 'react-native-permissions';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {invitationCodePath} from 'constants/pathLocations';
import {launchCamera} from 'react-native-image-picker';

const VerifySecondStep: FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const [imageUri, setImageUri] = useState<string | undefined>(ManFace);

  const openCamera = async () => {
    if (isIos) {
      const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);

      if (cameraPermission === 'granted') {
        launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            quality: 0.9,
            cameraType: 'front',
          },
          response => {
            if (response.errorCode === 'camera_unavailable') {
              return Alert.alert('Camera is not available');
            }

            if (response.errorCode === 'permission') {
              return Alert.alert('Permission not granted');
            }
            if (response.assets) {
              setImageUri(response.assets[0].uri);
            }
          },
        );
      } else {
        Alert.alert('Camera permission not granted');
      }
    }
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
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
                  <LogoSecondary />
                </View>
                <View style={{alignItems: 'center', width: '100%', marginTop: screenHeight / 16, marginBottom: screenHeight / 20}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(34, 812), marginBottom: screenHeight / 30}}>
                    {imageUri ? 'Your photo' : 'Copy this position'}
                  </Text>
                  <Image source={imageUri || ExampleSelfie} style={{width: 200, height: 200, borderRadius: 8, marginBottom: screenHeight / 20}} />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi400, marginLeft: 6, textAlign: 'center'}}>
                      • Your face must be clearly visible
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi400, marginLeft: 6, textAlign: 'center'}}>
                      • You must be copying the pose exactly!
                    </Text>
                  </View>
                </View>
              </View>
              {imageUri ? (
                <View style={{marginBottom: 4, flexDirection: 'row', alignItems: 'center'}}>
                  <Button title="Retake photo" buttonStyle={{flex: 1, marginRight: 2}} variant="transparent" />
                  <Button title="Confirm" onPress={() => navigation.navigate(invitationCodePath)} buttonStyle={{flex: 1, marginLeft: 2}} />
                </View>
              ) : (
                <View style={{marginBottom: 4}}>
                  <Button onPress={openCamera} title="Take a photo" />
                </View>
              )}
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default VerifySecondStep;

import {isIos, screenHeight} from 'constants/common';
import React, {FC, useContext, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import ExampleSelfie from 'assets/images/auth/example-selfie.png';
import {black1Color, blackColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {PERMISSIONS, request} from 'react-native-permissions';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {photoVerifiedPath} from 'constants/pathLocations';
import {launchCamera} from 'react-native-image-picker';
import {AuthContext} from 'contexts/AuthContext.tsx';

const VerifySecondStep: FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const [imageUri, setImageUri] = useState<string | undefined>('');

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const name = onBoarding.find((item: {name: string}) => item.name)?.name;

  const openCamera = async () => {
    if (isIos) {
      const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);

      if (cameraPermission === 'granted') {
        await launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            quality: 0.9,
            cameraType: 'front',
            presentationStyle: 'fullScreen',
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

  const handleNext = () => {
    // if (!imageUri) {
    //   return;
    // }
    setOnBoarding([
      ...onBoarding,
      {
        imageUser: imageUri,
      },
    ]);
    navigation.navigate(photoVerifiedPath as never);
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
                <View style={{width: 40}} />
              </View>
              <View style={{alignItems: 'center', width: '100%', marginTop: screenHeight / 16, marginBottom: screenHeight / 20}}>
                {imageUri ? (
                  <>
                    <View
                      style={{
                        width: '100%',
                        marginTop: screenHeight / 40,
                      }}>
                      <Text
                        style={{
                          color: whiteColor,
                          fontFamily: Satoshi500,
                          fontSize: RFValue(34, 812),
                        }}>
                        Your photo
                      </Text>
                      <Text
                        style={{
                          color: whiteColor,
                          fontFamily: Satoshi400,
                          fontSize: RFValue(16, 812),
                        }}>
                        Make sure your face is clearly visible.
                      </Text>
                    </View>
                    <View style={{flexDirection: 'column', width: '100%', marginTop: 20}}>
                      <View
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: screenHeight / 2.5,
                          alignSelf: 'center',
                        }}>
                        <ImageBackground
                          source={{uri: imageUri}}
                          style={{borderRadius: 100, width: '100%', height: '100%', justifyContent: 'flex-end'}}>
                          <View style={{height: 36, width: '100%', justifyContent: 'center', position: 'relative', overflow: 'hidden'}}>
                            <View
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: -2,
                                right: 0,
                                backgroundColor: blackColor,
                                opacity: 0.87,
                              }}
                            />
                            <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(20, 812), alignSelf: 'center'}}>
                              {name}
                            </Text>
                          </View>
                        </ImageBackground>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        width: '100%',
                        marginTop: screenHeight / 40,
                      }}>
                      <Text
                        style={{
                          color: whiteColor,
                          fontFamily: Satoshi500,
                          fontSize: RFValue(34, 812),
                        }}>
                        Verify yourself
                      </Text>
                      <Text
                        style={{
                          color: whiteColor,
                          fontFamily: Satoshi400,
                          fontSize: RFValue(16, 812),
                        }}>
                        Copy this position. Your face must be clearly visible.
                      </Text>
                    </View>
                    <View style={{flexDirection: 'column', width: '100%', marginTop: 20}}>
                      <View
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: screenHeight / 2.5,
                          alignSelf: 'center',
                        }}>
                        <ImageBackground
                          source={ExampleSelfie}
                          style={{borderRadius: 100, width: '100%', height: '100%', justifyContent: 'flex-end'}}>
                          <View style={{height: 36, width: '100%', justifyContent: 'center', position: 'relative', overflow: 'hidden'}}>
                            <View
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: -2,
                                right: 0,
                                backgroundColor: blackColor,
                                opacity: 0.87,
                              }}
                            />
                            <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(20, 812), alignSelf: 'center'}}>
                              {name}
                            </Text>
                          </View>
                        </ImageBackground>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
            {imageUri ? (
              <View style={{marginBottom: 4}}>
                <Button title="Submit" onPress={() => handleNext()} />
                <Button
                  onPress={async () => {
                    setImageUri('');
                    await openCamera();
                  }}
                  title="Retake photo"
                  variant="transparent"
                />
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
  );
};

export default VerifySecondStep;

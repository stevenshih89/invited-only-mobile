import {isIos, screenHeight, screenWidth} from 'constants/common';
import React, {FC, useContext, useEffect, useState} from 'react';
import {
  Alert,
  AppState,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LogoPrimary2 from 'assets/images/auth/logo-primary-2.svg';
import CheckStar from 'assets/images/icons/check-star-white.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import MaleExampleSelfie from 'assets/images/auth/example-selfie.png';
import FemaleExampleSelfie from 'assets/images/auth/female-selfie-example.png';
import {backgroundGradientColors, blackColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {PERMISSIONS, request} from 'react-native-permissions';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {invitationCodePath, photoVerifiedPath} from 'constants/pathLocations';
import {launchCamera} from 'react-native-image-picker';
import {AuthContext} from 'contexts/AuthContext.tsx';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';

const VerifySecondStep: FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const [imageUri, setImageUri] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {onBoarding, setOnBoarding} = useContext(AuthContext);

  const name = onBoarding.find((item: {name: string}) => item?.name)?.name;
  const gender = onBoarding.find((item: {gender: string}) => item?.gender)?.gender;
  const email = onBoarding.find((item: any) => item.email)?.email;
  const accountType = onBoarding.find((item: any) => item.accountType)?.accountType;
  const date = onBoarding.find((item: any) => item.date)?.date;
  const photos = onBoarding.find((item: any) => item.photos)?.photos;
  const selfieSource = gender === 'man' ? MaleExampleSelfie : FemaleExampleSelfie;

  useEffect(() => {
    let subscription: any;

    const handleAppClose = async () => {
      const currentUser = auth()?.currentUser;
      if (!currentUser?.uid) {
        return;
      }

      try {
        await firestore()
          .collection('unfinishedRegistrationUsers')
          .doc(currentUser?.uid)
          .set({
            name,
            email,
            accountType,
            date,
            photos,
            gender,
            phoneNumber: auth()?.currentUser?.phoneNumber,
            createdAt: moment().format('YYYY-MM-DD'),
            screen: 'verify-first-step-selfie',
          });
        analytics().logEvent('verify_selfie_app_closed', {
          name,
          email,
          accountType,
          date,
          photos,
          gender,
          phoneNumber: auth()?.currentUser?.phoneNumber,
          createdAt: moment().format('YYYY-MM-DD'),
          screen: 'verify-first-step-selfie',
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

  const uploadImage = async (imagePath: string, userId: string | null) => {
    if (imagePath) {
      if (imagePath.includes('https://')) {
        return imagePath;
      } else {
        const uploadUri = Platform.OS === 'ios' ? imagePath : `file://${imagePath}`;
        const filename = `${userId}_${new Date().getTime()}`;
        const storageRef = storage().ref(`selfie_photos/${filename}`);
        try {
          await storageRef.putFile(uploadUri);
          const url = await storageRef.getDownloadURL();
          return url;
        } catch (e) {
          console.error('Error uploading image:', e);
          return null;
        }
      }
    }
  };

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
            if (response.didCancel) {
              try {
                analytics().logEvent('verify_selfie_camera_cancelled', {
                  name,
                  email,
                  accountType,
                  date,
                  gender,
                  phoneNumber: auth()?.currentUser?.phoneNumber,
                  createdAt: moment().format('YYYY-MM-DD HH:ss'),
                });
              } catch (e) {
                console.error(e);
              }

              return console.error('User cancelled the camera');
            }

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

  const handleSkip = () => {
    const currentUser = auth()?.currentUser;
    try {
      if (!currentUser?.uid) {
        return;
      }
      setIsLoading(true);

      analytics().logEvent('verify_selfie_submited', {
        userId: currentUser?.uid,
        name: onBoarding.find((item: any) => item.name)?.name,
        screen: 'verify-first-step-selfie',
        action: 'selfie-submited',
      });
      // @ts-ignore
      navigation.navigate(invitationCodePath, {cameFromSummary: true} as never);
    } catch (error) {
      console.error('Error skipped verify photo screen:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    const currentUser = auth()?.currentUser;
    try {
      if (!imageUri || !currentUser?.uid) {
        return;
      }
      setIsLoading(true);
      const imageUser = await uploadImage(imageUri, currentUser?.uid);

      const onBoardingWithFacePhoto = onBoarding
        .filter((onboardItem: any) => !onboardItem.facePhoto)
        .concat({
          facePhoto: imageUser,
        });

      setOnBoarding(onBoardingWithFacePhoto);

      analytics().logEvent('verify_selfie_submited', {
        userId: currentUser?.uid,
        name: onBoarding.find((item: any) => item.name)?.name,
        screen: 'verify-first-step-selfie',
        action: 'selfie-submited',
      });
      navigation.navigate(photoVerifiedPath as never);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={backgroundGradientColors} start={{x: 0, y: 1}} end={{x: 0, y: 0}} style={{flex: 1}}>
      <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} keyboardVerticalOffset={15} style={{flex: 1, paddingBottom: 0}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1}}>
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
                            fontSize: RFValue(34, 932),
                          }}>
                          Your photo
                        </Text>
                        <Text
                          style={{
                            color: whiteColor,
                            fontFamily: Satoshi400,
                            fontSize: RFValue(16, 932),
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
                            style={{borderRadius: 15, width: '100%', height: '100%', justifyContent: 'flex-end', overflow: 'hidden'}}>
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
                              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text
                                  style={{
                                    color: whiteColor,
                                    marginRight: 8,
                                    fontFamily: Satoshi500,
                                    fontSize: RFValue(20, 932),
                                    alignSelf: 'center',
                                  }}>
                                  {name}
                                </Text>
                                <CheckStar width={18} height={18} />
                              </View>
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
                            fontSize: RFValue(48, 932),
                            marginBottom: 8,
                          }}>
                          Verify yourself
                        </Text>
                        <Text
                          style={{
                            color: whiteColor,
                            fontFamily: Satoshi400,
                            fontSize: RFValue(18, 932),
                          }}>
                          Copy this position. Your face must be clearly visible.
                        </Text>
                      </View>
                      <View style={{flexDirection: 'column', width: '100%', marginTop: 20}}>
                        <View
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: screenWidth / 1.1,
                            alignSelf: 'center',
                          }}>
                          <ImageBackground
                            source={selfieSource}
                            style={{borderRadius: 100, width: '100%', height: '100%', justifyContent: 'flex-end'}}>
                            <View
                              style={{
                                height: screenHeight / 20,
                                width: '100%',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                              }}>
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
                              <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(20, 932), alignSelf: 'center'}}>
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
                  <Button title="Submit" onPress={handleNext} loading={isLoading} />
                  <Button
                    onPress={async () => {
                      if (isLoading) {
                        return;
                      }
                      setImageUri('');
                      await openCamera();
                    }}
                    title="Retake photo"
                    variant="transparent"
                  />
                </View>
              ) : (
                <View>
                  <View>
                    <Button testID="take-photo-button" onPress={openCamera} title="Take a photo" />
                  </View>
                  {accountType === 'host' && (
                    <TouchableOpacity testID="skip-button" onPress={handleSkip}>
                      <Text
                        style={{fontSize: RFValue(18, 812), fontFamily: Satoshi500, color: whiteColor, marginTop: 20, textAlign: 'center'}}>
                        Skip
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default VerifySecondStep;

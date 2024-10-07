import {isIos, screenHeight, screenWidth} from 'constants/common';
import {FC, useState, useContext, useEffect} from 'react';
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
import Close from 'assets/images/icons/close.svg';
import Plus from 'assets/images/icons/plus.svg';
import FourtyIcon from 'assets/images/auth/progress/fourty.svg';
import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';
import {black1Color, blackColor, errorColor, lightGray2Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from 'components/Button/Button';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {enterBirthdayPath} from 'constants/pathLocations';
import {PERMISSIONS, Permission, PermissionStatus, RESULTS, check, request} from 'react-native-permissions';
import {AuthContext} from 'contexts/AuthContext.tsx';
import AuthProgress from 'components/AuthProgress';

const AddPhotos: FC = (): JSX.Element => {
  const navigation = useAppNavigation();
  const [photos, setImages] = useState<{image: null | string; id: number}[]>([
    {
      id: 0,
      image: null,
    },
    {
      id: 1,
      image: null,
    },
    {
      id: 2,
      image: null,
    },
    {
      id: 3,
      image: null,
    },
    {
      id: 4,
      image: null
    },
    {
      id: 5,
      image: null
    }
  ]);
  const {onBoarding, setOnBoarding} = useContext(AuthContext);  
  const makePermissionsRequest = async (permission: Permission): Promise<PermissionStatus> => {
    const result = await check(permission);
    switch (result) {
      case RESULTS.DENIED:
        const requestResult = await request(permission);
        if (requestResult === RESULTS.BLOCKED) {
          Alert.alert('Permission not granted');
        }
        return requestResult;
      case RESULTS.BLOCKED:
        Alert.alert('Permission not granted');
        break;
    }

    return result;
  };

  const openLibrary = async (imageId: number): Promise<void> => {
    const photoLibraryPermission = await makePermissionsRequest(
      isIos ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    );

    if (photoLibraryPermission !== RESULTS.GRANTED && photoLibraryPermission !== RESULTS.LIMITED) {
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.9,
      },
      (response: ImagePickerResponse) => {
        if (!response.assets) {
          return;
        }
        if (response.assets[0].uri) {
          const image = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          const newImages = photos.map(img => {
            if (img.id === imageId) {
              return {...img, image: image.uri};
            }
            return img;
          });
          setImages(newImages);
        }
      },
    );
  };

  const deleteImage = (imageId: number): void => {
    const newImages = photos.map(img => {
      if (img.id === imageId) {
        return {...img, image: null};
      }
      return img;
    });
    setImages(newImages);
  };

  function hasPhoto(array: {image: null | string; id: number}[]) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].image !== null) {
        return true;
      }
    }
    return false;
  }

  const handleNext = async () => {
    if (!hasPhoto(photos)) {
      return;
    }
  
    setOnBoarding([...onBoarding, {photos: photos}]);
    navigation.navigate(enterBirthdayPath as never);
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
                {/* <FourtyIcon height={40} /> */}
                <AuthProgress startPercentage={30} endPercentage={40} animationDuration={1000} />
              </View>
              <View
                style={{
                  width: '100%',
                  marginBottom: screenHeight / 28,
                  marginTop: screenHeight / 14,
                }}>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(34, 812),
                    marginBottom: 18,
                  }}>
                  My photos
                </Text>
                <Text
                  style={{
                    color: whiteColor,
                    fontFamily: Satoshi400,
                    fontSize: RFValue(16, 812),
                  }}>
                  Add your first photos. You can change these and add more later.
                </Text>
              </View>
              <View style={{width: '100%', flexDirection: 'row'}}>
                <View style={{width: '60%', height: screenWidth / 1.3, marginRight: 6}}>
                  {photos[0].image ? (
                    <View style={{position: 'relative', flex: 1, borderRadius: 10, overflow: 'hidden'}}>
                      <ImageBackground
                        resizeMode="cover"
                        source={{uri: photos[0].image}}
                        style={{width: '100%', height: '100%', justifyContent: 'space-between'}}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          hitSlop={{left: 15, bottom: 10}}
                          onPress={() => deleteImage(photos[0].id)}
                          style={{
                            width: 26,
                            height: 26,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            borderRadius: 50,
                            backgroundColor: errorColor,
                            marginRight: 10,
                            marginTop: 10,
                          }}>
                          <Close />
                        </TouchableOpacity>
                        <View
                          style={{
                            backgroundColor: blackColor,
                            borderRadius: 42,
                            paddingHorizontal: 10,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 5,
                            marginBottom: 10,
                          }}>
                          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(12, 812), color: whiteColor}}>Main</Text>
                        </View>
                      </ImageBackground>
                    </View>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => openLibrary(photos[0].id)}
                      style={{
                        flex: 1,
                        backgroundColor: lightGray2Color,
                        borderRadius: 10,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 10,
                      }}>
                      <View />
                      <Plus />
                      <View
                        style={{
                          backgroundColor: blackColor,
                          borderRadius: 42,
                          paddingHorizontal: 10,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 5,
                          marginBottom: 10,
                        }}>
                        <Text style={{fontFamily: Satoshi700, fontSize: RFValue(12, 812), color: whiteColor}}>Main</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{flex: 1, marginLeft: 6}}>
                  <View style={{flex: 1, marginBottom: 6}}>
                    {photos[1].image ? (
                      <View style={{position: 'relative', flex: 1, borderRadius: 10, overflow: 'hidden'}}>
                        <ImageBackground
                          resizeMode="cover"
                          source={{uri: photos[1].image}}
                          style={{width: '100%', height: '100%', justifyContent: 'space-between'}}>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            hitSlop={{left: 15, bottom: 10}}
                            onPress={() => deleteImage(photos[1].id)}
                            style={{
                              width: 26,
                              height: 26,
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'flex-end',
                              borderRadius: 50,
                              backgroundColor: errorColor,
                              marginRight: 10,
                              marginTop: 10,
                            }}>
                            <Close />
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => openLibrary(photos[1].id)}
                        style={{
                          backgroundColor: lightGray2Color,
                          borderRadius: 10,
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingBottom: 10,
                        }}>
                        <Plus />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{flex: 1, marginTop: 6}}>
                    {photos[2].image ? (
                      <View style={{position: 'relative', flex: 1, borderRadius: 10, overflow: 'hidden'}}>
                        <ImageBackground
                          resizeMode="cover"
                          source={{uri: photos[2].image}}
                          style={{width: '100%', height: '100%', justifyContent: 'space-between'}}>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            hitSlop={{left: 15, bottom: 10}}
                            onPress={() => deleteImage(photos[2].id)}
                            style={{
                              width: 26,
                              height: 26,
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'flex-end',
                              borderRadius: 50,
                              backgroundColor: errorColor,
                              marginRight: 10,
                              marginTop: 10,
                            }}>
                            <Close />
                          </TouchableOpacity>
                        </ImageBackground>
                      </View>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => openLibrary(photos[2].id)}
                        style={{
                          flex: 1,
                          backgroundColor: lightGray2Color,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingBottom: 10,
                        }}>
                        <Plus />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginBottom: 4}}>
              <Button onPress={() => handleNext()} title="Continue" disabled={!photos[0].image} />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddPhotos;

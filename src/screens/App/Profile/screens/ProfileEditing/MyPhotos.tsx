import {isIos, screenHeight, screenWidth} from 'constants/common';
import {FC} from 'react';
import {Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Close from 'assets/images/icons/close.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import Plus from 'assets/images/icons/plus.svg';
import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';
import {blackColor, lightGray2Color, lightGray5Color, orangeClose, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {PERMISSIONS, Permission, PermissionStatus, RESULTS, check, request} from 'react-native-permissions';
import {useUser} from "../../../../../store/userStore";

interface MyPhotosProps {
  images: {id: number; image: string | null}[];
  setImages: (images: {id: number; image: string | null}[]) => void;
}

const MyPhotos: FC<MyPhotosProps> = ({images, setImages}): JSX.Element => {
  // console.log('imagesProps', images);
  
  const userHost = useUser((i: any) => i?.user);
  const isConfirmed = userHost?.accountConfirmed;

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
    const photoLibraryPermission = await makePermissionsRequest(isIos ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

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

          const newImages = images.map(img => {
            if (img.id === imageId) {
              return {...img, image: image.uri};
            }
            return img;
          });
          console.log('newImages', newImages);
          
          setImages(newImages);
        }
      },
    );
  };

  const deleteImage = (imageId: number): void => {
    const newImages = images.map(img => {
      if (img.id === imageId) {
        return {...img, image: null};
      }
      return img;
    });
    setImages(newImages);
  };

  const mainImage = images[images.findIndex(item => item.id === 0)];
  const secondImage = images[images.findIndex(item => item.id === 1)];
  const thirdImage = images[images.findIndex(item => item.id === 2)];
  const fourthImage = images[images.findIndex(item => item.id === 3)];
  const fifthImage = images[images.findIndex(item => item.id === 4)];
  const sixthImage = images[images.findIndex(item => item.id === 5)];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My photos</Text>
      {isConfirmed && (
        <View style={styles.verifiedContainer}>
          <Text style={styles.verifiedText}>Verified account</Text>
          <CheckStarWhite />
        </View>
      )}
      <View style={styles.photosContainer}>
        <View style={styles.photoContainer}>
          {mainImage?.image ? (
            <View style={styles.imageContainer}>
              <ImageBackground resizeMode="cover" source={{uri: mainImage.image}} style={styles.imageBackground}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  hitSlop={{left: 15, bottom: 10}}
                  onPress={() => deleteImage(mainImage.id)}
                  style={styles.closeButton}>
                  <Close />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          ) : (
            <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(mainImage?.id)} style={styles.plusButton}>
              <Plus />
            </TouchableOpacity>
          )}
          <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Main</Text>
            </View>
        </View>
        <View style={{flex: 1}}>
          <View style={[styles.imageContainer, {marginBottom: 6}]}>
            {secondImage?.image ? (
              <View style={styles.imageContainer}>
                <ImageBackground resizeMode="cover" source={{uri: secondImage.image}} style={styles.imageBackground}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={{left: 15, bottom: 10}}
                    onPress={() => deleteImage(secondImage.id)}
                    style={styles.closeButton}>
                    <Close />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            ) : (
              <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(secondImage?.id)} style={styles.plusButton}>
                <Plus />
              </TouchableOpacity>
            )}
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>02</Text>
            </View>
          </View>
          <View style={[styles.imageContainer, {marginTop: 6}]}>
            {thirdImage?.image ? (
              <View style={styles.imageContainer}>
                <ImageBackground resizeMode="cover" source={{uri: thirdImage.image}} style={styles.imageBackground}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={{left: 15, bottom: 10}}
                    onPress={() => deleteImage(thirdImage.id)}
                    style={styles.closeButton}>
                    <Close />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            ) : (
              <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(thirdImage?.id)} style={styles.plusButton}>
                <Plus />
              </TouchableOpacity>
            )}
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>03</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 8,}}>
      <View style={[styles.imageContainer]}>
            <View style={{height: screenHeight/ 7, width: '94%'}}>
            {fourthImage?.image ? (
              <View style={[styles.imageContainer, {width: '94%'}]}>
                <ImageBackground resizeMode="cover" source={{uri: fourthImage.image}} 
                style={{
                  width: "100%",
                  height: screenHeight/ 7,
                  justifyContent: "space-between"
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={{left: 15, bottom: 10}}
                    onPress={() => deleteImage(fourthImage.id)}
                    style={styles.closeButton}>
                    <Close />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            ) : (
              <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(fourthImage?.id)} style={styles.plusButton}>
                <Plus />
              </TouchableOpacity>
            )}
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>04</Text>
            </View>
            </View>
          </View>
          <View style={[styles.imageContainer]}>
            <View style={{height: screenHeight/ 7, width: '94%'}}>
            {fifthImage?.image ? (
              <View style={[styles.imageContainer, {width: '94%'}]}>
                <ImageBackground resizeMode="cover" source={{uri: fifthImage.image}} style={{
                  width: "100%",
                  height: screenHeight/ 7,
                  justifyContent: "space-between",
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={{left: 15, bottom: 10}}
                    onPress={() => deleteImage(fifthImage.id)}
                    style={styles.closeButton}>
                    <Close />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            ) : (
              <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(fifthImage?.id)} style={styles.plusButton}>
                <Plus />
              </TouchableOpacity>
            )}
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>05</Text>
            </View>
            </View>
          </View>
          <View style={[styles.imageContainer,]}>
            {sixthImage?.image ? (
              <View style={[styles.imageContainer, {width: '94%'}]}>
                <ImageBackground resizeMode="cover" source={{uri: sixthImage.image}} style={{
                  width: "100%",
                  height: screenHeight/ 7,
                  justifyContent: "space-between",
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={{left: 15, bottom: 10}}
                    onPress={() => deleteImage(sixthImage.id)}
                    style={styles.closeButton}>
                    <Close />
                  </TouchableOpacity>
                  
                </ImageBackground>
                
              </View>
              
            ) : (
               <TouchableOpacity activeOpacity={0.7} onPress={() => openLibrary(sixthImage?.id)} style={styles.plusButton}>
                <Plus />
              </TouchableOpacity>
            )}
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>06</Text>
            </View>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightGray5Color,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontFamily: Satoshi500,
    fontSize: RFValue(18, 812),
    color: whiteColor,
    marginBottom: 26,
  },
  photosContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  photoContainer: {
    width: '60%',
    height: screenWidth / 1.3,
    marginRight: 6,
  },
  imageContainer: {
    position: 'relative',
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  closeButton: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 20,
    backgroundColor: orangeClose,
    marginRight: 10,
    marginTop: 10,
  },
  labelContainer: {
    backgroundColor: blackColor,
    borderRadius: 42,
    paddingHorizontal: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    position: 'absolute',
    bottom: 6,
    // marginTop: 10, 
  },
  labelText: {
    fontFamily: Satoshi700,
    fontSize: RFValue(12, 812),
    color: whiteColor,
  },
  plusButton: {
    flex: 1,
    backgroundColor: lightGray2Color,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  verifiedText: {
    color: whiteColor,
    fontFamily: Satoshi400,
    fontSize: RFValue(16, 812),
  },
});

export default MyPhotos;

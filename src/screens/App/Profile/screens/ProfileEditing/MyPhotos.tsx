import {screenHeight, screenWidth} from 'constants/common';
import {FC} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Close from 'assets/images/icons/close.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import Plus from 'assets/images/icons/plus.svg';
import {blackColor, lightGray2Color, lightGray5Color, orangeClose, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import Animated from 'react-native-reanimated';
import {GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import ModalReplacePhoto from './ModalReplacePhoto';
import {useMyPhotos} from 'hooks/useMyPhotos';

interface MyPhotosProps {
  images: {id: number; image: string | null}[];
  setImages: (images: {id: number; image: string | null}[]) => void;
}

const MyPhotos: FC<MyPhotosProps> = ({images, setImages}): JSX.Element => {
  const {
    visibleModalReplace,
    setVisibleModalReplace,
    replaceImage,
    isConfirmed,
    createTapGesture,
    offsetX1,
    offsetY1,
    viewRef1,
    animatedStyles1,
    animatedStyles2,
    animatedStyles3,
    animatedStyles4,
    animatedStyles5,
    animatedStyles6,
    handleLayout,
    mainImage,
    deleteImage,
    openLibrary,
    offsetX2,
    offsetY2,
    offsetX3,
    offsetY3,
    offsetX4,
    offsetY4,
    offsetX5,
    offsetY5,
    offsetX6,
    offsetY6,
    viewRef2,
    viewRef3,
    viewRef4,
    viewRef5,
    viewRef6,
    secondImage,
    thirdImage,
    fourthImage,
    fifthImage,
    sixthImage,
  } = useMyPhotos({images, setImages});

  return (
    <GestureHandlerRootView style={styles.container}>
      <ModalReplacePhoto isVisible={visibleModalReplace} onClose={() => setVisibleModalReplace(false)} replaceImage={replaceImage} />
      <Text style={styles.title}>My photos</Text>
      {isConfirmed && (
        <View style={styles.verifiedContainer}>
          <Text style={styles.verifiedText}>Verified account</Text>
          <CheckStarWhite />
        </View>
      )}
      <View style={styles.photosContainer}>
        <GestureDetector gesture={createTapGesture(1, offsetX1, offsetY1)}>
          <Animated.View ref={viewRef1} style={[styles.photoContainer, animatedStyles1]} onLayout={_ => handleLayout(1)}>
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
          </Animated.View>
        </GestureDetector>
        <View style={{flex: 1}}>
          <GestureDetector gesture={createTapGesture(2, offsetX2, offsetY2)}>
            <Animated.View ref={viewRef2} onLayout={_ => handleLayout(2)} style={[styles.imageContainer, animatedStyles2]}>
              {secondImage?.image ? (
                <View style={[styles.imageContainer]}>
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
            </Animated.View>
          </GestureDetector>
          <GestureDetector gesture={createTapGesture(3, offsetX3, offsetY3)}>
            <Animated.View ref={viewRef3} onLayout={_ => handleLayout(3)} style={[styles.imageContainer, animatedStyles3, {marginTop: 8}]}>
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
            </Animated.View>
          </GestureDetector>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 8}}>
        <GestureDetector gesture={createTapGesture(4, offsetX4, offsetY4)}>
          <Animated.View ref={viewRef4} onLayout={_ => handleLayout(4)} style={[styles.imageContainer, animatedStyles4]}>
            <View style={{height: screenHeight / 7, width: '94%'}}>
              {fourthImage?.image ? (
                <View style={[styles.imageContainer, {width: '94%'}]}>
                  <ImageBackground
                    resizeMode="cover"
                    source={{uri: fourthImage.image}}
                    style={{
                      width: '100%',
                      height: screenHeight / 7,
                      justifyContent: 'space-between',
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
          </Animated.View>
        </GestureDetector>
        <GestureDetector gesture={createTapGesture(5, offsetX5, offsetY5)}>
          <Animated.View ref={viewRef5} onLayout={_ => handleLayout(5)} style={[styles.imageContainer, animatedStyles5]}>
            <View style={{height: screenHeight / 7, width: '94%'}}>
              {fifthImage?.image ? (
                <View style={[styles.imageContainer, {width: '94%'}]}>
                  <ImageBackground
                    resizeMode="cover"
                    source={{uri: fifthImage.image}}
                    style={{
                      width: '100%',
                      height: screenHeight / 7,
                      justifyContent: 'space-between',
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
          </Animated.View>
        </GestureDetector>
        <GestureDetector gesture={createTapGesture(6, offsetX6, offsetY6)}>
          <Animated.View ref={viewRef6} onLayout={_ => handleLayout(6)} style={[styles.imageContainer, animatedStyles6]}>
            {sixthImage?.image ? (
              <View style={[styles.imageContainer, {width: '94%'}]}>
                <ImageBackground
                  resizeMode="cover"
                  source={{uri: sixthImage.image}}
                  style={{
                    width: '100%',
                    height: screenHeight / 7,
                    justifyContent: 'space-between',
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
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
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

import React, {FC, useState} from 'react';
import {View, ImageBackground, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//import components
import useStyles from 'components/TouchingSlider/styles.ts';
import {gray1Color, whiteColor} from 'constants/colors.ts';
import HomeIcon from 'assets/images/icons/home.svg';
import LocationIcon from 'assets/images/icons/location.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import IOIcon from 'assets/images/icons/io-logo.svg';
import {screenHeight} from 'constants/common.ts';

const TouchingSlider: FC<any> = ({photos}: any) => {
  const [active, setActive] = useState<number>(0);
  const numberPhotos = photos?.length;
  const styles = useStyles();

  const handleNext = () => {
    if (active === numberPhotos - 1) {
      return setActive(0);
    } else {
      setActive(p => p + 1);
    }
  };

  const handleBack = () => {
    if (active === 0) {
      return;
    }
    setActive(p => p - 1);
  };

  return (
    <>
      <ImageBackground source={photos[active]} resizeMode="cover" imageStyle={styles.imageStyle} style={styles.container}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={styles.linearGradientHeader}>
          <View style={styles.wrapperBar}>
            {[...Array(numberPhotos)].map((_, index) => (
              <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
            ))}
          </View>
        </LinearGradient>
        <View style={styles.wrapperButtons}>
          <TouchableOpacity onPress={handleBack} style={styles.button} />
          <TouchableOpacity onPress={handleNext} style={styles.button} />
        </View>

        <LinearGradient
          colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
          style={styles.linearGradientFooter}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <View style={styles.wrapperBio}>
            <View style={styles.rowBioInfo}>
              <Text style={styles.textName}>Alex</Text>
              <Text style={styles.textYears}>29</Text>
            </View>

            <View style={styles.wrapperFooterCard}>
              <View>
                <View style={[styles.infoTags, {marginTop: screenHeight / 37, width: 130}]}>
                  <HomeIcon />
                  <Text style={styles.textInfoTags}>From Miami</Text>
                </View>
                <View style={[styles.infoTags, {marginTop: screenHeight / 190}]}>
                  <LocationIcon />
                  <Text style={styles.textInfoTags}>2 kilometers away</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity style={styles.buttonFlash}>
                  <IOIcon />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonFlash, {marginTop: screenHeight / 70}]}>
                  <FlashIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </>
  );
};

export default TouchingSlider;

import {FC, ReactElement, useState} from 'react';
import {View, ImageBackground, TouchableOpacity, Text, StyleSheet} from 'react-native';
//import components
import {gray1Color, transparent60Color, transparentGray90Color, whiteColor} from 'constants/colors.ts';
import User from 'assets/images/icons/user.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import IOIcon from 'assets/images/icons/io-logo.svg';
import {screenWidth} from 'constants/common.ts';
import {Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

const EventPreview: FC<{photos: any}> = ({photos}): ReactElement => {
  const [active, setActive] = useState<number>(0);
  const numberPhotos = photos?.length;
  const styles = useStyles();

  const handleNext = (): void => {
    if (active === numberPhotos - 1) {
      return setActive(0);
    } else {
      setActive(p => p + 1);
    }
  };

  const handleBack = (): void => {
    if (active === 0) {
      return setActive(numberPhotos - 1);
    }
    setActive(p => p - 1);
  };

  return (
    // @ts-ignore
    <View style={styles.container}>
      <ImageBackground source={{uri: photos?.[active]}} style={styles.imageBackground} imageStyle={styles.imageStyle} resizeMode="cover">
        <View style={styles.wrapperBar}>
          {[...Array(numberPhotos)].map((_, index) => (
            <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
          ))}
        </View>
        <View style={styles.wrapperButtons}>
          <TouchableOpacity onPress={handleBack} style={styles.button} />
          <TouchableOpacity onPress={handleNext} style={styles.button} />
        </View>
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Nammos Dubai</Text>
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <User />
            <Text style={styles.subText}>2 x Girl invitation</Text>
          </View>
          <View style={[styles.row, styles.marginLeft]}>
            <Calendar />
            <Text style={styles.subText}>7 August 2024</Text>
          </View>
        </View>
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity activeOpacity={0.7} style={[styles.iconButton, styles.marginRight]}>
          <FlashIcon />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[styles.iconButton, styles.marginLeft]}>
          <IOIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: transparentGray90Color,
      width: '100%',
      borderRadius: 15,
      padding: 10,
      zIndex: 10000,
    },
    imageBackground: {
      height: 150,
    },
    imageStyle: {
      borderRadius: 10,
    },
    wrapperBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginHorizontal: 10,
    },
    bar: {
      flex: 1,
      height: 3,
      marginHorizontal: screenWidth / 130,
      borderRadius: 30,
    },
    wrapperButtons: {
      flexDirection: 'row',
      height: '100%',
      position: 'absolute',
      zIndex: 10000,
    },
    button: {
      width: '50%',
    },
    textContainer: {
      marginTop: 9,
    },
    text: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(15, 812),
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    subText: {
      color: whiteColor,
      fontFamily: Satoshi500,
      fontSize: RFValue(10, 812),
      marginLeft: 4,
    },
    marginLeft: {
      marginLeft: 12,
    },
    centerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    iconButton: {
      width: 56,
      height: 56,
      borderRadius: 50,
      backgroundColor: transparent60Color,
      justifyContent: 'center',
      alignItems: 'center',
    },
    marginRight: {
      marginRight: 12,
    },
  });
};

export default EventPreview;

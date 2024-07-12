import {FC, ReactElement, useCallback, useState} from 'react';
import {View, ImageBackground, TouchableOpacity, Text, StyleSheet} from 'react-native';
// import components
import {blackColor, gray1Color, transparent60Color, transparentGray90Color, transparentWhite56Color, whiteColor} from 'constants/colors.ts';
import User from 'assets/images/icons/user.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import IOIcon from 'assets/images/icons/io-logo.svg';
import {screenWidth} from 'constants/common.ts';
import {Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import moment from 'moment/moment';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';

const EventPreview: FC<{
  photos: any;
  date: string;
  girls: string;
  placeName: string;
  flipCoin: () => void;
}> = ({photos, date, girls, placeName}): ReactElement => {
  const [active, setActive] = useState<number>(0);
  const styles = useStyles();
  const [imagesUser, setImagesUser] = useState();
  const numberPhotos = imagesUser?.length;

  useFocusEffect(
    useCallback(() => {
      const getUserPhotos = async () => {
        try {
          const user = auth().currentUser;
          const userInfoDoc = await firestore().collection('userInfo').doc(user?.uid).get();
          const userImage = userInfoDoc.data()?.photos?.find(({id}: any) => id === 0);
          if (userImage) {
            setImagesUser(userImage);
            console.log('userImage', userImage);
          }
        } catch (error) {
          console.log('errorGetUserPhotos', error);
        }
      };
      getUserPhotos();
    }, []),
  );

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
      <ImageBackground
        source={{uri: photos?.[active]?.image ? photos?.[active]?.image : photos?.[active]}}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        resizeMode="cover">
        {numberPhotos > 1 && (
          <View style={styles.wrapperBar}>
            {[...Array(numberPhotos)].map((_, index) => (
              <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
            ))}
          </View>
        )}
        <View style={styles.wrapperButtons}>
          <TouchableOpacity onPress={handleBack} style={styles.button} />
          <TouchableOpacity onPress={handleNext} style={styles.button} />
        </View>
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{placeName}</Text>
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <User />
            <Text style={styles.subText}>{girls} x Girl invitation</Text>
          </View>
          <View style={[styles.row, styles.marginLeft]}>
            <Calendar />
            <Text style={styles.subText}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD MMMM')}</Text>
          </View>
        </View>
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            borderRadius: 50,
            width: 56,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.8,
            marginRight: 12,
          }}>
          <View
            style={{
              backgroundColor: transparentWhite56Color,
              width: '100%',
              height: '100%',
              borderRadius: 50,
              position: 'absolute',
              top: -1,
              left: -1,
            }}
          />
          <View
            style={{
              backgroundColor: transparentWhite56Color,
              width: '100%',
              height: '100%',
              borderRadius: 50,
              position: 'absolute',
              right: -1,
              bottom: -1,
            }}
          />
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: blackColor,
              borderRadius: 50,
              zIndex: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlashIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            borderRadius: 50,
            width: 56,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.8,
            marginLeft: 12,
          }}>
          <View
            style={{
              backgroundColor: transparentWhite56Color,
              width: '100%',
              height: '100%',
              borderRadius: 50,
              position: 'absolute',
              top: -1,
              left: -1,
            }}
          />
          <View
            style={{
              backgroundColor: transparentWhite56Color,
              width: '100%',
              height: '100%',
              borderRadius: 50,
              position: 'absolute',
              right: -1,
              bottom: -1,
            }}
          />
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: blackColor,
              borderRadius: 50,
              zIndex: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IOIcon />
          </View>
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
      borderWidth: 1,
      borderColor: transparentWhite56Color,
      borderStyle: 'solid',
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

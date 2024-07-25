import {Dispatch, FC, ReactElement, SetStateAction, useCallback, useState} from 'react';
import {View, ImageBackground, TouchableOpacity, Text, StyleSheet, SafeAreaView} from 'react-native';
// import components
import {
  gray1Color,
  grayScale700,
  transparent60Color,
  transparentGray90Color,
  transparentWhite56Color,
  whiteColor,
} from 'constants/colors.ts';
import User from 'assets/images/icons/user.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import FlashIcon from 'assets/images/icons/flash.svg';
import IOIcon from 'assets/images/icons/io-logo.svg';
import CheckStar from 'assets/images/icons/check-star-white.svg';
import {screenWidth} from 'constants/common.ts';
import {Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import moment from 'moment/moment';
import Button from 'components/Button/Button';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';

const EventPreview: FC<{
  photos: any;
  date: string;
  girls: string;
  placeName: string;
  name: string;
  setCurrentCreateStap: Dispatch<SetStateAction<number>>;
  setTabState: Dispatch<SetStateAction<string>>;
  handleCreateEvent: any;
}> = ({photos, date, girls, placeName, setCurrentCreateStap, setTabState, handleCreateEvent, name}): ReactElement => {
  const [active, setActive] = useState<number>(0);
  const styles = useStyles();
  const [imagesUser, setImagesUser] = useState();
  const [nameUser, setNameUser] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAccountType, setUserAccountType] = useState('');
  const numberPhotos = imagesUser?.length;

  console.log('name', name);
  

  function calculateAge(birthDateString: string) {
    const parts = birthDateString.split('.');
    const birthDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  useFocusEffect(
    useCallback(() => {
      const getUserPhotos = async () => {
        try {
          const user = auth().currentUser;
          const userInfoDoc = await firestore().collection('userInfo').doc(user?.uid).get();
          setUserAccountType(userInfoDoc.data()?.accountType);
          const nameUser = userInfoDoc.data()?.name;
          const userAge = userInfoDoc.data()?.date;
          setNameUser(nameUser);
          const resultAge = calculateAge(userAge);
          setUserAge(resultAge);
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

  if (userAccountType === 'host') {
    return (
      // @ts-ignore
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1, paddingHorizontal: 24, marginBottom: 24}}>
            <ImageBackground
              style={{flex: 1, width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden'}}
              source={{uri: imagesUser?.image ? imagesUser?.image : ''}}>
              <View style={styles.wrapperBar}>
                {[...Array(numberPhotos)].map((_, index) => (
                  <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
                ))}
              </View>
              <View style={styles.wrapperButtons}>
                <TouchableOpacity onPress={handleBack} style={styles.button} />
                <TouchableOpacity onPress={handleNext} style={styles.button} />
              </View>
              <View style={{width: 100, height: 50, flexDirection: 'row', marginLeft: 14, marginTop: 20, alignItems: 'center'}}>
                <Text style={{fontSize: RFValue(14, 812), color: whiteColor, fontWeight: 'bold', fontFamily: Satoshi500, marginRight: 7}}>
                  {nameUser}, {userAge}
                </Text>
                <CheckStar />
              </View>
              <View style={{width: '100%', position: 'absolute', padding: 12, bottom: 0}}>
                <View style={styles.containerInfo}>
                  <ImageBackground
                    // source={{uri: photos?.[active]?.image ? photos?.[active]?.image : photos?.[active]}}
                    source={{uri: photos[0].image}}
                    style={styles.imageBackground}
                    imageStyle={styles.imageStyle}
                    resizeMode="cover">
                    {/* <View style={styles.wrapperBar}>
              {[...Array(numberPhotos)].map((_, index) => (
                <View key={index} style={[styles.bar, { backgroundColor: index === active ? whiteColor : gray1Color }]} />
              ))}
            </View> */}
                    {/* <View style={styles.wrapperButtons}>
              <TouchableOpacity onPress={handleBack} style={styles.button} />
              <TouchableOpacity onPress={handleNext} style={styles.button} />
            </View> */}
                  </ImageBackground>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontWeight: 'bold', fontSize: RFValue(27, 812), marginTop: 10}}>
                    {name}
                  </Text>
                  {/* <View>

        </View> */}
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{placeName}</Text>
                    <View style={styles.rowContainer}>
                      <View style={styles.row}>
                        <User />
                        <Text style={styles.subText}>{girls} x Girl invitation</Text>
                      </View>
                      <View style={[styles.row, styles.marginLeft]}>
                        <Calendar />
                        <Text style={styles.subText}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD.MM.YYYY')}</Text>
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
              </View>
            </ImageBackground>
          </View>
          {/* <Button onPress={handleCreateEvent} title={'Create event'} />
          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity
              onPress={() => {
                setCurrentCreateStap(2);
                setTabState('eventDetails');
              }}>
              <Text style={{color: whiteColor, fontSize: RFValue(20, 812), fontFamily: Satoshi500}}>Previous step</Text>
            </TouchableOpacity>
          </View> */}
          <View style={{flexDirection: 'row', width: '100%', paddingHorizontal: 16, alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setCurrentCreateStap(2);
                  setTabState('eventDetails');
                }}>
                <Text style={{color: whiteColor, fontSize: RFValue(20, 812), fontFamily: Satoshi500}}>Back</Text>
              </TouchableOpacity>
            </View>
            <Button buttonStyle={styles.button} onPress={handleCreateEvent} title={'Create event'} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (userAccountType === 'guest') {
    return (
      <View style={[styles.container, {backgroundColor: transparentGray90Color, padding: 16, borderRadius: 16}]}>
        <ImageBackground
          source={{uri: photos?.[active]?.image ? photos?.[active]?.image : photos?.[active]}}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
          resizeMode="cover">
          {photos.length > 1 && (
            <>
              <View style={styles.wrapperBar}>
                {[...Array(photos.length)].map((_, index) => (
                  <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
                ))}
              </View>
              <View style={styles.wrapperButtons}>
                <TouchableOpacity onPress={handleBack} style={styles.button} />
                <TouchableOpacity onPress={handleNext} style={styles.button} />
              </View>
            </>
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
              <Text style={styles.subText}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD.MM.YYYY')}</Text>
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
  }
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    containerInfo: {
      // position: 'absolute',
      borderWidth: 1,
      borderColor: grayScale700,
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
      width: '80%',
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

import {Dispatch, FC, ReactElement, SetStateAction, useCallback, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, SafeAreaView} from 'react-native';
// import components
import {gray1Color, grayScale700, transparent60Color, transparentGray90Color, whiteColor} from 'constants/colors.ts';
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
import {showToast} from 'helpers/showToast';
import SuperJoin from 'components/Modal/ModalSuperJoin/SuperJoin';
import FastImage from 'react-native-fast-image';
import {useCounterSuperEvents} from 'src/store/counterSuperInvites';
import Loader from 'components/Modal/ModalLoader/Loader';

const EventPreview: FC<{
  photos: any;
  isEditing: boolean | undefined;
  id: string;
  eventTypes: {};
  description: string;
  hour: string;
  address: string;
  meetingSpot: string;
  date: string;
  girls: number;
  placeName: string;
  name: string;
  setCurrentCreateStap: Dispatch<SetStateAction<number>>;
  setTabState: Dispatch<SetStateAction<string>>;
  setIsVisibleSaveModal: Dispatch<SetStateAction<boolean>>;
  handleCreateEvent: any;
  fromJoinEventsScreen: boolean;
  onInvite: () => void;
  superJoin: () => void;
  handleAutoSwipeRight: () => void;
  loaderVisible: boolean
}> = ({
  photos,
  date,
  girls,
  placeName,
  setCurrentCreateStap,
  setTabState,
  handleCreateEvent,
  name,
  isEditing,
  fromJoinEventsScreen,
  setIsVisibleSaveModal,
  onInvite,
  superJoin,
  handleAutoSwipeRight,
  loaderVisible
}): ReactElement => {
  const [active, setActive] = useState<number>(0);
  const styles = useStyles();
  const [imagesUser, setImagesUser] = useState();
  const [nameUser, setNameUser] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAccountType, setUserAccountType] = useState('');
  const [visibleModalSuperJoin, setVisibleModalSuperJoin] = useState(false);
  const numberPhotos = imagesUser?.length;

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

  const getUserPhotos = async () => {
    try {
      const user = auth().currentUser;
      const userInfoDoc = await firestore().collection('userInfo').doc(user?.uid).get();

      if (!userInfoDoc.exists) {
        return;
      }
      setUserAccountType(userInfoDoc.data()?.accountType);
      const dataName = userInfoDoc.data()?.name;
      const dataAge = userInfoDoc.data()?.date;
      setNameUser(dataName);
      const resultAge = calculateAge(dataAge);
      setUserAge(`${resultAge}`);
      const userImage = userInfoDoc.data()?.photos?.find((item: {id: number}) => item.id === 0);
      if (userImage) {
        setImagesUser(userImage);
      }
    } catch (error) {
      // console.log('errorGetUserPhotos', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
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

  const {counterSuperInvites} = useCounterSuperEvents();

  const handleSuperJoin = () => {
    if (counterSuperInvites > 0) {
      setVisibleModalSuperJoin(true);
      setTimeout(() => {
        superJoin();
      }, 2000);
      setTimeout(() => {
        setVisibleModalSuperJoin(false);
      }, 4000);
    } else {
      showToast('inviteMatch', "You don't have Super Joins", 'Super Join');
    }
  };

  if (userAccountType === 'host' && !fromJoinEventsScreen) {
    return (
      // @ts-ignore
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1, paddingHorizontal: 24, marginBottom: 24}}>
            <FastImage
              style={{flex: 1, width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden'}}
              source={{
                uri: imagesUser?.image ? imagesUser?.image : '',
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}>
              <View style={styles.wrapperBar}>
                {numberPhotos > 1
                  ? [...Array(numberPhotos)].map((_, index) => (
                      <View key={index} style={[styles.bar, {backgroundColor: index === active ? whiteColor : gray1Color}]} />
                    ))
                  : null}
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
                  <FastImage
                    style={styles.imageBackground}
                    source={{
                      uri: photos[0].image,
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  {/* <ImageBackground
                    source={{uri: photos[0].image}}
                    style={styles.imageBackground}
                    imageStyle={styles.imageStyle}
                    resizeMode="cover">
                  </ImageBackground> */}
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontWeight: 'bold', fontSize: RFValue(27, 812), marginTop: 10}}>
                    {name}
                  </Text>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{placeName}</Text>
                    <View style={styles.rowContainer}>
                      <View style={styles.row}>
                        <User />
                        <Text style={styles.subText}>{girls} x Guest invitation</Text>
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
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[styles.iconButton, styles.marginLeft]}
                      onPress={() => {
                        onInvite();
                      }}>
                      <IOIcon />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </FastImage>
            {/* <ImageBackground
              style={{flex: 1, width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden'}}
              source={{uri: imagesUser?.image ? imagesUser?.image : ''}}
              >
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
                    source={{uri: photos[0].image}}
                    style={styles.imageBackground}
                    imageStyle={styles.imageStyle}
                    resizeMode="cover">
                  </ImageBackground>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontWeight: 'bold', fontSize: RFValue(27, 812), marginTop: 10}}>
                    {name}
                  </Text>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{placeName}</Text>
                    <View style={styles.rowContainer}>
                      <View style={styles.row}>
                        <User />
                        <Text style={styles.subText}>{girls} x Guest invitation</Text>
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
            </ImageBackground> */}
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
            <Button
              buttonStyle={styles.button}
              onPress={() => {
                isEditing ? setIsVisibleSaveModal(true) : handleCreateEvent();
              }}
              title={isEditing ? 'Save changes' : 'Create event'}
            />
          </View>
        </View>
        <Loader isVisible={loaderVisible} successfulPay={false} />
      </SafeAreaView>
    );
  }

  if (userAccountType === 'guest' || fromJoinEventsScreen) {
    return (
      <View style={[styles.container, {backgroundColor: transparentGray90Color, padding: 16, borderRadius: 16}]}>
        <FastImage
          source={{uri: photos?.[active]?.image ? photos?.[active]?.image : photos?.[active]}}
          style={styles.imageBackground}
          resizeMode="cover">
          {/* {photos && photos.length > 1 && (
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
          )} */}
          <View style={styles.wrapperButtons}>
            <TouchableOpacity onPress={handleBack} style={styles.button} />
            <TouchableOpacity onPress={handleNext} style={styles.button} />
          </View>
        </FastImage>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{placeName}</Text>
          <View style={styles.rowContainer}>
            <View style={styles.row}>
              <User />
              <Text style={styles.subText}>{girls} x Guest invitation</Text>
            </View>
            <View style={[styles.row, styles.marginLeft]}>
              <Calendar />
              <Text style={styles.subText}>{moment(`${date}`, 'D/M/YYYY, HH:mm:ss').format('DD.MM.YYYY')}</Text>
            </View>
          </View>
        </View>
        <View style={styles.centerContainer}>
          <TouchableOpacity onPress={handleSuperJoin} activeOpacity={0.7} style={[styles.iconButton, styles.marginRight]}>
            <FlashIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAutoSwipeRight} activeOpacity={0.7} style={[styles.iconButton, styles.marginLeft]}>
            <IOIcon />
          </TouchableOpacity>
        </View>
        <SuperJoin isVisibleMatch={visibleModalSuperJoin} nameEvent={name} imageEvent={photos ? photos[0]?.image : ''} />
      </View>
    );
  }
  return <></>;
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
      overflow: 'hidden',
    },
    imageBackground: {
      height: 150,
      overflow: 'hidden',
      borderRadius: 10,
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

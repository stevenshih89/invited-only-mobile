import {FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import Man from 'assets/images/auth/man.png';
import ClockOrange from 'assets/images/icons/clock-orange.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, invitationCodePath} from 'constants/pathLocations';
import useStyles from './styles';
import {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useUser} from "../../../../../store/userStore";
import { blackColor, transparentWhite16Color, whiteColor } from 'constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi400, Satoshi700 } from 'constants/fonts';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { showToast } from 'helpers/showToast';

const Notifications: FC = (): ReactElement => {
  const navigation = useAppNavigation();
  const [notifications, setNotifications] = useState([]);
  const [images, setImages] = useState({}); // Хранение URL изображений

  const styles = useStyles();
  const user = useUser((i: any) => i?.user);

  const goToCodeVerification = (): void => {
    navigation.navigate(commonStackPath, {screen: invitationCodePath});
  };

  const getNotifications = async () => {
    const dataDoc = await firestore().collection('userInfo').doc(user?.uid).get();
    const notifications = dataDoc?.data()?.notifications;
    setNotifications(notifications || []);
  };

  const handleClearNotifications = async () => {
    setNotifications([])
    showToast('inviteMatch', 'Notifications have been read', 'Notifications', {status: 'success', ownerPhoto: user?.photos[0].image})
    await firestore().collection('userInfo').doc(user?.uid).update({
      notifications: []
    })
  }

  useFocusEffect(useCallback(() => {
    getNotifications();
  },[]));

  const fetchImage = async (uid: string) => {
    const dataDoc = await firestore().collection('userInfo').doc(uid).get();
    const photoUri = dataDoc?.data()?.photos?.[0]?.image || '';
    return photoUri;
  };

  useEffect(() => {
    const fetchImages = async () => {
      const imagesMap = {};
      for (const notification of notifications) {
        const photoUri = await fetchImage(notification.uid);
        imagesMap[notification.uid] = photoUri;
      }
      setImages(imagesMap);
    };

    fetchImages();
  }, [notifications]);

  const NotificationItem = () => {
    return (
      <View style={styles.notificationItem}>
        <View style={styles.notificationImageContainer}>
          <ImageBackground resizeMode="cover" source={{uri:user?.photos[0].image}} width={40} height={40} style={styles.notificationImageBackground}>
            <ClockOrange width={14} height={14} />
          </ImageBackground>
        </View>
        <View>
          <Text style={styles.notificationTitle}>Your User in review</Text>
          <View style={styles.notificationSubtitleWr}>
            <Text style={styles.notificationSubtitleText}>Have a code?</Text>
            <TouchableOpacity style={styles.notificationSubtitlePressableWr} onPress={goToCodeVerification}>
              <Text style={styles.notificationPressableText}>Click here</Text>
              <ArrowRight style={styles.notificationArrowRight} width={14} height={14} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <View style={{
        width: '100%',
        paddingVertical: 16,
        borderTopColor: transparentWhite16Color,
        borderTopWidth: 1,
        borderStyle: 'solid',
      }}>
        {notifications.length > 0 && <TouchableOpacity onPress={handleClearNotifications}>
        <Text style={{
          fontSize: RFValue(16, 812), 
          color: whiteColor,
          fontFamily: Satoshi700,
          textAlign: 'right',
        }}>
          Mark as read
        </Text>
        </TouchableOpacity>}
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View>
            <View style={{
            width: '100%',
            flexDirection: 'row',
            paddingVertical: 16
          }}>
            <Image source={{uri: images[item.uid]}} style={{width: 60, height: 60, borderRadius: 60}} />
            <View style={{marginLeft: 16, justifyContent: 'center', flex: 1}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
                <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi700, marginBottom: 4}}>{item.title}</Text>
                <View style={{
                  borderRadius: 40,
                  backgroundColor: whiteColor, 
                  paddingVertical: 4, 
                  paddingHorizontal: 8, 
                  }}>
                <Text style={{
                  color: blackColor, 
                  fontSize: RFValue(12, 812),
                  fontFamily: Satoshi700,
                  }}>
                    {item.mark.toUpperCase()}
                </Text>
                </View>
              </View>
              <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi400}}>{item.body}</Text>
            </View>
          </View>
          <View style={{
            borderBottomColor: transparentWhite16Color,
            borderBottomWidth: 1,
            borderStyle: 'solid',
            marginTop: 8
          }}></View>
          </View>
        )}
      />
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 20}}
        style={styles.containerScroll}>
        {!user?.accountConfirmed && <NotificationItem />}
      </ScrollView> */}
    </View>
  );
};

export default Notifications;

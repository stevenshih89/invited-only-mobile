import {FlatList, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import ClockOrange from 'assets/images/icons/clock-orange.svg';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {chatCorrespondencePath, commonStackPath, eventActiveInfoPath, invitationCodePath, myEventsPath, requestsPath} from 'constants/pathLocations';
import useStyles from './styles';
import {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {useUser} from '../../../../../store/userStore';
import {blackColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {showToast} from 'helpers/showToast';
import FastImage from 'react-native-fast-image';
import { handleCreateChat } from 'helpers/chat';

interface Notifications {
  body: string;
  id: string;
  mark: string;
  title: string;
  uid: string;
  path?: string;
  data?: any;
}

type NotificationImage = {[key: string]: string};

const fetchImage = async (uid: string): Promise<string> => {
  const dataDoc = await firestore().collection('userInfo').doc(uid).get();
  const photoUri = dataDoc?.data()?.photos?.[0]?.image || '';
  return photoUri;
};

const fetchNotifications = async (uid: string): Promise<Notifications[]> => {
  const notificationsQuery = await firestore().collection('userInfo').doc(uid).collection('notifications').get();
  const notifications = notificationsQuery.docs.map(doc => doc.data()) as Notifications[];
  return notifications.reverse();
};

const clearNotifications = async (uid: string): Promise<void> => {
  await firestore()
    .collection('userInfo')
    .doc(uid)
    .collection('notifications')
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        doc.ref.delete();
      });
    });
};

const Notifications: FC = (): ReactElement => {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [images, setImages] = useState<NotificationImage>({});
  const navigation = useAppNavigation();

  const styles = useStyles();
  const user = useUser((i: any) => i?.user);

  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, []),
  );

  useEffect(() => {
    const fetchImages = async () => {
      const imagesMap: NotificationImage = {};
      for (const notification of notifications) {
        const photoUri = await fetchImage(notification.uid);
        imagesMap[notification.uid] = photoUri;
      }
      setImages(imagesMap);
    };

    fetchImages();
  }, [notifications]);

  const getNotifications = async () => {
    const notification = await fetchNotifications(user?.uid ?? '');
    setNotifications(notification);
  };

  const handleClearNotifications = async () => {
    setNotifications([]);
    await clearNotifications(user?.uid);
    showToast('inviteMatch', 'Notifications have been read', 'Notifications', {status: 'success', ownerPhoto: user?.photos[0].image});
  };

  const handleNavigate = async (path: string, data: any) => {
    console.log('data', data);
    
    switch (path) {
      case 'invitationCode':
        navigation.navigate(commonStackPath, {screen: invitationCodePath});
        break;
      case 'requests':
        // @ts-ignore
        navigation.navigate(requestsPath, {
          screen: requestsPath,
        });
        break;
      case 'myEvents':
        // @ts-ignore
        navigation.navigate(myEventsPath, {
          screen: myEventsPath,
        });
        break;
      case 'guestsList':
        // @ts-ignore
        navigation.navigate(commonStackPath, {
          screen: eventActiveInfoPath,
          params: {list: data},
        } as never);
        break;
      case 'chat':
        // @ts-ignore
        navigation.navigate(chatCorrespondencePath, {
          screen: chatCorrespondencePath,
          params: data,
        });
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.root}>
      <View
        style={{
          width: '100%',
          paddingVertical: 16,
          borderTopColor: transparentWhite16Color,
          borderTopWidth: 1,
          borderStyle: 'solid',
        }}>
        {notifications && notifications.length > 0 && (
          <TouchableOpacity onPress={handleClearNotifications}>
            <Text
              style={{
                fontSize: RFValue(16, 812),
                color: whiteColor,
                fontFamily: Satoshi700,
                textAlign: 'right',
              }}>
              Mark all as read
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity disabled={!item?.path} onPress={() => handleNavigate(item.path, item.data)}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                paddingVertical: 16,
              }}>
              <FastImage source={{uri: images[item.uid]}} style={{width: 60, height: 60, borderRadius: 60}} />
              <View style={{marginLeft: 16, justifyContent: 'center', flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1}}>
                  <Text
                    style={{
                      color: whiteColor,
                      fontSize: RFValue(16, 812),
                      fontFamily: Satoshi700,
                      marginBottom: 4,
                      flexShrink: 1,
                    }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      borderRadius: 40,
                      backgroundColor: whiteColor,
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                    }}>
                    <Text
                      style={{
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
            <View
              style={{
                borderBottomColor: transparentWhite16Color,
                borderBottomWidth: 1,
                borderStyle: 'solid',
                marginTop: 8,
              }}
            />
          </TouchableOpacity>
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

type NotificationItemProps = {
  user: {photos: [{image: string}]};
};
const NotificationItem = ({user}: NotificationItemProps) => {
  const navigation = useAppNavigation();
  const styles = useStyles();

  const goToCodeVerification = (): void => {
    navigation.navigate(commonStackPath, {screen: invitationCodePath});
  };

  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationImageContainer}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: user?.photos[0].image}}
          width={40}
          height={40}
          style={styles.notificationImageBackground}>
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

export default Notifications;

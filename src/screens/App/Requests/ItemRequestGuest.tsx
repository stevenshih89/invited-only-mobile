import {lightRed1Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import moment from 'moment';
import {Animated, Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {TinderCard} from 'rn-tinder-card';
import useStyles from './styles';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import FlashFilled from 'assets/images/icons/flash-filled.svg';
import User from 'assets/images/icons/user.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import {FC, useEffect, useState} from 'react';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, eventInfoPath} from 'constants/pathLocations';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from '@ant-design/react-native';
import {showToast} from 'helpers/showToast.ts';
import {useUser} from '../../../store/userStore';

const ItemRequestGuest: FC = ({list, item}: any): JSX.Element => {
  const [hostInfo, setHostInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heightAnim] = useState(new Animated.Value(218));
  const {photos, uid, placeName, meetingSpot, description, hour, date, address, female, femaleFriend, male, maleFriend, name} = list;

  const styles = useStyles();
  const navigation = useAppNavigation();
  const user = useUser((i: any) => i?.user);

  if (item[0]?.uid !== user?.uid) return

  const goToEventInfo = () => {
    navigation.navigate(commonStackPath, {screen: eventInfoPath, params: {list: list}});
  };

  const getHostInfo = async uid => {
    try {
      const host = await firestore().collection('userInfo').doc(uid).get();
      setHostInfo(host.data());
      setLoading(false);
      console.log('host data', host.data());
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const OverlayRight = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          zIndex: 1000,
          alignItems: 'center',
        }}>
        <View style={{borderRadius: 5, paddingHorizontal: 13, paddingVertical: 6, borderWidth: 2, borderColor: whiteColor}}>
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>ACCEPT</Text>
        </View>
      </View>
    );
  };

  const OverlayLeft = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          right: 0,
          left: 0,
          zIndex: 1000,
          alignItems: 'center',
        }}>
        <View style={{borderRadius: 5, paddingHorizontal: 13, paddingVertical: 6, borderWidth: 2, borderColor: lightRed1Color}}>
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: lightRed1Color}}>REJECT</Text>
        </View>
      </View>
    );
  };

  const handleSwipeGuestCardInvite = async (item: any): Promise<void> => {
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(async () => {
      const userAccepted = {
        gender: item?.gender,
        name: item?.name,
        status: 'accepted',
        superInvite: false,
        uid: item?.uid,
        userPhoto: item?.userPhoto,
      };

      try {
        const updateUsersList: any = [...list?.usersList, userAccepted];
        const updateRequestsList: any = list?.requestsList?.filter((i: any) => i?.uid !== item?.uid);

        await firestore().collection('Events').doc(list?.id).update({
          usersList: updateUsersList,
          requestsList: updateRequestsList,
        });
      } catch (e) {
        console.log(e);
        showToast('cancel', '', "There's been an error");
      }
    });
  };

  const handleSwipeGuestCardReject = async (item: any): Promise<void> => {
    try {
      const userNotAccepted = {
        gender: item?.gender,
        name: item?.name,
        status: 'notAccepted',
        superInvite: false,
        uid: item?.uid,
        userPhoto: item?.userPhoto,
      };

      const updateUsersList: any = [...list?.usersList, userNotAccepted];
      const updateRequestsList: any = list?.requestsList?.filter((i: any) => i?.uid !== item?.uid);

      await firestore().collection('Events').doc(list?.id).update({
        usersList: updateUsersList,
        requestsList: updateRequestsList,
      });
    } catch (e) {
      console.log(e);
      showToast('cancel', '', "There's been an error");
    }
  };

  useEffect(() => {
    getHostInfo(uid);
  }, []);

  return (
    <>
      {loading ? (
        <View style={{flex: 1}}>
          <ActivityIndicator color={whiteColor} size="small" />
        </View>
      ) : (
        <Animated.View style={[styles.itemContainer, {height: heightAnim}]}>
          <TinderCard
            // @ts-ignore
            cardWidth="100%"
            // @ts-ignore
            cardHeight="100%"
            onSwipedRight={() => handleSwipeGuestCardInvite(item[0])}
            onSwipedLeft={() => handleSwipeGuestCardReject(item[0])}
            OverlayLabelRight={OverlayRight}
            OverlayLabelLeft={OverlayLeft}
            disableBottomSwipe={true}
            inputOverlayLabelRightOpacityRange={[0, 40]}
            inputOverlayLabelLeftOpacityRange={[0, -40]}
            translateXRange={[-70, 0, 70]}
            disableTopSwipe={true}
            cardStyle={{height: '100%', borderRadius: 22, zIndex: 999}}>
            <ImageBackground style={styles.imageBackground} resizeMode="cover" source={{uri: photos[0]?.image}}>
              <View style={[styles.itemContentContainer, {justifyContent: item[0]?.isSuperInvite ? 'space-between' : 'flex-end'}]}>
                {item[0]?.isSuperInvite && (
                  <View style={styles.superLikeContainer}>
                    <View style={styles.superLikeRow}>
                      <FlashFilled style={styles.superLikeIcon} />
                      <Text style={styles.superLikeText}>Super invite you!`</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity activeOpacity={0.7} style={[styles.buttonContainer, {margin: 7}]} onPress={goToEventInfo}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Image source={{uri: hostInfo?.photos[0]?.image}} style={{width: 25, height: 25, borderRadius: 20}} />
                    <View style={{marginLeft: 8}}>
                      <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(9, 812)}}>{hostInfo?.name}</Text>
                      <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(6, 812)}}>Host</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6}}>
                    <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(11, 812)}}>{address}</Text>
                    <ArrowRight height={12} />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 6}}>
                    <User width={10} height={10} />
                    <Text
                      style={{
                        color: whiteColor,
                        fontFamily: Satoshi400,
                        fontSize: RFValue(10, 812),
                        marginLeft: 4,
                      }}>{`${female + femaleFriend} x Girl invitation `}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Calendar width={10} height={10} />
                    <Text
                      style={{
                        color: whiteColor,
                        fontFamily: Satoshi400,
                        fontSize: RFValue(10, 812),
                        marginLeft: 4,
                      }}>
                      {moment(date).format('D MMMM YYYY')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TinderCard>
        </Animated.View>
      )}
    </>
  );
};

export default ItemRequestGuest;

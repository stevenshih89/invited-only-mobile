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
import {FC, ReactElement, useState} from 'react';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {commonStackPath, eventInfoPath} from 'constants/pathLocations';

const ItemRequestGuest: FC = ({item, handleSwipeGuestCard}: any): ReactElement => {
  const [heightAnim] = useState(new Animated.Value(218));

  const styles = useStyles();
  const navigation = useAppNavigation();

  const goToEventInfo = () => {
    navigation.navigate(commonStackPath, {screen: eventInfoPath});
  };
  const handleRemove = (id: number, status: string) => {
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => handleSwipeGuestCard(id, status));
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
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: whiteColor}}>INVITE</Text>
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
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: lightRed1Color}}>NOPE</Text>
        </View>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.itemContainer, {height: heightAnim}]}>
      <TinderCard
        // @ts-ignore
        cardWidth="100%"
        // @ts-ignore
        cardHeight="100%"
        onSwipedRight={() => handleRemove(item.id, 'positive')}
        onSwipedLeft={() => handleRemove(item.id, 'negative')}
        OverlayLabelRight={OverlayRight}
        OverlayLabelLeft={OverlayLeft}
        disableBottomSwipe={true}
        inputOverlayLabelRightOpacityRange={[0, 40]}
        inputOverlayLabelLeftOpacityRange={[0, -40]}
        translateXRange={[-70, 0, 70]}
        disableTopSwipe={true}
        cardStyle={{height: '100%', borderRadius: 22, zIndex: 999}}>
        <ImageBackground style={styles.imageBackground} resizeMode="cover" source={item?.image}>
          <View style={[styles.itemContentContainer, {justifyContent: item?.isSuperInvite ? 'space-between' : 'flex-end'}]}>
            {item?.isSuperInvite && (
              <View style={styles.superLikeContainer}>
                <View style={styles.superLikeRow}>
                  <FlashFilled style={styles.superLikeIcon} />
                  <Text style={styles.superLikeText}>Super invite you!`</Text>
                </View>
              </View>
            )}
            <TouchableOpacity activeOpacity={0.7} style={[styles.buttonContainer, {margin: 7}]} onPress={goToEventInfo}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Image source={item.host?.image} style={{width: 25, height: 25, borderRadius: 20}} />
                <View style={{marginLeft: 8}}>
                  <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(9, 812)}}>{item.host.name}</Text>
                  <Text style={{color: whiteColor, fontFamily: Satoshi400, fontSize: RFValue(6, 812)}}>Host</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6}}>
                <Text style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(11, 812)}}>{item.location}</Text>
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
                  }}>{`${item.invitations.count} x ${item.invitations.gender} invitation`}</Text>
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
                  {moment(item.date).format('D MMMM YYYY')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TinderCard>
    </Animated.View>
  );
};

export default ItemRequestGuest;

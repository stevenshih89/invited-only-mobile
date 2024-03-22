import {ImageBackground, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TinderCard} from 'rn-tinder-card';
import Home from 'assets/images/icons/home.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
// import Location from 'assets/images/icons/location.svg';
import FlashFilled from 'assets/images/icons/flash-filled.svg';
import useStyles from './styles';
import {Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {lightRed1Color, whiteColor} from 'constants/colors';
import {calculateAge} from 'helpers/calculateAge';

const ItemRequestHost = ({item, handleSwipeHostCard}: any) => {
  const styles = useStyles();

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
          <Text style={{fontFamily: Satoshi700, fontSize: RFValue(14, 812), color: lightRed1Color}}>REJECT</Text>
        </View>
      </View>
    );
  };

  const age = calculateAge(item?.date);

  return (
    <View style={styles.itemContainer}>
      <TinderCard
        // @ts-ignore
        cardWidth="100%"
        // @ts-ignore
        cardHeight="100%"
        onSwipedRight={() => handleSwipeHostCard(item.id)}
        onSwipedLeft={() => handleSwipeHostCard(item.id)}
        OverlayLabelRight={OverlayRight}
        OverlayLabelLeft={OverlayLeft}
        disableBottomSwipe={true}
        inputOverlayLabelRightOpacityRange={[0, 40]}
        inputOverlayLabelLeftOpacityRange={[0, -40]}
        translateXRange={[-70, 0, 70]}
        disableTopSwipe={true}
        cardStyle={{height: '100%', borderRadius: 22, zIndex: 999}}>
        <ImageBackground style={styles.imageBackground} resizeMode="cover" source={{uri: item?.userPhoto}}>
          <View style={[styles.itemContentContainer, {justifyContent: item?.superInvite ? 'space-between' : 'flex-end'}]}>
            {item?.superInvite && (
              <View style={styles.superLikeContainer}>
                <View style={styles.superLikeRow}>
                  <FlashFilled style={styles.superLikeIcon} />
                  <Text style={styles.superLikeText}>{`${item?.name} Super wants to join!`}</Text>
                </View>
              </View>
            )}
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
              style={styles.linearGradient}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <TouchableOpacity activeOpacity={0.7} style={styles.buttonContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>{item?.name}</Text>
                  <Text style={styles.ageText}>{age}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <View style={styles.locationRow}>
                    <Home height={12} />
                    <Text style={styles.locationText}>{item?.address}</Text>
                  </View>
                  <ArrowRight height={12} />
                </View>
                {/* <View style={styles.distanceContainer}>
                  <Location height={12} />
                  <Text style={styles.distanceText}>{`${item?.distance}`}</Text>
                </View> */}
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ImageBackground>
      </TinderCard>
    </View>
  );
};

export default ItemRequestHost;

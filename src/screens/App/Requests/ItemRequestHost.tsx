import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TinderCard} from 'rn-tinder-card-bn-digital';
import CloseIcon from 'assets/images/icons/close.svg';
import CheckStarWhite from 'assets/images/icons/check-star-white.svg';
import FlashFilledWhiteIcon from 'assets/images/icons/flash-filled.svg';
import useStyles from './styles';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, lightRed1Color, whiteColor} from 'constants/colors';
import {useAppNavigation} from 'hooks/useAppNavigation.ts';
import {myProfileViewPath, userProfilePath} from 'constants/pathLocations.ts';
import FastImage from 'react-native-fast-image';
import {getFontSize} from 'helpers/getFontSize';
import {screenHeight} from 'constants/common';
import {useItemRequestHost} from 'hooks/useItemRequestHost';
import {User} from 'src/types/userInfo';
import {MatchData} from '../IO/screens/Match/Match';

interface Props {
  item: Partial<User.Info>;
  handleOpenMatch: (value: MatchData) => void;
  setIsVisibleModalFullEvent: (value: Boolean) => void;
  fetchHostRequests: () => void;
}

const ItemRequestHost = ({item, handleOpenMatch, setIsVisibleModalFullEvent, fetchHostRequests}: Props) => {
  const styles = useStyles();
  const navigation = useAppNavigation();

  const {cardRef, handleInvite, handleReject, goToProfileView} = useItemRequestHost({
    item,
    handleOpenMatch,
    setIsVisibleModalFullEvent,
    fetchHostRequests,
  });

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

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(userProfilePath, {screen: myProfileViewPath, params: {uid: item.uid}})}
      style={{
        paddingHorizontal: 7,
        borderRadius: 12,
        width: '50%',
        height: screenHeight / 3.7,
      }}>
      <TinderCard
        ref={cardRef}
        // @ts-ignore
        cardWidth="100%"
        // @ts-ignore
        cardHeight="100%"
        onSwipedRight={() => handleInvite({userItem: item, withSwipeAnimation: false})}
        onSwipedLeft={() => handleReject({userItem: item, withSwipeAnimation: false})}
        OverlayLabelRight={OverlayRight}
        OverlayLabelLeft={OverlayLeft}
        disableBottomSwipe={true}
        disableVerticalSwipe={true}
        inputOverlayLabelRightOpacityRange={[0, 40]}
        inputOverlayLabelLeftOpacityRange={[0, -40]}
        translateXRange={[-70, 0, 70]}
        disableTopSwipe={true}
        cardStyle={{height: '100%', width: '100%', borderRadius: 22, zIndex: 999}}>
        <FastImage
          style={styles.imageBackground}
          source={{
            uri: item.userPhoto,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          <View style={[styles.itemContentContainer, {justifyContent: item?.superInvite ? 'space-between' : 'flex-end'}]}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.8)']}
              style={styles.linearGradient}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              locations={[0.3, 0.8, 1]}>
              {item?.superInvite && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: blackColor,
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    borderRadius: 5,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}>
                  <FlashFilledWhiteIcon width={8} />
                  <Text style={{marginLeft: 4, fontFamily: Satoshi700, fontSize: RFValue(8, 812), color: whiteColor}}>
                    Super wants to join you
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  handleReject({userItem: item, withSwipeAnimation: true});
                }}
                style={{
                  width: 32,
                  position: 'absolute',
                  right: 4,
                  top: 10,
                  height: 32,
                  backgroundColor: blackColor,
                  borderRadius: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CloseIcon />
              </TouchableOpacity>
              <View style={{marginTop: 'auto'}}>
                <View
                  style={{
                    marginTop: 'auto',
                    alignSelf: 'flex-start',
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    backgroundColor: whiteColor,
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      textTransform: 'capitalize',
                      fontFamily: Satoshi700,
                      fontSize: RFValue(10, 812),
                      color: blackColor,
                    }}>
                    Guest
                  </Text>
                </View>
                <TouchableOpacity onPress={() => goToProfileView()} activeOpacity={0.7} style={styles.buttonContainer}>
                  <View style={styles.nameContainer}>
                    <Text style={[styles.nameText, {fontSize: getFontSize(item?.name)}]}>{item?.name}</Text>
                    <CheckStarWhite width={15} height={17} style={{marginLeft: 8, marginTop: 4}} />
                  </View>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          <View
            style={{
              backgroundColor: whiteColor,
              height: 72,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingVertical: 17,
            }}>
            <TouchableOpacity
              onPress={() => {
                handleInvite({userItem: item, withSwipeAnimation: true});
              }}
              style={{
                backgroundColor: blackColor,
                paddingVertical: 12,
                borderRadius: 8,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: whiteColor, fontSize: RFValue(12, 812), fontFamily: Satoshi500}}>Invite</Text>
            </TouchableOpacity>
          </View>
        </FastImage>
      </TinderCard>
    </TouchableOpacity>
  );
};

export default ItemRequestHost;

import {black3Color, blackColor, lightGray10Color, transparentGray60Color, whiteColor} from 'constants/colors';
import {Text, TouchableOpacity, View, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import Close from 'assets/images/icons/close.svg';
import {Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight, screenWidth} from 'constants/common';
import {FC, useEffect} from 'react';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, withDelay} from 'react-native-reanimated';
import MatchInfoCard from 'components/MatchInfoCard';
import {calculateAge} from 'helpers/calculateAge';
import {Event} from 'src/types/event';
import LinearGradient from 'react-native-linear-gradient';
import {useMatch} from 'hooks/useMatch';
export interface MatchData {
  type?: string;
  nameHost?: string;
  nameGuest?: string;
  imageUri?: string;
  uidHost?: string;
  uidGuest?: string;
  eventId?: string;
  superInvite?: boolean;
  userHostImageUri?: string;
  joinEvents: number;
  location: string | null;
  premium: boolean;
  dateHost: string;
  dateGuest: string;
  onlineGuest: boolean;
  accountConfirmedHost: boolean;
  accountConfirmedGuest: boolean;
  usersListHost: Event.User[];
  accountTypeHost: string;
  accountTypeGuest: string;
  eventImage: string;
  guestsInvited: number;
}

const Match: FC<{isVisibleMatch: boolean; onCloseMatch: () => void; matchData: MatchData}> = ({
  isVisibleMatch,
  onCloseMatch,
  matchData,
}) => {
  const {handleCloseMatch, userHost, handleApproveGuestFromHost, handleCreateChat} = useMatch(onCloseMatch, matchData);

  // ANIMATED CARD

  const rotateCard1 = useSharedValue(0);
  const marginRightCard1 = useSharedValue(screenWidth / 2 - 114 - 18);

  const whiteLineWidth = useSharedValue(300);
  const whiteLineZIndex = useSharedValue(1200);
  const whiteLineTop = useSharedValue(-1000);

  const whiteLineBottom = useSharedValue(-1000);
  const whiteLineBottomWidth = useSharedValue(300);

  const rotateCard2 = useSharedValue(0);
  const marginLeftCard2 = useSharedValue(screenWidth / 2 - 114 - 18);
  const topCard2 = useSharedValue(screenHeight / 2 - 280);

  useEffect(() => {
    if (isVisibleMatch) {
      rotateCard1.value = withDelay(800, withTiming(-15, {duration: 400}));
      marginRightCard1.value = withDelay(
        600,
        withTiming(screenWidth - screenWidth * 0.53 - (screenWidth / 100) * 15 - 14, {duration: 200}),
      );

      rotateCard2.value = withDelay(800, withTiming(15, {duration: 400}));
      marginLeftCard2.value = withDelay(600, withTiming(screenWidth - screenWidth * 0.53 - (screenWidth / 100) * 15 - 14, {duration: 200}));
      topCard2.value = withDelay(400, withTiming(screenHeight / 2 - 350, {duration: 200}));

      whiteLineWidth.value = withTiming(117, {duration: 400});
      whiteLineZIndex.value = withTiming(800, {duration: 400});
      whiteLineTop.value = withTiming(-900, {duration: 400});

      whiteLineBottom.value = withTiming(-1280, {duration: 300});
      whiteLineBottomWidth.value = withTiming(117, {duration: 300});
    } else {
      rotateCard1.value = 0;
      marginRightCard1.value = screenWidth / 2 - 114 - 18;

      rotateCard2.value = 0;
      marginLeftCard2.value = screenWidth / 2 - 114 - 18;
      topCard2.value = screenHeight / 2 - 280;
      whiteLineWidth.value = 300;
    }
  }, [isVisibleMatch]);

  const animatedStyleCard1 = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotateCard1.value}deg`}],
    right: marginRightCard1.value,
    top: screenHeight / 2 - 280,
  }));

  const animatedStyleCard2 = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotateCard2.value}deg`}],
    left: marginLeftCard2.value,
    top: topCard2.value,
  }));

  const animateWhiteLine = useAnimatedStyle(() => ({
    width: whiteLineWidth.value,
    zIndex: whiteLineZIndex.value,
    top: whiteLineTop.value,
  }));

  const animateWhiteLineBottom = useAnimatedStyle(() => ({
    bottom: whiteLineBottom.value,
    width: whiteLineBottomWidth.value,
  }));

  return (
    <LinearGradient colors={[black3Color, blackColor]}>
      <Modal
        testID="matchModal"
        isVisible={isVisibleMatch}
        coverScreen
        backdropOpacity={1}
        onBackdropPress={handleCloseMatch}
        backdropColor={lightGray10Color}
        backdropTransitionInTiming={1000}
        animationIn={'fadeIn'}
        animationInTiming={1}>
        <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
          <Animated.View
            style={[
              {
                height: 2000,
                backgroundColor: whiteColor,
                position: 'absolute',
                transform: [{rotateZ: '22deg'}],
              },
              animateWhiteLine,
            ]}
            //animateWhiteLine
          />
          <TouchableOpacity
            testID="closeMatch"
            activeOpacity={0.7}
            onPress={handleCloseMatch}
            style={{
              borderRadius: 100,
              backgroundColor: transparentGray60Color,
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              alignSelf: 'flex-end',
            }}>
            <Close />
          </TouchableOpacity>
          <Animated.View style={[{position: 'absolute', zIndex: 1000, alignSelf: 'center'}, animatedStyleCard1]}>
            <MatchInfoCard
              isProfile={false}
              usersList={matchData.usersListHost}
              accountType={matchData.accountTypeHost}
              image={matchData.userHostImageUri}
              imageEvent={matchData.eventImage}
              online={matchData.onlineGuest}
              premium={matchData.premium}
              name={matchData.nameHost}
              age={calculateAge(matchData.dateHost)}
              confirmedAccount={matchData.accountConfirmedGuest}
              joinEvents={matchData.joinEvents}
              location={matchData.location}
              showHeaderInfo={false}
              guestsInvited={matchData.guestsInvited}
              isHost={true}
              isGuest={false}
            />
          </Animated.View>

          <Animated.View style={[{position: 'absolute', alignSelf: 'center'}, animatedStyleCard2]}>
            <MatchInfoCard
              isProfile={false}
              usersList={matchData.usersListHost}
              accountType={matchData.accountTypeGuest}
              image={matchData.imageUri}
              imageEvent={matchData.eventImage}
              online={matchData.onlineGuest}
              premium={matchData.premium}
              name={matchData.nameGuest}
              age={calculateAge(matchData.dateGuest)}
              confirmedAccount={matchData.accountConfirmedGuest}
              joinEvents={matchData.joinEvents}
              location={matchData.location}
              guestsInvited={matchData.guestsInvited}
              showHeaderInfo={true}
              isGuest={true}
              isHost={false}
            />
          </Animated.View>
          <View>
            <Text
              style={{
                color: whiteColor,
                fontSize: RFValue(38, 812),
                fontFamily: Satoshi500,
                textAlign: 'center',
                marginTop: 35,
              }}>
              New Guest Connection!
            </Text>
            <View style={{flexDirection: 'row', marginVertical: 30}}>
              {userHost?.accountType === 'host' && (
                <TouchableOpacity
                  onPress={handleApproveGuestFromHost}
                  style={{
                    flex: 1,
                    paddingVertical: 16,
                    backgroundColor: whiteColor,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(18, 812),
                      color: blackColor,
                      fontFamily: Satoshi500,
                      textAlign: 'center',
                    }}>
                    Approve guest
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handleCreateChat}
                style={{
                  flex: 1,
                  paddingVertical: 16,
                  backgroundColor: whiteColor,
                  borderRadius: 15,
                  marginLeft: 12,
                }}>
                <Text
                  style={{
                    fontSize: RFValue(18, 812),
                    color: blackColor,
                    fontFamily: Satoshi500,
                    textAlign: 'center',
                  }}>
                  Send message
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        <Animated.View
          style={[
            {
              height: 2000,
              backgroundColor: whiteColor,
              position: 'absolute',
              transform: [{rotateZ: '22deg'}],
              right: 0,
            },
            animateWhiteLineBottom,
          ]}
        />
      </Modal>
    </LinearGradient>
  );
};

export default Match;

import React, {FC, useContext} from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import {useUser} from '../../../store/userStore';
import {black2Color, black60Color, blackColor, lightGray2Color, white64Color, whiteColor} from 'constants/colors';
import Close from 'assets/images/icons/close.svg';
import Calendar from 'assets/images/icons/calendar-event.svg';
import User from 'assets/images/icons/profile-fill-gray.svg';
import Message from 'assets/images/icons/message-fill-gray.svg';
// import Calendar from 'assets/images/icons/calendar-event.svg';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import Button from 'components/Button/Button';
import { demoFlowStackPath, demoIntroPath} from 'constants/pathLocations';
import {screenHeight, screenWidth} from 'constants/common';
import {showToast} from 'helpers/showToast';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';

interface RejectAccount {
  isVisible?: boolean;
  setIsVisible?: any;
  userInfo: any;
  // image: any;
}

const ModalChangeAccountType: FC<RejectAccount> = ({isVisible, setIsVisible, userInfo}) => {
  const {userInfo: apiUserInfoCollection} = useContext(FirebaseCollectionsContext);
  const navigation = useNavigation();
  const {user} = useUser();

  const handleContinue = async () => {
    if (!user?.isPassedDemo) {
      navigation.navigate(demoFlowStackPath, {screen: demoIntroPath} as never);
    }

    setIsVisible(false);
    try {
      await firestore().collection(apiUserInfoCollection).doc(user.uid).update({
        showModalAccept: false,
        showModalChangeAccountType: false,
      });
    } catch (error) {
      showToast('inviteMatch', 'An issue occurred while updating the user data. Please try again later.', 'Error');
      logErrorToSentry(error);
      console.log('error showModalAccept', error);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropOpacity={1}
      backdropColor={blackColor}
      animationInTiming={1}
      animationOutTiming={1}
      style={{
        margin: 0,
        zIndex: 999,
      }}>
      <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 24}}>
          <View style={{position: 'relative', alignItems: 'center', width: '100%'}}>
            <TouchableOpacity
              onPress={handleContinue}
              style={{position: 'absolute', width: 50, height: 50, right: 0, marginTop: screenHeight / 30}}>
              <Close width={30} height={30} />
            </TouchableOpacity>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)']}
              style={{
                position: 'absolute',
                bottom: 87,
                left: 0,
                right: 0,
                height: 80,
                zIndex: 2000,
              }}
            />
            <Image
              style={{
                width: screenWidth / 2.07,
                height: screenHeight / 2.94,
                borderRadius: 20,
                marginTop: screenHeight / 20,
                position: 'absolute',
                transform: [{translateY: -10}, {rotate: '-5deg'}],
                zIndex: 800,
              }}
              source={{uri: user.photos[1].image}}
            />
            <Image
              style={{
                width: screenWidth / 2.33,
                height: screenHeight / 2.94,
                borderRadius: 20,
                marginTop: screenHeight / 20,
                position: 'absolute',
                transform: [{translateY: -20}, {rotate: '5deg'}],
                zIndex: 500,
              }}
              source={{uri: user.photos[2].image}}
            />
            <View style={{zIndex: 1000, position: 'relative'}}>
              <Image
                style={{
                  width: screenWidth / 1.86,
                  height: screenHeight / 2.3,
                  borderRadius: 20,
                  marginTop: screenHeight / 20,
                }}
                source={{uri: user.photos[0].image}}
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  backgroundColor: black60Color,
                  top: screenHeight / 9.5,
                  right: 10,
                }}>
                <Close />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  width: 40,
                  borderRadius: 40,
                  top: screenHeight / 4.5,
                  right: 10,
                }}>
                <View style={{width: 5, height: 80, borderRadius: 2, backgroundColor: white64Color, alignItems: 'center'}}>
                  <View style={{width: 1.5, height: 40, borderRadius: 2, backgroundColor: whiteColor}} />
                </View>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                backgroundColor: blackColor,
                width: '100%',
                bottom: 0,
                zIndex: 1000,
              }}>
              <Text style={{color: whiteColor, fontSize: RFValue(36, 812), fontFamily: Satoshi500, marginBottom: 12}}>
                Upgraded to Host!!
              </Text>
              <Text style={{color: whiteColor, fontSize: RFValue(18, 812), fontFamily: Satoshi400}}>Enjoy host access as our gift!</Text>
            </View>
          </View>

          <View style={{marginTop: 24, backgroundColor: black2Color, width: '100%', borderRadius: 10, padding: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: lightGray2Color,
                  borderRadius: 48,
                  width: 48,
                  height: 48,
                }}>
                <Calendar />
              </View>
              <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500, marginLeft: 16}}>
                Share Events and Tables
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 16}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: lightGray2Color,
                  borderRadius: 48,
                  width: 48,
                  height: 48,
                }}>
                <User />
              </View>
              <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500, marginLeft: 16}}>
                Swipe Potential Guests
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: lightGray2Color,
                  borderRadius: 48,
                  width: 48,
                  height: 48,
                }}>
                <Message />
              </View>
              <Text style={{color: whiteColor, fontSize: RFValue(16, 812), fontFamily: Satoshi500, marginLeft: 16}}>
                Communicate with Guests
              </Text>
            </View>
          </View>
          <Button onPress={handleContinue} title="Start Using Host Role" buttonStyle={{width: '100%', marginTop: 24}} />
          <Text style={{color: whiteColor, fontSize: RFValue(12, 812), fontFamily: Satoshi400, marginTop: 16, textAlign: 'center'}}>
            If you'd like to switch back to your previous role, you can either delete your account and re-register or reach out to support
            at support@invitedonly.app.
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalChangeAccountType;

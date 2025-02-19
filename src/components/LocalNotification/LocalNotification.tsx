import React from 'react';
import {View, Text, Image} from 'react-native';
import Toast, {BaseToast, ToastConfig, ToastConfigParams} from 'react-native-toast-message';

//import components
import useStyles from 'components/LocalNotification/styles.ts';

//import icons
import TickCircleIcon from 'assets/images/icons/tick-circle.svg';
import PendingClockIcon from 'assets/images/icons/pending-clock.svg';
import InfoCircleOrange from 'assets/images/icons/info-circle-orange.svg';
import InfoCircleGrey from 'assets/images/icons/info-circle-gray.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import XIcon from 'assets/images/icons/X.svg';
import IOImage from 'assets/images/app/IO.png';

//import images
import IconBackground from 'assets/images/app/bcon-background.png';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {INVITE_MATCH_STATUS, screenWidth} from 'constants/common';
import {useAppNavigation} from 'hooks/useAppNavigation';
import {
  chatCorrespondencePath,
  commonStackPath,
  eventActiveInfoPath,
  invitationCodePath,
  myEventsPath,
  requestsPath,
} from 'constants/pathLocations';
import {handleCreateChat} from 'helpers/chat';
import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';
import { showToast } from 'helpers/showToast';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';

const LocalNotification = () => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiMessagesCollection = Config.API_MESSAGES_COLLECTION || 'messages';
  const styles = useStyles();
  const navigation = useAppNavigation();
  const handlePress = async (path: string, params?: any) => {
    switch (path) {
      case 'invitationCode':
        navigation.navigate(commonStackPath, {screen: invitationCodePath});
        break;
      case 'chat':
        // @ts-ignore
        navigation.navigate(chatCorrespondencePath, {
          screen: chatCorrespondencePath,
          params,
        });
        break;
      case 'requests':
        // @ts-ignore
        navigation.navigate(requestsPath, {
          screen: requestsPath,
          params,
        });
        break;
      case 'myEvents':
        // @ts-ignore
        navigation.navigate(myEventsPath, {
          screen: myEventsPath,
          params,
        });
        break;
      case 'guestsList':
        // @ts-ignore
        navigation.navigate(commonStackPath, {
          screen: eventActiveInfoPath,
          params: {list: params},
        } as never);
        break;
      case 'chatCreate':
        // @ts-ignore
        try {
          await handleCreateChat(params);
          const querySnapshot = await firestore().collection(apiEventsCollection).doc(params.eventId).get();
          if (!querySnapshot.exists) {
            return;
          }
          const list = querySnapshot.data();
          const messageCollection = await firestore().collection(apiMessagesCollection).doc(list?.id).get();
          const activeEvent = messageCollection?.data()?.activeEvent;
          navigation.navigate(commonStackPath, {
            screen: chatCorrespondencePath,
            params: {
              image: params.userHostImageUri,
              title: params?.nameHost,
              online: true,
              messages: [],
              activeEvent: activeEvent,
              id: Math.floor(Math.random() * (99999 - 1 + 1)) + 1,
              superInvite: params?.superInvite,
              invitedStatus: INVITE_MATCH_STATUS,
              uid: params.uidGuest,
              hostUid: params.uidHost,
            },
          });
        } catch (error) {
          showToast('inviteMatch', 'An issue occurred while creating the chat and retrieving event data. Please try again later.', 'Error');
          logErrorToSentry(error)
        }
        break;
      default:
        break;
    }
  };
  const toastConfig: ToastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={styles.success}
        text1Style={styles.text1}
        text2Style={styles.text2}
        renderLeadingIcon={() => (
          <View style={styles.wrapperIcon}>
            <Image source={IconBackground} />
            <TickCircleIcon style={styles.icon} />
          </View>
        )}
      />
    ),
    pending: props => (
      <BaseToast
        {...props}
        style={styles.pending}
        text1Style={styles.text1}
        text2Style={styles.text2}
        renderLeadingIcon={() => (
          <View style={styles.wrapperIcon}>
            <Image source={IconBackground} />
            <PendingClockIcon style={styles.iconPending} />
          </View>
        )}
      />
    ),
    cancel: props => (
      <BaseToast
        {...props}
        style={styles.cancel}
        text1Style={styles.text1}
        text2Style={styles.text2}
        renderLeadingIcon={() => (
          <View style={styles.wrapperIcon}>
            <Image source={IconBackground} />
            <XIcon style={styles.iconCancel} />
          </View>
        )}
      />
    ),
    warning: props => (
      <BaseToast
        {...props}
        renderLeadingIcon={() => (
          <View style={styles.wrapperIcon}>
            <Image source={IconBackground} />
            <InfoCircleOrange style={styles.iconCancel} />
          </View>
        )}
        style={styles.warning}
        text1Style={styles.text1}
        text2Style={styles.text2}
      />
    ),
    warningGrey: props => (
      <BaseToast
        {...props}
        renderLeadingIcon={() => (
          <View style={styles.wrapperIcon}>
            <Image source={IconBackground} />
            <InfoCircleGrey style={styles.iconCancel} />
          </View>
        )}
        style={styles.warning}
        text1Style={styles.text1}
        text2Style={styles.text2}
      />
    ),
    customToast: ({text1, props}: ToastConfigParams<any>) => (
      <View style={styles.customToast}>
        <Text>{text1}</Text>
        <Text>
          {props} <ArrowRight />
        </Text>
      </View>
    ),
    inviteMatch: ({text1, text2, props}) => (
      <TouchableOpacity style={{width: screenWidth}} onPress={() => handlePress(props.path, props.params)}>
        <View style={{paddingHorizontal: 24, width: '100%'}}>
          <View style={{backgroundColor: whiteColor, padding: 16, borderRadius: 10, width: '100%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {props.ownerPhoto ? (
                <Image style={{height: 60, width: 60, borderRadius: 30}} source={{uri: props.ownerPhoto}} />
              ) : (
                <Image style={{height: 60, width: 60, borderRadius: 30}} source={IOImage} />
              )}
              <View style={{marginLeft: 16, flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      color: blackColor,
                      fontWeight: 'bold',
                      fontSize: RFValue(16, 812),
                      flex: 1,
                      flexWrap: 'wrap',
                      marginRight: 8,
                      fontFamily: Satoshi400,
                    }}>
                    {text1}
                  </Text>
                  {props.status && (
                    <View style={{borderRadius: 100, backgroundColor: blackColor}}>
                      <Text
                        style={{
                          fontSize: RFValue(12, 812),
                          color: whiteColor,
                          fontFamily: Satoshi500,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 100,
                        }}>
                        {props.status.toUpperCase()}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={{color: blackColor, marginTop: 6, fontSize: RFValue(16, 812), fontFamily: Satoshi400}}>{text2}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
  };

  return <Toast visibilityTime={5000} config={toastConfig} />;
};

export default LocalNotification;

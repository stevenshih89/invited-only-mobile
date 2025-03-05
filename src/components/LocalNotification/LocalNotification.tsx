import React from 'react';
import {Text, Image} from 'react-native';
import Toast, {BaseToast, ToastConfig, ToastConfigParams} from 'react-native-toast-message';

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
import {whiteColor, lightGray3Color} from 'constants/colors';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {INVITE_MATCH_STATUS} from 'constants/common';
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
import {showToast} from 'helpers/showToast';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import * as S from './LocalNotification.style';

const LocalNotification = () => {
  const apiEventsCollection = Config.API_EVENTS_COLLECTION || 'Events';
  const apiMessagesCollection = Config.API_MESSAGES_COLLECTION || 'messages';
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
          logErrorToSentry(error);
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
        style={{
          backgroundColor: lightGray3Color,
          borderLeftColor: lightGray3Color,
          alignSelf: 'center',
          marginRight: 0,
          height: 84,
          opacity: 0.94,
        }}
        text1Style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}
        text2Style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(16, 812), marginTop: 5}}
        renderLeadingIcon={() => (
          <S.WrapperIcon>
            <Image source={IconBackground} />
            <TickCircleIcon style={{position: 'absolute', left: 10, top: 10}} />
          </S.WrapperIcon>
        )}
      />
    ),
    pending: props => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: lightGray3Color,
          backgroundColor: lightGray3Color,
          alignSelf: 'center',
          marginRight: 0,
          height: 84,
          opacity: 0.94,
        }}
        text1Style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}
        text2Style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(16, 812), marginTop: 5}}
        renderLeadingIcon={() => (
          <S.WrapperIcon>
            <Image source={IconBackground} />
            <PendingClockIcon style={{position: 'absolute', left: 13.5, top: 13.5}} />
          </S.WrapperIcon>
        )}
      />
    ),
    cancel: props => (
      <BaseToast
        {...props}
        style={{
          borderWidth: 1,
          borderLeftColor: lightGray3Color,
          backgroundColor: lightGray3Color,
          alignSelf: 'center',
          marginRight: 0,
          height: 84,
          opacity: 0.94,
        }}
        text1Style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}
        text2Style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(16, 812), marginTop: 5}}
        renderLeadingIcon={() => (
          <S.WrapperIcon>
            <Image source={IconBackground} />
            <XIcon style={{position: 'absolute', left: 10.5, top: 10.5}} />
          </S.WrapperIcon>
        )}
      />
    ),
    warning: props => (
      <BaseToast
        {...props}
        renderLeadingIcon={() => (
          <S.WrapperIcon>
            <Image source={IconBackground} />
            <InfoCircleOrange style={{position: 'absolute', left: 10.5, top: 10.5}} />
          </S.WrapperIcon>
        )}
        style={{
          borderWidth: 1,
          borderLeftColor: lightGray3Color,
          backgroundColor: lightGray3Color,
          alignSelf: 'center',
          marginRight: 0,
          height: 84,
          opacity: 0.94,
        }}
        text1Style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}
        text2Style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(16, 812), marginTop: 5}}
      />
    ),
    warningGrey: props => (
      <BaseToast
        {...props}
        renderLeadingIcon={() => (
          <S.WrapperIcon>
            <Image source={IconBackground} />
            <InfoCircleGrey style={{position: 'absolute', left: 10.5, top: 10.5}} />
          </S.WrapperIcon>
        )}
        style={{
          borderWidth: 1,
          borderLeftColor: lightGray3Color,
          backgroundColor: lightGray3Color,
          alignSelf: 'center',
          marginRight: 0,
          height: 84,
          opacity: 0.94,
        }}
        text1Style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 812)}}
        text2Style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(16, 812), marginTop: 5}}
      />
    ),
    customToast: ({text1, props}: ToastConfigParams<any>) => (
      <S.CustomToast>
        <Text>{text1}</Text>
        <Text>
          {props} <ArrowRight />
        </Text>
      </S.CustomToast>
    ),
    inviteMatch: ({text1, text2, props}) => (
      <S.InviteMatchTouchableOpacity onPress={() => handlePress(props.path, props.params)}>
        <S.InviteMatchContainer>
          <S.InviteMatchInnerContainer>
            <S.InviteMatchRow>
              {props.ownerPhoto ? <S.InviteMatchImage source={{uri: props.ownerPhoto}} /> : <S.InviteMatchImage source={IOImage} />}
              <S.InviteMatchTextContainer>
                <S.InviteMatchTextRow>
                  <S.InviteMatchText>{text1}</S.InviteMatchText>
                  {props.status && (
                    <S.InviteMatchStatusContainer>
                      <S.InviteMatchStatusText>{props.status.toUpperCase()}</S.InviteMatchStatusText>
                    </S.InviteMatchStatusContainer>
                  )}
                </S.InviteMatchTextRow>
                <S.InviteMatchSubText>{text2}</S.InviteMatchSubText>
              </S.InviteMatchTextContainer>
            </S.InviteMatchRow>
          </S.InviteMatchInnerContainer>
        </S.InviteMatchContainer>
      </S.InviteMatchTouchableOpacity>
    ),
  };

  return <Toast visibilityTime={5000} config={toastConfig} />;
};

export default LocalNotification;

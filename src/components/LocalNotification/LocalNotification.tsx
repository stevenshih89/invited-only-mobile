import React, {useContext} from 'react';
import {Text, Image, View} from 'react-native';
import Toast, {BaseToast, ToastConfig, ToastConfigParams} from 'react-native-toast-message';

//import icons
import {RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import * as S from './LocalNotification.style';
import TickCircleIcon from 'assets/images/icons/tick-circle.svg';
import PendingClockIcon from 'assets/images/icons/pending-clock.svg';
import InfoCircleOrange from 'assets/images/icons/info-circle-orange.svg';
import InfoCircleGrey from 'assets/images/icons/info-circle-gray.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import XIcon from 'assets/images/icons/X.svg';
import IOImage from 'assets/images/app/IO.png';

//import images
import IconBackground from 'assets/images/app/bcon-background.png';
import {whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {INVITE_MATCH_STATUS, screenHeight} from 'constants/common';
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
import {showToast} from 'helpers/showToast';
import {logErrorToSentry} from 'helpers/logErrorsToSentry';
import {FirebaseCollectionsContext} from 'contexts/FirebaseCollectionNamesContext';

const LocalNotification = () => {
  const {events: apiEventsCollection, messages: apiMessagesCollection} = useContext(FirebaseCollectionsContext);
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
          showToast('basic', 'An issue occurred while creating the chat and retrieving event data. Please try again later.', 'Error');
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
          backgroundColor: '#1c1c1c',
          borderLeftColor: '#1c1c1c',
          alignSelf: 'center',
          marginRight: 0,
          height: 84,
          opacity: 0.94,
        }}
        text1Style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 932)}}
        text2Style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(16, 932), marginTop: 5}}
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
          borderLeftColor: '#1c1c1c',
          backgroundColor: '#1c1c1c',
          alignSelf: 'center',
          marginRight: 0,
          height: 84,
          opacity: 0.94,
        }}
        text1Style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 932)}}
        text2Style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(16, 932), marginTop: 5}}
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
          borderLeftColor: '#1c1c1c',
          backgroundColor: '#1c1c1c',
          alignSelf: 'center',
          marginRight: 0,
          height: 84,
          opacity: 0.94,
        }}
        text1Style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 932)}}
        text2Style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(16, 932), marginTop: 5}}
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
          borderLeftColor: '#1c1c1c',
          backgroundColor: '#1c1c1c',
          alignSelf: 'center',
          marginRight: 0,
          height: 84,
          opacity: 0.94,
        }}
        text1Style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 932)}}
        text2Style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(16, 932), marginTop: 5}}
      />
    ),
    basic: props => (
      <View
        style={{
          marginHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#1c1c1c',
          borderRadius: 18,
          paddingVertical: screenHeight / 60,
          paddingLeft: screenHeight / 60,
          paddingRight: 8,
          gap: 16,
        }}>
        <S.InviteMatchImage source={IOImage} />
        <View style={{flex: 1, justifyContent: 'center', gap: 4}}>
          {props.text1 && (
            <Text
              style={{
                color: whiteColor,
                fontFamily: Satoshi500,
                fontSize: RFValue(18, 932),
                lineHeight: RFValue(21, 932),
              }}>
              {props.text1}
            </Text>
          )}
          {props.text2 && (
            <Text
              style={{
                color: whiteColor,
                fontFamily: Satoshi400,
                fontSize: RFValue(14, 932),
                lineHeight: RFValue(21, 932),
              }}>
              {props.text2}
            </Text>
          )}
        </View>
      </View>
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
          borderLeftColor: '#1c1c1c',
          backgroundColor: '#1c1c1c',
          alignSelf: 'center',
          marginRight: 0,
          height: 84,
          opacity: 0.94,
        }}
        text1Style={{color: whiteColor, fontFamily: Satoshi700, fontSize: RFValue(16, 932)}}
        text2Style={{color: whiteColor, fontFamily: Satoshi500, fontSize: RFValue(16, 932), marginTop: 5}}
      />
    ),
    customToast: ({text1, props}: ToastConfigParams<any>) => (
      <S.CustomToast testID="custom-toast">
        <Text>{text1}</Text>
        <Text>
          {props} <ArrowRight />
        </Text>
      </S.CustomToast>
    ),
    inviteMatch: ({text1, text2, props}) => (
      <S.InviteMatchTouchableOpacity testID="invite-match-toast" onPress={() => handlePress(props.path, props.params)}>
        <S.InviteMatchContainer>
          <S.InviteMatchInnerContainer>
            <S.InviteMatchRow>
              {props.ownerPhoto ? <S.InviteMatchImage source={{uri: props.ownerPhoto}} /> : <S.InviteMatchImage source={IOImage} />}
              <S.InviteMatchTextContainer>
                <S.InviteMatchTextRow>
                  <S.InviteMatchText>{text1}</S.InviteMatchText>
                </S.InviteMatchTextRow>
                <S.InviteMatchSubText>{text2}</S.InviteMatchSubText>
              </S.InviteMatchTextContainer>
            </S.InviteMatchRow>
          </S.InviteMatchInnerContainer>
        </S.InviteMatchContainer>
      </S.InviteMatchTouchableOpacity>
    ),
    withImage: ({text1, text2, props}) => (
      <View
        style={{
          marginHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#1c1c1c',
          borderRadius: 18,
          paddingVertical: screenHeight / 60,
          paddingLeft: screenHeight / 60,
          paddingRight: 8,
          gap: 16,
        }}>
        {props.image ? <S.InviteMatchImage source={{uri: props.image}} /> : <S.InviteMatchImage source={IOImage} />}
        <View style={{flex: 1, justifyContent: 'center', gap: 4}}>
          {text1 && (
            <Text
              style={{
                color: whiteColor,
                fontFamily: Satoshi500,
                fontSize: RFValue(18, 932),
                lineHeight: RFValue(21, 932),
              }}>
              {text1}
            </Text>
          )}
          {text2 && (
            <Text
              style={{
                color: whiteColor,
                fontFamily: Satoshi400,
                fontSize: RFValue(14, 932),
                lineHeight: RFValue(21, 932),
              }}>
              {text2}
            </Text>
          )}
        </View>
      </View>
    ),
  };

  return <Toast visibilityTime={5000} config={toastConfig} />;
};

export default LocalNotification;

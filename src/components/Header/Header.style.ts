import styled from 'styled-components/native';
import {blackColor, lightGray2Color, lightGray5Color, lightRedColor, transparent60Color, whiteColor} from 'constants/colors';
import {Satoshi500, Satoshi700, Satoshi400} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight, screenWidth} from 'constants/common';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  background-color: ${blackColor};
  padding-horizontal: ${screenWidth / 15.5}px;
`;

export const OverlayContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${transparent60Color};
  z-index: 1000;
`;

export const WrapperHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const WrapperHeaderJoinEvent = styled.View`
  flex-direction: row;
  margin-vertical: ${screenHeight / 50}px;
`;

export const EventView = styled.View`
  width: 55px;
  height: 55px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${lightGray5Color};
  border-radius: 50px;
`;

export const JoinEventActive = styled.View`
  border-radius: 50px;
  border-width: 1px;
  border-style: solid;
  justify-content: center;
  align-items: center;
  padding: 3px;
  width: 55px;
  height: 55px;
`;

export const JoinEventView = styled.View`
  width: 55px;
  height: 55px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${whiteColor};
  border-radius: 50px;
`;

export const EventTitleText = styled.Text`
  margin-top: ${screenHeight / 190}px;
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(13, 812)}px;
  text-align: center;
`;

export const EventViewFlatList = styled.View`
  padding: 3px;
  border-width: 1px;
  border-color: ${lightGray5Color};
  border-radius: 50px;
`;

export const EventSpecialWrapper = styled.View<{borderColor: string}>`
  border-radius: 50px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({borderColor}: {borderColor: string}) => borderColor};
  padding: 3px;
  width: 55px;
  height: 55px;
`;

export const EventButton = styled.TouchableOpacity`
  align-items: center;
  margin-right: ${screenWidth / 27}px;
`;

export const JoinEventButton = styled.TouchableOpacity`
  align-items: center;
  margin-right: ${screenWidth / 27}px;
`;

export const EventFastImage = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;

export const RequestsFlatList = styled.FlatList`
  margin-top: ${screenHeight / 50}px;
  margin-bottom: 25px;
`;

export const ImageEvent = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export const ImageEventsJoining = styled.View`
  width: 55px;
  height: 55px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const AddEventButton = styled.TouchableOpacity`
  align-items: center;
`;

export const AddEventView = styled.View`
  padding: 10px;
  border-width: 1px;
  border-color: ${lightGray5Color};
  border-radius: 50px;
  margin-left: ${screenWidth / 25}px;
`;

export const WrapperHeaderButton = styled.View`
  margin-vertical: ${screenHeight / 50}px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const WrapperHeaderButtonMyEvents = styled.View`
  margin-top: ${screenHeight / 43}px;
  margin-bottom: ${screenHeight / 30}px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const WrapperHeaderButtonsChat = styled.View`
  justify-content: flex-start;
  align-items: center;
`;

export const RowButtonsChat = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 18px;
`;

export const ButtonMyEvents = styled.TouchableOpacity`
  background-color: ${whiteColor};
  padding-vertical: ${screenWidth / 60}px;
  padding-horizontal: ${screenHeight / 70}px;
  border-radius: 8px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextMyEvents = styled.Text`
  color: ${blackColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 812)}px;
`;

export const ButtonEventsJoining = styled.TouchableOpacity`
  background-color: ${lightGray2Color};
  padding-vertical: ${screenHeight / 130}px;
  padding-horizontal: ${screenWidth / 32}px;
  border-radius: 8px;
  margin-left: ${screenWidth / 65}px;
  flex-direction: row;
  justify-content: center;
  flex: 1;
`;

export const TextEventsJoining = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 812)}px;
`;

export const RowTextCountEvents = styled.View`
  border-radius: 35px;
  background-color: ${lightRedColor};
  margin-left: 4px;
`;

export const TextCountEvents = styled.Text`
  color: ${whiteColor};
  padding-vertical: 2px;
  padding-horizontal: 5px;
`;

export const TextButton = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(13, 812)}px;
  margin-top: ${screenHeight / 190}px;
`;

export const NumberPeopleOnEvent = styled.View`
  padding-vertical: 8px;
  padding-horizontal: 12px;
  background-color: ${lightGray2Color};
  border-radius: 10px;
  margin-top: ${screenHeight / 100}px;
  flex-direction: row;
  align-items: center;
`;

export const TextNumberPeopleOnEvent = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(12, 812)}px;
  margin-left: 4px;
`;

export const BadgeStyle = styled.View`
  position: absolute;
  border-color: ${lightRedColor};
  bottom: -4px;
  right: 0;
  background-color: ${lightRedColor};
`;

export const BadgeStyleEvent = styled.View`
  position: absolute;
  border-color: ${blackColor};
  border-width: 1px;
  bottom: -4px;
  right: 0;
  background-color: ${lightRedColor};
`;

export const BadgeText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
`;

export const IOInvitationsText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 812)}px;
  text-decoration-line: underline;
`;

export const ScrollViewHorizontal = styled.ScrollView`
  flex-direction: row;
  margin-vertical: ${screenHeight / 50}px;
`;

export const EventTitleWrapper = styled.View`
  max-width: ${screenWidth / 5}px;
  overflow: hidden;
`;

export const EventIconWrapper = styled.View<{borderColor: string}>`
  border-radius: 50px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({borderColor}: {borderColor: string}) => borderColor};
  padding: 3px;
  width: 63px;
  height: 63px;
  justify-content: center;
  align-items: center;
`;

export const EventText = styled.Text`
  margin-top: ${screenHeight / 190}px;
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(13, 812)}px;
  text-align: center;
`;

export const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EarlyAccessButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const NotificationButton = styled.TouchableOpacity`
  padding-right: 6px;
`;

export const SettingsButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

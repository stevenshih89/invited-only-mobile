import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { 
  blackColor, 
  whiteColor, 
  lightGray2Color, 
  lightGray5Color, 
  lightRedColor, 
  lightGray20Color,
  lightGreenColor,
  lightGray13Color
} from 'constants/colors';
import { screenWidth, screenHeight } from 'constants/common';
import { Satoshi400, Satoshi500, Satoshi700 } from 'constants/fonts';

export const Container = styled.View`
  background-color: ${blackColor};
  flex: 1;
`;

export const WrapperHeaderButtonMyEvents = styled.View`
  margin-top: ${screenHeight / 43}px;
  margin-bottom: ${screenHeight / 30}px;
  align-items: center;
  flex-direction: row;
`;

export const EventButton = styled.TouchableOpacity`
  align-items: center;
  margin-right: ${screenWidth / 27}px;
`;

export const TextMyEvents = styled.Text`
  color: ${blackColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 812)}px;
`;

export const TextEventsJoining = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 812)}px;
`;

export const ButtonEventsJoining = styled.TouchableOpacity`
  background-color: ${lightGray2Color};
  padding-vertical: ${screenHeight / 130}px;
  padding-horizontal: ${screenWidth / 32}px;
  border-radius: 8px;
  margin-left: ${screenWidth / 65}px;
  flex-direction: row;
`;

export const ButtonMyEvents = styled.TouchableOpacity`
  background-color: ${whiteColor};
  padding-vertical: ${screenWidth / 60}px;
  padding-horizontal: ${screenHeight / 70}px;
  border-radius: 8px;
`;

export const RowTextCountEvents = styled.View`
  border-radius: 35px;
  background-color: ${lightRedColor};
  margin-left: 4px;
`;

export const AddEventButton = styled.TouchableOpacity`
  align-items: center;
`;

export const TextCountEvents = styled.Text`
  color: ${whiteColor};
  padding-vertical: 2px;
  padding-horizontal: 5px;
`;

export const AddEventView = styled.View`
  padding: 10px;
  border-width: 1px;
  border-color: ${lightGray5Color};
  border-radius: 50px;
  margin-left: ${screenWidth / 25}px;
`;

export const ManageEventButton = styled.TouchableOpacity`
  height: 65px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background-color: ${lightGray20Color};
  margin-top: 25px;
`;

export const ManageEventButtonText = styled.Text`
  color: ${blackColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(16, 812)}px;
`;

export const ButtonEvent = styled.TouchableOpacity`
  height: 65px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background-color: ${lightGray20Color};
  margin-top: 25px;
`;

export const InnerButtonText = styled.Text`
  color: ${blackColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(16, 812)}px;
`;

export const OnlineStatus = styled.View`
  position: absolute;
  bottom: 2px;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  border-width: 1.25px;
  border-color: ${blackColor};
  background-color: ${lightGreenColor};
`;

export const WrapperAccountType = styled.View`
  background-color: ${blackColor};
  border-radius: 5px;
  padding-horizontal: 12px;
  padding-vertical: 2px;
  align-self: flex-start;
  border-width: 1px;
  border-color: ${whiteColor};
`;

export const AccountTypeTextStyled = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(10, 812)}px;
  font-family: ${Satoshi700};
  text-transform: capitalize;
`;

export const GradientContainer = styled(LinearGradient)`
  margin-left: 6px;
  align-self: flex-start;
  border-radius: 4px;
  padding-horizontal: 12px;
  padding-vertical: 2px;
  background-color: ${blackColor};
`;

export const GradientContainerTextStyled = styled.Text`
  color: ${blackColor};
  font-size: ${RFValue(10, 812)}px;
  font-family: ${Satoshi700};
`;

export const WrapperUserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const UserInfoStyledText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(16, 812)}px;
  margin-top: 4px;
`;

export const UserInfoAgeStyledText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(13, 812)}px;
  margin-top: 5px;
`;

export const WrapperLoadingEvent = styled.View`
  flex: 1;
  background-color: ${blackColor};
  justify-content: center;
  align-items: center;
  padding-top: ${screenHeight / 9}px;
`;

export const WrapperButtonCreateEvent = styled.TouchableOpacity`
  padding-vertical: ${screenWidth / 60}px;
  padding-horizontal: ${screenHeight / 70}px;
  border-radius: 8px;
  flex: 1;
  align-items: center;
  margin-left: 10px;
  border-width: 1px;
  border-color: ${lightGray13Color};
  flex-direction: row;
  justify-content: center;
`;

export const ButtonCreateEventTextStyle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 812)}px;
  margin-left: 10px;
`;

export const StyledTextLarge = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(48, 812)}px;
  margin-bottom: 18px;
`;

export const StyledTextSecondary = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 812)}px;
  opacity: 0.8;
  margin-bottom: 34px;
`;

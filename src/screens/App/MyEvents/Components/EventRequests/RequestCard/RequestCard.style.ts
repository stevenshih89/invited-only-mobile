import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { screenWidth } from "constants/common";
import { blackColor, whiteColor } from "constants/colors";
import Reject from 'src/assets/images/icons/reject.svg';
import { Satoshi500 } from "constants/fonts";
import Invite from 'src/assets/images/icons/Invite.svg';


export const Container = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${screenWidth * 0.4};
  aspect-ratio: ${10 / 17}; /* Adjusted for taller card */
  background-color: ${blackColor};
  margin-vertical: 8px;
  margin-horizontal: 16px;
`;

export const GuestNameText = styled.Text`
  color: ${whiteColor};
  font-size: 16px;
  font-weight: 600;
`;
export const GuestNameAgeText = styled.Text`
  color: ${whiteColor};
  font-size: 12px;
  font-weight: 400;
  opacity: 0.6;
`;
export const ContentContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  height: 30%;
`;

export const BottomContainer = styled.View`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NameAndAgeContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 50px;
  justify-content: center;
  gap: 10px;
  align-items: center;
  padding-bottom: 10px;
`;
export const RejectIcon = styled(Reject)`
  color: ${blackColor};
  opacity: 1;
`;

export const InviteButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;


  overflow: hidden;
  padding-left: 15px;
  padding-right: 5px;
  border-radius: 100px;
  background-color: ${blackColor};
  opacity: 0.8;
`;

export const InviteIcon = styled(Invite)`

`;


export const InviteButton = styled.TouchableOpacity`
  width: 66px;
  height: 36px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
  padding-right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const InviteButtonText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Satoshi500};
`;
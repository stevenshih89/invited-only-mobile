import {black1Color, blackColor, whiteColor} from 'constants/colors';
import styled from 'styled-components/native';
import Reject from 'src/assets/images/icons/reject.svg';
import SuperInvite from 'src/assets/images/icons/super-invite.svg';
import Invite from 'src/assets/images/icons/Invite.svg';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi500} from 'constants/fonts';

export const EventNameAndDate = styled.View`
  display: flex;

  align-items: center;
  justify-content: baseline;
  gap: 10px;
  margin-bottom: 5px;
`;

export const CardContent = styled.View`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 3;
`;

export const CardName = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(32, 932)}px;
  font-family: ${Satoshi500};

  text-align: center;
`;

export const CardGuestAge = styled.Text`
  color: ${whiteColor};
  opacity: 0.6;
  font-size: ${RFValue(32, 932)}px;
  font-family: ${Satoshi500};

  text-align: center;
`;

export const RejectIcon = styled(Reject)`
  color: ${blackColor};
  opacity: 1;
`;

export const SuperInviteIcon = styled(SuperInvite)`
  color: ${blackColor};
  opacity: 1;
  /* Force full opacity on the SVG and its children */
  & * {
    opacity: 1;
  }
`;
export const InviteIcon = styled(Invite)`
  color: ${blackColor};
  opacity: 1;
  /* Force full opacity on the SVG and its children */
  & * {
    opacity: 1;
  }
`;

export const RejectButton = styled.TouchableOpacity`
  width: 92px;
  height: 40px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
  gap: 10px;

  background-color: rgba(255, 255, 255, 0.05);
`;

export const RejectButtonText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Satoshi500};
`;

export const SuperInviteButton = styled.TouchableOpacity`
  width: 127px;
  height: 40px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  display: flex;
  gap: 10px;
  background-color: ${whiteColor};
`;

export const SuperInviteButtonText = styled.Text`
  color: ${black1Color};
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Satoshi500};
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  width: 100%;
`;

export const InviteButton = styled.TouchableOpacity`
  width: 86px;
  height: 40px;
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

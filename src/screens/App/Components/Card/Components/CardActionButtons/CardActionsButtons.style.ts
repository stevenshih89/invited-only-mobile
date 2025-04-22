import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Reject from 'src/assets/images/icons/reject.svg';
import SuperInvite from 'src/assets/images/icons/super-invite.svg';
import Invite from 'src/assets/images/icons/Invite.svg';
import { blackColor, whiteColor } from 'constants/colors';
import { Satoshi500 } from 'constants/fonts';

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
  color: ${blackColor};
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
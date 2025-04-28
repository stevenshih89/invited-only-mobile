import styled from 'styled-components/native';

import { Dimensions } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import CloseIcon from 'src/assets/images/icons/close.svg';
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import { blackColor } from 'constants/colors';
import ContinueInvitingIcon from 'src/assets/images/icons/cuppon-fill.svg';
import SendMessageIcon from 'src/assets/images/icons/message-fill.svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface ModalContentProps {
  width: number;
  height: number;
}

export const ModalBackdrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  
`;

export const CloseButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  background-color: rgba(26, 26, 26, 1);
  padding: 10px;
  border-radius: 40px;
  position: absolute; 
  top: 50px; 
  right: 20px; 
  z-index: 10; /* Ensure it's above content */
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View<ModalContentProps>`
  width: ${windowWidth}px; 
  height: ${windowHeight}px;
  background-color: black;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;

`;

export const MatchTextContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MatchTextTitle = styled.Text`
  color: white;
  font-family: ${Satoshi500};
  font-size: 36px;
`;

export const MatchTextDescription = styled.Text`
  color: #808080;
  font-family: ${Satoshi400};
  font-size: 16px;
`;

export const StyleCloseIcon = styled(CloseIcon)`
  height: 20px;
  width: 20px;
`;

export const GuestInfoContainer = styled.View`
  width: 100%;
  height: 20%;
  position: absolute;
  bottom: 0;
  flex: 1;  
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const GuestName = styled.Text`
  padding-top: 10px;
  color: white;
  font-family: ${Satoshi500};
  font-size: 20px;
`;

export const GuestAge = styled.Text`
  color: #808080;
  font-family: ${Satoshi400};
  font-size: 16px;
`;

export const CardsContainer = styled.View`
  width: 90%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CardContainer = styled.View` 
  width: 70%;
  height: 100%;
`;

export const ButtonContainer = styled.View`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;



export const SendMessageButton = styled.TouchableOpacity`
  width: 45%;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  gap: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 30px;
`;

export const SendMessageButtonText = styled.Text`
  color: ${blackColor}
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  gap: 10px;
  align-items: center;
  background-color: #1A1A1A;
  border-radius: 30px;
`;

export const ContinueButtonText = styled.Text`
  color: white;
  font-family: ${Satoshi500};
  font-size: 14px;
`;


export const StyledContinueInvitingIcon = styled(ContinueInvitingIcon)`
  height: 20px;
  width: 20px;
`;

export const StyledSendMessageIconContainer = styled.View`
  height: 30px;
  width: 30px;
  background-color: black;
  border-radius: 20px;
  display: flex;
  padding-right: 1px;
  justify-content: center;
  align-items: center;
`;
export const StyledSendMessageIcon = styled(SendMessageIcon)`
  height: 20px;
  width: 20px;
  background-color: black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledContinueInvitingIconContainer = styled.View`
  height: 30px;
  width: 30px;
  background-color: black;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

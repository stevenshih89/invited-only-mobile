import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { blackColor, whiteColor } from 'constants/colors.ts';
import { Satoshi400, Satoshi500 } from 'constants/fonts.ts';
import { screenHeight, screenWidth } from 'constants/common.ts';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${blackColor};
`;

export const LoadingContainer = styled.View`
  height: 370px;
  margin-top: ${screenHeight / 26}px;
`;

export const MessageContainer = styled.View``;

export const MessageText = styled.Text`
  color: ${whiteColor};
  text-align: center;
  font-size: ${RFValue(18, 812)}px;
  font-family: ${Satoshi500};
`;

export const ButtonContainer = styled.View`
  padding-horizontal: 24px;
  margin-top: auto;
  margin-bottom: ${screenHeight / 14}px;
`;

export const OuterContainer = styled.View`
  flex: 1;
  background-color: ${blackColor};
  padding-bottom: ${screenHeight / 10}px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;

`;


export const CardsSwipeImage = styled.Image`
  resize-mode: contain;
`;

export const CreateEventContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CreateEventTitle = styled.Text`
  color: ${whiteColor};
  width: ${screenWidth / 1.5}px;
  font-size: ${RFValue(30, 932)}px;
  font-family: ${Satoshi500};
  text-align: center;

`;


export const WelcomeDescription = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  width: ${screenWidth / 1.6}px;
  color: ${whiteColor};
  text-align: center;
  margin-top: ${screenHeight / 50}px;
`;

export const InvitationLink = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 812)}px;
  text-decoration-line: underline;
`;

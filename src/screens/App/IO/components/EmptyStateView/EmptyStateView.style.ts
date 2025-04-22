import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { blackColor, whiteColor } from 'constants/colors.ts';
import { Satoshi400, Satoshi500, Satoshi700 } from 'constants/fonts.ts';
import { screenHeight } from 'constants/common.ts';

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

export const GuestContainer = styled.View`
  flex: 1;
  background-color: ${blackColor};
  padding-horizontal: 24px;
`;

export const WelcomeContainer = styled.View`
  position: absolute;
  top: ${screenHeight / 2.2}px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WelcomeTitle = styled.Text`
  color: ${whiteColor};
  font-weight: 700;
  font-size: ${RFValue(22, 932)}px;
  letter-spacing: 22px;
  font-family: ${Satoshi500};
  text-align: center;
  margin-right: -22px;
`;

export const WelcomeSubtitle = styled.Text`
  font-family: ${Satoshi700};
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
  margin-top: ${screenHeight / 50}px;
`;

export const WelcomeDescription = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
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

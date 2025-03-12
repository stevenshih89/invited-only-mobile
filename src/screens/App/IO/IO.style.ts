import { blackColor, lightGreenColor, transparentWhite16Color, transparentWhite56Color, whiteColor } from 'constants/colors';
import { screenHeight } from 'constants/common';
import { Satoshi400, Satoshi700 } from 'constants/fonts';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const CustomButton = styled.TouchableOpacity`
  height: 65px;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background-color: ${blackColor};
  margin-top: 25px;
`;

export const EventInfoTitle = styled.Text`
  margin-top: 14px;
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(16, 812)}px;
`;

export const EventInfoText = styled.Text`
  margin-top: 6px;
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 812)}px;
`;

export const BorderLineInfoTitle = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${transparentWhite16Color};
  margin-top: 14px;
`;

export const ReportContainer = styled.View`
  margin-bottom: ${screenHeight / 40}px;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: ${transparentWhite16Color};
  padding-top: ${screenHeight / 40}px;
`;

export const EventImages = styled(FastImage)`
  width: 100%;
  height: ${screenHeight / 4}px;
  margin-vertical: 10px;
  border-radius: 20px;
`;

export const StatusIndicator = styled.View`
  width: 11px;
  height: 11px;
  border-radius: 11px;
  background-color: ${lightGreenColor};
  border-width: 1.25px;
  border-color: ${blackColor};
  position: absolute;
  bottom: 3px;
  right: 0px;
`;

export const AccountTypeContainer = styled.View`
  border-radius: 4px;
  border-color: ${whiteColor};
  border-width: 1px;
  border-style: solid;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  padding-horizontal: 6px;
  padding-vertical: 2px;
`;

export const AccountTypeText = styled.Text`
  color: ${whiteColor};
  text-transform: capitalize;
  font-family: Satoshi700;
  font-size: ${RFValue(10, 812)}px;
`;

export const PremiumGradient = styled(LinearGradient)`
  margin-left: 6px;
  align-self: flex-start;
  border-radius: 4px;
  padding-horizontal: 12px;
  padding-vertical: 2px;
  background-color: ${blackColor};
`;

export const TextPremium = styled.Text`
  color: ${blackColor};
  font-size: ${RFValue(10, 812)}px;
  font-family: ${Satoshi700};
`;

export const NameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const UserInfoText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(14, 812)}px;
  margin-right: 6px;
`;

export const BorderButton = styled.View`
  background-color: ${transparentWhite56Color};
  width: 100%;
  height: 100%;
  border-radius: 50px;
  position: absolute;
`;

export const ButtonBottom = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${blackColor};
  border-radius: 50px;
  z-index: 10;
  justify-content: center;
  align-items: center;
`;

export const AnimatedContainer = styled(Animated.View)`
  width: 100%;
  height: 100%;
  background-color: ${blackColor};
  border-radius: 50px;
  z-index: 10;
  justify-content: center;
  position: absolute;
  align-items: center;
`;

export const CounterSuperJoinInvite = styled.Text`
  color: ${whiteColor};
  font-size: 24px;
  font-weight: 500;
  transform: rotateY(180deg);
`;

export const InterestsContainer = styled.View`
  border-top-width: 1px;
  border-style: solid;
  border-top-color: ${transparentWhite16Color};
  margin-top: ${screenHeight / 44}px;
  padding-top: ${screenHeight / 44}px;
`;

export const DemoReportContainer = styled.View`
  border-top-width: 1px;
  border-style: solid;
  border-top-color: ${transparentWhite16Color};
  padding-top: ${screenHeight / 34}px;
  margin-top: 10px;
  margin-bottom: ${screenHeight / 40}px;
`;


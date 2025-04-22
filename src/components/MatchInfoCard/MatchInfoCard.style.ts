import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {black4Color, blackColor, lightGreenColor, whiteColor} from 'constants/colors';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {screenHeight, screenWidth} from 'constants/common';

export const EventImage = styled(FastImage)`
  width: ${screenWidth * 0.53}px;
  height: ${screenHeight * 0.42}px;
  border-radius: 22px;
`;

export const OverlayGradient = styled(LinearGradient).attrs({
  colors: ['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)'],
})`
  position: absolute;
  bottom: 68px;
  left: 0;
  right: 0;
  height: 40px;
  z-index: 1;
`;

export const OnlineIndicator = styled.View`
  position: absolute;
  bottom: 2px;
  right: 0;
  width: 7px;
  height: 7px;
  border-radius: 7px;
  border-width: 1.25px;
  border-color: ${blackColor};
  background-color: ${lightGreenColor};
`;

export const BadgeContainer = styled.View`
  background-color: ${blackColor};
  border-radius: 3px;
  padding: 2px 6px;
  align-self: flex-start;
`;

export const BadgeText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(6, 812)}px;
  font-family: ${Satoshi700};
  text-transform: capitalize;
`;

export const PremiumGradient = styled(LinearGradient).attrs({
  colors: ['#977B4A', '#E5D291', '#A28453'],
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
})`
  margin-left: 6px;
  aligns-self: flex-start;
  border-radius: 3px;
  padding: 2px 6px;
  backgroundcolor: ${blackColor};
`;
export const TextPremium = styled.Text`
  color: ${blackColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(6, 812)}px;
`;

export const UserInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const NameText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(12, 812)}px;
`;

export const AgeText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(12, 812)}px;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
  margin-bottom: 40px;
`;

export const FooterText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(20, 812)}px;
`;

export const DetailsContainer = styled.View`
  height: 68px;
  width: 100%;
  background-color: ${whiteColor};
  padding: 8px 10px;
  justify-content: space-between;
`;

export const GuestInfoContainer = styled.View`
  border-width: 1px;
  border-color: ${blackColor};
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
`;

export const JoinEventsText = styled.Text`
  font-size: ${RFValue(10, 812)}px;
  color: ${black4Color};
  font-family: ${Satoshi500};
  margin-left: 5px;
  margin-right: 10px;
`;

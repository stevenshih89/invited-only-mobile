import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, View, ImageBackground} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {BlurView} from '@react-native-community/blur';
import {backgroundGradientColors, whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';
import {Satoshi400, Satoshi500} from 'constants/fonts';

export const BadgeContainer = styled(View)`
  position: absolute;
  top: -20px;
  align-self: center;
`;

export const BadgeContent = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  gap: 8px;
`;

export const BadgeBlur = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  overflow: hidden;
`;

export const BadgeText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(20, 932)}px;
`;

export const Background = styled(LinearGradient).attrs({
  colors: backgroundGradientColors,
  start: {x: 0, y: 1},
  end: {x: 0, y: 0},
})`
  flex: 1;
`;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

export const Container = styled(View)`
  flex: 1;
  padding-horizontal: 24px;
`;

export const LogoWrapper = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const PhotoWrapper = styled(ImageBackground).attrs({
  imageStyle: {borderRadius: 16},
})`
  width: 100%;
  height: ${screenHeight / 2.2}px;
  position: relative;
  margin-top: ${screenHeight / 10}px;
  border-radius: 16px;
`;

export const NameWrapper = styled(View)`
  position: absolute;
  bottom: 16px;
  left: 16px;
  flex-direction: row;
  align-items: center;
`;

export const NameText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(28, 932)}px;
  color: ${whiteColor};
`;

export const AgeText = styled.Text`
  margin-left: 6px;
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  opacity: 0.6;
`;

export const GradientOverlay = styled(LinearGradient).attrs({
  colors: ['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.8)'],
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 60%;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const NameOverlay = styled(View)`
  margin-top: auto;
  align-self: center;
  margin-bottom: 12px;
  z-index: 1;
`;

export const MessageWrapper = styled(View)`
  margin-vertical: auto;
  gap: 8px;
`;

export const MessageTitle = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  color: ${whiteColor};
`;

export const MessageSubtitle = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
  opacity: 0.8;
  margin-top: 8px;
`;

export const ButtonWrapper = styled(View)`
  margin-top: auto;
  margin-bottom: 32px;
`;

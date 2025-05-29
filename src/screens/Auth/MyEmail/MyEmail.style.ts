import styled from 'styled-components/native';
import { KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, View, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { isIos, screenHeight } from 'constants/common';
import { backgroundGradientColors, transparentWhite30Color, whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

export const GradientBackground = styled(LinearGradient).attrs({
  colors: backgroundGradientColors,
  start: { x: 0, y: 1 },
  end: { x: 0, y: 0 },
})`
  flex: 1;
`;

export const AvoidingContainer = styled(KeyboardAvoidingView).attrs({
  behavior: isIos ? 'padding' : 'height',
  keyboardVerticalOffset: 15,
})`
  flex: 1;
  padding-bottom: 0px;
`;

export const TouchableDismiss = styled(TouchableWithoutFeedback)``;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  padding-bottom: 0px;
`;

export const Wrapper = styled(View)`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 0px;
  padding-horizontal: 24px;
  padding-top: ${screenHeight / 29}px;
`;

export const Header = styled(View)`
  align-items: center;
`;

export const TopRow = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
})`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${transparentWhite30Color};
`;

export const TitleContainer = styled(View)`
  width: 100%;
  margin-bottom: ${screenHeight / 30}px;
  margin-top: ${screenHeight / 20}px;
`;

export const Title = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(48, 932)}px;
  margin-bottom: 18px;
`;

export const Subtitle = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  opacity: 0.8;
`;

export const InputContainer = styled(View)`
  width: 100%;
`;

export const ContinueButtonContainer = styled(View)`
  margin-bottom: 4px;
`;

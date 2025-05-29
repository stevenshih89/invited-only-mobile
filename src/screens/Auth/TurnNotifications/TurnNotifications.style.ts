import styled from 'styled-components/native';
import {KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, View, TouchableOpacity, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Switch} from '@rneui/themed';
import {isIos, screenHeight} from 'constants/common';
import {black1Color, transparentWhite30Color} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
// Container respecting keyboard and background
export const AvoidingContainer = styled(KeyboardAvoidingView).attrs({
  behavior: isIos ? 'padding' : 'height',
  keyboardVerticalOffset: 15,
})`
  flex: 1;
  padding-bottom: 0px;
  background-color: ${black1Color};
`;

// Dismiss keyboard area
export const TouchableDismiss = styled(TouchableWithoutFeedback)``;

// Safe area wrapper
export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  padding-bottom: 0px;
`;

// Main content wrapper
export const Wrapper = styled(View)`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 0px;
  padding-horizontal: 20px;
  padding-top: ${screenHeight / 29}px;
`;

// Row for back button, logo, progress
export const Row = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

// Back button styling
export const BackButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
  hitSlop: {top: 20, bottom: 20, left: 20, right: 20},
})`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${transparentWhite30Color};
`;

// Title wrapper
export const TitleWrapper = styled(View)`
  margin-bottom: ${screenHeight / 30}px;
  margin-top: ${screenHeight / 20}px;
`;

export const Title = styled(Text)`
  color: white;
  font-size: ${RFValue(32, 932)}px;
  font-family: ${Satoshi500};
  margin-bottom: 16px;
`;

export const Subtitle = styled(Text)`
  color: white;
  font-size: ${RFValue(18, 932)}px;
  font-family: ${Satoshi400};
  opacity: 0.8;
`;

// Toggle switch row
export const ToggleRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #0f0f0f;
  padding: 16px;
  border-radius: 100px;
`;

export const ToggleLabel = styled(Text)`
  color: white;
  font-size: ${RFValue(18, 932)}px;
  font-family: ${Satoshi400};
`;

// Bottom button container
export const ButtonContainer = styled(View)`
  margin-top: auto;
  margin-bottom: 4px;
  gap: 16px;
`;

export const SkipButton = styled(TouchableOpacity)`
  padding-vertical: 16px;
  align-items: center;
  margin-top: 4px;
`;

export const SkipText = styled(Text)`
  color: white;
  font-size: ${RFValue(20, 932)}px;
  font-weight: 500;
`;

export const StyledSwitch = styled(Switch)`
  transform: scale(0.7);
`;

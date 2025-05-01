import styled from 'styled-components/native';
import {FlatList, TouchableOpacity, View, Text, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {backgroundGradientColors, transparentWhite30Color, whiteColor, lightGray3Color, lightGray4Color} from 'constants/colors';
import {screenHeight} from 'constants/common';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';

// Root gradient background
export const GradientBackground = styled(LinearGradient).attrs({
  colors: backgroundGradientColors,
  start: {x: 0, y: 1},
  end: {x: 0, y: 0},
})`
  flex: 1;
`;

// Safe area
export const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

// Main container
export const Container = styled(View)`
  flex: 1;
  padding-horizontal: 24px;
`;

// Header row
export const HeaderRow = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-top: ${screenHeight / 29}px;
`;

// Back button
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

// Spacer to align logo
export const Spacer = styled(View)`
  width: 40px;
`;

// Title section
export const TitleSection = styled(View)<{hasScreen: boolean}>`
  margin-bottom: ${screenHeight / 30}px;
  margin-top: ${(props: {hasScreen: boolean}) => (props.hasScreen ? screenHeight / 11.5 : screenHeight / 15)}px;
`;

// Title and subtitle
export const TitleText = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(48, 932)}px;
  margin-bottom: 8px;
`;

export const SubtitleText = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
`;

// Privacy list
export const PrivacyList = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
  style: {flex: 1},
})``;

// Item separator
export const ItemSeparator = styled(View)`
  height: 8px;
`;

// List item container
export const ListItem = styled(View)`
  width: 100%;
  padding: 20px;
  background-color: ${lightGray3Color};
  border-radius: 10px;
`;

export const ItemHeader = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const ItemTitle = styled(Text)`
  color: ${whiteColor};
  font-size: ${RFValue(16, 932)}px;
  font-family: ${Satoshi700};
  margin-left: 8px;
`;

export const ItemSubtitle = styled(Text)`
  color: ${lightGray4Color};
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Satoshi400};
  margin-top: 10px;
`;

// Button container
export const ButtonContainer = styled(View)`
  margin-top: 16px;
`;

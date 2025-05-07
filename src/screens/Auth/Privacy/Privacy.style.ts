import styled from 'styled-components/native';
import {FlatList, TouchableOpacity, View, Text, SafeAreaView, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {backgroundGradientColors, whiteColor, lightGray4Color} from 'constants/colors';
import {screenHeight} from 'constants/common';
import {Satoshi400, Satoshi500} from 'constants/fonts';

export const GradientBackground = styled(LinearGradient).attrs({
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
`;

export const HeaderRow = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 24px;
`;

export const BackButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
  hitSlop: {top: 20, bottom: 20, left: 20, right: 20},
})`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: #181818;
`;

export const Spacer = styled(View)`
  width: 40px;
`;

export const TitleSection = styled(View)<{hasScreen: boolean}>`
  margin-top: 24px;
  margin-bottom: ${screenHeight / 30}px;
  padding-horizontal: 24px;
`;

export const TitleText = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  margin-bottom: 12px;
`;

export const SubtitleText = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  opacity: 0.64;
`;

export const PrivacyList = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  padding-horizontal: 24px;
`;

export const ItemSeparator = styled(View)`
  height: 16px;
`;

export const ListItem = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
`;

export const ItemHeader = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const ItemTitle = styled(Text)`
  color: ${whiteColor};
  font-size: ${RFValue(16, 932)}px;
  font-family: ${Satoshi500};
`;

export const ItemSubtitle = styled(Text)`
  color: ${lightGray4Color};
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Satoshi400};
  opacity: 0.64;
`;

export const ButtonContainer = styled(View)`
  margin-top: 8px;
  padding-horizontal: 24px;
`;

export const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  height: ${screenHeight / 3.4}px;
`;

export const TextWrapper = styled(View)`
  flex: 1;
  gap: 4px;
`;

export const ImageOverlay = styled(LinearGradient).attrs({
  colors: ['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.80)'],
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 60%;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
`;

export const IconWrapper = styled(View)`
  padding: 8px;
  background-color: #121212;
  border-radius: 10px;
`;

export const ContentWrapper = styled(View)`
  flex: 1;
  gap: 4px;
`;

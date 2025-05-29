import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { backgroundGradientColors, transparentWhite16Color, whiteColor, black1Color, lightGray16Color, backgroundColor } from 'constants/colors';
import { screenHeight } from 'constants/common';
import { Satoshi400, Satoshi500, Satoshi700 } from 'constants/fonts';

// Title
export const EulaTitle = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(20, 812)}px;
  color: ${whiteColor};


`;
export const EulaTitleContainer = styled.View`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

// Gradient background
export const RootGradient = styled(LinearGradient).attrs({
  colors: backgroundGradientColors,
  start: { x: 0, y: 1 },
  end: { x: 0, y: 0 },
})`
  flex: 1;
`;

// Safe area
export const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

// Container
export const Container = styled(View)`
  flex: 1;
  padding-horizontal: 24px;
`;

// Header row
export const HeaderRow = styled(View) <{ withBorder: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${({ withBorder }: { withBorder: boolean }) => withBorder && `
    border-bottom-width: 0px;
  `}
  margin-bottom: 30px;
`;

export const BackButton = styled(TouchableOpacity)`
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
`;

export const Spacer = styled(View)`
  width: 40px;
`;

// EULA list
export const EulaList = styled(FlatList).attrs({
  testID: 'eula-scroll',
  onEndReachedThreshold: 0.1,
})`
  flex: 1;
  
`;

// Item in list
export const ItemContainer = styled(View) <{ isLast: boolean }>`
  border-bottom-width: 1px;
  border-bottom-color: ${transparentWhite16Color};
  ${({ isLast }: { isLast: boolean }) => isLast && `
    border-bottom-width: 0px;
  `}
`;

export const ItemTitle = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(18, 932)}px;
  margin-top: 24px;
  margin-bottom: 16px;
`;

export const ItemDescription = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  margin-bottom: 24px;
`;

// Loader
export const LoaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// Buttons row
export const ButtonRow = styled(View)`
  flex-direction: row;
  margin-top: 24px;
`;

export const DenyButton = styled(TouchableOpacity)`
  flex: 1;
  padding-vertical: 13px;
  align-items: center;
`;

export const DenyText = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(20, 932)}px;
`;

export const AcceptButton = styled(TouchableOpacity) <{ enabled: boolean }>`
  flex: 1.7;
  background-color: ${(props: { enabled: boolean }) => (props.enabled ? whiteColor : lightGray16Color)};
  border-radius: 18px;
  height: ${screenHeight / 14}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  max-height: 64px;
  padding-vertical: 10px;
`;

export const AcceptText = styled(Text)`
  color: ${black1Color};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 812)}px;
  margin-right: 4px;
`;

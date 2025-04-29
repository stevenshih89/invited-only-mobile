import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {black2Color, lightGray2Color, lightGray5Color, whiteColor} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';
import {Satoshi400, Satoshi700} from 'constants/fonts';

interface ListItemContainerProps {
  isLast: boolean;
}

export const Container = styled.View`
  background-color: ${black2Color};
  border-radius: 10px;
  padding-vertical: 20px;
  padding-horizontal: 24px;
  margin-top: ${screenHeight / 25}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${lightGray2Color};
`;

export const HeaderText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(14, 932)}px;
`;

export const SubHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
`;

export const ListItemContainer = styled.View<ListItemContainerProps>`
  padding-bottom: ${({isLast}: {isLast: boolean}) => (isLast ? 0 : screenHeight / 63)}px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: ${screenHeight / 63}px;
`;

export const ItemLeftSection = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const IconContainer = styled.View`
  margin-right: 8px;
  border-radius: 100px;
  background-color: ${lightGray5Color};
  width: 34px;
  height: 34px;
  justify-content: center;
  align-items: center;
`;

export const ItemTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
  margin-right: ${screenWidth / 39}px;
`;

export const TooltipContent = styled.View`
  background-color: ${lightGray5Color};
`;

export const TooltipHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TooltipTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(16, 932)}px;
`;

export const TooltipDescription = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
  margin-top: 3px;
`;

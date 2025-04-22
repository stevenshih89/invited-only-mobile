import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Satoshi400,Satoshi700,Satoshi500} from 'constants/fonts';


import {lightGray2Color, lightGray5Color,whiteColor} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';

export const ListItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${screenHeight / 63}px;
`;

export const RowTextAndIcon = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconWrapper = styled.View`
  background-color: ${lightGray2Color};
  border-radius: 100px;
  padding: 8px;
  margin-right: 10px;
`;

export const ListText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  margin-right: ${screenWidth / 39}px;
`;

export const TooltipWrapper = styled.View`
  background-color: ${lightGray5Color};
  padding: 10px;
  border-radius: 10px;
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

export const TooltipTitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

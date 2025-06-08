import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi500 } from 'constants/fonts';
import { screenHeight } from 'constants/common';

export const Label = styled(Text)`
  font-size: ${RFValue(8, 812)}px;
  font-family: ${Satoshi500};
`;

export const IconWrapper = styled(View)`
  height: 100%;
  width: 40px;
  padding-top: 8px;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-style: solid;
  margin-bottom: ${screenHeight * 0.015}px;
  /* borderTopColor will be handled dynamically in the component */
`;

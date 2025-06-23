import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { whiteColor } from 'constants/colors';
import { Satoshi500 } from 'constants/fonts';
import { screenWidth } from 'constants/common';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const MapLoaderText = styled.Text`
  font-size: ${RFValue(24, 932)}px;
  color: ${whiteColor};
  font-family: ${Satoshi500};
  width: ${screenWidth * 0.6};
  text-align: center;
`;
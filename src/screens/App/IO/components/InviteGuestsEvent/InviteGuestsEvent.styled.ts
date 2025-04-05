import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const CardContainer = styled.View`
  height: ${screenHeight * 0.7};
  width: 90%;
  position: relative;
  align-items: center;
  justify-content: bottom;
`;

export const NoCardsText = styled.Text`
  font-size: ${RFValue(18, 932)}px;
  text-align: 'center';
  color: ${whiteColor};
`;

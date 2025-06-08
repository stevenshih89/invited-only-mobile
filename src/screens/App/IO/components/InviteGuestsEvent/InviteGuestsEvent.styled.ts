import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { whiteColor } from 'constants/colors';
import { screenHeight } from 'constants/common';
import { Satoshi500 } from 'constants/fonts';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;

`;
export const CardContainer = styled.View`
  height: ${screenHeight * 0.7};
  border-radius: 20px;
  align-items: center;
`;

export const NoCardsText = styled.Text`
  font-size: ${RFValue(18, 932)}px;
  text-align: 'center';
  color: ${whiteColor};
`;

export const BlockAndReportContainer = styled.View`
  background-color: 'rgba(56, 56, 56, 0.3)';
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 50px;
  border-radius: 100px;
  margin-bottom: 50px;
  margin-top: 20px;
`;

export const BlockAndReportButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const BlockText = styled.Text`
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
  font-family: ${Satoshi500};
`;

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {whiteColor} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';

export const Container = styled.View`
  width: ${screenWidth - 80}px;
  height: ${screenHeight / 5}px;
  border-radius: 16px;
  padding-horizontal: 8px;
  margin-horizontal: 24px;
`;

export const Inner = styled.View`
  background-color: #0a0a0a;
  padding: 16px;
  flex: 1;
  border-radius: 16px;
`;

export const IconWrapper = styled.View`
  width: ${screenWidth / 9}px;
  height: ${screenWidth / 9}px;
  border-radius: 15px;
  background-color: #121212;
  align-items: center;
  justify-content: center;
`;

export const Info = styled.View`
  margin-bottom: 12px;
  gap: 8px;
  margin-top: auto;
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
`;

export const Description = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
  opacity: 0.8;
`;

import {blackColor, whiteColor} from 'constants/colors';
import {screenWidth} from 'constants/common';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

export const ChatContainer = styled(View)`
  flex: 1;
  background-color: ${blackColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${screenWidth * 0.05}px;
  padding-bottom: ${screenWidth * 0.2}px;
`;

export const EmptyStateTitle = styled(Text)`
  font-size: 20px;
  font-family: ${Satoshi700};
  color: ${whiteColor};
`;

export const EmptyStateContainer = styled(View)`
  display: flex;
  width: ${screenWidth * 0.8}px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${screenWidth * 0.03}px;
`;
export const EmptyStateDescription = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  color: ${whiteColor};
  text-align: center;
`;

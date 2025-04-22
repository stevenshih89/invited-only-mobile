import { View } from 'react-native';
import styled from 'styled-components/native';
import { blackColor } from 'constants/colors';
import { screenWidth } from 'constants/common';

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


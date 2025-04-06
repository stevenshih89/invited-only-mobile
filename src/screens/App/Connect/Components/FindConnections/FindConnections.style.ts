import styled from 'styled-components/native';
import {View} from 'react-native';
import {screenHeight, screenWidth} from 'constants/common';

export const Container = styled(View)`
  display: flex;
  height: ${screenHeight * 0.72}px;
  width: 100%;
  padding-horizontal: ${screenWidth * 0.05}px;
  justify-content: center;
  align-items: center;
`;

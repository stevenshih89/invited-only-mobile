import styled from 'styled-components/native';
import { screenHeight } from 'constants/common';

export const CardContainer = styled.View`
  height: 95%;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: ${screenHeight * 0.03}px;
  justify-content: flex-start;
`;

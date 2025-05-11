import styled from 'styled-components/native';

import { screenHeight } from 'constants/common';



export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: ${screenHeight * 0.61}px;
`;
export const CardContent = styled.View`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 3;
`;



export const BadgeContainer = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 20%;
`;

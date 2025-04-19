import { screenHeight } from 'constants/common';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${screenHeight * 0.045}px;
  width: 100%;
  align-self: center;
  z-index: 3;
  padding: 0 10px;
`;

export const Line = styled.View<{ isActive: boolean }>`
  flex: 1;
  height: 4px;
  margin-horizontal: 2px;
  background-color: ${({ isActive }: { isActive: boolean }) => (isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)')};
  border-radius: 10px;
`;

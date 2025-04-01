import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 120px;
  align-self: center;
  z-index: 3;
`;

export const Dot = styled.View<{isActive: boolean}>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-horizontal: 4px;
  background-color: ${({isActive}: {isActive: boolean}) => (isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)')};
`;

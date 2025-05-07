import styled from 'styled-components/native';
import {screenHeight} from 'constants/common';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${screenHeight * 0.7}px;
`;

export const InviteCardContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const InviteCardWrapper = styled.View`
  width: 50%;
  height: 280px;
`;

import styled from 'styled-components/native';
import { screenHeight } from 'constants/common';

export const Container = styled.View`
  flex: 1;
  height: ${screenHeight * 0.7}px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-horizontal: 16px;
`;

export const InviteCardContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const InviteCardWrapper = styled.View`

  height: 280px;
`;

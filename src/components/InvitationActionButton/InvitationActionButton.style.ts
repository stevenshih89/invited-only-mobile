import styled from 'styled-components/native';
import { Satoshi500 } from 'constants/fonts';
import { whiteColor } from 'constants/colors';

export const WaitingContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
  background-color: rgba(12, 12, 12, 1);
  padding: 4px 10px;
  gap: 8px;
  width: 92px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

export const WaitingText = styled.Text`
  font-family: ${Satoshi500};
  font-size: 12px;
  line-height: 16.94px;
  color: ${whiteColor};
`; 
import {GradientBorderView} from '@good-react-native/gradient-border';
import {CodeField} from 'react-native-confirmation-code-field';
import styled from 'styled-components/native';
import {screenHeight} from 'constants/common';
import {whiteColor} from 'constants/colors';

export const StyledCodeField = styled(CodeField).attrs({
  rootStyle: {
    width: '100%',
    gap: 12,
  },
})``;

export const CodeContainer = styled.View`
  position: relative;
`;

export const CellText = styled.Text<{isError?: boolean}>`
  color: ${(props: {isError?: boolean}) => (props.isError ? '#EF5555' : whiteColor)};
  font-size: 18px;
`;

export const DefaultCell = styled.View`
  flex: 1;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.02);
  height: ${screenHeight / 16}px;
  align-items: center;
  justify-content: center;
  border-width: 0.5px;
  border-color: transparent;
  border-style: solid;
`;

export const GradientCell = styled(GradientBorderView)`
  border-width: 1px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.02);
  flex: 1;
  height: ${screenHeight / 16}px;
  align-items: center;
  justify-content: center;
`;

import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { GradientBorderView } from '@good-react-native/gradient-border';
import { CodeField } from 'react-native-confirmation-code-field';
import { Satoshi500, Satoshi400 } from 'constants/fonts';
import { whiteColor } from 'constants/colors';
import { screenHeight } from 'constants/common';
import Button from 'components/Button/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  color: ${whiteColor};
`;

export const Subtitle = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  margin-top: 8px;
`;

export const CodeContainer = styled.View`
  position: relative;
`;

export const CellText = styled.Text<{ isError?: boolean }>`
  color: ${(props: { isError?: boolean }) => (props.isError ? '#EF5555' : whiteColor)};
  font-size: 24px;
`;

export const DefaultCell = styled.View`
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.02);
  flex: 1;
  height: ${screenHeight / 14}px;
  margin-horizontal: 8px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: transparent;
  border-style: solid;
`;

export const GradientCell = styled(GradientBorderView)`
  border-width: 1px;
  width: 50px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.02);
  flex: 1;
  height: ${screenHeight / 14}px;
  margin-horizontal: 8px;
  align-items: center;
  justify-content: center;
`;

export const ErrorContainer = styled.View`
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  align-items: center;
`;

export const ErrorText = styled.Text`
  color: #ef5555;
  font-size: ${RFValue(14, 932)}px;
`;

export const StyledButton = styled(Button).attrs({
  buttonStyle: {
    position: 'absolute',
    bottom: screenHeight / 19,
    width: '80%',
    marginTop: screenHeight / 10,
  },
})``;

export const StyledCodeField = styled(CodeField).attrs({
  rootStyle: {
    width: '80%',
    marginTop: 40,
  },
})``;

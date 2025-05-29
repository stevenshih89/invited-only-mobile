import styled from 'styled-components/native';
import {errorColor, lightGray2Color, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';

export const Container = styled.View`
  margin-bottom: 16px;
  flex-direction: column;
`;

export const TouchableContainer = styled.TouchableOpacity`
  width: 100%;
  height: 58px;
  border-radius: 10px;
  border-width: 0;
  flex-direction: row;
  overflow: hidden;
  padding-right: 0;
`;

export const WrapperErrorText = styled.View`
  margin-top: 6px;
`;

export const ErrorText = styled.Text`
  font-size: 14px;
  width: 100%;
  font-weight: 500;
  line-height: 21px;
  color: ${errorColor};
  font-family: ${Satoshi400};
`;

export const CodeTextStyle = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: ${whiteColor};
`;

export const TextContainerStyle = styled.View`
  flex: 1;
  border-radius: 100px;
  padding-vertical: 0;
  padding-left: 0;
  padding: 0;
  background-color: ${lightGray2Color};
`;

export const FlagButtonStyle = styled.View``;

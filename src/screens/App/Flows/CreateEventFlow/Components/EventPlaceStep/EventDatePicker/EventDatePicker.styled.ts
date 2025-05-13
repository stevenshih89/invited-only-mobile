import { Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { lightRedColor } from 'constants/colors';
import { Satoshi500 } from 'constants/fonts';

export const RowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 100%;
`;

export const HalfFieldContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 48%;
`;
export const FieldLabel = styled(Text)`
  font-family: ${Satoshi500};
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;

export const Input = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 10px;
  width: 100%;
  height: 56px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 99px;
`;

export const StyledTextInput = styled(TextInput)`
  color: #ffffff;
  width: 100%;
  font-family: ${Satoshi500};
  font-size: 18px;
  line-height: 20px;
`;
export const ErrorText = styled.Text`
  font-family: ${Satoshi500};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: ${lightRedColor};
  margin-top: 4px;
`;

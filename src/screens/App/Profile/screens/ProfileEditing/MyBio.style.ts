import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {lightGray2Color, lightGray5Color, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';
import {TextareaItem} from '@ant-design/react-native';

export const Container = styled.View`
  padding: 20px;
  background-color: ${lightGray5Color};
  border-radius: 10px;
  margin-top: 24px;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 812)}px;
  margin-bottom: 26px;
`;

export const TextAreaInput = styled(TextareaItem)`
  background-color: transparent;
  color: ${whiteColor};
`;

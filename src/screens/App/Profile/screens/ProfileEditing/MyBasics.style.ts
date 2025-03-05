import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {lightGray5Color, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';

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
`;

export const ItemContainer = styled.TouchableOpacity`
  padding-vertical: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${transparentWhite16Color};
`;

export const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 812)}px;
  margin-left: 10px;
`;

export const SubText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 812)}px;
  margin-right: 8px;
`;

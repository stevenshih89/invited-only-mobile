import { Satoshi500 } from "constants/fonts";

import { lightGray5Color, whiteColor } from "constants/colors";
import { Satoshi400 } from "constants/fonts";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

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

export const RowContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
`;

export const LabelText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 812)}px;
`;

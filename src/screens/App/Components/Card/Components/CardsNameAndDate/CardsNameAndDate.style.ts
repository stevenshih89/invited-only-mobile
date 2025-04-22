import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { whiteColor } from "constants/colors";
import { Satoshi500 } from "constants/fonts";

export const EventNameAndDate = styled.View`
  display: flex;
  align-items: center;
  justify-content: baseline;
  gap: 10px;
  margin-bottom: 5px;
`;

export const CardName = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(32, 932)}px;
  font-family: ${Satoshi500};

  text-align: center;
`;

export const CardGuestAge = styled.Text`
  color: ${whiteColor};
  opacity: 0.6;
  font-size: ${RFValue(32, 932)}px;
  font-family: ${Satoshi500};

  text-align: center;
`;



export const CardNameAndDate = styled.View`
  display: flex;
  align-items: center;
  justify-content: baseline;
  gap: 10px;
  margin-bottom: 5px;
`;
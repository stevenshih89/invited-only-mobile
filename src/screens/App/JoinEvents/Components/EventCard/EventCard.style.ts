import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { whiteColor } from "constants/colors";
import { Satoshi500 } from "constants/fonts";


export const Container = styled.View`
  height: 100%;
`;


export const CardContent = styled.View`
  display: flex;
  height: 100%;
  align-items: center;
  position: absolute;
  justify-content: space-between;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 3;
`;

export const HostBadgeContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: baseline;
  gap: 10px;
  margin-bottom: 5px;
`;

export const BadgeContainer = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 20%;
`;
export const CardBottomContainer = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 20%;
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

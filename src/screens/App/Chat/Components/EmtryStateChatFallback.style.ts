import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Satoshi400, Satoshi500, Satoshi700 } from "constants/fonts";
import { whiteColor, blackColor } from "constants/colors";
import { screenWidth, screenHeight } from "constants/common";

export const Container = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${screenWidth * 0.06}px;
  height: ${screenHeight * 0.5}px;
  width: ${screenWidth * 0.7}px;    
`;
export const EmptyStateTitle = styled(Text)`
  font-size: 20px;
  font-family: ${Satoshi700};
  color: ${whiteColor};
`;

export const EmptyStateContainer = styled(View)`
  display: flex;
  width: ${screenWidth * 0.8}px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${screenWidth * 0.03}px;
  font-family: ${Satoshi500};
`;
export const EmptyStateDescription = styled(Text)`
  font-size: 16px;
  font-family: ${Satoshi400};
  color: ${whiteColor};
  text-align: center;
`;
export const NavigateToInviteButton = styled(TouchableOpacity)`
  background-color: ${whiteColor};
  padding: ${screenWidth * 0.03}px;
  border-radius: ${screenWidth * 0.03}px;
`;
export const NavigateToInviteButtonText = styled(Text)`
  font-size: 16px;
  font-family: ${Satoshi500};
  color: ${blackColor};
`;

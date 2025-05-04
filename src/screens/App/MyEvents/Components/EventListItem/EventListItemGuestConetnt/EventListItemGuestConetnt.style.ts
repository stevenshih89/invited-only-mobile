import styled from "styled-components/native";
import { Text, View } from "react-native";
import { Satoshi400, Satoshi500 } from "constants/fonts";
import { whiteColor } from "constants/colors";



export const ContentContainer = styled(View)`
  padding: 24px;
  gap: 24px;
  width: 100%;
  align-items: flex-start;
`;
export const InfoContainer = styled(View)`
  gap: 4px;
  width: 100%;
  align-items: flex-start;
`;

export const DateText = styled(Text)`
  font-family: ${Satoshi400};
  font-size: 14px;
  line-height: 17px;
  opacity: 0.5;
  color: #ffffff;
`;

export const EventNameText = styled(Text)`
  font-family: ${Satoshi500};
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
`;

export const LocationText = styled(Text)`
  font-family: ${Satoshi400};
  font-size: 14px;
  line-height: 17px;
  opacity: 0.5;
  color: #ffffff;
`;

export const ActionButtonBase = styled.TouchableOpacity<{ disabled: boolean }>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.08);
  opacity: ${({ disabled }: { disabled: boolean }) => (disabled ? 0.2 : 1)};
  border-radius: 100px;
  height: 48px;
  width: 100%;
`;


export const ActionButtonText = styled(Text)`
  font-family: ${Satoshi500};
  font-size: 14px;
  line-height: 17px;
  color: ${whiteColor};
  
`;
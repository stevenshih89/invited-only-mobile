import { Text, View } from "react-native";
import styled from "styled-components/native";
import { Satoshi400, Satoshi500 } from "constants/fonts";

export const ContentContainer = styled(View)`
  padding: 24px;
  gap: 24px;
  width: 100%;
  align-items: flex-start;
`;

// Name + Description section - Adapted from 'Name + Desc.'
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

export const ActionsContainer = styled(View)`
  flex-direction: row;
  gap: 8px;
  width: 100%;
`;

// Base action button style
const ActionButtonBase = styled.TouchableOpacity<{ disabled: boolean }>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.08);
  opacity: ${({ disabled }: { disabled: boolean }) => (disabled ? 0.2 : 1)};
  border-radius: 100px;
  height: 48px;
`;

export const ViewRequestsButton = styled.TouchableOpacity<{ disabled: boolean }>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled }: { disabled: boolean }) => (disabled ? 'rgba(222, 203, 203, 0.29)' : 'rgba(255, 255, 255, 0.1)')};
  border-radius: 100px;
  height: 48px;
  flex: 1;
  gap: 8px;
  padding: 4px 8px 4px 4px;
`;

export const ViewRequestsText = styled(Text) <{ disabled: boolean }>`
  font-family: ${Satoshi500};
  font-size: 14px;
  line-height: 17px;
  color: ${({ disabled }: { disabled: boolean }) => (disabled ? 'rgba(255, 255, 255, 0.2)' : '#ffffff')};
`;

export const RequestCountBadge = styled(View)`
  padding: 6px;
  min-width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: rgba(255, 255, 255, 0.64);
  justify-content: center;
  align-items: center;
`;

export const RequestCountText = styled(Text)`
  font-family: ${Satoshi500};
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;


export const ManageButton = styled(ActionButtonBase)`
  width: 48px;
`;

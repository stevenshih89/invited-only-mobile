import { blackColor, white10Color, whiteColor } from "constants/colors";
import { screenHeight } from "constants/common";
import { Satoshi400, Satoshi500, Satoshi700 } from "constants/fonts";

import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 16px 0px;
  gap: 16px;
  width: 100%;
  height: 131px;
  background: #0C0C0C;
`;

export const AvatarContainer = styled.View`
  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

export const AvatarImage = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${whiteColor};
`;

export const ContentContainer = styled.View`
  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
  width: 309px;
  height: 99px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
`;

export const HeaderContainer = styled.View`
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  width: 309px;
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 122px;
`;

export const StatusBadge = styled.View`
  margin: 0 auto;
  width: 107px;
  height: 24px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;
`;

export const StatusText = styled.Text`
  width: 91px;
  height: 17px;
  font-family: ${Satoshi500};
  font-size: 12px;
  line-height: 140%;
  color: #FFFFFF;
`;

export const TimeText = styled.Text`
  margin: 0 auto;
  width: 76px;
  height: 20px;
  font-family: ${Satoshi500};
  font-size: 14px;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.5);
`;

export const TextContainer = styled.View`
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  width: 309px;
  height: 65px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
`;

export const NameContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 6px;
  width: 76px;
  height: 22px;
`;

export const NameText = styled.Text`
  width: 48px;
  height: 22px;
  font-family: ${Satoshi700};
  font-size: 16px;
  line-height: 140%;
  color: #FFFFFF;
`;

export const UnreadBadge = styled.View`
  width: 22px;
  height: 22px;
  background: #FFFFFF;
  border-radius: 38px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px;
  gap: 10px;
`;

export const UnreadCount = styled.Text`
  width: 8px;
  height: 17px;
  font-family: ${Satoshi500};
  font-size: 14px;
  line-height: 121%;
  display: flex;
  align-items: center;
  color: #010101;
`;

export const MessageText = styled.Text`
  width: 309px;
  height: 39px;
  font-family: ${Satoshi400};
  font-size: 14px;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.5);
`;

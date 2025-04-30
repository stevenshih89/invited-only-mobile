import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import { whiteColor } from "constants/colors";
import { Satoshi400, Satoshi500, Satoshi700 } from "constants/fonts";


export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 131px;
  background: rgba(12, 12, 12, 0.5);

`;

export const NarrowLeftContainer = styled.View`
  padding: 10px;
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const WideRightContainer = styled.View`
  padding: 10px;
  display: flex;
  flex: 4;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
`;


export const AvatarContainer = styled.View`
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const AvatarImage = styled(FastImage)`
  width: 66px;
  height: 66px;
  border-radius: 66px;
  background-color: ${whiteColor};
`;

export const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  height: 99px;
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: flex-start;

  gap: 10px;
`;
export const ContentContainerInner = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  width: 100%;
  text-wrap: wrap;

`;
export const InnerRowContainer
  = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  flex-wrap: wrap;
`;

export const StatusBadge = styled.View`
  height: 24px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const StatusText = styled.Text`
  height: 17px;
  font-family: ${Satoshi500};
  font-size: 12px;
  line-height: 140%;
  color: #FFFFFF;
`;

export const TimeText = styled.Text`

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
  width: 95%;
  height: 65px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 4px;
`;

export const NameContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 76px;
  height: 22px;
`;

export const NameText = styled.Text`

  height: 22px;
  font-family: ${Satoshi700};
  font-size: 16px;
  line-height: 140%;
  color: #FFFFFF;
`;

export const LastMessageTimestamp = styled.Text`
  height: 22px;
  font-family: ${Satoshi400};
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-align: left;
`;
export const LastMessageText = styled.Text`
  font-family: ${Satoshi400};
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-align: left;
  width: 90%;
  text-wrap: wrap;
`;
export const UnreadBadgeAndNameContainer = styled.View`
display: flex;
flex-direction: row;
align-items: center;
gap: 10px;
`;

export const UnreadBadge = styled.View`
width: 25px;
height: 25px;
background: #FFFFFF;
border-radius: 38px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`;

export const UnreadCount = styled.Text`
font-family: ${Satoshi500};
font-size: 14px;
line-height: 121 %;
display: flex;
align-items: center;
color: #010101;
`;

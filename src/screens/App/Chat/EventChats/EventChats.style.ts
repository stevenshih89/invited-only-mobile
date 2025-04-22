import styled from "styled-components/native";
import { blackColor } from "constants/colors";
import { screenHeight } from "constants/common";

export const Container = styled.View`
  flex: 1;
  background-color: ${blackColor};
  align-items: center;
  width: 100%;
  gap: ${screenHeight * 0.02}px;
`;

export const ChatsContainer = styled.FlatList`
  flex: 1;
  width: 100%;
  margin-bottom: 100px;
`;
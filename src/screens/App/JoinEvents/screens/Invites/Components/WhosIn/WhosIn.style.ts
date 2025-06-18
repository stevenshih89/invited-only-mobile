import styled from "styled-components/native";
import { whiteColor } from "constants/colors";
import { Satoshi500 } from "constants/fonts";
import { screenHeight, screenWidth } from "constants/common";

export const Container = styled.View`
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;

`;
export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    height: ${screenHeight * 0.05}px;

    align-items: center;

`;
export const Body = styled.View`
    width: ${screenWidth * 1}px;
    height: ${screenHeight * 0.68}px;
    justify-content: center;
    align-items: center;
`;
export const SwipesLeftContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  flex-direction: row;
`;
export const SwipesLeftText = styled.Text`
    color: ${whiteColor};
    font-family: ${Satoshi500};
    font-size: 14px;
`;
export const SwipesLeftNumberContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.10);
  border-radius: 38px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  padding: 4px 8px;

`;
export const SwipesLeftNumberText = styled.Text`
    color: ${whiteColor};
    font-family: ${Satoshi500};
    font-size: 14px;
`;
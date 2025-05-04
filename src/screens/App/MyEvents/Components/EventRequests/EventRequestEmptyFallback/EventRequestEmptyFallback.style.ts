import styled from "styled-components/native";
import { whiteColor } from "constants/colors";
import { Satoshi400, Satoshi500 } from "constants/fonts";
import { screenHeight, screenWidth } from "constants/common";

export const Container = styled.View`
    height: ${screenHeight * 0.6}px;
    justify-content: center;
    align-items: center;

`;

export const TextContainer = styled.View`
    justify-content: center;
    align-items: center;

`;

export const Text = styled.Text`
    font-size: 18px;
    font-family: ${Satoshi500};
    color: ${whiteColor};
    text-align: center;
`;

export const TextSmall = styled.Text`
    padding-top: 10px;
    font-size: 14px;
    font-family: ${Satoshi400};
    color: ${whiteColor};
    text-align: center;
`;

export const ImageContainer = styled.View`

    justify-content: center;
    align-items: center;
`;

export const Image = styled.Image`
    width: ${screenWidth * 0.5}px;
    height: ${screenWidth * 0.8}px;
    resize-mode: contain;
`;
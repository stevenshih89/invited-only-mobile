import styled from "styled-components/native";
import { whiteColor } from "constants/colors";
import { Satoshi500 } from "constants/fonts";

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    padding: 12px;
    border-color: ${whiteColor};
    align-items: center;
    justify-content: center;
    margin-right: 12px;
`;

export const Text = styled.Text`
    color: ${whiteColor};
    font-size: 16px;
    font-family: ${Satoshi500};
`;

import styled from "styled-components/native";
import { blackColor, whiteColor } from "constants/colors";
import { Satoshi500 } from "constants/fonts";
import BackButtonIcon from "src/assets/images/icons/arrow-left.svg";

export const Container = styled.View`
    flex: 1;
    background-color: ${blackColor};
    gap: 16px;
`;

export const HeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 5px;
`;

export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-family: ${Satoshi500};
    color: ${whiteColor};
`;

export const BackButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const StyledBackButtonIcon = styled(BackButtonIcon)`
    width: 24px;
    height: 24px;
`;

export const EditButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
export const StyledEditButtonText = styled.Text`
    font-size: 16px;
    font-family: ${Satoshi500};
    color: ${whiteColor};
`;




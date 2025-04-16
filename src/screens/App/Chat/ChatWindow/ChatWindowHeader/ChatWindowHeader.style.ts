import styled from "styled-components/native";
import { Satoshi500 } from "src/constants/fonts";

export const HeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const BackButton = styled.TouchableOpacity`
    background: rgba(26, 26, 26, 1);
    border-radius: 49px;
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items: center;
`;

export const ProfileContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

export const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`;

export const NameContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;

    
`;

export const NameText = styled.Text`
    font-family: ${Satoshi500};
    font-size: 24px;
    line-height: 120%;
    color:rgb(251, 251, 251);

`;

export const MoreButton = styled.TouchableOpacity`

    width: 20px;
    height: 20px;
`;

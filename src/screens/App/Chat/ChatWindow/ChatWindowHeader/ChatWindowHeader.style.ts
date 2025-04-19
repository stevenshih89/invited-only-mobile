import styled from "styled-components/native";
import { Satoshi400, Satoshi500 } from "src/constants/fonts";
import { screenHeight, screenWidth } from "constants/common";
import Arrow from 'assets/images/icons/arrow-down.svg';

export const HeaderContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 12px;

`;
export const HeaderRow = styled.View`
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

export const InvitationStatusContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    transform: translateX(-30px);
    width: ${screenWidth * 1}px;
    padding-left: 20px;
    background-color: rgba(12, 12, 12, 0.4);
    height: ${screenHeight * 0.07}px;
    border-radius: 12px;
`;
export const InvitationLeftContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

`;
export const InvitationRightContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 4px;

`;

export const InvitationStatusTextContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`;
export const InvitationStatusText = styled.Text`
    font-family: ${Satoshi500};
    font-size: 16px;
    line-height: 120%;
    color:rgb(251, 251, 251);
`;

export const InvitationStatusDescription = styled.Text`
    font-family: ${Satoshi400};
    font-size: 12px;
    line-height: 120%;
    color:rgba(255, 255, 255, 0.5);
`;

export const StyledArrow = styled(Arrow) <{ isOpen: boolean }>`
    width: 20px;
    height: 20px;
    transform: ${({ isOpen }: { isOpen: boolean }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;


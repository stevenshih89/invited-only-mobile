import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import { Satoshi400, Satoshi500 } from "src/constants/fonts";
import { screenHeight, screenWidth } from "constants/common";
import Arrow from 'assets/images/icons/arrow-down.svg';
import { whiteColor } from "constants/colors";

export const HeaderContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${screenWidth * 1}px;
    justify-content: center;
    gap: 18px;
    margin-top: 12px;

`;
HeaderContainer.displayName = 'HeaderContainerTest';
export const HeaderCollapsedContainer = styled.View`
    display: flex;
`;

export const DropdownWrapper = styled.View`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 10;
    background-color: rgba(12, 12, 12, 1);
`;

export const HeaderRow = styled.View`
    display: flex;
    
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: ${screenWidth * 1}px;
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

export const Avatar = styled(FastImage)`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`;

export const NameContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 40px;
    
`;

export const NameText = styled.Text`
    font-family: ${Satoshi500};
    font-size: 24px;
    line-height: 28px;
    color:rgb(251, 251, 251);

`;

export const MoreButton = styled.TouchableOpacity<{ isSupportChat?: boolean }>`

    width: 20px;
    height: 20px;
`;

export const WaitingContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 100px;
    background-color: rgba(12, 12, 12, 1);
    padding: 4px 10px;
    gap: 8px;
    width: 92px;
    height: 32px;
    border: 1px solid rgba(255, 255, 255, 0.5);

`;

export const WaitingText = styled.Text`
    font-family: ${Satoshi500};
    font-size: 12px;
    line-height: 16.94px;
    color:${whiteColor};
`;
export const InvitationStatusContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    width: ${screenWidth * 1}px;
    padding-left: 20px;
    background-color:rgba(12, 12, 12, 1);
    height: ${screenHeight * 0.07}px;
    padding-right: 10px;

    
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
    line-height: 16.94px;
    color:rgb(251, 251, 251);
`;

export const InvitationStatusDescription = styled.Text`
    font-family: ${Satoshi400};
    font-size: 12px;
    line-height: 16.94px;
    color:rgba(255, 255, 255, 0.5);
`;

export const StyledArrow = styled(Arrow) <{ isOpen: boolean }>`
    width: 20px;
    height: 20px;
    transform: ${({ isOpen }: { isOpen: boolean }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;


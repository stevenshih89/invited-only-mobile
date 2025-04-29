import styled from "styled-components/native";
import { blackColor } from "constants/colors";
import Arrow from 'assets/images/icons/arrow-down.svg';


export const CardContainer = styled.ScrollView`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding: 16px;
    gap: 16px;
    background-color: rgba(255, 255, 255, 0.04);
    border-radius: 20px;
    align-self: stretch;
`;

// This wraps the main content row (Label + Number Badge)
export const ContentWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    width: 85%;
    align-self: stretch;
    flex-grow: 0;
`;

export const TitleRow = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;

    align-items: center;
    padding: 0px;
    gap: 16px;
    width: 100%;
    align-self: stretch;
    flex-grow: 0;
`;

export const LabelContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;
    flex-grow: 0;
    flex-shrink: 1;
`;


export const ArrowIconContainer = styled.View`
    width: 16px;
    height: 16px;
    transform: rotate(90deg);
    justify-content: center;
    align-items: center;
`;

export const LabelText = styled.Text`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #FFFFFF;
    flex-grow: 0;
`;

export const InfoIconContainer = styled.View`
    
    justify-content: center;
    align-items: center;
`;


export const NumberBadge = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 10px;
    min-width: 26px;
    height: 24px;
    background-color: rgba(255, 255, 255, 0.06);
    border-radius: 38px;
    flex-grow: 0;
`;

export const NumberText = styled.Text`
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    flex-grow: 0;
`;

export const ScreenContainer = styled.View`
    flex: 1;
    background-color: ${blackColor};
`;


export const StyledArrow = styled(Arrow) <{ isOpen: boolean }>`
    width: 20px;
    height: 20px;
    transform: ${({ isOpen }: { isOpen: boolean }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const DotsIconContainer = styled.TouchableOpacity`
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0; /* Prevent shrinking */
`;
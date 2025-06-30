import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

import {whiteColor, blackColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';
import {screenHeight} from 'constants/common';

export const Wrapper = styled.View`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
    padding-bottom: 40px;
`;

export const ButtonsContainer = styled.View`
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 12px;
`;

export const ContinueButton = styled.TouchableOpacity`
    flex: 2;
    justify-content: center;
    align-items: center;
    background-color: ${whiteColor};
    border-radius: 100px;
    height: 48px;
    margin-right: 12px;
    margin-left: 12px;
`;

export const ContinueButtonText = styled.Text`
    color: ${blackColor};
    font-family: ${Satoshi500};
`;

export const TicketWrapper = styled.View`
    align-items: center;
    margin-top: ${screenHeight / 30}px;
`;

export const TicketBackground = styled.ImageBackground.attrs({
    resizeMode: 'contain',
})`
    width: 100%;
    align-items: center;
    padding-top: ${screenHeight / 12}px;
    height: ${screenHeight / 6}px;
`;

export const TicketTitle = styled.Text`
    font-size: ${RFValue(24, 932)}px;
    font-family: ${Satoshi500};
    color: ${whiteColor};
`;

export const CounterRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: ${screenHeight / 16}px;
    margin-top: ${screenHeight / 28}px;
`;

export const IconButton = styled.TouchableOpacity`
    border-width: 1px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.08);
    border-radius: 100px;
    width: ${screenHeight / 20}px;
    height: ${screenHeight / 20}px;
    align-items: center;
    justify-content: center;
`;

interface CountTextProps {
    active: boolean;
}

export const CountText = styled.Text<CountTextProps>`
    font-size: ${RFValue(64, 932)}px;
    font-family: ${Satoshi500};
    color: ${({active}: CountTextProps) => (active ? whiteColor : 'rgba(255, 255, 255, 0.2)')};
`;

export const DescriptionText = styled.Text`
    opacity: 0.8;
    color: ${whiteColor};
    font-size: ${RFValue(16, 932)}px;
    font-family: ${Satoshi500};
    margin-top: 16px;
    text-align: center;
`;

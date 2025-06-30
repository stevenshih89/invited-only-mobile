import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {whiteColor} from 'constants/colors';
import {Satoshi700} from 'constants/fonts';

export const NopeRejectBadgeContainer = styled.View`
    height: 100%;
    border-radius: 16px;
    border-width: 3px;
    border-color: ${whiteColor};
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 6px;
    padding-bottom: 6px;
`;

export const NopeRejectBadgeText = styled.Text`
    font-size: ${RFValue(24, 932)};
    font-family: ${Satoshi700};
    color: ${whiteColor};
    z-index: 10;
    text-transform: uppercase;
`;

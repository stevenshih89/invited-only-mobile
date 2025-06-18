import styled from 'styled-components/native';
import {ImageBackground} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight} from 'constants/common';
import {whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';

export const SafeArea = styled.SafeAreaView`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
    padding-horizontal: 24px;
`;

export const Header = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 16px;
`;

export const EmptySpace = styled.View`
    width: 48px;
    height: 48px;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #0f0f0f;
    border-radius: 100px;
`;

export const ContentContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const BackgroundImage = styled(ImageBackground)`
    width: 100%;
    height: ${screenHeight / 2}px;
    padding-top: ${screenHeight / 10}px;
    align-items: center;
    position: relative;
`;

export const FooterContainer = styled.View`
    align-items: center;
    padding-horizontal: 28px;
`;

export const InviteButton = styled.TouchableOpacity`
    align-items: center;
    gap: 4px;
`;

export const InviteTitle = styled.Text`
    font-family: ${Satoshi400};
    font-size: ${RFValue(14, 932)}px;
    color: ${whiteColor};
`;

export const InviteLink = styled.Text`
    font-family: ${Satoshi500};
    font-size: ${RFValue(14, 932)}px;
    color: ${whiteColor};
    text-decoration-line: underline;
    margin-bottom: 16px;
`;

export const Description = styled.Text`
    margin-left: 24px;
    margin-right: 24px;
    font-family: ${Satoshi400};
    font-size: ${RFValue(12, 932)}px;
    color: rgba(130, 130, 130, 1);
    text-align: center;
`;

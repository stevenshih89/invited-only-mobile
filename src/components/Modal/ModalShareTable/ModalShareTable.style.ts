import styled from 'styled-components/native';
import {BlurView} from '@react-native-community/blur';
import {RFValue} from 'react-native-responsive-fontsize';
import {whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import Button from 'components/Button/Button';

export const Container = styled.View`
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
`;

export const ModalWrapper = styled.View`
    margin-top: auto;
    width: 107%;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    align-self: center;
    position: relative;
    padding-horizontal: 24px;
`;

export const ContentWrapper = styled.View`
    width: 100%;

    padding: 24px;
`;

export const StyledBlurView = styled(BlurView)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    overflow: hidden;
`;

export const LockBadgeContainer = styled.View`
    align-items: center;
`;

export const LockBadge = styled.View`
    background-color: #1e1e1e;
    border-radius: 100px;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 10px;
    padding-vertical: 6px;
    gap: 4px;
`;

export const LockText = styled.Text`
    font-family: ${Satoshi500};
    font-size: ${RFValue(14, 932)}px;
    color: ${whiteColor};
`;

export const Title = styled.Text`
    font-family: ${Satoshi500};
    font-size: ${RFValue(24, 932)}px;
    color: ${whiteColor};
    margin-top: 8px;
`;

export const Description = styled.Text`
    font-family: ${Satoshi400};
    font-size: ${RFValue(16, 932)}px;
    color: ${whiteColor};
    opacity: 0.8;
    margin-top: 8px;
`;

export const InfoContainer = styled.View`
    width: 100%;
    margin-top: 24px;
`;

export const InfoWrapper = styled.View`
    padding-horizontal: 16px;
    padding-vertical: 12px;
    border-radius: 10px;
    width: 100%;
`;

export const ImageWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

export const ImageContainer = styled.View`
    height: 43px;
    width: 98px;
`;

export const TextContainer = styled.View`
    flex-shrink: 1;
`;

export const InfoTitle = styled.Text`
    font-family: ${Satoshi500};
    font-size: ${RFValue(16, 932)}px;
    color: ${whiteColor};
    margin-bottom: 4px;
`;

export const InfoDescription = styled.Text`
    font-family: ${Satoshi400};
    font-size: ${RFValue(14, 932)}px;
    color: ${whiteColor};
    opacity: 0.8;
`;

export const StyledButton = styled(Button).attrs({
    buttonStyle: {
        width: '100%',
        marginTop: 24,
    },
})``;

export const StyledImage = styled.Image`
    height: 43px;
    width: 98px;
`;

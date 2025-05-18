import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { screenHeight, screenWidth } from 'constants/common';
import { white40Color, whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

`;

export const ImagesContainer = styled.View`
    position: relative;
    height: ${screenWidth * 0.3}px;
    width: ${screenWidth * 0.5}px;
    justify-content: center;
    align-items: center;
`;

export const Image = styled(FastImage)`
    width: ${screenWidth * 0.3}px;
    height: ${screenWidth * 0.3}px;
    border-radius: ${screenHeight * 0.125}px;
    position: absolute;
    top: 0;
`;

export const TopImage = styled(Image)`
    right: 0;

`;

export const BottomImage = styled(Image)`
    left: 0;

`;

export const TextContainer = styled.View`
    margin-top: ${screenHeight * 0.05}px;
    gap: ${screenHeight * 0.002}px;
`;

export const TextPrimary = styled.Text`
    font-size: ${screenWidth * 0.06}px;
    font-family: ${Satoshi500};
    color: ${whiteColor};
    text-align: center;
`;

export const TextSecondary = styled.Text` 
    font-size: ${screenWidth * 0.05}px;
    font-family: ${Satoshi400};
    color: ${white40Color};
    text-align: center;

`;


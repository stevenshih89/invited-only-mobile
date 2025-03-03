import styled from 'styled-components/native';
import { blackColor, whiteColor } from 'constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi500, Satoshi400 } from 'constants/fonts';
import FastImage from 'react-native-fast-image';
import { screenHeight, screenWidth } from 'constants/common';

export const ContainerStyled = styled.View`
  flex: 1;
  background-color: ${blackColor};
  width: 100%;
  align-items: center;
`;

export const InnerContainer = styled.View`
  align-items: center;
  flex: 1;
`;

export const WhiteCircle = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${whiteColor};
  border-radius: 170px;
`;

export const TextWrapper = styled.View`
  position: absolute;
  align-items: center;
`;

export const TextContainer = styled.View`
  background-color: ${whiteColor};
  border-radius: 17px;
  padding-horizontal: 22px;
  padding-vertical: 11px;
  margin-top: -8px;
`;

export const TextStyled = styled.Text`
  color: ${blackColor};
  font-size: ${RFValue(18, 812)}px;
  font-family: ${Satoshi500};
  text-align: center;
  opacity: 0.8;
`;

export const FastImageStyled = styled(FastImage)`
  width: 180px;
  height: 180px;
  border-radius: 100px;
`;

export const SubtractWrapper = styled.View`
  position: absolute;
  top: ${screenHeight / 2 - 40}px;
`;

export const TextWrapperAbsolute = styled.View`
  position: absolute;
  top: ${screenHeight / 2 - 10}px;
  align-items: center;
`;

export const TextContainerAbsolute = styled.View`
  width: ${screenWidth - 32}px;
  margin-top: 20px;
`;

export const TextStyledAbsolute = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(18, 812)}px;
  font-family: ${Satoshi400};
  text-align: center;
  opacity: 0.8;
`;

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { whiteColor } from 'constants/colors';
import { screenHeight, screenWidth } from 'constants/common';
import { Satoshi400 } from 'constants/fonts';

export const Container = styled.View`
  width: 100%;
  height: ${screenHeight / 3.2}px;
`;

export const TitleWrapper = styled.View`
  margin-bottom: 14px;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(24, 812)}px;
`;

export const Pagination = styled.View`
  justify-content: flex-end;
  align-items: flex-start;
  height: 102%;
`;

export const ImageWrapper = styled.View`
  width: ${screenWidth / 3 - 28}px;
`;

export const Image = styled(FastImage)`
  width: ${screenWidth / 3 - 42}px;
  height: ${screenWidth / 3 - 42}px;
  border-radius: 10px;
`;

export const Separator = styled.View`
  height: 14px;
`;

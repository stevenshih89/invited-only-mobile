import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';
import {screenWidth} from 'constants/common';

export const Root = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${blackColor};
  padding-horizontal: 24px;
`;

export const CenterContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const StyledImage = styled.Image`
  width: ${({size}: {size: number}) => size / 2}px;
  height: ${({size}: {size: number}) => size / 2}px;
  border-radius: ${({size}: {size: number}) => size / 4}px;
  position: absolute;
  top: ${({size}: {size: number}) => size / 4}px;
  left: ${({size}: {size: number}) => size / 4}px;
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(24, 932)}px;
  color: ${whiteColor};
  margin-top: 32px;
`;

export const Subtitle = styled.Text`
  margin-horizontal: ${screenWidth / 6}px;
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  opacity: 0.8;
  text-align: center;
  margin-top: 8px;
  line-height: ${RFValue(26, 932)}px;
`;

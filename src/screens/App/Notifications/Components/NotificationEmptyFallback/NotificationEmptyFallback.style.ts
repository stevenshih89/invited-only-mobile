import styled from 'styled-components/native';
import {blackColor, grayColor, whiteColor} from 'constants/colors';
import {screenWidth} from 'constants/common';
import {Satoshi500, Satoshi400} from 'constants/fonts';

export const Container = styled.View`
  flex: 1;

  background-color: ${blackColor};
  padding: ${screenWidth * 0.07}px;
`;

export const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${screenWidth * 0.07}px;
`;

export const TitleText = styled.Text`
  font-family: ${Satoshi500};
  font-size: 24px;
  color: ${whiteColor};
  margin-bottom: 10px;
  text-align: center;
`;

export const SubtitleText = styled.Text`
  font-family: ${Satoshi400};
  font-size: 16px;
  color: ${grayColor};
  text-align: center;
  margin-bottom: 40px;
`;

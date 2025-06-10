import {View, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';
import Button from 'components/Button/Button';

export const TopRow = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const TitleContainer = styled(View)`
  width: 100%;
  margin-bottom: ${screenHeight / 40}px;
  margin-top: ${screenHeight / 30}px;
`;

export const Title = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  line-height: ${RFValue(48, 932)}px;
  letter-spacing: -0.07px;
  margin-bottom: 16px;
`;

export const Subtitle = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  opacity: 0.8;
`;

export const ButtonsContainer = styled(View)`
  margin-bottom: 0px;
  gap: 16px;
`;

export const ContinueButton = styled(Button).attrs({
  testID: 'continue-button',
})``;

export const SkipButton = styled(Button).attrs({
  testID: 'skip-button',
  variant: 'gray',
})``;

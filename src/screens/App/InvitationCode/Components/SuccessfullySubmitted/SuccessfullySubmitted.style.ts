import styled from 'styled-components/native';
import {Satoshi500, Satoshi400} from 'constants/fonts';
import {whiteColor} from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {screenHeight} from 'constants/common';
import {BlurView} from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  color: ${whiteColor};
`;

export const Subtitle = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  margin-top: 8px;
`;

export const ImageContainer = styled.View`
  position: relative;
`;

export const UserImage = styled(FastImage)`
  width: ${screenHeight / 10}px;
  height: ${screenHeight / 10}px;
  border-radius: 100px;
  margin-top: 16px;
`;

export const BadgeContainer = styled.View`
  position: absolute;
  bottom: -15px;
  right: 0;
  left: 0;
`;

export const BadgeContent = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  flex-direction: row;
  padding-horizontal: 16px;
  padding-vertical: 4px;
  gap: 12px;
`;

export const BadgeBlur = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  overflow: hidden;
`;

export const BadgeText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(18, 932)}px;
  font-family: ${Satoshi500};
`;

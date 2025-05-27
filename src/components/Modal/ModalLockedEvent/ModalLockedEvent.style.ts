import styled from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenHeight } from 'constants/common';
import { whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

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
  margin-bottom: ${screenHeight / 10}px;
  width: 110%;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  align-self: center;
  position: relative;
  padding-horizontal: 24px;
`;

export const ContentWrapper = styled.View`
  width: 100%;
  align-items: center;
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
  width: 70%;
  text-align: center;
  margin-top: 8px;
`;

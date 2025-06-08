import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { whiteColor } from 'constants/colors';
import { screenHeight, screenWidth } from 'constants/common';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

export const Container = styled.View`
  display: flex;
  margin-top: ${screenHeight / 7.6}px;
  align-items: center;
  width: 100%;
  gap: 10px;
  height: 100%;
`;

export const LockedContainer = styled(FastImage)`
  width: ${screenWidth}px;
  height: ${screenHeight * 0.9}px;
  border-radius: 20px;
  margin-top: ${screenHeight / 7.6}px;
  margin-bottom: ${screenHeight / 15}px;
  align-items: center;
  justify-content: center;
`;
export const EmptyFallbackImage = styled(FastImage)`
  width: 250px;
  aspect-ratio: 1;
`;

export const FallbackTextContainer = styled.View`
  display: flex;
  width: 60%;
  margin-top: ${screenHeight / 40}px;
  padding-horizontal: 10px;
  padding-bottom: 10px;
`;

export const TextContainer = styled.View`
  padding-bottom: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const FallbackTitleText = styled.Text`
  flex-direction: column;
  font-family: ${Satoshi500};
  align-items: center;

  justify-content: center;
  gap: 8px;
  color: ${whiteColor};
  font-size: ${RFValue(24, 932)};
`;

export const FallbackInstructorTex = styled.Text`
  font-family: ${Satoshi400};
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  color: ${whiteColor};
  opacity: 0.7;
  font-size: ${RFValue(16, 932)};
`;

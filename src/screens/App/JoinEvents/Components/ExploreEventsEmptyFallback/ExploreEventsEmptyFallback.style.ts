import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { whiteColor } from 'constants/colors';
import { screenHeight, screenWidth } from 'constants/common';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 95%;
`;

export const MapLoaderContainer = styled.View`
    flex: 1;
`;

export const MapLoaderText = styled.Text`
  font-size: ${RFValue(24, 932)}px;
  color: ${whiteColor};
  font-family: ${Satoshi500};
  width: ${screenWidth * 0.6};
  text-align: center;

`;
export const MapLoaderSubText = styled.Text`
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  font-family: ${Satoshi400};
  width: ${screenWidth * 0.5};
  text-align: center;

`;
export const Lottie = styled(LottieView)`
  width: 500px;
  height: 300px;
  align-items: center;
  justify-content: center;
`;

export const LockedContainer = styled(FastImage)`
  width: ${screenWidth}px;
  height: ${screenHeight * 0.7}px;
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

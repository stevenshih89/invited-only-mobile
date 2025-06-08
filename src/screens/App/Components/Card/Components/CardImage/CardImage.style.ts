import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { blackColor, whiteColor } from 'constants/colors';
import { Satoshi500 } from 'constants/fonts';

export const ImageLoadingView = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${blackColor};
  z-index: 5;
`;
export const CardImage = styled(FastImage) <{ isTop: boolean }>`
  border-radius: 20px;
  bottom: 0;
  right: 0;
  height: 98%;

  opacity: ${({ isTop }: { isTop: boolean }) => (isTop ? 1 : 0.8)};
`;

export const NoImage = styled.View`
  border-radius: 20px;
  bottom: 0;
  right: 0;
  height: 98%;
  width: 100%;
  background-color: ${blackColor};
  z-index: 5;
  justify-content: center;
  align-items: center;
  opacity: ${({ isTop }: { isTop: boolean }) => (isTop ? 1 : 0.8)};
`;

export const NoImageText = styled.Text`
  color: ${whiteColor};
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  font-family: ${Satoshi500};
`;

export const CardImageContainer = styled.View`
  border-radius: 20px;
  bottom: 0;
  right: 0;
`;

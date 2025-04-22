import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { blackColor } from 'constants/colors';

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
  height: 95%;

  opacity: ${({ isTop }: { isTop: boolean }) => (isTop ? 1 : 0.8)};
`;
export const CardImageContainer = styled.View`
  border-radius: 20px;
  bottom: 0;
  right: 0;
`;

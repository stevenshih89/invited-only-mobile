import Video from 'react-native-video';
import styled from 'styled-components/native';
import { whiteColor } from 'constants/colors';

export const DemoVideo = styled(Video)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  object-fit: cover; /* Ensures the video fills the screen without distortion */
`;

export const ProgressBarContainer = styled.View`
  position: absolute;
  top: 60px;
  left: 20px;
  right: 20px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
`;

export const ProgressBar = styled.View<{ width: string }>`
  height: 100%;
  width: ${props => props.width};
  background-color: ${whiteColor};
  border-radius: 2px;
`;

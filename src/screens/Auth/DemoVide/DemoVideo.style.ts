import Video from 'react-native-video';
import styled from 'styled-components/native';

export const DemoVideo = styled(Video)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  object-fit: cover; /* Ensures the video fills the screen without distortion */
`;

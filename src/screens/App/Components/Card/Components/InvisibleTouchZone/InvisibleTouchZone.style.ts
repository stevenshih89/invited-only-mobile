import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

export const InvisibleTapZone = styled(TouchableOpacity)`
  height: 90%;
  width: 50%;
`;

export const TapZoneContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: transparent;
  z-index: 3;
`;

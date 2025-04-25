import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
import { screenHeight } from 'constants/common';

export const EventCardContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 89%;
  height: 100%;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${screenHeight * 0.70}px;
`;

export const EventsScrollViewContainer = styled(ScrollView)``;

import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';

export const EventCardContainer = styled.View`
  width: 90%;
  height: 550px;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  width: 382px;
  gap: 10px;
`;

export const EventsScrollViewContainer = styled(ScrollView)``;

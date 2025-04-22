import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native';
import {blackColor} from 'constants/colors';

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 20px;
  background-color: ${blackColor};
`;

export const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${blackColor};
`;

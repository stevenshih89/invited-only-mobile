import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {blackColor} from 'constants/colors';
import {screenHeight} from 'constants/common';

export const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${blackColor};
`;

export const MainContainer = styled.View`
  flex: 1;
  padding-top: ${screenHeight / 48}px;
  padding-horizontal: 20px;
`;

export const ScrollContainer = styled(KeyboardAwareScrollView)`
  flex: 1;
`;

export const SaveButtonContainer = styled.View`
  margin-top: 20px;
`;

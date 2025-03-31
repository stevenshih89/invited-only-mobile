import React, {ReactNode} from 'react';
import {blackColor} from '../../constants/colors';
import {screenWidth} from '../../constants/common';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

interface SafeAreaHeaderContainerProps {
  children: ReactNode;
}

const Container = styled.View`
  background-color: ${blackColor};
  padding-horizontal: ${screenWidth / 15.5}px;
`;

export const SafeAreaHeaderContainer = ({children}: SafeAreaHeaderContainerProps) => {
  const insets = useSafeAreaInsets();

  return <Container paddingTop={insets.top}>{children}</Container>;
};

import styled from 'styled-components/native';
import {screenHeight} from 'constants/common';
import {ImageBackground} from 'react-native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 24px;
`;

export const Header = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const EmptySpace = styled.View`
  width: 48px;
  height: 48px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #0f0f0f;
  border-radius: 100px;
`;

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  height: ${screenHeight / 2}px;
  padding-top: ${screenHeight / 10}px;
  align-items: center;
  position: relative;
`;

import styled from 'styled-components/native';

import {screenHeight} from 'constants/common';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const Wrapper = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding-horizontal: 12px;
`;

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: ${screenHeight * 0.61}px;
`;
export const CardContent = styled.View`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 3;
`;

export const BadgeContainer = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 20%;
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 12px;
  padding-left: 12px;
  padding-right: 12px;
`;

export const ContinueButton = styled.TouchableOpacity`
  flex: 2;
  justify-content: center;
  align-items: center;
  background-color: ${whiteColor};
  border-radius: 100px;
  height: 48px;
  margin-right: 12px;
  margin-left: 12px;
`;

export const ContinueButtonText = styled.Text`
  color: ${blackColor};
  font-family: ${Satoshi500};
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  height: 48px;
`;

export const CancelButtonText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
`;

import {blackColor, whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';
import {Satoshi500} from 'constants/fonts';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: space-between;
  display: flex;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

export const StepsContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-vertical: 24px;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 12px; /* optional spacing between buttons */
`;

export const ContinueButton = styled.TouchableOpacity`
  flex: 2;
  justify-content: center;
  align-items: center;
  background-color: ${whiteColor};
  border-radius: 100px;
  height: 48px;
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

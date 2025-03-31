import styled from 'styled-components/native';
import {blackColor, grayScale700, lightGray2Color, whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';
import {screenWidth} from 'constants/common';

export const Container = styled.View`
  align-items: center;
`;

export const StepsContainer = styled.View`
  width: 100%;
  margin-vertical: 24px;
`;

export const StepsWrapper = styled.View`
  position: relative;
  align-items: center;
  width: 100%;
`;

export const ProgressLine = styled.View`
  height: 2px;
  width: ${screenWidth - 48 - 32}px;
  background-color: ${grayScale700};
  position: absolute;
  top: 16px;
`;

export const StepsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const StepItemContainer = styled.View`
  align-items: center;
`;

interface StepCircleProps {
  isActive: boolean;
  isCompleted: boolean;
}

export const StepCircle = styled.View<StepCircleProps>`
  height: 32px;
  width: 32px;
  background-color: ${({isActive, isCompleted}: StepCircleProps) => (isActive || isCompleted ? whiteColor : lightGray2Color)};
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

interface StepTextProps {
  isActive: boolean;
}

export const StepText = styled.Text<StepTextProps>`
  color: ${({isActive}: StepCircleProps) => (isActive ? whiteColor : grayScale700)};
  font-family: ${Satoshi500};
  font-size: 12px;
  margin-top: 8px;
`;

interface StepNumberProps {
  isActive: boolean;
}

export const StepNumber = styled.Text<StepNumberProps>`
  color: ${({isActive}: StepCircleProps) => (isActive ? blackColor : whiteColor)};
  font-size: 16px;
  font-family: ${Satoshi500};
  text-align: center;
`;

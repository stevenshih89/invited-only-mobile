import styled from 'styled-components/native';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

export const StepperContainer = styled.View`
  width: 100%;
  padding: 10px 0;
`;

export const StepItemContainer = styled.View`
  padding: 10px 16px;
  position: relative;
`;

export const StepContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
`;

export const ConnectingLine = styled.View<{ isCompleted?: boolean; isLastStep?: boolean }>`
  position: absolute;
  left: 33px;
  top: 50px;
  bottom: -15px;
  width: 2px;
  background-color: ${({ isCompleted }: { isCompleted?: boolean }) => isCompleted ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.24)'};
  display: ${({ isLastStep }: { isLastStep?: boolean }) => isLastStep ? 'none' : 'flex'};
`;

export const StepTextContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  flex-shrink: 1;
`;

export const StepCircle = styled.View<{ isCompleted?: boolean }>`
  display: flex;
  width: 36px;
  height: 36px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ isCompleted }: { isCompleted?: boolean }) => isCompleted ? 'rgba(255, 255, 255, 0.8)' : 'rgb(60, 60, 60)'};
  border-radius: 18px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const StepNumberText = styled.Text<{ isCompleted?: boolean }>`
  font-family: ${Satoshi500};
  font-size: 16px;
  line-height: 19px;
  color: ${({ isCompleted }: { isCompleted?: boolean }) => isCompleted ? 'rgb(60, 60, 60)' : 'rgb(251, 251, 251)'};
`;

export const StepTitleText = styled.Text`
  font-family: ${Satoshi500};
  font-size: 16px;
  line-height: 19px; 
  color: rgb(251, 251, 251);
`;

export const StepDescriptionText = styled.Text`
  font-family: ${Satoshi400};
  font-size: 12px;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.5);
`; 
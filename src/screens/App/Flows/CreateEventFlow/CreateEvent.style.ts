import styled from 'styled-components/native';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const Container = styled.View`
  align-items: center;
  justify-content: space-between;
  display: flex;
  height: 100%;
`;

export const StepsContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-vertical: 24px;
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 12px;
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

export const CreatingEventText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: 24px;
`;

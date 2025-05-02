import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';

export const ModalContent = styled.View`
  background-color: #111111;
  overflow: hidden;
  border-radius: 24px;
  padding-bottom: 32px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(32, 32, 32, 1);
  border-radius: 100px;
  padding: 6px;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(24, 932)}px;
  margin-bottom: 24px;
  max-width: 80%;
`;

export const Description = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  margin-bottom: 40px;
  opacity: 0.6;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 8px;
  margin-top: 24px;
`;

export const ContentWrapper = styled.View`
  padding-top: 24px;
  padding-horizontal: 24px;
`;

export const StepList = styled.View`
  position: relative;
  flex: 1;
`;

export const VerticalLine = styled.View`
  position: absolute;
  left: 16px;
  top: 16px;
  bottom: 16px;
  width: 2px;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const StepCircle = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const StepItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const StepNumber = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  line-height: ${RFValue(16, 932)}px;
`;

export const StepTextWrapper = styled.View`
  flex: 1;
`;

export const StepTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: 14px;
`;

export const StepDescription = styled.Text`
  color: ${whiteColor};
  opacity: 0.6;
  font-family: ${Satoshi400};
  font-size: 12px;
  margin-top: 4px;
`;

export const HeaderBackground = styled.View`
  background-color: #161616;
`;

export const MainImageWrapper = styled.View`
  width: 100%;
  margin-top: 36px;
`;

export const MainImage = styled.Image`
  width: 100%;
  height: ${screenHeight / 4}px;
`;

export const StepsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const StepsImage = styled.Image`
  width: 33px;
  height: 100px;
  margin-right: 16px;
`;

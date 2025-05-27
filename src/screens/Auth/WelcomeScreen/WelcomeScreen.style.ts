import styled from 'styled-components/native';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { transparentWhite30Color, blackColor, whiteColor } from 'constants/colors';
import { screenHeight, screenWidth } from 'constants/common';
import { Satoshi400 } from 'constants/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${blackColor};
`;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  z-index: 1;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 24px;
  padding-top: 20px;
  z-index: 2;
`;

export const BackButton = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7,
    hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
})`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${transparentWhite30Color};
`;

export const Spacer = styled.View`
  width: 40px;
`;

export const WelcomeImage = styled.Image`
  width: ${screenWidth * 1}px;
  height: ${screenHeight * 0.25}px;
  align-self: center;
  justify-content: center;
  border-radius: 10px;
  bottom: 0;
  z-index: 0;
`;

export const BenefitsContainer = styled.View`
  position: absolute;
  width: ${screenWidth}px;
  height: ${screenHeight * 0.65}px;
  left: 0;
  bottom: 0;
  background-color: #0C0C0C;
  padding: 24px;
`;

export const BenefitsTitle = styled.Text`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 120%;
  letter-spacing: -0.019em;
  color: ${whiteColor};
  margin-bottom: 12px;
`;

export const BenefitsSubtitle = styled.Text`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 151%;
  color: ${whiteColor};
  opacity: 0.64;
  margin-bottom: 24px;
`;

export const BenefitsList = styled.View`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const BenefitItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
`;

export const BenefitIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 14.4px;
  justify-content: center;
  align-items: center;
`;

export const BenefitContent = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BenefitTitle = styled.Text`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  color: ${whiteColor};
`;

export const BenefitDescription = styled.Text`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${whiteColor};
  opacity: 0.64;
`;

export const ButtonContainer = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7,
})`
  background-color: ${whiteColor};
  border-radius: 30px;
  margin-top: 16px;
  height: 50px;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const ButtonText = styled.Text`
  font-family: ${Satoshi400};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  color: ${blackColor};
`;
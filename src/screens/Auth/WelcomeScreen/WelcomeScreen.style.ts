import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {transparentWhite30Color, blackColor, whiteColor} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';
import {Satoshi400, Satoshi500} from 'constants/fonts';

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
  z-index: 2;
`;

export const BackButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
  hitSlop: {top: 20, bottom: 20, left: 20, right: 20},
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

export const BenefitsContainer = styled.View`
  width: ${screenWidth}px;
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 24px;
`;

export const BenefitsTitle = styled.Text`
  font-family: ${Satoshi500};
  font-style: normal;
  font-size: ${RFValue(32, 932)}px;
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
  font-family: ${Satoshi500};
  font-style: normal;
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
`;

export const BenefitDescription = styled.Text`
  font-family: ${Satoshi400};
  font-style: normal;
  font-weight: 400;
  font-size: ${RFValue(14, 932)}px;
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

export const BenefitIconContainer = styled.View`
  background-color: #0f0f0f;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const WelcomeImageContainer = styled.View`
  width: 100%;
  height: ${screenHeight / 4}px;
`;

export const WelcomeImage = styled.Image`
  width: 100%;
  height: 100%;
`;

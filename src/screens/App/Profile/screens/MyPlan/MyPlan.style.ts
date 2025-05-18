import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { blackColor, whiteColor } from 'constants/colors';
import { Satoshi500 } from 'constants/fonts';
import { screenHeight } from 'constants/common';

export const Container = styled.View`
  flex: 1;
  background-color: ${blackColor};
  padding: 24px;
`;

export const HostPremiumCard = styled.View`
  background-color: rgba(13, 13, 13, 1);
  border-radius: 13px;
  border-width: 1px;
  margin-bottom: 16px;
  border-color: rgba(255, 255, 255, 0.1);
`;

export const CardContent = styled.View`
  width: 100%;
  padding: 16px;
`;

export const PremiumTitle = styled.Text`
  margin-bottom: 8px;
  font-family: ${Satoshi500};
  font-size: ${RFValue(20, 932)}px;
  color: ${whiteColor};
`;

export const PremiumDescription = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Satoshi500};
  opacity: 0.6;
`;

export const UpgradeButton = styled.TouchableOpacity`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: ${whiteColor};
  border-radius: 100px;
  padding: 4px 8px;
  margin-top: 16px;
`;

export const ButtonIconWrapper = styled.View`
  background-color: ${blackColor};
  border-radius: 100px;
  padding: 4px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  color: ${blackColor};
`;

export const IOGradientWrapper = styled.View`
  position: absolute;
  top: 50%;
  transform: translateY(-50px);
  right: 0;
  height: 100px;
`;

export const FeaturesCard = styled.View`
  background-color: rgba(13, 13, 13, 1);
  border-radius: 10px;
  padding: 16px;
`;

export const ListColumnWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${screenHeight / 25}px;
  margin-bottom: ${screenHeight / 82}px;
`;

export const WhatYouGetText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 932)}px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const PremiumContainer = styled.View`
  background-color: rgba(13, 13, 13, 1);
  border-radius: 13px;
  border-width: 1px;
  margin-bottom: 16px;
  border-color: rgba(255, 255, 255, 0.1);
`;

export const PremiumContent = styled.View`
  width: 100%;
  padding: 16px;
`;

export const PremiumTitle = styled.Text`
  margin-bottom: 8px;
  font-family: ${Satoshi500};
  font-size: ${RFValue(20, 932)}px;
  color: ${whiteColor};
`;

export const PremiumText = styled.Text`
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
  padding: 4px;
  padding-right: 8px;
  margin-top: 16px;
`;

export const UpgradeIconContainer = styled.View`
  background-color: ${blackColor};
  border-radius: 100px;
  padding: 4px;
  justify-content: center;
  align-items: center;
`;

export const UpgradeText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  color: ${blackColor};
`;

export const GradientContainer = styled.View`
  border-radius: 100px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const GradientBackground = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const IOGradientContainer = styled.View`
  position: absolute;
  top: 50%;
  transform: translateY(-50px);
  right: 0;
  height: 100px;
`;

import { BlurView } from '@react-native-community/blur';
import RadialGradient from 'react-native-radial-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Satoshi500 } from 'constants/fonts';
import { whiteColor } from 'constants/colors';

export const StyledRadialGradient = styled(RadialGradient)`
  padding: 16px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 8px;
`;

export const ProfileImageContainer = styled.TouchableOpacity`
  position: relative;
  padding-top: 12px;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 100px;
  background-color: ${whiteColor};
`;

export const OverlayContainer = styled.View`
  position: absolute;
  top: -5px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  align-items: center;
`;

export const PercentageText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(14, 812)}px;
  font-family: ${Satoshi500};
  text-align: center;
`;

export const GradientBackground = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const GradientContainer = styled.View`
  background-color: rgba(35, 35, 35, 0.5);
  padding-horizontal: 8px;
  padding-vertical: 4px;
  border-radius: 100px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  position: absolute;
  bottom: 0;
  z-index: 20;
`;

export const EditIconContainer = styled.View`
  position: absolute;
  right: 14px;
  top: 10px;
`;

export const ProgressCircleContainer = styled.View`
  position: absolute;
  bottom: 80px;
  z-index: 0;
`;

export const PercentageTextBlur = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
`;

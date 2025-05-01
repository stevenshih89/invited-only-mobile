import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView, View, Image, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';
import {backgroundGradientColors, whiteColor} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';

// Root gradient background
export const RootGradient = styled(LinearGradient).attrs({
  colors: backgroundGradientColors,
  start: {x: 0, y: 1},
  end: {x: 0, y: 0},
})`
  flex: 1;
`;

// Safe area
export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  padding-bottom: 0px;
`;

// Main content container
export const Container = styled(View)`
  flex: 1;
  padding-horizontal: 24px;
  justify-content: space-around;
`;

// Logo wrapper
export const LogoWrapper = styled(View)`
  align-items: center;
  margin-top: -20px;
`;

// Photo wrapper
export const PhotoWrapper = styled(View)`
  align-self: center;
  width: 180px;
  height: 180px;
  position: relative;
`;

// Icon overlay
export const VerifiedIcon = styled(View)`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10;
`;

// Verified image
export const VerifiedImage = styled(Image)`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

// Description text
export const Description = styled(Text)`
  text-align: center;
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 812)}px;
  color: ${whiteColor};
  margin-top: 20px;
`;

// Loader animation wrapper
export const LoaderWrapper = styled(Animated.View)`
  width: 90px;
  height: 90px;
  align-self: center;
  margin-top: 40px;
`;

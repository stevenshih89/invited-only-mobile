import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Satoshi400, Satoshi700 } from 'constants/fonts';
import { lightGray19Color, whiteColor, backgroundGradientColors } from 'constants/colors';
import { screenHeight, screenWidth } from 'constants/common';

export const OnBoardingTextTitle = styled.Text`
  color: white;
  text-align: center;
  letter-spacing: -0.5px;
  width: ${screenWidth * 0.7}px;
  font-family: ${Satoshi700};
  font-size: ${RFValue(22, 812)}px;
`;

export const BgCardImage = styled.Image`
  width: ${screenWidth * 1}px;
  margin-left: ${screenWidth * 0.05}px;
  height: ${screenHeight * 0.5}px;
`;

export const OnBoardingTopViewContainer = styled.View`
  gap: 20px;
  display: flex;
  justify-content: center;
  width: ${screenWidth * 1}px;
  height: ${screenHeight * 0.85}px;
  align-items: center;
`;

export const BackgroundDottedLineLeft = styled.Image`
  position: absolute;
  width: ${screenWidth * 0.8}px;
  height: ${screenHeight * 0.25}px;
  top: 50px;
  background-color: transparent;
`;

export const BackgroundDottedLineRight = styled.Image`
  position: absolute;
  width: 280px;
  top: 20px;
  height: 300px;
  left: 210px;
`;

export const GetAccessContainer = styled.View`
  margin-bottom: ${Dimensions.get('window').height / 30}px;
  margin-top: 10px;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const AcceptPolicyTop = styled.Text`
  font-family: ${Satoshi700};
  font-weight: 100;
  font-size: ${RFValue(14, 932)}px;
  color: ${lightGray19Color};
`;

export const AcceptPolicyMid = styled.Text`
  font-family: ${Satoshi700};
  font-weight: 500;
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
`;

export const AcceptPolicyBottom = styled.Text`
  font-family: ${Satoshi700};
  font-weight: 500;
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
`;

export const AccountQuestionText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
`;

export const SignInText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(14, 932)}px;
`;

// Root gradient background
export const RootGradient = styled(LinearGradient).attrs({
  colors: backgroundGradientColors,
  start: { x: 0, y: 1 },
  end: { x: 0, y: 0 },
})`
  flex: 1;
`;

// Safe area
export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

// Full overlay container
export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

// Logo container
export const LogoContainer = styled.View`
  margin-top: ${Dimensions.get('window').height / 2.7}px;
  align-items: center;
`;

// Bottom content container
export const BottomContainer = styled.View`
  margin-top: auto;
  align-items: center;
  padding-horizontal: 24px;
  width: 100%;
  margin-bottom: 10px;
`;

// Wrapper for button and GetAccessContainer
export const ButtonWrapper = styled.View`
  width: 100%;
  gap: 10px;
`;

// Terms row containers
export const TermsContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-horizontal: 24px;
  margin-bottom: 16px;
`;

export const TermsText = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
  color: ${lightGray19Color};
  text-align: center;
  line-height: 20px;
`;

export const TermsLink = styled.Text`
  font-family: ${Satoshi700};
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
  text-decoration: underline;
`;

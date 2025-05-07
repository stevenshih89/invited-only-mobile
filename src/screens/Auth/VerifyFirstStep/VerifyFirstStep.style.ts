import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, ImageBackground} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {isIos, screenHeight} from 'constants/common';
import {backgroundGradientColors, blackColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import Button from 'components/Button/Button';

export const Background = styled(LinearGradient).attrs({
  colors: backgroundGradientColors,
  start: {x: 0, y: 1},
  end: {x: 0, y: 0},
})`
  flex: 1;
`;

export const AvoidingView = styled(KeyboardAvoidingView).attrs({
  behavior: isIos ? 'padding' : 'height',
  keyboardVerticalOffset: 15,
})`
  flex: 1;
`;

export const DismissTouchable = styled(TouchableWithoutFeedback)`;
`;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-horizontal: 24px;
  padding-top: ${screenHeight / 29}px;
`;

export const Centered = styled.View`
  align-items: center;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
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

export const TitleWrapper = styled.View`
  align-items: center;
  width: 100%;
  margin-top: ${screenHeight / 50}px;
  margin-bottom: ${screenHeight / 20}px;
`;

export const SectionHeader = styled.View`
  width: 100%;
  margin-top: ${screenHeight / 40}px;
`;

export const SectionTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(34, 932)}px;
`;

export const SectionSubtitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  margin-top: 16px;
  opacity: 0.8;
`;

export const ImageContainer = styled.View<{height: number}>`
  position: relative;
  width: 100%;
  height: ${({height}: {height: number}) => height}px;
  align-self: center;
  margin-top: 40px;
`;

export const PhotoBackground = styled(ImageBackground).attrs({
  imageStyle: {borderRadius: 15},
})`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  justify-content: flex-end;
  overflow: hidden;
`;

export const Overlay = styled.View`
  height: 36px;
  width: 100%;
  position: relative;
  justify-content: center;
  overflow: hidden;
`;

export const OverlayDark = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -2px;
  background-color: ${blackColor};
  opacity: 0.87;
`;

export const NameRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const NameText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(20, 932)}px;
  margin-right: 8px;
`;

export const SelfieBackground = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  justify-content: flex-end;
`;

export const SelfieOverlay = styled.View`
  height: ${screenHeight / 20}px;
  width: 100%;
  position: relative;
  justify-content: center;
  overflow: hidden;
`;

export const SelfieDark = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -2px;
  background-color: ${blackColor};
  opacity: 0.87;
`;

export const Footer = styled.View`
  margin-bottom: 4px;
  gap: 16px;
`;

export const TransparentButton = styled(Button).attrs({variant: 'transparent'})``;

export const SkipButton = styled(TouchableOpacity)`;`;

export const SkipText = styled.Text`
  font-size: ${RFValue(18, 812)}px;
  font-family: ${Satoshi500};
  color: ${whiteColor};
  margin-top: 20px;
  text-align: center;
`;

import styled from 'styled-components/native';
import {KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  backgroundGradientColors,
  black1Color,
  blackColor,
  errorColor,
  lightGray2Color,
  transparentWhite30Color,
  whiteColor,
} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import {isIos, screenHeight} from 'constants/common';

export const GradientBackground = styled(LinearGradient).attrs({
  colors: backgroundGradientColors,
  start: {x: 0, y: 1},
  end: {x: 0, y: 0},
})`
  flex: 1;
`;

export const AvoidingContainer = styled(KeyboardAvoidingView).attrs({
  behavior: isIos ? 'padding' : 'height',
  keyboardVerticalOffset: 15,
})`
  flex: 1;
  padding-bottom: 0px;
  background-color: ${black1Color};
`;

export const TouchableDismiss = styled(TouchableWithoutFeedback)``;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  padding-bottom: 0px;
`;

export const Wrapper = styled(View)`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 0px;
  padding-horizontal: 24px;
  padding-top: ${screenHeight / 29}px;
`;

export const Header = styled(View)`
  align-items: center;
`;

export const TopRow = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
  hitSlop: {top: 20, bottom: 20, left: 20, right: 20},
})`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${transparentWhite30Color};
`;

export const TitleContainer = styled(View)`
  width: 100%;
  margin-bottom: ${screenHeight / 28}px;
  margin-top: ${screenHeight / 11.5}px;
`;

export const Title = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(48, 932)}px;
  margin-bottom: 18px;
`;

export const Subtitle = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
`;

export const PhotosRow = styled(View)`
  width: 100%;
  flex-direction: row;
`;

export const MainPhotoContainer = styled(View)`
  width: 60%;
  height: ${RFValue(350, 932)}px;
  margin-right: 6px;
`;

export const SmallPhotoColumn = styled(View)`
  flex: 1;
  margin-left: 6px;
`;

export const SmallPhotoTop = styled(View)`
  flex: 1;
  margin-bottom: 6px;
`;

export const SmallPhotoBottom = styled(View)`
  flex: 1;
  margin-top: 6px;
`;

export const ImageWrapper = styled(View)`
  position: relative;
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
`;

export const PhotoBackground = styled(ImageBackground).attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export const CloseButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
  hitSlop: {left: 15, bottom: 10},
})`
  width: 26px;
  height: 26px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  border-radius: 50px;
  background-color: ${errorColor};
  margin-right: 10px;
  margin-top: 10px;
`;

export const AddPhotoButtonMain = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  flex: 1;
  background-color: ${lightGray2Color};
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

export const AddPhotoButtonSmall = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  flex: 1;
  background-color: ${lightGray2Color};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

export const LabelContainer = styled(View)`
  background-color: ${blackColor};
  border-radius: 42px;
  padding-horizontal: 10px;
  align-self: center;
  justify-content: center;
  align-items: center;
  padding-vertical: 5px;
  margin-bottom: 10px;
`;

export const LabelText = styled(Text)`
  font-family: ${Satoshi700};
  font-size: ${RFValue(12, 932)}px;
  color: ${whiteColor};
`;

export const ContinueButtonContainer = styled(View)`
  margin-bottom: 4px;
`;

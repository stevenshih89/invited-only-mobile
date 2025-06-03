import styled from 'styled-components/native';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  ViewProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {BlurView} from '@react-native-community/blur';
import Animated from 'react-native-reanimated';
import {backgroundGradientColors, black1Color, errorColor, whiteColor} from 'constants/colors';
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
  padding-top: 16px;
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

export const TitleContainer = styled(View)`
  width: 100%;
  margin-bottom: ${screenHeight / 40}px;
  margin-top: ${screenHeight / 30}px;
`;

export const Title = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  margin-bottom: 16px;
  line-height: ${RFValue(48, 932)}px;
`;

export const Subtitle = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  line-height: ${RFValue(27, 932)}px;
  letter-spacing: -0.3px;
  opacity: 0.8;
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
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

export const AddPhotoButtonSmall = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

export const ContinueButtonContainer = styled(View)`
  margin-bottom: 4px;
`;

export const PhotoContainer = styled(Animated.View)`
  width: 48%;
  aspect-ratio: 7/8;
  border-radius: 10px;
  overflow: hidden;
`;

export const ImageContainer = styled.View`
  position: relative;
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
`;

export const StyledImageBackground = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.View<ViewProps>`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const ButtonWrapper = styled.View<{backgroundColor?: string}>`
  position: relative;
  width: 26px;
  height: 26px;
  margin-right: 10px;
  margin-top: 10px;
  background-color: ${({backgroundColor}: {backgroundColor?: string}) => backgroundColor || '#232323'};
  border-radius: 100px;
`;

export const ButtonBlur = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  overflow: hidden;
`;

export const Button = styled(TouchableOpacity)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

export const LabelContainer = styled.View`
  background-color: rgba(35, 35, 35, 0.5);
  border-radius: 42px;
  padding-horizontal: 16px;
  align-self: center;
  justify-content: center;
  align-items: center;
  padding-vertical: 2px;
  position: absolute;
  bottom: 6px;
  overflow: hidden;
`;

export const LabelBlur = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const LabelText = styled.Text`
  font-family: ${Satoshi700};
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
`;

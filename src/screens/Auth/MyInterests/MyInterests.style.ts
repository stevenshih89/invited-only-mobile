import styled from 'styled-components/native';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {isIos, screenHeight} from 'constants/common';
import {backgroundGradientColors, blackColor, transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';
import Button from 'components/Button/Button';

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
  margin-bottom: ${screenHeight / 40}px;
  margin-top: ${screenHeight / 50}px;
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
  font-size: ${RFValue(17, 932)}px;
`;

export const BoldText = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(17, 932)}px;
`;

export const ListContainer = styled(View)`
  width: 100%;
  height: ${screenHeight / 2}px;
`;

export const InterestsList = styled(FlatList).attrs({
  contentContainerStyle: {width: '100%'},
  columnWrapperStyle: {justifyContent: 'space-between'},
})``;

export const InterestSeparator = styled(View)`
  height: ${screenHeight * 0.021}px;
`;

export const InterestItem = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})<{selected: boolean}>`
  flex: 1;
  width: 100%;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props: {selected: boolean}) => (props.selected ? whiteColor : blackColor)};
  border-radius: 12px;
  margin-horizontal: 2px;
`;

export const ImageWrapper = styled(View)`
  width: 100%;
  height: ${screenHeight * 0.268}px;
  border-radius: 12px;
  overflow: hidden;
`;

export const BackgroundImage = styled(ImageBackground).attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export const CheckButton = styled(TouchableOpacity)<{selected: boolean}>`
  background-color: ${whiteColor};
  width: 20px;
  height: 20px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-right: 11px;
  margin-top: 16px;
  opacity: ${(props: {selected: boolean}) => (props.selected ? 1 : 0.3)};
`;

export const LabelBar = styled(View)`
  background-color: ${whiteColor};
  height: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const LabelBarRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const InterestTitle = styled(Text)`
  color: ${blackColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(14, 932)}px;
  margin-left: 16px;
`;

export const AvatarStack = styled(View)`
  flex-direction: row;
`;

export const Avatar = styled(Image)`
  width: 18px;
  height: 18px;
  border-radius: 18px;
  border-width: 1px;
  border-color: ${whiteColor};
`;

export const AvatarSecond = styled(Avatar)`
  margin-left: -8px;
`;

export const AvatarCount = styled(View)`
  width: 18px;
  height: 18px;
  background-color: ${blackColor};
  border-radius: 18px;
  border-width: 1px;
  border-color: ${whiteColor};
  align-items: center;
  justify-content: center;
  margin-left: -16px;
`;

export const CountText = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(6, 932)}px;
`;

export const ButtonsContainer = styled(View)`
  margin-bottom: 0px;
`;

export const ContinueButton = styled(Button).attrs(({disabled}: {disabled?: boolean}) => ({
  testID: 'continue-button',
  buttonStyle: {borderRadius: 18},
}))``;

export const SkipButton = styled(Button).attrs({
  variant: 'transparent',
})``;

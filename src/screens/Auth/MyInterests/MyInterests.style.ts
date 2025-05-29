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
import {backgroundGradientColors, blackColor, whiteColor} from 'constants/colors';
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

export const BackButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
  hitSlop: {top: 20, bottom: 20, left: 20, right: 20},
})`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: #0f0f0f;
`;

export const TitleContainer = styled(View)`
  width: 100%;
  margin-bottom: ${screenHeight / 40}px;
  margin-top: ${screenHeight / 50}px;
`;

export const Title = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  margin-bottom: 16px;
`;

export const Subtitle = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  opacity: 0.8;
`;

export const BoldText = styled(Text)`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(17, 932)}px;
`;

export const ListContainer = styled(View)`
  width: 100%;
  height: ${screenHeight / 1.8}px;
`;

export const InterestsList = styled(FlatList).attrs({
  contentContainerStyle: {width: '100%'},
  columnWrapperStyle: {justifyContent: 'space-between'},
})``;

export const InterestSeparator = styled(View)`
  height: ${screenHeight * 0.021}px;
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

export const ContinueButton = styled(Button).attrs({
  testID: 'continue-button',
  buttonStyle: {
    marginBottom: 8,
  },
})``;

export const SkipButton = styled(Button).attrs({
  testID: 'skip-button',
  variant: 'gray',
})``;

export const SelectionIndicator = styled.View<{isSelected: boolean}>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: 'rgba(255,255,255, 0.6)';
  background-color: ${(props: {isSelected: boolean}) => (props.isSelected ? whiteColor : 'rgba(0,0,0, 0.5)')};
  position: absolute;
  top: 12px;
  right: 12px;
  justify-content: center;
  align-items: center;
`;

export const InterestItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 48%;
  margin-horizontal: 1%;
  margin-bottom: 16px;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  border-width: 1px;
  border-color: ${(props: {isSelected: boolean}) => (props.isSelected ? whiteColor : 'transparent')};
`;

export const InterestImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export const InterestOverlay = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const InterestTitle = styled.Text`
  font-family: ${Satoshi700};
  font-size: ${RFValue(20, 932)}px;
  color: ${whiteColor};
  padding-bottom: 10px;
  padding-horizontal: 10px;
`;

export const InterestTitleWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 8px;
  z-index: 1;
`;

export const ItemGradient = styled(LinearGradient)`
  position: 'absolute';
  bottom: 0;
  left: 0;
  right: 0;
  top: '75%';
`;

export const ListGradient = styled(LinearGradient)`
  position: 'absolute';
  bottom: 0;
  left: 0;
  right: 0;
  top: '95%';
`;

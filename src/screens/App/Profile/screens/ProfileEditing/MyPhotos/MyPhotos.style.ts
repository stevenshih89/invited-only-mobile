import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {ImageBackground, TouchableOpacity, ViewProps} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import RadialGradient from 'react-native-radial-gradient';
import {whiteColor} from 'constants/colors';
import { Satoshi500, Satoshi700} from 'constants/fonts';

export const StyledRadialGradient = styled(RadialGradient)`
  padding: 16px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 8px;
`;

export const Container = styled(GestureHandlerRootView)`
  padding: 20px;
  border-radius: 10px;
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  margin-bottom: 26px;
`;

export const PhotosGrid = styled.View`
  width: 100%;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
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

export const PlusButton = styled(TouchableOpacity)`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

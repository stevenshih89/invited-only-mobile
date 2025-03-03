import {black1Color, whiteColor} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import Animated from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const MainContainer = styled.View`
  display: flex;
  gap: 12px;
`;

export const BackgroundImage = styled.ImageBackground`
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 533;
  width: max-content;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const EnterButton = styled.TouchableOpacity`
  background-color: ${whiteColor};
  border-radius: 18px;
  height: ${screenHeight / 14};
  width: ${screenWidth / 1.1};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${screenWidth / 39};
  max-height: 64;
`;

export const ButtonText = styled.Text`
  color: ${black1Color};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 812)};
  margin-right: 4;
`;

export const AnimatedWordsStyle = styled(Animated.Text)`
  color: white;
  font-size: 86px;
  font-family: ${Satoshi400};
`;

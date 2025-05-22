import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import { screenHeight, screenWidth } from 'constants/common';
import { black1Color, whiteColor } from 'constants/colors';

const { height } = Dimensions.get('window');

export const MainContainer = styled.View`
  display: flex;
  height: ${height * 1}px;

`;

export const BackgroundImage = styled.ImageBackground`
  display: flex;
  position: fixed;
  height: ${height * 0.80}px;
  width: 100%;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const EnterButton = styled.TouchableOpacity`
  background-color: ${whiteColor};
  border-radius: 28px;
  height: ${screenHeight / 14}px;
  width: ${screenWidth / 1.1}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${screenWidth / 39}px;
  max-height: 64px;
`;

export const ButtonText = styled.Text`
  color: ${black1Color};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 812)}px;
  margin-right: 4px;
`;

export const AnimatedWordsStyle = styled(Animated.Text)`
  color: white;
  font-size: 86px;
  font-family: ${Satoshi400};
`;


import {black1Color, whiteColor} from 'constants/colors';
import {screenHeight, screenWidth} from 'constants/common';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
const {height} = Dimensions.get('window');

export const MainContainer = styled.View`
  display: flex;
  gap: 12px;
`;

export const BackgroundImage = styled.ImageBackground`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: ${height * 0.6}px;
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
  border-radius: 18px;
  height: ${screenHeight / 14};
  width: ${screenWidth / 1.1};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${screenWidth / 39};
  max-height: 64px;
`;

export const ButtonText = styled.Text`
  color: ${black1Color};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 812)};
  margin-right: 4px;
`;

export const AnimatedWordsStyle = styled(Animated.Text)`
  color: white;
  font-size: 86px;
  font-family: ${Satoshi400};
`;

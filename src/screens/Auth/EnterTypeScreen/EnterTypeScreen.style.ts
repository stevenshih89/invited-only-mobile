import {Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {black1Color, whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';

const {height} = Dimensions.get('window');

export const MainContainer = styled.View`
  display: flex;
  height: ${height * 1}px;
`;

export const BackgroundImage = styled.ImageBackground`
  display: flex;
  position: fixed;
  height: ${height * 0.8}px;
  width: 100%;
`;

export const ButtonsContainer = styled.View`
  margin-top: auto;
  margin-bottom: ${screenHeight / 12}px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding-horizontal: 24px;
`;

export const EnterButton = styled.TouchableOpacity`
  background-color: ${whiteColor};
  border-radius: 100px;
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${black1Color};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  margin-right: 4px;
`;

export const AnimatedWordsStyle = styled(Animated.Text)`
  color: white;
  font-size: 86px;
  font-family: ${Satoshi400};
`;

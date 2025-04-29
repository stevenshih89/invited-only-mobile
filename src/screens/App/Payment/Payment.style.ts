import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { whiteColor } from 'constants/colors';
import { Satoshi500 } from 'constants/fonts';
import { screenHeight, screenWidth } from 'constants/common';

export const GradientContainer = styled(LinearGradient)`
  flex: 1;
`;

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
`;

export const ContentContainer = styled.View`
  margin-horizontal: 24px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderPlaceholder = styled.View``;

export const HeaderTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(24, 932)}px;
  margin-left: 25px;
`;

export const CloseButton = styled.TouchableOpacity<{ activeOpacity: number }>`
  opacity: ${({ activeOpacity }: { activeOpacity: number }) => activeOpacity};
`;

export const AnimationContainer = styled.View`
  margin-top: 40px;
  height: ${screenHeight / 3.58}px;
  width: 100%;
  align-items: center;
`;

export const StyledLottieView = styled(LottieView)`
  height: 200px;
  width: 300px;
  background-color: red;
`;

export const ButtonContainer = styled.View`
  padding-horizontal: 24px;
  padding-bottom: 24px;
  margin-top: 40px;
`;

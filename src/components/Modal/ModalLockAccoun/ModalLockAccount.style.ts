import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { blackColor, transparent60Color, whiteColor } from 'constants/colors.ts';
import { Satoshi400, Satoshi500, Satoshi700 } from 'constants/fonts.ts';

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${transparent60Color};
  z-index: 1000;
`;

export const LockedWrapper = styled.View`
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
`;

export const LockIconWrapper = styled.View`
  align-self: center;
  border-radius: 60px;
  background-color: ${blackColor};
  width: 62px;
  height: 62px;
  justify-content: center;
  align-items: center;
`;

export const LockDescriptionWrapper = styled.View`
  max-width: 320px;
  margin-top: 8px;
  padding: 16px;
  border-radius: 14px;
  background-color: ${blackColor};
  align-self: center;
`;

export const LockedTitle = styled.Text`
  color: ${whiteColor};
  text-align: center;
  margin-bottom: 10px;
  font-family: ${Satoshi700};
  font-size: ${RFValue(20, 812)}px;
`;

export const LockedSubtitle = styled.Text`
  color: ${whiteColor};
  text-align: center;
  margin-bottom: 10px;
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 812)}px;
`;

export const LockedHaveCodeWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LockedHaveCodeTitle = styled.Text`
  color: ${whiteColor};
  text-align: center;
  font-family: ${Satoshi500};
  font-size: ${RFValue(12, 812)}px;
`;

export const LockedHaveCodePressableText = styled.Text`
  text-decoration-line: underline;
  margin-left: 4px;
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(12, 812)}px;
`;

export const ButtonWrapper = styled.View`
  position: absolute;
  bottom: 120px;
  z-index: 2000;
  width: 100%;
  padding-horizontal: 24px;
  align-items: center;
`;

export const GradientButton = styled(LinearGradient)`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 68px;
  align-items: center;
  border-radius: 10px;
  z-index: 3000;
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-size: ${RFValue(20, 812)}px;
  line-height: ${RFValue(24, 812)}px;
  font-family: ${Satoshi500};
`;

export const BottomButtonWrapper = styled.TouchableOpacity`
  width: 100%;

`;

import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import MaskInput from 'react-native-mask-input';
import LinearGradient from 'react-native-linear-gradient';

import {Text, View, TextInput} from 'react-native';
import {screenHeight} from 'constants/common';
import {transparentWhite30Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500, Satoshi700} from 'constants/fonts';

export const GradientBackground = styled(LinearGradient).attrs({
  // Set default gradient props if needed, or pass them in the component
})`
  flex: 1;
`;

export const KeyboardAvoidingWrapper = styled.KeyboardAvoidingView`
  flex: 1;
  padding-bottom: 0;
`;

export const InnerWrapper = styled.SafeAreaView`
  flex: 1;
  padding-bottom: 0;
`;

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 0;
  padding-horizontal: 24px;
  padding-top: ${screenHeight / 29}px;
`;

export const TopContent = styled.View`
  align-items: center;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${transparentWhite30Color};
`;

export const TitleContainer = styled.View`
  width: 100%;
  margin-bottom: ${screenHeight / 26}px;
  margin-top: ${screenHeight / 20}px;
`;

export const TitleText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(48, 932)}px;
  margin-bottom: 18px;
`;

export const SubtitleText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
`;

export const DateInputRow = styled.View`
  width: 100%;
  flex-direction: row;
  height: 64px;
`;

export const DateInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-radius: 100px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.04);
`;
export const InputLabel = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(13, 932)}px;
`;

export const StyledMaskInput = styled(MaskInput)`
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
  border-radius: 100px;
  flex: 1;
`;

export const ShowAgeContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${screenHeight / 26}px;
`;

export const ShowAgeText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
`;

export const BottomContent = styled.View`
  padding-bottom: ${screenHeight / 40}px;
  gap: 16px;
  width: 100%;
`;

export const SkipButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 20px;
`;

export const SkipButtonText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(16, 932)}px;
`;

export const ErrorText = styled.Text`
  color: #ff3b30;
  font-size: 14px;
  margin-top: 8px;
`;
export const HalfFieldContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
`;
export const FieldLabel = styled(Text)`
  font-family: ${Satoshi500};
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;

export const Input = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 10px;
  width: 100%;
  height: 56px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 99px;
`;

export const StyledTextInput = styled(TextInput)`
  color: #ffffff;
  width: 100%;
  font-family: ${Satoshi500};
  font-size: 18px;
`;

import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import MaskInput from 'react-native-mask-input';
import LinearGradient from 'react-native-linear-gradient';

import { screenHeight } from 'constants/common';
import { lightGray2Color, transparentWhite30Color, whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi500, Satoshi700 } from 'constants/fonts';

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
  margin-top: ${screenHeight / 11.5}px;
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

interface DateInputContainerProps {
  marginRight?: number;
  marginHorizontal?: number;
  marginLeft?: number;
}

export const DateInputContainer = styled.View<DateInputContainerProps>`
  flex: 1;
  margin-right: ${({ marginRight }: DateInputContainerProps) => marginRight || 0}px;
  margin-left: ${({ marginLeft }: DateInputContainerProps) => marginLeft || 0}px;
  margin-horizontal: ${({ marginHorizontal }: DateInputContainerProps) => marginHorizontal || 0}px;
`;

export const InputLabel = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(13, 932)}px;
`;

export const StyledMaskInput = styled(MaskInput)`
  height: 64;
  flex: 1;
  color: ${whiteColor};
  border-radius: 10px;
  background-color: ${lightGray2Color};
  /* Adjust height/flex based on usage in component */
  height: 64px;
  padding-horizontal: 20px;
  margin-top: 12px;
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
  padding-bottom: ${screenHeight / 22}px; /* Adjust as needed */
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

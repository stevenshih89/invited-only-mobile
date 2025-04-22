import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import MaskInput from 'react-native-mask-input';
import {blackColor, whiteColor, transparentGray90Color, lightGray2Color} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  padding-bottom: 0;
`;

export const Container = styled.View`
  background-color: ${blackColor};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-bottom: 40px;
  padding-top: 16px;
  padding-horizontal: 30px;
`;

export const HandleBar = styled.View`
  background-color: ${whiteColor};
  height: 2px;
  border-radius: 10px;
  width: 40px;
  align-self: center;
  margin-bottom: 22px;
`;

export const IconContainer = styled.View`
  border-radius: 100px;
  background-color: ${transparentGray90Color};
  height: 84px;
  width: 84px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 20px;
`;

export const TitleText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(24, 812)}px;
  text-align: center;
  margin-bottom: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 34px;
`;

export const OptionText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(18, 812)}px;
  font-family: ${Satoshi400};
`;

export const InputRow = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const InputContainer = styled.View`
  flex: 1;
  margin: 0 6px;
`;

export const LabelText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(13, 812)}px;
`;

export const MaskedInput = styled(MaskInput)`
  color: ${whiteColor};
  border-radius: 10px;
  background-color: ${lightGray2Color};
  height: 64px;
  padding-horizontal: 20px;
  margin-top: 12px;
  flex: 1;
`;

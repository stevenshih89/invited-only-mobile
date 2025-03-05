import styled from 'styled-components/native';
import {errorColor, lightGray2Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  height: 56px;
  border-radius: 10px;
  border-width: 0;
  background-color: ${lightGray2Color};
  flex-direction: row;
  padding-right: 8px;
  padding-bottom: 8px;
  justify-content: space-between;
`;

export const TitleText = styled.Text`
  margin-bottom: 12px;
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 812)}px;
`;

export const WrapperInputIcon = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  width: 20px;
`;

export const InputField = styled.TextInput`
  min-width: 200px;
  padding-left: 12px;
  padding-top: 8px;
  padding-bottom: 0;
  font-size: ${RFValue(18, 812)}px;
`;

export const ErrorText = styled.Text`
  font-size: ${RFValue(14, 812)}px;
  font-family: ${Satoshi500};
  color: ${errorColor};
`;

export const WrapperErrorText = styled.View`
  margin-top: 2px;
  margin-bottom: 4px;
  flex-direction: row;
  align-items: center;
`;

export const InputTouchableWrappper = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  border-radius: 10px;
  border-width: 0;
  background-color: ${lightGray2Color};
  flex-direction: row;
  padding-right: 8px;
  padding-bottom: 8px;
  justify-content: space-between;
`;

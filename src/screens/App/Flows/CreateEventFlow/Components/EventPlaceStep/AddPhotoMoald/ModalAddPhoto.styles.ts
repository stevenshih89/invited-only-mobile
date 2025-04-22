import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { blackColor, lightGray2Color, whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi500 } from 'constants/fonts';

export const ModalContainer = styled.View`
  background-color: ${blackColor};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-bottom: 40px;
  padding-top: 16px;
  padding-horizontal: 30px;
`;

export const ModalDivider = styled.View`
  background-color: ${whiteColor};
  height: 2px;
  border-radius: 10px;
  width: 40px;
  align-self: center;
  margin-bottom: 22px;
`;

export const ModalTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(24, 812)}px;
  text-align: center;
  margin-bottom: 10px;
`;

export const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 16px;
  padding-horizontal: 20px;
`;

export const PlaceholderButton = styled(OptionButton)`
  background-color: ${lightGray2Color};
  border-radius: 10px;
`;

export const OptionText = styled.Text`
  font-size: ${RFValue(18, 812)}px;
  font-family: ${Satoshi500};
  color: ${whiteColor};
  margin-left: 10px;
`;

import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

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

export const TitleText = styled.Text`
  font-size: ${RFValue(24, 812)}px;
  font-family: ${Satoshi500};
  color: ${whiteColor};
  margin-bottom: 20px;
  text-align: center;
`;

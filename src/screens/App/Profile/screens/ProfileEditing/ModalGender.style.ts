import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, whiteColor, transparentGray90Color, transparentWhite16Color, lightGray15Color} from 'constants/colors';
import {Satoshi400} from 'constants/fonts';

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
  text-transform: capitalize;
`;

export const OptionContainer = styled.TouchableOpacity<{isActive: boolean}>`
  border-bottom-width: 1px;
  border-style: solid;
  border-radius: ${({isActive}: {isActive: boolean}) => (isActive ? 10 : 0)}px;
  border-bottom-color: ${({isActive}: {isActive: boolean}) => (isActive ? 'transparent' : transparentWhite16Color)};
  background-color: ${({isActive}: {isActive: boolean}) => (isActive ? lightGray15Color : 'transparent')};
  padding: 16px;
`;

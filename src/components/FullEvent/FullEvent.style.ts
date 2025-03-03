import styled from 'styled-components/native';
import {blackColor, orangeClose, transparentWhite30Color, whiteColor } from 'constants/colors';
import { Satoshi700 } from 'constants/fonts';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  padding-horizontal: 20px;
  margin-bottom: 18px;
  width: 100%;
`;

export const EventWrapper = styled.View`
  background-color: ${orangeClose};
  border-radius: 10px;
  width: 100%;
  padding-vertical: 6px;
  padding-horizontal: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UsersWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const User = styled.View`
align-items: center;
justify-content: center;
position: relative;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border-width: 1px;
  border-color: ${whiteColor};
`;

export const RequestsWrapper = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border-width: 1px;
  border-color: ${transparentWhite30Color};
  align-items: center;
  justify-content: center;
`;

export const RequestsCountWrapper = styled.View`
  width: 24px;
  height: 24px;
  background-color: ${whiteColor};
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;
export const TextCount = styled.Text`
  color: ${blackColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(10, 812)}px;
  text-align: center;
`;

export const TextContent = styled.Text`
  font-family: ${Satoshi700};
  font-size: ${RFValue(11, 812)}px;
  color: ${whiteColor};
  margin-left: 6px;
`;

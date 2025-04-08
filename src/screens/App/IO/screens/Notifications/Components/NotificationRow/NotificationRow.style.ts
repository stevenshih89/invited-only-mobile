import styled from 'styled-components/native';
import {blackColor, transparentWhite16Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  padding-vertical: 16px;
`;

export const Image = styled(FastImage)`
  width: 56px;
  height: 56px;
  border-radius: 56px;
`;

export const ContentContainer = styled.View`
  margin-left: 16px;
  justify-content: center;
  flex: 1;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(16, 812)}px;
  font-family: ${Satoshi700};
  margin-bottom: 4px;
  flex-shrink: 1;
`;

export const MarkContainer = styled.View`
  border-radius: 40px;
  background-color: ${whiteColor};
  padding-vertical: 4px;
  padding-horizontal: 8px;
`;

export const MarkText = styled.Text`
  color: ${blackColor};
  font-size: ${RFValue(12, 812)}px;
  font-family: ${Satoshi700};
`;

export const BodyText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(16, 812)}px;
  font-family: ${Satoshi400};
`;

export const UnderlayRight = styled.View`
  flex: 1;
  background-color: #141414;
  justify-content: center;
  align-items: flex-end;
  padding-right: 20px;
`;

export const DeleteText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(16, 812)}px;
  font-family: ${Satoshi700};
  margin-top: 8px;
  text-align: center;
`;

export const TimeAgoText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(12, 812)}px;
  font-family: ${Satoshi400};
  opacity: 0.6;
  margin-top: 4px;
`;

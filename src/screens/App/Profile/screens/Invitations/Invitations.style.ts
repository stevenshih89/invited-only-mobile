import styled from 'styled-components/native';
import {lightGray2Color, lightGray5Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color: ${lightGray5Color};
  border-radius: 10px;
  padding: 20px;
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 812)}px;
  color: ${whiteColor};
`;

export const InviteContainer = styled.View`
  margin-top: 10px;
`;

export const Label = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 812)}px;
  color: ${whiteColor};
  margin-top: 26px;
`;

export const InviteButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${lightGray2Color};
  padding: 20px;
  border-radius: 10px;
`;

export const InviteText = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 812)}px;
  color: ${whiteColor};
`;

export const ShareButton = styled.TouchableOpacity`
  margin-top: 14px;
`;

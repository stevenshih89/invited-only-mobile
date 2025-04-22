import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${blackColor};
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(24, 932)}px;
  text-align: center;
`;

export const Description = styled.Text`
  margin-top: 8px;
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
  text-align: center;
  opacity: 0.8;
`;

export const CreateEventButton = styled.TouchableOpacity`
  margin-top: 24px;
  padding: 4px;
  padding-right: 12px;
  border-radius: 100px;
  background-color: #141414;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const IconContainer = styled.View`
  background-color: #0b0b0b;
  padding: 5px;
  border-radius: 100px;
`;

export const ButtonText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
`;

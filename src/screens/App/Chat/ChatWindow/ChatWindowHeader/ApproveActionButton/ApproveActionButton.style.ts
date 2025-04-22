import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi500 } from 'src/constants/fonts';

export const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px 4px 4px;
  gap: 8px;
  width: 98px;
  height: 32px;
  background: #FFFFFF;
  border-radius: 100px;
`;

export const IconContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background: #010101;
  border-radius: 172.213px;
`;

export const ButtonText = styled.Text`
  width: 54px;
  height: 17px;
  font-family: ${Satoshi500};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #010101;
`;

export const CheckmarkText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(20, 892)}px;
  color:rgb(255, 255, 255);
`;
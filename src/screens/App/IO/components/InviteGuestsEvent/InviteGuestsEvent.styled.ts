import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  width: 382px;
  gap: 10px;
`;
export const CardContainer = styled.View`
  width: 90%;
  height: 550px;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const NoCardsText = styled.Text`
  font-size: ${RFValue(18, 932)};
  text-align: 'center';
`;

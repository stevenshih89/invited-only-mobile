import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const EulaTitle = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(20, 990)}px;
  color: ${whiteColor};
  text-align: center;
  margin-bottom: 14px;
`;
export const EulaTitleContainer = styled.View`
  display: flex;
  width: 60%;
  justify-content: center;
  align-items: center;
`;

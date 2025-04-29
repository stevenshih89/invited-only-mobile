import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const RestoreButton = styled.TouchableOpacity`
  margin-top: 12px;
  align-items: center;
  height: 38px;
  justify-content: center;
`;

export const UnderlineView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${whiteColor};
`;

export const RestoreText = styled.Text`
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  font-family: ${Satoshi500};
`;

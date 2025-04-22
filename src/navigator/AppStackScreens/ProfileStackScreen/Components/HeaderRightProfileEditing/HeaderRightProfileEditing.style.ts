import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const PreviewButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 24,
  },
})`
  margin-right: 24px;
`;

export const PreviewText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
`;

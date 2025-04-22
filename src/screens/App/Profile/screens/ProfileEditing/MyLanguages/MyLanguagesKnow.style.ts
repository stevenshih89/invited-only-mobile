import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import RadialGradient from 'react-native-radial-gradient';
import {Satoshi500,Satoshi400} from 'constants/fonts';

import { whiteColor} from 'constants/colors';

export const StyledRadialGradient = styled(RadialGradient)`
  padding: 16px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 8px;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
`;

export const RowContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
`;

export const LabelText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
`;

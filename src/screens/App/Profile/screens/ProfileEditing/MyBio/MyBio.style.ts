import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {TextareaItem} from '@ant-design/react-native';
import RadialGradient from 'react-native-radial-gradient';
import {whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';

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
  margin-bottom: 16px;
`;

export const TextAreaInput = styled(TextareaItem)`
  background-color: transparent;
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
`;

import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import RadialGradient from 'react-native-radial-gradient';
import {Satoshi400, Satoshi500} from 'constants/fonts';
import {blackColor, whiteColor} from 'constants/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${blackColor};
  padding: 16px;
`;

export const StyledRadialGradient = styled(RadialGradient)`
  padding: 16px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 8px;
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  margin-bottom: 24px;
`;

export const InputContainer = styled.View`
  margin-bottom: 24px;
`;

export const InputLabel = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
  margin-bottom: 8px;
`;

export const StyledInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 100px;
  padding: 16px;
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
`;

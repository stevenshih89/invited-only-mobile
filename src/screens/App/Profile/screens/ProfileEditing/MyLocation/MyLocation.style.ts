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
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const InputLabel = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
  margin-bottom: 8px;
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.3)',
})`
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 100px;
  padding: 16px;
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
`;

export const CityContainer = styled.View`
  border-radius: 100px;
  border-color: rgba(255, 255, 255, 0.05);
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const CityText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 932)}px;
  color: ${whiteColor};
  text-transform: capitalize;
`;

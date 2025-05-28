import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import RadialGradient from 'react-native-radial-gradient';
import {Satoshi500, Satoshi400, Satoshi700} from 'constants/fonts';

import {whiteColor} from 'constants/colors';

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

export const LanguagesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;

export const CounterContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 100px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

export const CounterText = styled.Text`
  font-family: ${Satoshi700};
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
`;

export const RoundedTextViewContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
  background-color: #1c1c1c;
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const WhiteTextInfo = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  margin-left: 6px;
`;

export const LanguageText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(18, 932)}px;
  margin-bottom: 2px;
  font-family: ${Satoshi500};
`;

export const VisibleLanguagesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 8px;
`;

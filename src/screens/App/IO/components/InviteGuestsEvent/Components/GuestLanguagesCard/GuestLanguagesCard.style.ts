import RadialGradient from 'react-native-radial-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Satoshi500} from 'constants/fonts';
import {whiteColor} from 'constants/colors';

export const StyledRadialGradient = styled(RadialGradient)`
  padding: 16px;
  border-radius: 20px;
  overflow: hidden;
`;

export const SectionTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
  margin-bottom: 8px;
  opacity: 0.5;
`;

export const LanguagesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const LanguageTag = styled.View`
  background-color: #1a1a1a;
  padding-right: 8px;
  padding-left: 4px;
  padding-vertical: 4px;
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
  gap: 8px;
`;

export const LanguageIconContainer = styled.View`
  background-color: #262626;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
`;

export const LanguageIcon = styled.Text`
  font-size: ${RFValue(18, 932)}px;
`;

export const LanguageText = styled.Text`
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  font-family: ${Satoshi500};
`;

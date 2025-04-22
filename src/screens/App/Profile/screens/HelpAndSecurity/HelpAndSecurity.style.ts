import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${blackColor};
  padding: 24px;
`;

export const SectionTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  margin-bottom: 24px;
`;

export const SupportSection = styled.TouchableOpacity`
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(13, 13, 13, 1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const SupportContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoContainer = styled.View`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  background-color: #141414;
  border-radius: 100px;
`;

export const SupportText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
`;

export const GuidelinesSection = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(13, 13, 13, 1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const GuidelinesContent = styled.View`
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

export const GuidelinesTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  margin-bottom: 8px;
`;

export const GuidelinesDescription = styled.Text`
  max-width: 70%;
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
  opacity: 0.6;
`;

export const SecuritySection = styled.View`
  background-color: rgba(13, 13, 13, 1);
  border-radius: 12px;
  padding: 16px;
`;

export const SecurityTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  margin-bottom: 8px;
`;

export const SecurityDescription = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
  opacity: 0.6;
  line-height: ${RFValue(20, 932)}px;
`;

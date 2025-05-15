import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import { blackColor, transparentWhite16Color, whiteColor } from 'constants/colors';

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 24px;
  background-color: ${blackColor};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  margin-top: 10px;
`;

export const FAQListContainer = styled.View`
  background-color: rgba(15, 15, 15, 1);
  margin-top: 34px;
  border-radius: 10px;
  padding: 20px;
`;

export const Separator = styled.View`
  height: 1px;
  margin-top: 24px;
  margin-bottom: 24px;
  background-color: ${transparentWhite16Color};
  width: 100%;
`;

export const FAQItem = styled.TouchableOpacity`
  flex: 1;
`;

export const FAQHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const FAQTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  flex: 1;
  margin-right: 10px;
`;

export const FAQDescription = styled.Text`
  color: rgba(255, 255, 255, 0.64);
  margin-top: 16px;
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Satoshi400};
`;

export const SupportContainer = styled.View`
  padding-top: 20px;
  background-color: rgba(15, 15, 15, 1);
  padding: 16px;
  border-radius: 20px;
  margin-top: 16px;
`;

export const SupportText = styled.Text`
  color: rgba(255, 255, 255, 0.64);
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
`;

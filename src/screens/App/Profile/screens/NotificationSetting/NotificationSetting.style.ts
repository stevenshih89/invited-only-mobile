import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Switch } from '@rneui/themed';
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import { whiteColor } from 'constants/colors';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: black;
`;

export const Container = styled.View`
  flex: 1;
  background-color: black;
  padding-horizontal: 24px;
  padding-top: 24px;
`;

export const ScrollContainer = styled.ScrollView``;

export const SectionContainer = styled.View`
  flex-direction: column;
  padding: 16px;
  background-color: rgba(11, 11, 11, 1);
  border-radius: 20px;
  margin-top: 8px;
`;

export const FirstSectionContainer = styled(SectionContainer)`
  margin-bottom: 8px;
`;

export const SwitchRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const SectionTitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
`;

export const SectionDescription = styled.Text`
  font-family: ${Satoshi400};
  color: #727579;
  font-size: ${RFValue(14, 932)}px;
`;

export const StyledSwitch = styled(Switch)`
  transform: scale(0.7);
`;

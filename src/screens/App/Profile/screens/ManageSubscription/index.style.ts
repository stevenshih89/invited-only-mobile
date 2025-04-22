import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, lightGray2Color, whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi500} from 'constants/fonts';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${blackColor};
`;

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 24px;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  margin-top: 8px;
  background-color: ${lightGray2Color};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  text-align: center;
  font-family: ${Satoshi500};
  margin-bottom: 24px;
  font-size: ${RFValue(48, 812)}px;
`;

export const Description = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(16, 812)}px;
  font-family: ${Satoshi400};
  text-align: center;
  margin-vertical: 24px;
`;

export const Link = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(16, 812)}px;
  text-decoration-line: underline;
`;

export const UpgradeButton = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const UpgradeText = styled.Text`
  font-size: ${RFValue(18, 812)}px;
  font-family: ${Satoshi500};
  margin-right: 4px;
`;

export const Text = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(16, 812)}px;
  font-family: ${Satoshi400};
  text-align: center;
`;

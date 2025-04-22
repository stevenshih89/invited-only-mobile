import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi400, Satoshi500, Satoshi700 } from 'constants/fonts';
import { blackColor, whiteColor } from 'constants/colors';

export const Container = styled.View`
  flex: 1;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${blackColor};
`;

export const ContentContainer = styled.View`
  padding-bottom: 120px;
  padding-top: 10px;
`;

export const NameContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const NameText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(20, 812)}px;
  font-family: ${Satoshi700};
`;

export const AgeText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(16, 812)}px;
  opacity: 0.6;
  font-family: ${Satoshi500};
  margin-top: 5px;
`;

export const AccountTypeWrapper = styled.View`
  margin-left: 6px;
  border-radius: 4px;
  padding-horizontal: 12px;
  padding-vertical: 2px;
`;

export const AccountTypeText = styled.Text`
  color: ${whiteColor};
  opacity: 0.6;
  font-size: ${RFValue(14, 812)}px;
  font-family: ${Satoshi700};
`;

export const LogoutButton = styled.TouchableOpacity`
  margin-top: 48px;
  background-color: rgba(20, 20, 20, 1);
  padding-vertical: 16px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

export const LogoutText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
`;

export const FooterLinks = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
`;

export const FooterLink = styled.TouchableOpacity``;

export const FooterLinkText = styled.Text`
  color: rgba(255, 255, 255, 0.64);
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Satoshi400};
`;

export const FooterDivider = styled.View`
  height: 12px;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.64);
`;

export const Copyright = styled.View`
  align-items: center;
  margin-top: 8px;
`;

export const CopyrightText = styled.Text`
  color: rgba(255, 255, 255, 0.32);
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
`;

export const NameAgeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AccountTypeContainer = styled.View`
  flex-direction: row;
  margin-bottom: 32px;
`;

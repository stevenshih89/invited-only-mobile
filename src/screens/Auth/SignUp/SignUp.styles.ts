import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenHeight } from 'constants/common';
import { whiteColor } from 'constants/colors';
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import LogoPrimary from 'assets/images/auth/logo-primary-2.svg';

export const Container = styled.View`

  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-bottom: 16px;
  gap: 4px;
  padding-top: 16px;
`;

export const ContentContainer = styled.View`
  padding-horizontal: 24px;
  width: 100%;
`;

export const LogoContainer = styled.View`
  align-items: center;
`;

export const LogoImage = styled(LogoPrimary)``;

export const HeaderContainer = styled.View`
  margin-bottom: ${screenHeight / 40}px;
  margin-top: ${screenHeight / 30}px;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  margin-bottom: 16px;
`;

export const Subtitle = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(18, 932)}px;
  opacity: 0.8;
`;

export const InputContainer = styled.View`
  flex: 1;
`;

export const Input = styled.TextInput`
    align-items: center;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 99px;
  border-width: 0.5px;
  flex-direction: row;
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 812)}px;
  color: ${whiteColor};
  text-align: left;
  height: 50px;
  opacity: ${(props: { isDisabled: any; }) => props.isDisabled ? 0.5 : 1};
  padding-horizontal: 12px;
`;

export const ButtonContainer = styled.View`
  padding-horizontal: 24px;
  margin-bottom: 4px;
`;
export const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  padding-bottom: 0;
`;

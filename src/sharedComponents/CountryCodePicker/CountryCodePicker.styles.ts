import styled from 'styled-components/native';
import { Animated, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { whiteColor, blackColor } from 'constants/colors';
import { Satoshi400 } from 'constants/fonts';

export const Container = styled.View`
  align-self: flex-start;

`;

export const Button = styled.TouchableOpacity<{ hasError?: boolean; isDisabled?: boolean }>`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 99px;
  border-width: 0.5px;
  flex-direction: row;
  height: 50px;
  opacity: ${(props: { isDisabled: any; }) => props.isDisabled ? 0.5 : 1};
  padding-horizontal: 16px;
`;

export const Flag = styled.Text`
  font-size: ${RFValue(32, 812)}px;
  margin-right: 8px;
`;

export const DialCode = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 812)}px;
  margin-right: 8px;
`;

export const ErrorText = styled.Text`
  color: #EF5555;
  font-family: ${Satoshi400};
  font-size: ${RFValue(12, 812)}px;
  margin-top: 5px;
`;

export const ModalOverlay = styled.TouchableOpacity`
  background-color: ${blackColor};
  flex: 1;
`;

export const DropdownContainer = styled(Animated.View)`
  background-color: ${blackColor};
  flex: 1;
  padding: 16px;
  padding-top: ${Platform.OS === 'ios' ? 60 : 40}px;
  width: 100%;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 8px;
  margin-right: 8px;
`;

export const CloseButtonText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 812)}px;
`;

export const SearchInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 99px;
  color: ${whiteColor};
  flex: 1;
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 812)}px;
  padding: 12px 16px;
  text-align: left;
`;

export const CountryList = styled.FlatList`
  flex: 1;
`;

export const CountryItem = styled.TouchableOpacity`
  align-items: center;
  border-bottom-color: rgba(255, 255, 255, 0.1);
  border-bottom-width: 0.5px;
  flex-direction: row;
  padding: 10px;
`;

export const CountryFlag = styled.Text`
  font-size: ${RFValue(24, 812)}px;
  margin-right: 10px;
`;

export const CountryName = styled.Text`
  color: ${whiteColor};
  flex: 1;
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 812)}px;
`;

export const CountryDialCode = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 812)}px;
  margin-left: 10px;
`;
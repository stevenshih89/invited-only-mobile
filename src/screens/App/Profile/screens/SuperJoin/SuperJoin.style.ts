import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView, View, TouchableOpacity, Image} from 'react-native';
import {whiteColor, lightGray16Color} from 'constants/colors';
import {screenHeight} from 'constants/common';
import {Satoshi400, Satoshi500} from 'constants/fonts';

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position: relative;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24, 932)}px;
  font-family: ${Satoshi500};
  color: ${whiteColor};
`;

export const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  right: 0;
  width: ${screenHeight / 22}px;
  height: ${screenHeight / 22}px;
  border-radius: 100px;
  background-color: #0f0f0f;
  justify-content: center;
  align-items: center;
`;

export const CardIcon = styled(View)`
  margin-bottom: 16px;
`;

export const CardTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${whiteColor};
  margin-bottom: 4px;
`;

export const CardSubtitle = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${lightGray16Color};
`;

export const OptionList = styled(View)`
  margin-top: ${screenHeight / 20}px;
  width: 100%;
`;

export const Footer = styled(View)`
  margin-top: auto;
  width: 100%;
`;

export const Content = styled(View)`
  flex: 1;
  padding-horizontal: 24px;
`;

export const CardImage = styled(Image)`
  width: 100%;
  height: ${screenHeight / 3.5}px;
  margin-top: ${screenHeight / 20}px;
`;

export const Separator = styled(View)`
  height: 8px;
`;

export interface SelectableProps {
  selected?: boolean;
}

export const OptionItem = styled(TouchableOpacity)<SelectableProps>`
  background-color: ${({selected}: SelectableProps) => (selected ? '#141414' : '#0d0d0d')};
  border-radius: 12px;
`;

export const PopularBadge = styled(View)`
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background-color: #1c1c1c;
  padding-vertical: 2px;
  padding-horizontal: 12px;
  align-self: flex-start;
`;

export const PopularText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(12, 932)}px;
`;

export const OptionRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
  padding-vertical: 16px;
`;

export const OptionSelect = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const IconWrapper = styled(View)`
  justify-content: center;
  margin-right: 16px;
`;

export const OptionInfo = styled(View)``;

export const OptionInvites = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 932)}px;
`;

export const OptionPrice = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-size: ${RFValue(16, 932)}px;
`;

export const SaveBadge = styled(View)<SelectableProps>`
  padding-vertical: 6px;
  padding-horizontal: 12px;
  background-color: ${({selected}: SelectableProps) => (selected ? '#1c1c1c' : '#161616')};
  border-radius: 100px;
`;

export const SaveText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
`;

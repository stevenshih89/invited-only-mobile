import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { blackColor, whiteColor } from 'constants/colors';

export const EventCounter = styled.Text`
  font-size: ${RFValue(12, 932)}px;
  color: rgba(255, 255, 255, 0.6);
  margin-left: auto;
`;

export const DropdownContainer = styled.View``;

export const DropdownButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 204px;
  height: 40px;
  border-radius: 100px;
  padding-top: 8px;
  padding-right: 16px;
  padding-bottom: 8px;
  padding-left: 16px;
  background-color: rgba(255, 255, 255, 0.16);
`;

export const DropdownText = styled.Text`
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
  flex: 1;
`;

export const DropdownIcon = styled.View`
  margin-right: 8px;
`;

export const DropDownAvatar = styled(FastImage)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${whiteColor};
  margin-right: 6px;
`;

export const DropdownItem = styled.TouchableOpacity`
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.05);
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const DropdownItemText = styled.Text`
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
`;

export const DropdownMenu = styled.View`
  position: absolute;
  top: 45px;
  left: 0;
  width: 204px;
  background-color: rgba(26, 26, 26, 0.95);
  border-radius: 16px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
  z-index: 10;
  elevation: 5;
  shadow-color: ${blackColor};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  overflow: hidden;
`;

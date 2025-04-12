import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, grayColor, whiteColor} from 'constants/colors';
export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${blackColor};
  border-bottom-width: 1px;
  border-bottom-color: ${grayColor}20;
`;

export const DropdownContainer = styled.View`
  align-items: center;
`;

export const RequestAndEventsContainer = styled.View`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const DropdownButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
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

export const EventCounter = styled.Text`
  font-size: ${RFValue(12, 932)}px;
  color: rgba(255, 255, 255, 0.6);
  margin-left: auto;
`;

export const RequestButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 119px;
  height: 40px;
  border-radius: 100px;
  padding-top: 4px;
  padding-right: 8px;
  padding-bottom: 4px;
  padding-left: 16px;
  background-color: rgba(255, 255, 255, 0.08);
`;

export const RequestButtonText = styled.Text`
  font-size: ${RFValue(14, 932)}px;
  color: ${whiteColor};
  font-weight: 600;
  flex: 1;
`;

export const RequestBadge = styled.View`
  background-color: rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  min-width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

export const RequestBadgeText = styled.Text`
  font-size: ${RFValue(12, 932)}px;
  color: ${whiteColor};
  font-weight: 700;
  padding-left: 4px;
  padding-right: 4px;
`;

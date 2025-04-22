import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const MenuItem = styled.TouchableOpacity`
  background-color: rgba(11, 11, 11, 1);
  padding: 16px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const MenuItemContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const MenuItemIconContainer = styled.View`
  padding: 8px;
  background-color: rgba(20, 20, 20, 1);
  border-radius: 14px;
  justify-content: center;
  align-items: center;
`;

export const MenuItemText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
`;

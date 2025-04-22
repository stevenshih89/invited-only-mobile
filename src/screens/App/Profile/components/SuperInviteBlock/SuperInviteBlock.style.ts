import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Satoshi400,Satoshi500} from 'constants/fonts';

import {whiteColor} from 'constants/colors';

export const SuperContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  background-color: rgba(13, 13, 13, 1);
  border-radius: 20px;
  gap: 16px;
  flex: 1;
  margin-bottom: 24px;
`;

export const SuperIconContainer = styled.View`
  background-color: rgba(21, 21, 21, 1);
  border-radius: 14px;
  padding: 8px;
  justify-content: center;
  align-items: center;
`;

export const SuperContent = styled.View`
  flex: 1;
  gap: 16px;
`;

export const SuperTitle = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(16, 932)}px;
  font-family: ${Satoshi500};
`;

export const SuperDescription = styled.Text`
  color: ${whiteColor};
  opacity: 0.6;
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Satoshi400};
`;

export const SuperCount = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(16, 932)}px;
  font-family: ${Satoshi500};
`;

export const SuperLabel = styled.Text`
  color: ${whiteColor};
  opacity: 0.6;
  font-size: ${RFValue(14, 932)}px;
  font-family: ${Satoshi400};
`;

export const SuperDivider = styled.View`
  flex: 1;
  border-bottom-color: rgba(32, 32, 32, 1);
  border-bottom-width: 1px;
  padding-bottom: 16px;
`;

export const SuperInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SuperCountContainer = styled.View``;

export const AddMoreButton = styled.TouchableOpacity`
  background-color: rgba(30, 30, 30, 1);
  border-radius: 100px;
  padding-vertical: 12px;
  padding-horizontal: 16px;
`;

export const AddMoreText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
`;

import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {blackColor, whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const Container = styled.View`
  background-color: ${blackColor};
  padding: 24px;
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
  margin-bottom: 12px;
`;

export const InviteContainer = styled.View`
  margin-top: 4px;
`;

export const InviteButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(11, 11, 11, 1);
  padding: 24px;
  border-radius: 20px;
`;

export const InviteText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(16, 932)}px;
  color: ${whiteColor};
`;

export const ShareButton = styled.TouchableOpacity`
  margin-top: 14px;
`;

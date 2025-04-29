import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Satoshi400, Satoshi500} from 'constants/fonts';

export const Container = styled.View`
  margin-top: 12px;
  align-items: center;
`;

export const Description = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(12, 932)}px;
  color: rgba(255, 255, 255, 0.64);
  text-align: center;
`;

export const LinksContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LinkWrapper = styled.TouchableOpacity``;

export const UnderlinedView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.64);
`;

export const LinkText = styled.Text`
  font-family: ${Satoshi500};
  font-size: ${RFValue(12, 932)}px;
  color: rgba(255, 255, 255, 0.64);
`;

export const Separator = styled.Text`
  font-family: ${Satoshi400};
  font-size: ${RFValue(12, 932)}px;
  color: rgba(255, 255, 255, 0.64);
  margin-horizontal: 5px;
`;

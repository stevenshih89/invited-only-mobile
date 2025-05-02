import RadialGradient from 'react-native-radial-gradient';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {whiteColor} from 'constants/colors';
import {Satoshi400, Satoshi700} from 'constants/fonts';

export const StyledRadialGradient = styled(RadialGradient)`
  padding: 16px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 8px;
`;

export const ButtonWrapper = styled.TouchableOpacity``;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InnerRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const ProfileImage = styled(FastImage)`
  width: 56px;
  height: 56px;
  border-radius: 100px;
`;

export const InfoWrapper = styled.View`
  align-items: flex-start;
  justify-content: center;
`;

export const HostName = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi700};
  font-size: ${RFValue(16, 932)}px;
  line-height: ${RFValue(20, 932)}px;
`;

export const HostRole = styled.Text`
  margin-top: 4px;
  font-family: ${Satoshi400};
  font-size: ${RFValue(14, 932)}px;
  color: rgba(255, 255, 255, 0.72);
  line-height: ${RFValue(17, 932)}px;
`;

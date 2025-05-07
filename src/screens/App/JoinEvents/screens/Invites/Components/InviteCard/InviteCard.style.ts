import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

export const Wrapper = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 8px;
  border-radius: 20px;
  overflow: hidden;
`;

export const BackgroundImage = styled.ImageBackground.attrs({
  imageStyle: {borderRadius: 20},
})`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

export const Content = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 12px;
  padding-bottom: 18px;
  padding-horizontal: 12px;
  align-items: center;
  z-index: 1;
`;

export const BadgeRow = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 6px;
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: ${({isSuperInvite}: {isSuperInvite: boolean}) => (isSuperInvite ? 4 : 0)}px;
`;

export const BlurOverlay = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  overflow: hidden;
`;

export const HostImage = styled(FastImage)`
  width: 16px;
  height: 16px;
  border-radius: 20px;
`;

export const BadgeText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(12, 932)}px;
`;

export const CountBadge = styled.View`
  background-color: rgba(255, 255, 255, 0.08);
  padding-vertical: 2px;
  padding-horizontal: 6px;
  border-radius: 100px;
`;

export const EventInfo = styled.View`
  margin-top: auto;
  align-items: center;
`;

export const EventName = styled.Text`
  text-align: center;
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(20, 932)}px;
`;

export const EventDate = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(12, 932)}px;
  opacity: 0.6;
`;

export const ActionsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
`;

export const IconButton = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  background-color: rgba(255, 255, 255, 0.08);
  padding: 8px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

export const InviteButton = styled(IconButton)`
  flex-direction: row;
  padding: 2px;
  padding-right: 6px;
  gap: 4px;
`;

export const InviteText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(14, 932)}px;
`;

export const GradientOverlay = styled(LinearGradient)`
  position: absolute;
  top: 50%;
  bottom: 0;
  left: 0;
  right: 0;
`;

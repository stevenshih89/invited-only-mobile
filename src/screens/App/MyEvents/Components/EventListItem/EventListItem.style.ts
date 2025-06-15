import styled from 'styled-components/native';
import {View, Text, Image, ImageBackground} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {Satoshi400, Satoshi500} from 'src/constants/fonts';
import {screenHeight} from 'constants/common';
import Arrow from 'assets/images/icons/arrow-down.svg';
import {whiteColor} from 'constants/colors';

export const CardContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.06);
  margin-bottom: 24px;
  width: 100%;
  overflow: hidden;
`;

export const ImageFallbackContainer = styled(View)`
  width: 100%;
  height: 236px;
  background-color: #000000;
  justify-content: center;
  align-items: center;
`;

export const FallbackText = styled(Text)`
  color: #ffffff;
  font-family: ${Satoshi500};
  font-size: 16px;
`;

export const EventImageBackground = styled(ImageBackground)`
  width: 100%;
  height: 236px;
  justify-content: flex-end;
`;

export const ImageOverlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
`;

export const UserAvatarContainer = styled(View)`
  position: absolute;
  right: 16px;
  bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const AvatarImage = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ffffff;
  margin-left: -16px;
`;

export const AvatarCountBadge = styled(View)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  justify-content: center;
  align-items: center;
  margin-left: -16px;
  border: 1px solid #ffffff;
`;

export const AvatarCountText = styled(Text)`
  font-family: ${Satoshi500};
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;

export const StatusButton = styled(View)`
  position: absolute;
  left: 16px;
  bottom: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 100px;
`;

export const StatusText = styled(Text)`
  font-family: ${Satoshi500};
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;

export const StyledBlurView = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  overflow: hidden;
`;

export const InvitationStatusContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  padding-left: 20px;
  background-color: rgba(12, 12, 12, 1);
  height: ${screenHeight * 0.07}px;
  padding-right: 10px;
`;
export const InvitationLeftContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
export const InvitationRightContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 4px;
`;

export const InvitationStatusTextContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;
export const InvitationStatusText = styled.Text`
  font-family: ${Satoshi500};
  font-size: 16px;
  line-height: 16.94px;
  color: rgb(251, 251, 251);
`;

export const InvitationStatusDescription = styled.Text`
  font-family: ${Satoshi400};
  font-size: 12px;
  line-height: 16.94px;
  color: rgba(255, 255, 255, 0.5);
`;

export const HeaderCollapsedContainer = styled.View`
  display: flex;
  width: 100%;
`;

export const StyledArrow = styled(Arrow)<{isOpen: boolean}>`
  width: 20px;
  height: 20px;
  transform: ${({isOpen}: {isOpen: boolean}) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const WaitingContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
  background-color: rgba(12, 12, 12, 1);
  padding: 4px 10px;
  gap: 8px;
  width: 92px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

export const WaitingText = styled.Text`
  font-family: ${Satoshi500};
  font-size: 12px;
  line-height: 16.94px;
  color: ${whiteColor};
`;

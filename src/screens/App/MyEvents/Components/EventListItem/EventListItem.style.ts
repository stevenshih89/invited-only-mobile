import styled from 'styled-components/native';
import {View, Text, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {Satoshi400, Satoshi500} from 'src/constants/fonts'; // Adjust path if needed

// Main card container - Adapted from 'AppClip'
export const CardContainer = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.06);
  margin-bottom: 24px;
  overflow: hidden;
`;

// Fallback container for when there is no image
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

// Image section - Adapted from 'Image' with background
export const EventImageBackground = styled(ImageBackground)`
  width: 100%;
  height: 236px;
  justify-content: flex-end;
`;

// Container for absolutely positioned items on the image
export const ImageOverlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
`;

// User avatars section - Adapted from 'User'
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

// Status Button - Adapted from 'button' under Image
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

// Content section below image - Adapted from 'Name + Desc. + Open Button'
export const ContentContainer = styled(View)`
  padding: 24px;
  gap: 24px;
  width: 100%;
  align-items: flex-start;
`;

// Name + Description section - Adapted from 'Name + Desc.'
export const InfoContainer = styled(View)`
  gap: 4px;
  width: 100%;
  align-items: flex-start;
`;

export const DateText = styled(Text)`
  font-family: ${Satoshi400};
  font-size: 14px;
  line-height: 17px;
  opacity: 0.5;
  color: #ffffff;
`;

export const EventNameText = styled(Text)`
  font-family: ${Satoshi500};
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
`;

export const LocationText = styled(Text)`
  font-family: ${Satoshi400};
  font-size: 14px;
  line-height: 17px;
  opacity: 0.5;
  color: #ffffff;
`;

export const ActionsContainer = styled(View)`
  flex-direction: row;
  gap: 8px;
  width: 100%;
`;

// Base action button style
const ActionButtonBase = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  height: 48px;
`;

// View Requests Button - Adapted from 'button' under Buttons
export const ViewRequestsButton = styled(ActionButtonBase)`
  flex: 1;
  gap: 8px;
  padding: 4px 8px 4px 4px;
`;

export const ViewRequestsText = styled(Text)`
  font-family: ${Satoshi500};
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;

export const RequestCountBadge = styled(View)`
  padding: 6px;
  min-width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: rgba(255, 255, 255, 0.64);
  justify-content: center;
  align-items: center;
`;

export const RequestCountText = styled(Text)`
  font-family: ${Satoshi500};
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;

// Manage Button - Adapted from 'Frame 2085661847'
export const ManageButton = styled(ActionButtonBase)`
  width: 48px;
`;

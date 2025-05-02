import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Satoshi500} from 'constants/fonts';
import {whiteColor} from 'constants/colors';
import {screenHeight} from 'constants/common';

export const Container = styled.View`
  flex: 1;
  padding-top: ${screenHeight / 7}px;
  align-items: center;
`;

export const ImageContainer = styled.View`
  position: relative;
`;

export const UserImage = styled(FastImage)`
  width: ${screenHeight / 4}px;
  height: ${screenHeight / 4}px;
  border-radius: 10px;
  margin-top: 16px;
`;

export const ModalContent = styled.View`
  border-radius: 24px;
  padding-horizontal: 24px;
  padding-top: ${screenHeight / 10}px;
  padding-bottom: 32px;
  flex: 1;
`;

export const Title = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(24, 932)}px;
  margin-bottom: 10px;
  max-width: 80%;
`;

export const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  aspect-ratio: 0.63 / 1;
  align-items: center;
  position: relative;
`;

// Wrapper for logo at top
export const LogoWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

// Wrapper around background image
export const BackgroundWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

// Container for user tag overlay
export const OverlayContainer = styled.View`
  position: absolute;
  bottom: -24px;
  right: 0;
  left: 0;
`;

// Row layout for user tag and check icon
export const TagRow = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

// Styled container for user tag
export const UserTag = styled.View`
  background-color: #181819;
  padding-right: 16px;
  padding-left: 8px;
  padding-vertical: 8px;
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

// Styled image for user avatar in tag
export const TagUserAvatar = styled(FastImage)`
  width: 28px;
  height: 28px;
  border-radius: 100px;
`;

// Styled text for user name in tag
export const UserNameText = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(18, 932)}px;
`;

// Styled container for check icon
export const CheckTag = styled.View`
  background-color: #181819;
  padding-horizontal: 16px;
  padding-vertical: 8px;
  border-radius: 100px;
`;

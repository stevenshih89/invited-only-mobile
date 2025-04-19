import { BlurView } from "@react-native-community/blur";
import { blackColor, whiteColor } from "constants/colors";
import { Satoshi500 } from "constants/fonts";
import styled from "styled-components/native";

export const NopeRejectBadgeContainer = styled.View`
  width: 100%;
  height: 100%;
`;

export const NopeRejectBadgeText = styled.Text`
  font-size: 16px;
  font-family: ${Satoshi500};
  color: ${whiteColor};
  z-index: 10;
  padding: 5px;
`;

export const LockedBadgeBlurView = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  z-index: 3;
`;  
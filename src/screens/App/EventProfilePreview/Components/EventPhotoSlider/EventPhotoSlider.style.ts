import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { Satoshi500 } from 'constants/fonts';
import { whiteColor } from 'constants/colors';

export const Container = styled.View`
  width: 100%;
  aspect-ratio: 9/16;
  padding-right: 20px;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 100%;
`;

export const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const TouchableArea = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
`;

export const LeftTouchArea = styled(TouchableArea)`
  left: 0;
`;

export const RightTouchArea = styled(TouchableArea)`
  right: 0;
`;

export const GradientOverlay = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
`;

export const ContentContainer = styled.View`
  position: absolute;
  bottom: 34px;
  left: 24px;
  right: 24px;
`;

export const UserInfoContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const EventName = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(32, 932)}px;
  text-align: center;
  margin-right: 8px;
`;

export const EventDate = styled.Text`
  color: ${whiteColor};
  font-family: ${Satoshi500};
  font-size: ${RFValue(28, 932)}px;
  opacity: 0.6;
`;

export const DotsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const Dot = styled.View<{ isActive: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${whiteColor};
  opacity: ${({ isActive }: { isActive: boolean }) => (isActive ? 1 : 0.5)};
`;

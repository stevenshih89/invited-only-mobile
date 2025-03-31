import styled from 'styled-components/native';
import {BlurView} from '@react-native-community/blur';
import {Satoshi500} from 'constants/fonts';
import {whiteColor} from 'constants/colors';

export const LockedFeatureContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 250px;
  border-radius: 20px;
  width: 100%;
  overflow: hidden;
`;

export const LockedFeatureBlueView = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

export const EventCardContentContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 250px;
  gap: 20px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 3;
`;

export const LockedBigText = styled.Text`
  font-family: ${Satoshi500};
  font-size: 24px;

  color: ${whiteColor};
`;

export const LockedSmallText = styled.Text`
  font-family: ${Satoshi500};
  font-size: 16px;

  color: ${whiteColor};
`;

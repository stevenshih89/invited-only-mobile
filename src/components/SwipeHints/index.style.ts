import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {black60Color, whiteColor} from 'constants/colors.ts';
import {Satoshi400} from 'constants/fonts.ts';
import {screenHeight, screenWidth} from 'constants/common.ts';

export const Container = styled.View`
  z-index: 1111;
`;

export const FixedOverlayContainer = styled.View`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  width: ${screenWidth}px;
  height: ${screenHeight}px;
  z-index: 1111;
  background-color: ${black60Color};
`;

export const SwipeHintsContainer = styled.View`
  position: relative;
  z-index: 1231;
  justify-content: flex-end;
  height: 100%;
  gap: 90px;
  bottom: 80px;
`;

export const SwipeHintMainContainer = styled.View`
  flex-direction: column;
  gap: 12px;
`;

export const HandIconContainer1 = styled.View`
  position: absolute;
  right: 20px;
  bottom: 0;
`;

export const HandIconContainer2 = styled.View`
  position: absolute;
  right: 60px;
  bottom: -5px;
  transform: rotate(70deg);
`;

export const HandIconContainer3 = styled.View`
  position: absolute;
  right: -10px;
  top: 35px;
  transform: rotate(-10deg);
`;

export const SwipeHintInviteContainer = styled.View`
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
`;

export const SwipeHintMoreContainer = styled.View`
  flex-direction: column;
  gap: 12px;
  align-self: center;
  align-items: center;
`;

export const HintRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SwipeHintTitle = styled.Text`
  font-size: ${RFValue(14, 932)}px;
  line-height: 16px;
  width: 62px;
  text-align: center;
  color: ${whiteColor};
  font-family: ${Satoshi400};
  font-weight: 400;
`;

export const SwipeHintTitleWide = styled(SwipeHintTitle)`
  width: 86px;
`;

import styled from 'styled-components/native';
import {gray3Color, white64Color, whiteColor} from 'constants/colors.ts';
import {Satoshi400, Satoshi500} from 'constants/fonts.ts';
import {screenWidth} from 'constants/common.ts';

interface TriangleProps {
  directionHorizontal: 'start' | 'center' | 'end';
  directionVertical: 'top' | 'bottom';
}

export const HintContainer = styled.View`
  width: 100%;
  border-radius: 6px;
  padding: 16px;
  background-color: ${gray3Color};
  margin-top: 10px;
  gap: 8px;
`;

export const Triangle = styled.View<TriangleProps>`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  ${({directionHorizontal}: {directionHorizontal: 'start' | 'center' | 'end'}) => directionHorizontal === 'start' && 'left: 8px;'}
  ${({directionHorizontal}: {directionHorizontal: 'start' | 'center' | 'end'}) =>
    directionHorizontal === 'center' && `left: ${screenWidth / 2 - 36}px;`}
  ${({directionHorizontal}: {directionHorizontal: 'start' | 'center' | 'end'}) => directionHorizontal === 'end' && 'right: 8px;'}
  ${({directionVertical}: {directionVertical: 'top' | 'bottom'}) =>
    directionVertical === 'top' &&
    `
    top: -10px;
    border-left-width: 12px;
    border-right-width: 12px;
    border-bottom-width: 16px;
    background-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: ${gray3Color};
  `}
  ${({directionVertical}: {directionVertical: 'top' | 'bottom'}) =>
    directionVertical === 'bottom' &&
    `
    bottom: -10px;
    border-left-width: 12px;
    border-right-width: 12px;
    border-top-width: 16px;
    background-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: ${gray3Color};
  `}
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: ${Satoshi500};
  font-weight: 500;
  line-height: 20px;
  color: ${whiteColor};
`;

export const TotalSteps = styled.Text`
  font-size: 14px;
  font-family: ${Satoshi500};
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.5px;
  color: ${white64Color};
`;

export const Description = styled.Text`
  font-size: 14px;
  font-family: ${Satoshi400};
`;

export const ActionBtnsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  align-items: center;
`;

export const NavigationBtnsContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export const BackText = styled.Text`
  font-size: 14px;
  font-family: ${Satoshi500};
  font-weight: 500;
  line-height: 22px;
  color: ${whiteColor};
`;

export const nextBtn = {
  width: 121,
  height: 32,
  borderRadius: 6,
  fontSize: 14,
};

export const nextBtnTitle = {
  fontSize: 14,
  lineHeight: 22,
};

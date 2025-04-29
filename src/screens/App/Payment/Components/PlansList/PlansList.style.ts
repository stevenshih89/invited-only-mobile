import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {black2Color, lightGray2Color, whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

interface PlanItemProps {
  isActive: boolean;
  isFirstItem: boolean;
  isLastItem: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;

export const ItemContainer = styled.View`
  flex: 1;
`;

export const PlanButton = styled.TouchableOpacity<{isActive: boolean}>`
  position: relative;
  margin-top: ${({isActive}: {isActive: boolean}) => (isActive ? 0 : 0)}px;
  flex: 1;
  margin-horizontal: 3px;
`;

export const PlanItemView = styled.View<PlanItemProps>`
  background-color: ${({isActive}: {isActive: boolean}) => (isActive ? lightGray2Color : black2Color)};
  height: 48px;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${({isFirstItem}: {isFirstItem: boolean}) => (isFirstItem ? 10 : 0)}px;
  border-bottom-left-radius: ${({isFirstItem}: {isFirstItem: boolean}) => (isFirstItem ? 10 : 0)}px;
  border-top-right-radius: ${({isLastItem}: {isLastItem: boolean}) => (isLastItem ? 10 : 0)}px;
  border-bottom-right-radius: ${({isLastItem}: {isLastItem: boolean}) => (isLastItem ? 10 : 0)}px;
`;

export const PlanText = styled.Text`
  color: ${whiteColor};
  font-size: ${RFValue(16, 932)}px;
  font-family: ${Satoshi500};
`;

import styled from 'styled-components/native';
import { whiteColor, grayColor, blackColor } from 'constants/colors'; // Assuming you have these colors defined
import { Satoshi400, Satoshi500 } from 'constants/fonts';
import { screenWidth } from 'constants/common';

export const Container = styled.View`
  flex: 1;

  background-color: ${blackColor};
  padding: ${screenWidth * 0.07}px;
`;

export const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${screenWidth * 0.07}px;
`;

export const TabBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-around; 
  background-color: ${blackColor};
  padding-horizontal: ${screenWidth * 0.07}px;
  padding-top: 10px;
`;

interface TabItemProps {
  active: boolean;
}

export const TabItem = styled.TouchableOpacity<TabItemProps>`
  padding-bottom: 10px;
  align-items: center;
  flex: 1;
  border-bottom-width: 2px;
  border-bottom-color: ${({ active }: TabItemProps) => (active ? whiteColor : 'transparent')};
`;

interface TabTextProps {
  active: boolean;
}

export const TabText = styled.Text<TabTextProps>`
  font-family: ${Satoshi500};
  font-size: 16px;
  color: ${({ active }: TabTextProps) => (active ? whiteColor : grayColor)};
`;


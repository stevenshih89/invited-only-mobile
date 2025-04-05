import styled from 'styled-components/native';
import { whiteColor } from 'constants/colors'; // Adjust path if needed
import { Satoshi500 } from 'src/constants/fonts'; // Adjust path if needed
import { screenWidth } from 'constants/common';

// A simple container, potentially using DefaultBackground or similar
export const ScreenContainer = styled.View`
  flex: 1;
  padding-horizontal: ${screenWidth / 20.5}px;
  padding-vertical: ${screenWidth / 20.5}px;
  width: 100%;
`;

// Container for the tab buttons - mimicking Figma layout
export const TabsRow = styled.View`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 33px;
`;

interface TabButtonProps {
  isActive: boolean;
}

export const TabButton = styled.TouchableOpacity<TabButtonProps>`
  padding-bottom: 8px;
  border-bottom-width: 2px;
  border-bottom-color: ${ (props: TabButtonProps) => (props.isActive ? whiteColor : 'transparent')};
  flex: 1;
  align-items: center;
`;

export const TabButtonText = styled.Text<TabButtonProps>`
  font-family: ${Satoshi500};
  font-size: 16px;
  color: ${ (props: TabButtonProps) => (props.isActive ? whiteColor : 'rgba(255, 255, 255, 0.5)')};
`;

// Container for the content displayed below the tabs
export const ContentContainer = styled.View`
  flex: 1;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

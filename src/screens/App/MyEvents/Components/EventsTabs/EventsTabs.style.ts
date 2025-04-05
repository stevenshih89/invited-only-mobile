import styled from 'styled-components/native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

// Style the container if needed, but often styling is done via navigator props
export const TabBarContainer = styled.View`
  /* The Figma layout suggests absolute positioning, 
     but it's better controlled by the parent container 
     when integrating into the main screen structure. 
     We apply styles to the navigator options instead. */
`;

// We will style the TabBar directly using screenOptions in EventsTabs.tsx 
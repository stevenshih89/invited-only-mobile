import styled from 'styled-components/native';
import {ViewStyle} from 'react-native'; // Import ViewStyle for type safety

export const IoContainer = styled.View`
  display: flex;
  height: 100%;
  width: 100%;
  padding-bottom: 10px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

// Export the style object for the TabNavigator
export const tabNavigatorStyle: ViewStyle = {
  width: '100%',
  marginHorizontal: 50,
};

import styled from 'styled-components/native';
import { blackColor } from 'constants/colors';

export const AppLoaderContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${blackColor};
`;
export const AppActivityIndicator = styled.ActivityIndicator`
  transform: scale(1.5);
`;

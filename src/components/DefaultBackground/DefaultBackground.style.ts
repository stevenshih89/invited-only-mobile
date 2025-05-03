import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { blackColor } from 'constants/colors';

export const MainContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${blackColor};
  justify-content: center;
  align-items: center;
`;
export const MainLinearGradient = styled(LinearGradient)`
  flex: 1;
`;

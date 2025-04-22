import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {blackColor} from 'constants/colors';

export const MainContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${blackColor};
`;
export const MainLinearGradient = styled(LinearGradient)`
  flex: 1;
`;

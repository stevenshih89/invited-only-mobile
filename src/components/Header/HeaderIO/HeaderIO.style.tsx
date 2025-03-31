import {whiteColor} from 'constants/colors';
import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;
export const CreateEventButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: 'rgba(255, 255,255, 0.08)';
  border-radius: 100px;
  height: 40px;
  width: 131px;
`;
export const CreateEventText = styled.Text`
  color: ${whiteColor};
`;

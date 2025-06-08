import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { whiteColor } from 'constants/colors';
import { Satoshi400 } from 'constants/fonts';

export const CreateEventButton = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 4px 12px 4px 4px;

  width: 131px;
  height: 40px;

  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 100px;
`;

/** Icon container inside the button **/
export const IconContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* There's no gap in RN, so use margin on the icon or text if needed. */
  padding: 5.74px;

  width: 32px;
  height: 32px;
  background-color: rgba(1, 1, 1, 0.5);
  border-radius: 172px;
`;

export const CreateNewText = styled.Text`
  font-family: ${Satoshi400};
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${whiteColor};
  margin-left: 8px;
`;

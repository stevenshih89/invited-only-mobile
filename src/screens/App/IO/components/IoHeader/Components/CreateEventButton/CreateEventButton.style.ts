import styled from 'styled-components/native';
import {Satoshi500} from 'constants/fonts';

export const CreateEventButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-self: center;
  align-items: center;
  height: 32px;
  width: 128px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background-color: 'rgba(255, 255,255, 0.08)';
`;
export const CreateEventButtonWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const CreateEventButtonText = styled.Text`
  color: #fff;
  font-family: ${Satoshi500};
  font-size: 14px;
  line-height: 121%; /* 16.94px */
`;

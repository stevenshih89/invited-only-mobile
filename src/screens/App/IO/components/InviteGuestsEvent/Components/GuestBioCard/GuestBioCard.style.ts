import {whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  width: 382px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.04);
  padding: 20px;
  gap: 15px;
`;
export const CardLabel = styled.Text`
  font-family: ${Satoshi500};
  color: ${whiteColor};
  opacity: 0.5;
`;

export const DescriptionTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const WhiteTextInfo = styled.Text`
  font-family: ${Satoshi500};
  color: ${whiteColor};
`;

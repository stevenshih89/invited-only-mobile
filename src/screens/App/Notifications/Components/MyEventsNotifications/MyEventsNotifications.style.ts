import styled from 'styled-components/native';
import { whiteColor, grayColor } from 'constants/colors'; // Assuming these are defined
import { Satoshi500, Satoshi400 } from 'constants/fonts'; // Assuming these are defined

export const Container = styled.View`
  padding-top: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

export const SectionTitle = styled.Text`
  font-family: ${Satoshi500};
  font-size: 20px;
  color: ${whiteColor};
  margin-bottom: 10px;
`;

export const PlaceholderText = styled.Text`
  font-family: ${Satoshi400};
  font-size: 14px;
  color: ${grayColor};
`; 
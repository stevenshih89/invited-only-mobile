import styled from 'styled-components/native';
import {whiteColor} from 'constants/colors';
import {Satoshi500} from 'constants/fonts';

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

export const BasicsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  border-radius: 20px;
  padding: 20px;
  gap: 15px;
`;

export const InterestsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 20px;
  gap: 15px;
  flex-wrap: wrap;
`;
export const CardLabel = styled.Text`
  font-family: ${Satoshi500};
  color: ${whiteColor};
  opacity: 0.5;
`;

export const RoundedTextViewContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.08);
  margin-top: 2px;
  margin-bottom: 2px;
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
export const WhiteGrayInfo = styled.Text`
  font-family: ${Satoshi500};
  color: ${whiteColor};
  opacity: 0.5;
`;

export const InterestImage = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 100px;
`;
